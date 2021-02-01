<template>
    <div>
        <span ref="onebyone">foff</span>
        <Modal ref="interestModal" :config="interestModalConfig">
            <div>
                <h4 class="text-center"> <i class="las la-book"></i> Hi <span class="apptxt">
                        {{`${person.user.fname} ${person.user.lname}`}}
                    </span> </h4>
                <h5 class="mb-20 text-center"> Please select your
                    subject of interest </h5>
                <p class="mb-20 text-center"> <span class="apptxt">{{selectedInterest.length}}</span> Selected
                </p>
                <div class="grid grid-h scrollbar" id="style-default">
                    <label class="cards interest" v-for="theme in filteredThemes" :key="theme.thlid">
                        <input class="card__input interest" type="checkbox" :value="theme.thlid" :id="theme.thlid"
                            @click="selectInterest(theme.thlid)" />
                        <div class="card__body">
                            <div class="card__body-cover"><img class="card__body-cover-image"
                                    src="/img/custom/subjects/placeholder.png" /><span
                                    class="card__body-cover-checkbox">
                                    <svg class="card__body-cover-checkbox--svg" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg></span></div>
                            <header class="card__body-header">
                                <h2 class="card__body-header-title">{{theme.name}}</h2>
                            </header>
                        </div>
                    </label>
                </div>
                <div class="row btn-auto mx-auto">
                    <!-- <button class="btn btn-primary btn-default btn-squared no-marg-right ma-auto">Done
                </button> -->
                    <span @click="updateInterest">
                        <spinner-button label="Done" style="width:180px" />
                    </span>
                </div>
            </div>
        </Modal>
        <ResponeModal ref="resModal" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Modal from "./Modal";
import ResponeModal from './ResponeModal';
import { apiClient } from '@/plugins/restclient';
import { getTimestamp } from "@/utilities";
export default {
  components: { ResponeModal, Modal },
    data(){
        return{
            selectedInterest: [],
            interestModalConfig: {
                name: 'interestModal',
                header: true,
                type: 1,
                class: 'modal-lg',
                title: 'Interest',
                subTitle: '',
                icon:{
                    fg: '',
                    bg: ''
                }
            },
        }
    },
    props:['person', 'sieve'],
    computed:{
        ...mapState(['themes']),
        filteredThemes(){
            return this.themes.filter(theme => this.sieve.indexOf(theme.thlid) == -1)
        }
    },
    methods:{
        open(){
            console.log(this.$refs, 'obeobe')
            
            this.$refs.interestModal.open()
        },
        selectInterest(thlid){
            if(this.selectedInterest.indexOf(thlid) >= 0){
                this.selectedInterest.splice(this.selectedInterest.indexOf(thlid), 1)
            }else{
                this.selectedInterest.push(thlid)
            }
        },
        updateInterest(){
            
            this.isLoading = true
            apiClient.post('/v1/engine/settings/interest/add', {
                themes: this.selectedInterest
            },{
                headers:{
                    "X-Timestamp": getTimestamp(),
                    "X-Ulid": `${this.$store.state.user.ulid}`,
                }
            })
            .then(res =>{
                this.isLoading = false
                this.$refs.interestModal.close()
                setTimeout(()=>{
                    this.$refs.resModal.open({type: 'success', message: res.data.message})
                })
            })
            .catch(err=>{
                this.isLoading = false
                this.$refs.interestModal.close()
                setTimeout(()=>{
                    this.$refs.resModal.open({type: 'error', message: err.response.data.message})
                })
            })
        },
    }
}
</script>

<style>

</style>