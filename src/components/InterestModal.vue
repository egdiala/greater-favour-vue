<template>
    <div class="modal-basic modal fade show" id="interestModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-info" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title">{{title}}</h6>
                    <button type="button" ref="closeModal" class="close" data-dismiss="modal" aria-label="Close">
                        <i class="las la-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="modal-info-body">
                        <div class="modal-info-text text-center">

                            <h4> <i class="las la-book"></i> Hi <span class="apptxt"> {{`${person.user.fname} ${person.user.lname}`}} </span> </h4>
                            <h5 class="mb-20"> Please select your subject of interest </h5>
                            <p class="mb-20"> <span class="apptxt">{{selectedInterest.length}}</span> Selected </p>

                            <div class="grid grid-h minh-30 py-5 scrollbar" id="style-default">
                                <label class="cards interest" v-for="theme in filteredThemes" :key="theme.thlid">
                                    <input class="card__input interest" type="checkbox" :value="theme.thlid" :id="theme.thlid"
                                        @click="selectInterest(theme)" />
                                    <div class="card__body">
                                        <div class="card__body-cover"><img class="card__body-cover-image"
                                                :src="theme.image ? envVariables.VUE_APP_STORAGE_BUCKET + theme.image : '/img/custom/subjects/placeholder.png'" /><span
                                                class="card__body-cover-checkbox">
                                            <svg class="card__body-cover-checkbox--svg" viewBox="0 0 12 10">
                                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                            </svg></span>
                                        </div>
                                        <header class="card__body-header">
                                            <h2 class="card__body-header-title">{{theme.name}}</h2>
                                        </header>
                                    </div>
                                </label>
                            </div>

                            <div class="row btn-auto mx-auto">
                                <span @click="updateInterest">
                                    <spinner-button label="Done" :loading="isLoading" :disabled="selectedInterest.length == 0" style="width:180px"  />
                                </span>
                            </div>
                        </div>
                    </div> <br>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { apiClient } from '@/plugins/restclient';
import { getTimestamp } from "@/utilities";
import SpinnerButton from './SpinnerButton.vue';
export default {
  components: { SpinnerButton },
    data(){
        return{
            selectedInterest: [],
            isLoading: false,
            title: ''
        }
    },
    props:['person', 'action', 'userInterest'],
    watch:{
        action(newval){
            console.log(newval)
        }
    },
    computed:{
        ...mapState(['themes']),
        filteredThemes(){
            if(this.action == 'bulk'){
                const userInterestThemeIdList = this.userInterest.map(i => i.thlid)
                return this.themes.filter(theme => userInterestThemeIdList.indexOf(theme.thlid) == -1)
            } else{
                return this.userInterest.filter(i => i.status != 1)
            }
            
        }
    },
    methods:{
        open(){
            this.action == 'bulk' ? this.title = 'Add Interest' : this.title = 'Remove Interest'
            this.selectedInterest = []
            Window.openVueBsModal('interestModal')
        },
        close(){
            this.$refs.closeModal.click()
        },
         selectInterest(theme){
            let key = null
            if(this.action == 'bulk'){
                key = 'thlid'
            }else{
                key = 'inlid'
            }
            if(this.selectedInterest.indexOf(theme[key]) >= 0){
                this.selectedInterest.splice(this.selectedInterest.indexOf(theme[key]), 1)
            }else{
                this.selectedInterest.push(theme[key])
            }
        },
         updateInterest(){
            
            let data = null
            let method = null 
            if(this.action == 'bulk'){
                data = {
                    themes: this.selectedInterest
                }
                method = 'post'
            }else{
                data = {
                    interests: this.selectedInterest
                }
                method = 'patch'
            }
           
            this.isLoading = true
            apiClient[method](`/v1/engine/settings/interest/${this.action}`, data,{
                headers:{
                    "X-Timestamp": getTimestamp(),
                    "X-Ulid": `${this.$store.state.user.ulid}`,
                }
            })
            .then(res =>{
                this.isLoading = false
                this.close()
                this.selectedInterest = []
                this.$emit('interestUpdated', {type:'success', message: res.data.message} )

            })
            .catch((err)=>{
                this.isLoading = false
                this.close()
                this.selectedInterest = []
                this.$emit('interestUpdated', {type: 'error', message: err.response.data.message} )
                
            })
        },
    }
}
</script>

<style>
.minh-30{
    min-height: 30vh;
}
</style>