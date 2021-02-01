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
                                    Officer's profile
                                    </h4>
                                <div class="breadcrumb-action justify-content-center flex-wrap">
                                   
                                    <!-- <div class="action-btn">
                                        <a href="" class="btn btn-default btn-squared btn-outline-primary ">
                                            <i class="la la-plus"></i> Approve Officer </a>
                                          
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
                                                <img class="ap-img__main rounded-circle mb-3  wh-120 d-flex bg-opacity-primary" :src="`/img/custom/avatar-` + getAvatar(officer.fname)" alt="profile">
                                            </div>
                                            <div class="ap-nameAddress pb-3 pt-1">
                                                <h5 class="ap-nameAddress__title">{{ officer.fname + ' '  + officer.lname}}</h5>
                                                <p class="ap-nameAddress__subTitle fs-14 m-0">{{roleMap[officer.role]}}</p>
                                                <span class="badge badge-round badge-success badge-lg rel-pos appbadge" v-if="officer.verified">
                                                    Approved  <span class="badge-mark"><i class="las la-check"></i> </span>
                                                </span>
                                                <span class="badge badge-round badge-danger badge-lg rel-pos appbadge" v-if="!officer.verified">
                                                    Unverified  <span class="badge-mark" style="background:#ff4d4f"><i class="las la-times"></i> </span>
                                                </span>
                                            </div>
                                            
                                        </div>
                                        <div class="card-footer mt-20 pt-20 pb-20 px-0">
                                            <div class="profile-overview d-flex justify-content-between flex-wrap">
                                                <div class="po-details">
                                                    <h6 class="po-details__title pb-1">{{ officer.available}}</h6>
                                                    <span class="po-details__sTitle">Total Revenue</span>
                                                </div>
                                                <div class="po-details">
                                                    <h6 class="po-details__title pb-1">{{officer.questions}}</h6>
                                                    <span class="po-details__sTitle">Questions</span>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Profile Acoount End -->
                                <!-- Profile User Bio -->
                                <div class="card mb-25" data-select2-id="8">
                                    <div class="db-social border-bottom" data-select2-id="7">
                                        <div class="card-header border-bottom-0 pt-sm-25 pb-sm-0  px-md-25 px-3">
                                            <div class="profile-header-title">
                                                Set Role
                                            </div>
                                        </div>
                                        <div class="card-body pt-md-1 pt-0" data-select2-id="6">
                                            <div class="form-group" data-select2-id="6">
                                                <v-select 
                                                v-model="selectedRole"
                                                item-text="label"
                                                item-value="code" 
                                                
                                                :options="roles"></v-select>
                                            </div>
                                            <div class="action-btn"><button @click="updateOfficerRole" class="btn btn-default btn-squared btn-outline-primary btn-block"><i class="la la-plus"></i> Assign Role </button></div>
                                            
                                        </div>
                                    </div>
                                </div>



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
                                                            <div class="user-bio__content">
                                                                <span class="small mute" v-if="officer.biography">no interest added</span>
                                                                <p class="m-0" v-else>{{officer.biography}}</p>
                                                                
                                                            </div>
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
                                                                    <a :href="`tel:+${officer.mobile}`"><i class="las la-envelope mr-2"></i>{{officer.mobile}}</a>
                                                                </p>
                                                                <p class="user-content-info__item">
                                                                    <a :href="`mailto:${officer.email}`"><i class="las la-phone mr-2"></i>{{officer.email}}</a>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="user-skils border-bottom">
                                                        <div class="card-header border-bottom-0 pt-sm-25 pb-sm-0  px-md-25 px-3">
                                                            <div class="profile-header-title">
                                                                Interest
                                                            </div>
                                                        </div>
                                                        <div class="card-body pt-md-1 pt-0">
                                                            <ul class="user-skils-parent">
                                                                <li>None</li>
                                                                <!-- <li class="user-skils-parent__item" v-for="(i, k) in officer.custome.interest" :key="k">
                                                                    <a href="#"></a>
                                                                </li> -->
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div class="user-skils border-bottom">
                                                        <div class="card-header border-bottom-0 pt-sm-25 pb-sm-0  px-md-25 px-3">
                                                            <div class="profile-header-title">
                                                                Certificates
                                                            </div>
                                                        </div>
                                                        <div class="card-body pt-md-1 pt-0">
                                                            <div v-if="!getDocuments.length" >None</div>
                                                            <ul class="user-skils-parent" v-else>
                                                                <li class="user-skils-parent__item" v-for="(doc,k ) in getDocuments" :key="k">
                                                                    <a href="#!" @click="previewDocument(officer.documents[doc].src)"><i class="la la-file-alt"></i> &nbsp; {{officer.documents[doc].name}}</a>
                                                                </li>
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
            <DocumentPreview :filePath="docPath"/>
        </div>
</template>
<script>
import { apiClient } from '../../plugins/restclient';
import { getTimestamp } from "@/utilities";
import { roleMap, roles } from "@/utilities/constant";
import {getNumberAlias } from "@/utilities";
import LoaderOverlay from "@/components/LoaderOverlay";
import DocumentPreview from "@/components/DocumentPreview";
export default {
  components:{
    LoaderOverlay,
    DocumentPreview
  },
    data(){
        return{
            officer:{
                available:{
                    credit:98
                }
            },
            roles,
            roleMap,
            loader:{
              active:false,
              fullpage: true
            },
            selectedRole:'',
            docPath:''
        }
    },
    watch:{
        // docPath(newval, oldval){
        //     console.log(newval, oldval)
        // }
    },
    computed:{
      getRoleAlias(){
        return this.roles.filter(r => r.code == this.officer.role)[0]
      },
      getDocuments(){
        //   console.log(this.officer.documents, 'listing of doc')
          const documentList = Object.keys(this.officer.documents)
          return documentList

      },
    },
    created(){
      this.officer = this.$route.params.officer
      this.selectedRole = {label: this.roleMap[this.officer.role], code: this.officer.role}
      
        this.loader.active = true
        apiClient.get(`/v1/office/operation/users/pull/${this.$route.params.officer.ulid}`, {
            headers:{
                "X-Timestamp": getTimestamp(),
                "X-Ulid": `${this.$store.state.user.ulid}`,
            }
        })
        .then(res =>{
            const {available, documents, questions, user} = res.data.info
            this.officer = {
                available,
                documents,
                questions,
                ...user
            
            }
            // console.log(this.officer, 'credit jjjjjkkkkkkl')
            
            this.loader.active = false
            
        })
        .catch(() => {
          this.loader.active = false
          })
    },
    methods:{
        previewDocument(path){
            this.docPath = ''
            setTimeout(() =>{

                this.docPath = path
            },1000)
        },
      
      getAvatar(name){
        // console.log(getNumberAlias(name),name)
        return getNumberAlias(name) + '.png'
      },
      setRole(selection){
        this.selectedRole = selection.code
      },
      updateOfficerRole(){
        this.loader.active = true
        apiClient.patch('/v1/office/operation/users/role', {
          ulid: this.officer.ulid,
          role: this.selectedRole.code,
        },
        {
          headers:{
              "X-Timestamp": getTimestamp(),
              "X-Ulid": `${this.$store.state.user.ulid}`,
          }
        })
        .then(() =>{
          this.loader.active = false
          this.officer.role = this.selectedRole.code
        })
        .catch(() => {
          this.loader.active = false
        })
      }
    },
    async beforeRouteEnter(to, from, next){
      if(from.path == '/'){
        next({name: 'officers-manage'})
        return
      }
      

      next()
    }
}
</script>
<style>

</style>