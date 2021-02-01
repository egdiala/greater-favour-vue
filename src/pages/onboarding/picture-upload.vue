<template>
  <main class="main-content">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-12">
                    <!-- Start: error page -->
                    <div class="min-vh-100 content-center">
                        <div class="error-page text-center">
                            <img src="/img/custom/greater-favour.png" class="mb-10" width="200"> <br>
                            <h5 class="fw-500">Welcome <!--<span class="uname">Duran Laicon</span>--> <br> <small> Please select a recent picture of yourself by tapping <br>the camera icon </small> </h5> <br>
                            <div class="card mb-25">
                                <div class="card-body text-center p-0 pt-4">
                                    <div class="account-profile border-bottom pt-25 px-25 pb-0 flex-column d-flex align-items-center ">
                                        <div class="ap-img mb-20 pro_img_wrapper">
                                            <input  type="file" name="image" id="image" accept=".jpg, png" class="d-none" @change="fileChange">
                                            <label for="image">
                                                <!-- Profile picture image-->
                                                <span
                                                    class="rounded-circle ap-img__main rounded-circle wh-120 bg-pos"
                                                    :style="{
                                                    backgroundImage: `url(${avatar})`,
                                                    }"
                                                >
                                                </span>
                                                <!-- <img class="ap-img__main rounded-circle wh-120" :src="avatar ? avatar.replace('block://', envVariables.VUE_APP_STORAGE_BUCKET) :'/img/custom/avatar-3.png'" alt="profile"> -->
                                                <span class="cross" id="remove_pro_pic">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-camera"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                                                </span>
                                            </label>
                                        </div>
                                        <div class="ap-nameAddress pb-3">
                                            <h5 class="ap-nameAddress__title">{{`${user.fname} ${user.lname}`}}</h5>
                                            <p class="ap-nameAddress__subTitle fs-14 m-0 mb-5">{{ user.email }}</p>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            
                            <div class="content-center mt-30">
                                <button @click="proceed"  class="btn btn-primary btn-default btn-squared px-30 link text-white" :disabled="disabled">Proceed to Dashboard</button>
                            </div>
                        </div>
                    </div>
                    <!-- End: error page -->
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { apiClient } from '@/plugins/restclient';
import { getTimestamp } from "@/utilities";
import { mapState } from 'vuex';
export default {
    layout:'plain',
    data(){
        return{
            avatar: '/img/custom/avatar-3.png',
            disabled: true,
            user: {}
        }
    },
    computed:{
        ...mapState(['user'])
    },
    created(){
        this.user = JSON.parse(localStorage.getItem('user'))
    },
    methods:{
        fileChange() {
            let fg = new FileReader();
            fg.readAsDataURL(document.getElementById("image").files[0]);

            setTimeout(() => {
                this.updateAvatar(fg.result);
            }, 1000);
        },
        updateAvatar(data){
            this.$store.commit('loader', true)
            apiClient.patch('/v1/engine/settings/profile/avatar' , {data: data},{
                headers:{
                    "X-Timestamp": getTimestamp(),
                    "X-Ulid": `${this.$store.state.user.ulid}`,
                }
            })
            .then(res =>{
                this.avatar = res.data.info.src.replace('block://', this.envVariables.VUE_APP_STORAGE_BUCKET) 
                this.disabled = false;
                this.$store.commit('loader', false)
            })
            .catch(() => {
                const toastConfig = {
                    message: 'Upload failed. Please try again',
                    type: 'danger',
                    timeout: 15000
                }
                document.getElementById('image').value = ''

                this.$store.commit('ctoast', toastConfig)
                this.$store.commit('loader', false)
            })
        },
        proceed(){
            this.$store.dispatch('checkStatus')
        }
    }

}
</script>

<style>

</style>