<template>
  <div class="contents" data-select2-id="14">
    <LoaderOverlay :active="loader.active" :fullpage="loader.fullpage" bgColor="#0000001f" zIndex="99999"></LoaderOverlay>
            <div class="container-fluid" data-select2-id="13">
                <div class="profile-content mb-50" data-select2-id="12">
                    <div class="row" data-select2-id="11">
                        <div class="col-lg-12">
                            <div class="breadcrumb-main">
                                <h4 class="text-capitalize breadcrumb-title">
                                    <span style="color: #D94F00; cursor: pointer;" @click="$router.go(-1)"><i class="las la-arrow-left fs-16"></i></span>
                                    Profile
                                    </h4>
                                <div class="breadcrumb-action justify-content-center flex-wrap">
                                   
                                    <!-- <div class="action-btn">
                                        <a href="" class="btn btn-default btn-squared btn-outline-primary ">
                                            <i class="la la-plus"></i> Approve persone.user </a>
                                          
                                    </div>
                                   
                                    <div class="action-btn">
                                        <a href="" class="btn btn-sm btn-primary btn-add">
                                            <i class="la la-times"></i> Disapprove </a>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                        <div class="cos-lg-3 col-md-4" data-select2-id="10">
                            <aside class="profile-sider" data-select2-id="9">
                                <!-- Profile Acoount -->
                                <div class="card mb-25">
                                    <div class="card-body text-center pt-sm-30 pb-sm-0  px-25 pb-0">
                                        <div class="account-profile">
                                            <div class="ap-img w-100 d-flex justify-content-center">
                                                <!-- Profile picture image-->
                                                <img class="ap-img__main rounded-circle mb-3  wh-120 d-flex bg-opacity-primary" src="/img/author/profile.png" alt="profile">
                                            </div>
                                            <div class="ap-nameAddress pb-3 pt-1">
                                                <h5 class="ap-nameAddress__title">{{ person.user.fname + ' '  + person.user.lname}}</h5>
                                                <p class="ap-nameAddress__subTitle fs-14 m-0">{{roleMap[person.user.role]}}</p>
                                                <span class="badge badge-round badge-success badge-lg rel-pos appbadge" v-if="person.user.verified">
                                                    Approved  <span class="badge-mark"><i class="las la-check"></i> </span>
                                                </span>
                                                <span class="badge badge-round badge-danger badge-lg rel-pos appbadge" v-if="!person.user.verified">
                                                    Unverified  <span class="badge-mark" style="background:#ff4d4f"><i class="las la-times"></i> </span>
                                                </span>
                                            </div>
                                            
                                        </div>
                                        <div class="card-footer mt-20 pt-20 pb-20 px-0">
                                            <!-- <div class="profile-overview d-flex justify-content-between flex-wrap">
                                                <div class="po-details">
                                                    <h6 class="po-details__title pb-1">₦ 0.00 </h6>
                                                    <span class="po-details__sTitle">Total Revenue</span>
                                                </div>
                                                <div class="po-details">
                                                    <h6 class="po-details__title pb-1">0</h6>
                                                    <span class="po-details__sTitle">Questions</span>
                                                </div>
                                                
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                                <!-- Profile Acoount End -->
                                <!-- Profile User Bio -->

                                <!-- Profile User Bio End -->
                            </aside>
                        </div>
                       
                        <!-- Data Tables Starts and Certifications -->
                        <div class="col">
                            <!-- Tab Menu -->
                            <div class="ap-tab ap-tab-header">
                                <div class="ap-tab-wrapper">
                                    <ul class="nav px-25 ap-tab-main" id="ap-tab" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="ap-overview-tab" data-toggle="pill" href="#ap-overview" role="tab" aria-controls="ap-overview" aria-selected="true">Qualifications</a>
                                        </li>
                                       <!-- <li class="nav-item">
                                            <a class="nav-link" id="activity-tab" data-toggle="pill" href="#activity" role="tab" aria-controls="activity" aria-selected="false">Activity</a>
                                        </li>-->
                                    </ul>
                                </div>
                            </div>
                            <!-- Tab Menu End -->
                            <div class="tab-content mt-25" id="ap-tabContent">
                                <div class="tab-pane fade active show" id="ap-overview" role="tabpanel" aria-labelledby="ap-overview-tab">
                                    <div class="ap-content-wrapper">
                                        <div class="row">
                                            <div class="col-lg-12 mb-25">
                                                <!-- Card 1 -->
                                               <div class="card">

                                                <div class="card-body pt-md-1 pt-0">

                                                    <div class="user-bio border-bottom">
                                                        <div class="card-header border-bottom-0 pt-sm-30 pb-sm-0  px-md-25 px-3">
                                                            <div class="profile-header-title">
                                                                User Bio
                                                            </div>
                                                        </div>
                                                        <div class="card-body pt-md-1 pt-0">
                                                            <!-- <div class="user-bio__content">
                                                                <p class="m-0">None</p>
                                                            </div> -->
                                                            <span class="small mute" v-if="!person.user.biography">no bio</span>
                                                            <p>{{person.user.biography}}</p>
                                                        </div>
                                                    </div>

                                                    <div class="user-info border-bottom">
                                                        <div class="card-header border-bottom-0 pt-sm-25 pb-sm-0  px-md-25 px-3">
                                                            <div class="profile-header-title">
                                                                Contact info
                                                            </div>
                                                        </div>
                                                        <div class="card-body pt-md-1 pt-0">
                                                            <div class="user-content-info">
                                                                <p class="user-content-info__item">
                                                                    <a :href="`tel:+${person.user.mobile}`"><i class="las la-envelope mr-2"></i>{{person.user.mobile}}</a>
                                                                </p>
                                                                <p class="user-content-info__item">
                                                                    <a :href="`mailto:${person.user.email}`"><i class="las la-phone mr-2"></i>{{person.user.email}}</a>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="user-skils border-bottom" v-if="person.user.role == 1">
                                                        <div class="card-header border-bottom-0 pt-sm-25 pb-sm-0  px-md-25 px-3">
                                                            <div class="profile-header-title">
                                                                Interest
                                                            </div>
                                                        </div>
                                                        <div class="card-body pt-md-1 pt-0">
                                                            <ul class="user-skils-parent">
                                                                <!-- <li class="user-skils-parent__item" v-for="(i, k) in person.user.custome.interest" :key="k">
                                                                    <a href="#"></a>
                                                                </li> -->
                                                                <!-- <li class="user-skils-parent__item">
                                                                    <a href="#">None</a>
                                                                </li> -->
                                                                <span class="small mute">no interest added</span>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    

                                                   
                                                </div>
                                                   
                                               </div>
                                                <!-- Card 1 End -->
                                            </div>
                                         
                                        </div>
                                    </div>
                                </div>                               
                            </div>
                        </div>
                        <!-- Data Tables and Certifications Ends -->
                        
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import { apiClient } from '../../plugins/restclient';
import { getTimestamp } from "@/utilities";
import { roleMap, roles } from "@/utilities/constant";
import LoaderOverlay from "@/components/LoaderOverlay";
export default {
  components:{
    LoaderOverlay
  },
    data(){
        return{
            person:{
              user:{
                  fname:''
              }
            },
            roles,
            roleMap,
            loader:{
              active:false,
              fullpage: true
            },
            
        }
    },
    created(){
      
        this.loader.active = true
        let ulid = this.$route.params.ulid
        if(!ulid){
            ulid = this.$store.state.user.ulid
        }

        apiClient.get(`/v1/office/operation/users/pull/${this.$route.params.ulid}`, {
            headers:{
                "X-Timestamp": getTimestamp(),
                "X-Ulid": `${this.$store.state.user.ulid}`,
            }
        })
        .then(res =>{
            this.person = res.data.info
            this.loader.active = false
            
        })
        .catch(() => {
          this.loader.active = false
          })
    },
    
      
}
</script>
<style>

</style>