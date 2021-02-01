<template>
  <div class="contents">
  <div class="container-fluid">
    <div class="profile-content mb-50">
      <div class="row">
        <div class="col-lg-12 mb-2 sticky">
          <div class="breadcrumb-main p-3" style="background-color: #f4f5f7 !important;">
            <h4 class="text-capitalize breadcrumb-title">{{$route.params.user}}
              <ul class="atbd-breadcrumb nav">
                  <li class="atbd-breadcrumb__item">
                      <router-link to="/">
                          <span class="la la-home"></span>
                      </router-link>
                      <span class="breadcrumb__seperator">
                          <span class="la la-slash bread-item"></span>
                      </span>
                  </li>
                  <li class="atbd-breadcrumb__item">
                      <span class="bread-item">Users</span>
                  </li>
              </ul>
            </h4>
            <div class="breadcrumb-action justify-content-center flex-wrap">
            </div>
          </div>
        </div>
        <!-- Data Tables and Certifications Ends -->
        <div class="col-12" v-if="noPermission">
          <div class="card card-default card-md mb-4 no-content text-center">
              <div class="card-body">
                  <img src="@/assets/img/custom/puppy-no-content.png" width="200" />
                  <br />
                  <h3>Oops</h3>
                  <h6>You dont have permission</h6>
              </div>
          </div>
        </div>
        <div class="container-fluid" v-else>
          <div class="row">
            <div class="col-lg-12">
              <div v-if="userNotFound == true">
                <no-content/>
              </div>
              <div v-if="userNotFound == false"
                class="userDatatable orderDatatable sellerDatatable global-shadow border mb-30 py-30 px-sm-30 px-20 bg-white radius-xl w-100">
                <div class="project-top-wrapper d-flex justify-content-between flex-wrap mb-25 mt-n10" >
                  <div class="d-flex align-items-center flex-wrap justify-content-center">
                    <div class="project-search mt-0 order-search  global-shadow">
                      <form action="" class="order-search__form" @submit.prevent="findUser">
                        <span data-feather="search"></span>
                        <input class="form-control mr-sm-2 border-0 box-shadow-none" type="search"  v-model="username"
                          placeholder="Search by username" aria-label="Search"> 
                      </form>
                    </div>
                    <button class="btn btn-primary ml-3 rounded">Search</button>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table mb-0 table-borderless border-0">
                    <thead>
                      <tr class="userDatatable-header">
                        <th scope="col">
                          <span class="userDatatable-title">Name</span>
                        </th>
                        <th scope="col">
                          <span class="userDatatable-title">Email</span>
                        </th>
                        <th scope="col">
                          <span class="userDatatable-title">Phone Number</span>
                        </th>
                        <th scope="col">
                          <span class="userDatatable-title"> Registered On</span>
                        </th>
                        <!-- <th scope="col" class="text-center">
                          <span class="userDatatable-title text-center"> Overall performances </span>
                        </th> -->
                        <!-- <th scope="col">
                          <span class="userDatatable-title float-right">Actions</span>
                        </th> -->
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="user in users" :key="user.ulid" class="t-row">
                        <td>
                          <div class="d-flex align-items-center">

                            <div class="orderDatatable-title">
                              <p class="d-block mb-0">
                                <router-link :to="{name: 'users-profile', params:{ulid: user.ulid}}"> {{ `${user.fname} ${user.lname}`}} </router-link>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="orderDatatable-title">
                            {{user.email}}
                          </div>
                        </td>
                        <td>
                          <div class="orderDatatable-title">
                            {{user.mobile}}
                          </div>
                        </td>
                        <td>
                          <div class="orderDatatable-title">
                            {{user.added | date}}
                          </div>
                        </td>
                        <!-- <td>
                          <div class="orderDatatable-title text-center">
                            <span class="badge badge-round badge-danger badge-lg m-auto">
                              25%
                            </span>
                          </div>
                        </td> -->
                        <!-- <td>
                          <ul class="orderDatatable_actions mb-0 d-flex flex-wrap float-right">
                            <li>
                              <a href="#" class="edit">
                                <span></span>
                              </a>
                            </li>
                            <li>
                              <a href="#" class="remove">
                                <span></span>
                              </a>
                            </li>
                          </ul>
                        </td> -->
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
            </div>
          </div>
        </div>
     
      </div>
      <div :class="{'no-display': userNotFound}">
        <paginate
          :hide-prev-next="true"
          :page-count="totalPage"
          :click-handler="loadNext"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'atbd-pagination d-flex justify-content-end py-3'"
          :page-class="'atbd-pagination__item'"
          :page-link-class="'atbd-pagination__link'"
          :prev-link-class="'atbd-pagination__link pagination-control'"
          :next-link-class="'atbd-pagination__link pagination-control'"
        >
      </paginate>
      </div>
         
    </div>
    <LoaderOverlay :active="loader.active" :fullpage="loader.fullpage" bgColor="#0000001f" zIndex="99999" style="z-index:99999"></LoaderOverlay>
  </div>
