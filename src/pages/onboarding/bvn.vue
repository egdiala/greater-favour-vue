<template>
  <div class="main-content">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <!-- Start: error page -->
                    <div class="min-vh-100 content-center  multi_step_form">
                        <div class="text-center">
                            <img src="/img/custom/greater-favour.png" class="mb-10 mt-50" width="200"> <br>
                            <h5 class="fw-500">BVN <br> <small> verification</small> </h5> <br>

                            <div class="card mb-25">
                                <div v-if="bvnError.status == 'failed'" class="mt-5"> 
                                    <div>
                                        <span class="link" @click="showBVNForm"><i class="fa fa-arrow-left"></i> Back</span> 
                                    </div>
                                    <div class="text-center my-5">
                                        <span style="overflow:hidden; display:inline-block">
                                            <img src="@/assets/img/unsuccessful.gif" width="100" alt="failed-icon" style="transform:scale(1.5)">
                                        </span>
                                        
                                    </div>	
                                    <div class="text-center">
                                        <h2 class="text-danger">Oops!</h2>
                                        <p class="mt-4 mb-50">{{bvnError.message}}</p>
                                    </div>
                                </div>
                                <div v-if="bvnError.status == 'noerror'" class="mt-5">
                                    <div class="text-center my-5">
                                        <span style="overflow:hidden; display:inline-block">
                                            <img src="@/assets/img/checkmark.gif" width="100" alt="failed-icon">
                                        </span>
                                        
                                    </div>	
                                    <div class="text-center">
                                        <h2 style="color:#78b43f">Verification Successful</h2>
                                        <p class="mt-1 mb-50">Your BVN has been verified.</p>
                                    </div>
                                </div>
                                <div v-if="!(bvnError.status == 'failed' || bvnError.status == 'noerror')">
                                    <div class="card-body  p-20" v-if="!otpHandle.activate">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <img src="/img/custom/bvn-register.gif" width="125" class="mb-4" />
                                            </div>
                                            <div class="col-sm-12 col-md-12">
                                                <div class="form-group">
                                                    <label class="w-100">Date of Birth</label>
                                                    <div :class="{'error': $v.dob.$error}" class="form-control p-0">
                                                        <date-picker v-model.trim="$v.dob.$model" valueType="format" placeholder="Date of Birth (YYYY-MM-DD)" class="w-100"></date-picker>
                                                    </div>
                                                        <small class="mute error mt-1" v-if="$v.dob.$error">You must be more than 18</small>
                                                        
                                                </div>
                                            </div>
                                            <div class="col-sm-12 col-md-12">
                                                <div class="form-group mb-20">                               
                                                    <label for="username">BVN</label>
                                                    <input type="text" class="form-control" :class="{'error': $v.bvnNumber.$error}" v-model.trim="$v.bvnNumber.$model" placeholder="Enter BVN" maxlength="11">
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <OtpPanel action="user.bvn" @otpResponse="otpHandler" v-if="otpHandle.activate"/>
                                </div>
                                

                            </div>
                           <div class="content-center mt-30" v-if="showDone">
                                <a @click="verify" class="btn btn-primary btn-default btn-squared px-30 link text-white">Done</a>
                            </div>
                           <div class="content-center mt-30" v-if="bvnError.status == 'noerror'" @click="proceed">
                                <span class="btn btn-primary btn-default btn-squared px-30 link text-white">Continue</span>
                            </div>
                           <div class="content-center mt-30" v-if="bvnError.status == 'failed'" @click="showBVNForm">
                                <a @click="verify" class="btn btn-primary btn-default btn-squared px-30 link text-white">Back</a>
                            </div>
                            
                        </div>
                    </div>
                    <!-- End: error page -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { publicClient } from "@/plugins/restclient";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import OtpPanel from "@/components/OtpPanel";
export default {
    layout: 'plain',
    components:{
        DatePicker,
        OtpPanel,
    },
    data(){
        return{
            dob:'',
            bvnNumber:'',
            otpHandle:{
                activate: false
            },
            bvnError: {
                status:false,
                message: ''
            },
        }
    },
    computed:{
        showDone(){
            if(this.bvnError.status == 'noerror' || this.bvnError.status == 'failed' || this.otpHandle.activate == true){
                return false
            }
            return true
        }
    },
    methods:{
        otpHandler(otpResponse){
            if(otpResponse.status){
                this.verifyBVN(otpResponse)
            }
        },
        showBVNForm(){
            this.bvnError.status = false
            this.otpHandle.activate = false
        },
        proceed(){
            this.$store.dispatch('checkStatus')
        },
        verify(){
            this.$v.$touch()
            if(this.$v.$invalid){
                return
            }
            this.otpHandle.activate = true
        },
        verifyBVN(otpResponse) {
            const user = JSON.parse(localStorage.getItem('user'))
            const headers =  {
                    "X-Ulid": user.ulid,
                    "Authorization": `Bearer ${user.token}`
                }
            publicClient
            .post('/v1/engine/settings/verification/bvn',{
                olid: otpResponse.olid,
                number: this.bvnNumber,
                dob: this.dob
            },
            {
                headers:headers
            })
            .then(() => {
                this.bvnError.status = 'noerror'
                this.$store.commit('loading', false)
                this.$store.dispatch('quickLogin')
            })
            .catch((err) => {
                this.otpHandle.activate = false
                this.bvnError.status = 'failed'
                this.bvnError.message = err.response.data.message
                this.$store.commit('loading', false)
            })
        },
    },
    validations:{
        bvnNumber:{
            required,
            minLength: minLength(11),
            maxLength: maxLength(11)
        },
        dob:{
            required,
            notLessThanEighteen: (date) => {
                const dob = new Date(date)
                const today = new Date()
                const elapse = today - dob
                
                const age = Math.ceil(elapse/(365*24*60*60*1000))
                if(age < 18){
                    return false
                }
                return true
            }
        }
    }
    
}
</script>

<style>
.mx-input{
    border: solid 0px !important;
}
</style>