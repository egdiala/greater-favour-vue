<template>
  <div class="main-content">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <!-- Start: error page -->
                    <div class="min-vh-100 content-center  multi_step_form">
                        <div class="error-page text-center">
                            <img src="/img/custom/greater-favour.png" class="mb-10 mt-50" width="200"> <br>
                            <h5 class="fw-500">Interest <br> <small> Application</small> </h5> <br>
                            <p>{{selectedInterest.length}} selected</p>
                            <div class="card mb-25">
                                
                                <div v-if="false" class="mt-5">
                                    <div class="text-center my-5">
                                        <span style="overflow:hidden; display:inline-block">
                                            <img src="@/assets/img/checkmark.gif" width="100" alt="failed-icon">
                                        </span>
                                        
                                    </div>	
                                    <div class="text-center">
                                        <h2 class="text-danger">Yeah!</h2>
                                        <p class="mt-4 mb-50">Success</p>
                                    </div>
                                </div>
                                
                                <div>
                                    <div class="card-body mt-20 p-20">
                                      <div class="grid grid-h2 container-h scrollbar" id="style-default">
                                        <label class="cards cardb p-2" v-for="(theme, k) in themes" :key="k">
                                          <input class="card__input interest" type="checkbox" :value="theme.thlid" :id="theme.thlid"
                                        @click="selectInterest(theme)" />
                                          <div class="card__body">
                                            <div class="card__body-cover"><img class="card__body-cover-image" :src="theme.image ? envVariables.VUE_APP_STORAGE_BUCKET + theme.image :'/img/custom/subjects/placeholder.png'"><span class="card__body-cover-checkbox d-flex justify-content-center align-items-center"> 
                                                <svg class="card__body-cover-checkbox--svg m-0" viewBox="0 0 12 10">
                                                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                                </svg></span></div>
                                            <header class="card__body-header">
                                              <h2 class="card__body-header-title">{{theme.name}}</h2>
                                            </header>
                                          </div>
                                        </label>
                                      </div>
                                        <div class="d-flex justify-content-center">
                                           <div class="mt-50 mb-25">
                                                <strong>Need help? Check our help </strong> 
                                                <a href="/help#onboarding-interest">section</a>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                

                            </div>
                           <div class="content-center mt-30">
                             <span @click="updateInterest">
                               <spinner-button label="Continue" :loading="isLoading" :disabled="selectedInterest.length == 0"/>
                             </span>
                                
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
import { apiClient } from '@/plugins/restclient';
import { getTimestamp } from "@/utilities";
import { mapState } from 'vuex'
import SpinnerButton from '../../components/SpinnerButton.vue';
export default {
  components: { SpinnerButton },
  layout:'plain',
  data(){
    return{
      selectedInterest:[],
      isLoading: false
    }
  },
  computed:{
    ...mapState(['themes'])
  },
  methods:{
      updateInterest(){
        if(this.selectedInterest.length <1){
          return
        }
        this.isLoading = true
        const data = {
            themes: this.selectedInterest
        }
        const user = JSON.parse(localStorage.getItem('user'))
        apiClient.post(`/v1/engine/settings/interest/bulk`, data,{
            headers:{
                "X-Timestamp": getTimestamp(),
                "X-Ulid": `${user.ulid}`,
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(() =>{
            this.isLoading = false
            this.$router.push({name: 'onboarding-picture-upload'})
        })
        .catch(()=>{
            this.isLoading = false
        })
    },
    selectInterest(theme){
      const key = theme.thlid

        if(this.selectedInterest.indexOf(key) >= 0){
            this.selectedInterest.splice(this.selectedInterest.indexOf(key), 1)
        }else{
            this.selectedInterest.push(key)
        }
    },
  },
}
</script>

<style>
.container-h{
  height: 65vh;
}
</style>