</div>
</template>

<script>
import Paginate from "vuejs-paginate";
import { apiClient } from '@/plugins/restclient';
import { getTimestamp } from "@/utilities";

import LoaderOverlay from "@/components/LoaderOverlay";
import NoContent from '../../../components/NoContent.vue';

export default {
    components:{
      Paginate,
      LoaderOverlay,
      NoContent
    },
    data(){
        return{
            size: 15,
            users: [],
            recordSet: '',
            currentPage:0,
            totalPage: 0,
            xPage:'',
            loader:{
              active:false,
              fullpage: true
            },
            username:'',
            userNotFound: true,
            noPermission: false
        }
    },
    created(){
       this.getUsers(1)
    },
    watch:{
      // username(newval){
      //   if(!newval){
      //     this.users = this.recordSet
      //     console.log
      //     this.userNotFound = false
      //   }
      // },
      
      '$route' () {
          this.getUsers(1)
          this.userNotFound = false
        }
    },
    methods:{
      loadNext(num) {       
        this.getUsers(num);
        return;
      },
      findUser(){
        
        if(!this.username.trim().length) return

        this.$store.commit('loader',true)
        apiClient.get(`/v1/office/operation/users/user/${this.username}`,{
           headers:{
                  "X-Timestamp": getTimestamp(),
                  "X-Ulid": `${this.$store.state.user.ulid}`,
              }
        })
        .then(res =>{
          this.users = [res.data.info.user]
          this.$store.commit('loader', false)
        })
        .catch(() => {
          this.$store.commit('loader', false)
          this.userNotFound = true
          
        })
      },
      getUsers(page) {
        
        this.$store.commit('loader', true)
        const params = this.$route.params.user
        let role = ''
        if(params == 'students'){
          role = 1
        }else{
          role = 2
        }
        console.log('role', role)
        
        apiClient.get(`/v1/office/operation/users/fetch/role/${role}?offset=${(page-1)*this.size}&size=${this.size}`, {
              headers:{
                  "X-Timestamp": getTimestamp(),
                  "X-Ulid": `${this.$store.state.user.ulid}`,
              }
          })
          .then(res =>{
            
            this.currentPage = Number(page);
            this.xPage = "";
            this.recordSet = res.data.data
            this.users = res.data.data
            console.log(this.users, 'users')
            if(this.users.length == 0) {
              this.userNotFound = true
            }
            this.totalPage = Math.floor(res.data.info.total / this.size);
            this.$store.commit('loader', false)
          })
          .catch(() => {
            this.$store.commit('loader', false)
            this.noPermission = true
            
          });
      },
    },
    beforeRouteEnter(to, from, next){
      const pages = ['students', 'guardians']
      if(pages.indexOf(to.params.user)<0){
        return
      }
      next()
    },
}
</script>

<style>
.rounded{
  border-radius: 30px !important;
  padding: 0px 38px;
}
.t-row{
  height: 50px;
}
.swdt {
    width: 65%;
}
.search-icon{
  position: relative;
    right: -35px;

}
.search-input{
  padding-left: 35px;
}
.bread-item:hover {
    color: #9299b8 !important;
}
</style>