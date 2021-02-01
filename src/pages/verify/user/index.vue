<template>
  <div class="row py-5" id="showUp">
		<transition name="slide-fade">
			<div v-if="errorMessage"
				class="signUp-topbar d-flex align-items-center justify-content-md-end justify-content-center mt-md-0 mb-md-0 mt-20 mb-1" style="position: fixed; top: 1em; right: 1em; z-index:9999"
			>
				<div class="mb-0 mt-3">
				<div class="alert alert-danger" role="alert">
						{{errorMessage}}
				</div> 
				</div>
			</div>
		</transition>
    <div class="col-sm-12 text-center" v-if="otp.status">
      <h6 class="text-center otptxt">
        <img src="@/assets/img/custom/verification-email.gif" width="250" />
        <br />        
      </h6>
      <h6 class="text-center text-success d-flex flex-column align-items-center" v-if="otp.status == 'success'">
        <div>
			User Verification Successful.
		</div>
		<br>
		<router-link to="/login">
			<div class="btn btn-primary mt-3">Proceed to Login</div>
		</router-link>
		
      </h6>
		<div v-if="!(otp.status == 'success')">
			<p>
				Please enter the OTP that was sent to your email or phone number
				
			</p>
			<!-- <h6 class="text-center err" v-if="otp.status == 'failed'">Incorrect OTP Code.</h6> -->
      
			<div class="input-wrapper">
				<PincodeInput
				v-model="otp.code"
				:length="6"
				/>
			</div>

			<div class="otpBottom text-center mt-3">
				
				<transition>
					<div class="d-flex justify-content-center align-items-center" style="height: 50px;">
						<h4 v-if="!restartCounter">Expires in  
				<VueCountdown :time="otp.expires" ref="countdown" :auto-start="true">
					<template slot-scope="props">
						<span v-if="props.minutes<10">0</span>{{ props.minutes + ' : '}} 
						<span v-if="props.seconds<10">0</span><span>{{ props.seconds }}</span>
					</template>
				</VueCountdown>
				</h4>
					</div>
				</transition>
				
				
				<button
					class="btn btn-primary btn-squared  mx-auto mt-2 fixed-btn"
					@click.prevent="verifyOtp"
					:disabled="isLoading"
				>
					<i class="las la-check" v-if="!isLoading"></i>
					<span v-show="isLoading" class="spinner-border spinner-border-sm" ></span>
					{{ isLoading ? " " : "Verify" }}
				</button>
				
				<h6 class="mt-5">Didn't get OTP?</h6>
				<button
					class="btn btn-transparent text-primary btn-squared  mx-auto mt-2 fixed-btn"
					@click.prevent="resendOtp"
					:disabled="resendLoader"
				>
					
					<span v-show="resendLoader" class="spinner-border spinner-border-sm" ></span>
					<h5 class="text-primary">{{ resendLoader ? " " : "Resend" }}</h5>
				</button>
				
			</div>
		</div>
    </div>
  </div>
</template>
<script>
import PincodeInput from 'vue-pincode-input';
import VueCountdown from '@chenfengyuan/vue-countdown';
import { publicClient } from "@/plugins/restclient.js";
export default {
  layout: 'landing',
  data(){
    return{
			otp:{
				code: '',
				olid: '',
				expires: 0,
				status: 'undefined',
				ref: '',
			},
			user:{},
			action:'',
			isLoading:false,
			resendLoader:false,
			restartCounter: false,
			errorMessage: '',
			bvnError: ''
		}
  },
  components: {
    PincodeInput,
    VueCountdown
	},
	watch:{
		errorMessage(newval){
			if(newval){
				setTimeout(() => this.errorMessage= '', 3000)
			}
		}
	},
  created(){	
		this.user = this.$route.params.user
		this.action = this.$route.params.action
		this.otpStart()
  },
  methods: {
	startCountdown(){
		// this.$refs.countdown.end();
		this.restartCounter = !this.restartCounter
		setTimeout(() => {
			this.restartCounter = !this.restartCounter
			},100)			
	},
	otpStart() {
		const action = this.action
		const user = this.user
		
		const headers = {
			"X-Ulid": `${user.ulid}`,
			"Authorization": `Bearer ${localStorage.getItem('jwt')}`
		};
		const ref = user.ulid

		publicClient
		.post("/v1/engine/system/otp/start", {ref, action}, {
			headers: headers,
		})
		.then((res) => {
			this.$set(this.otp, 'expires',Number(res.data.info.expires)*1000 )
			this.$set(this.otp, 'olid',res.data.info.olid )
			this.startCountdown()
			if(this.resendLoader){
				this.errorMessage = 'OTP resend'
			}
			this.resendLoader = false
		}).catch(() => {
			this.resendLoader = false
		})
	},
	resendOtp(){
		this.resendLoader = true
		this.otpStart()
	},
    verifyOtp() {
		if(this.otp.code.length != 6){
			this.errorMessage = 'Invalid OTP format. Please Try Again'
			return
		}
		const headers = {
				"X-Ulid": `${this.user.ulid}`,
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`
		};
		const verify = {
			olid: this.otp.olid,
			code: this.otp.code,
		};			
		this.isLoading = true
        publicClient
        .post("/v1/engine/system/otp/verify", verify, {
          headers: headers,
        })
        .then(() => {
			this.isLoading = false
			if(this.action == 'user.verification'){
				this.verifyUser(headers)
				
			} else if(this.action == 'user.bvn'){
				// console.log('user bvn')
				this.verifyBVN(headers)
			}
        }).catch(err => {
					this.isLoading = false
					if(err.response.data.status == -1)
						this.otp.status = 'failed'
						this.errorMessage = 'Incorrect OTP Code.Try again'
        })
	},
	verifyUser(headers){
		this.isLoading = true
		publicClient
		.post('/v1/engine/settings/verification/user',{
			olid: this.otp.olid
		},
		{
			headers
		})
		.then(() => {
			this.otp.status = 'success'
			this.isLoading = false
		})
		.catch(() => {
			this.isLoading = false
		})
	},
	
  },
  beforeRouteEnter (to, from, next) {
	
		if(to.params.user){
			next()
			return
		}
		next('/login')
	},
	// beforeRouteLeave(to,from, next){
	
	// 	if(to.params.backLink){
	// 		next({params: this.$route.params})
	// 	}else if(from.params.user){
	// 		next()
	// 	}else{
	// 		const answer = window.confirm('you are about to leave this page. all chages will be lost')
	// 		if(!answer){
	// 			next(false)
	// 		}
	// 	}
	// 	next()
	// }
};
</script>
<style scoped>
.err{
  color: red
}
.vue-pincode-input {
	font-size: 24px;
	font-family: 'Raleway', sans-serif;
	background: #ffefe7 !important;
	box-shadow: none;
	height: 50px !important;
	padding: 25px !;
	color: #d94f03 !important ;
	box-shadow: 0px;
}
</style>
