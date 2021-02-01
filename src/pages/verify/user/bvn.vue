<template>
  <section class="multi_step_form">
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
    <form id="msform" class="d-flex flex-column justify-content-center">
      <!-- Tittle -->
      <div v-show="$store.state.status != 'verified'" class="tittle">
        <img src="/img/custom/bvn-register.gif" width="125" class="mb-4" />
        <h2>BVN Verification</h2>
        <p>An OTP will be sent to the phone number linked to your BVN
        <br>
        <small>(Officials on GreaterFavour require their BVN to be verified )</small>
        </p>
      </div>
      <!-- fieldsets -->
      <fieldset>
        <div v-show="$store.state.status != 'verified'" class="form-row" id="bvnHolder">
          <div class="form-group  col-md-5 mb-0 text-left">
            <label for="payment1">BVN</label>
            <div class="d-flex justify-content-between align-items-center form-control">
              <input v-model="bvnNumber" 
              type="text"
              maxlength="11"
              oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');" 
              class="w-100 border-0 box-shadow-none f-height py-4" id=""
                placeholder="BVN Number">
            </div>
          </div>
          <div class="form-group col-md-7 mb-0 text-left" data-select2-id="11">
            <label for="payment3" class="sm-pd">Date of Birth</label>
            <div class="d-flex flex-wrap flex-lg-nowrap mb-md-15">
              <div class="w-100 mr-xl-10 mb-10">
                <div class="d-flex justify-content-between align-items-center form-control">
                  <date-picker v-model="dob" valueType="format" placeholder="Date of Birth (YYYY-MM-DD)"></date-picker>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group col-sm-12 ">
            <div class="  mx-auto ">
              <a @click.prevent="verify()" href=""
                class="btn btn-primary mx-auto btn-default btn-squared verifyBTN">Verify
              </a>
            </div>
          </div>

        </div>

        <div v-show="$store.state.status == 'verified'" id="successVerification2">
          <div class="card-body bg-white bg-shadow radius-xl px-sm-30 pt-sm-25 m-0 p-0">
            <div class="payment-status__area  py-sm-25 py-20 text-center">
              <div class="content-center">
                <span class="wh-34 bg-success rounded-circle content-center">
                  <span class="las la-check fs-16 color-white"></span></span>
              </div>
              <h4 class="fw-500 mt-20 mb-10"> Verified </h4>
              <span class="fs-15 color-gray">Tap on the 'Button' below to continue
              </span>
            </div>
          </div>
        </div>

        <!--<button type="button" class="action-button previous_button">Back</button>-->
        <button type="button" class="next action-button no-display actbtn">Continue</button>

      </fieldset>
    </form>
  </section>
</template>

<script>
import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
// import { publicClient } from "@/plugins/restclient";
export default {
	layout: 'landing',
  components:{
    DatePicker,
  },
    data() {
        return {
            dob: '',
            bvnNumber: "",
            errorMessage: ''
        }
  },
  watch:{
    errorMessage(newval){
      if(newval){
        setTimeout(() => this.errorMessage = '', 3000)
      }
    }

  },
    methods: {
		verify(){
      if(this.bvnNumber.trim().length == 0){
        this.errorMessage = 'BVN number required'
        return
      }
      else if(this.bvnNumber.trim().length != 11){
        this.errorMessage = 'BVN number should be 11 digit'
        return
      }
      if(!this.dob){
        this.errorMessage = 'Date of Birth is required'
        return
      }else if(this.dob){
         const dob = new Date(this.dob)
        const today = new Date()
        const elapse = today - dob
        
        const age = Math.ceil(elapse/(365*24*60*60*1000))
        if(age < 18){
          this.errorMessage = 'You must be 18 or more'
          return
        }
        
      }

			let { user, action} = this.$route.params
			user = {
				...this.$route.params.user,
				dob: this.dob,
				bvnNumber: this.bvnNumber,

			}
			this.$router.push({name: 'verify-user', params:{user: user, action: action}})
		}
	},
	beforeRouteEnter (to, from, next) {
		if(to.params.user){
			next()
			return
		}
		next('/login')
	},
}
</script>

<style>
.mx-datepicker {
    width: 100%;
}
.multi_step_form #msform fieldset {
  padding:  0px !important;
}
.mx-datepicker input{
  border: 0px;
  box-shadow: none;
}
</style>