<template>
  <div class="contents">
    <div class="container-fluid" style="position: relative">
      <div class="row">
        <div class="col-12">
          <div class="contact-breadcrumb">
            <div class="breadcrumb-main add-contact justify-content-sm-between ">
              <div class=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                <div class="d-flex align-items-center add-contact__title justify-content-center">
                  <h4 class="text-capitalize breadcrumb-title">Officers
                      <ul class="atbd-breadcrumb nav">
                          <li class="atbd-breadcrumb__item">
                              <router-link to="/">
                                  <span class="la la-home"></span>
                              </router-link>
                              <span class="breadcrumb__seperator">
                                  <span class="la la-slash"></span>
                              </span>
                          </li>
                          <li class="atbd-breadcrumb__item">
                              <span class="bread-item" style="color: #9299b8;">Operations</span>
                              <span class="breadcrumb__seperator">
                                  <span class="la la-slash"></span>
                              </span>
                          </li>
                          <li class="atbd-breadcrumb__item">
                              <span class="bread-item">Officers</span>
                          </li>
                      </ul>
                  </h4>
                  <div class="d-flex align-items-center flex-wrap justify-content-center">
                    <div class="project-search mt-0 order-search  global-shadow">
                      <form action="" @submit.prevent="findOfficer" class="order-search__form ml-3 bg-white"><span data-feather="search"></span>
                      <input type="search" v-model="username" @keypress.enter="findOfficer"
                          placeholder="Search by username" aria-label="Search"
                          class="form-control mr-sm-2 border-0 box-shadow-none"></form>
                    </div>
                    <button class="btn btn-primary ml-3 rounded" @click="findOfficer">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- ends: contact-breadcrumb -->
        </div>
      </div>

      <div class="col-12" v-if="userNotFound">
        <div class="card card-default card-md mb-4 no-content text-center">
          <div class="card-body">
            <img src="@/assets/img/custom/puppy-no-content.png" width="200" />
            <br />
            <h3>Oops</h3>
            <h6>No content here ...</h6>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row contact-card-group">
          <div class="col-xl-3 mb-25" v-for="officer in officers" :key="officer.ulid">
            <router-link :to="{name: 'officers-profile', params: {officer}}">
              <div class="card contact-card">
                <div class="card-body text-center pt-30 px-25 pb-0">
                  <div class="contact-profile-card text-center">
                    <div class="ap-img w-100 d-flex justify-content-center">
                      <!-- Profile picture image-->
                      
                      <span class="ap-img__main rounded-circle mb-3  wh-120 d-flex bg-opacity-primary" :style="{backgroundImage: `url(/img/custom/avatar-${getAvatar(officer)})`}" style="background-size:cover"> </span>
                    </div>
                    <div class="cp-info">

                      <h6 class="cp-info__title mb-0">{{ officer.fname + ' ' + officer.lname}}</h6>

                      <span class="mute small">@{{officer.username}}</span><br>
                      <span class="badge badge-round badge-danger badge-lg" style="text-transform:capitalize">
                        {{roleMap[officer.role]}}
                      </span>
                    </div>
                  </div>
                  <div class="card-footer mt-20 pt-20 pb-20 px-0">
                    <ul class="c-info-list text-center d-flex flex-column align-items-center">
                      <li class="c-info-list__item d-flex align-items-center">
                        <div class="c-info-item-icon">
                          <i class="las la-phone"></i>
                        </div>
                        <p class="c-info-item-text">
                          <a :href="`tel:+${officer.mobile}`">{{officer.mobile}}</a>

                        </p>
                      </li>
                      <li class="c-info-list__item d-flex">
                        <div class="c-info-item-icon">
                          <i class="las la-envelope"></i>
                        </div>
                        <p class="c-info-item-text">
                          <a :href="`mailto:${officer.email}`">{{officer.email}}</a>
                        </p>
                      </li>
                      <li class="c-info-list__item d-flex" disabled>
                        <div class="text-center">
                          <div class="swdt">
                            <div class="atbd-switch-wrap">
                              <div class="custom-control custom-switch switch-primary switch-md ">
                                <input type="checkbox" class="custom-control-input" :id="`switch-${officer.ulid}`"
                                  checked="" disabled>
                                <label class="custom-control-label text-disabled"
                                  :for="`switch-${officer.ulid}`">Enabled</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </router-link>
            <!-- end: card -->
          </div>
        </div>
        <paginate v-if="officers.length > 1" :page-count="totalPage" :click-handler="loadNext" 
          :prev-text="prevText"
          :next-text="nextText"
          :hide-prev-next="true"
          :container-class="'atbd-pagination d-flex justify-content-end py-3'"
          :page-class="'atbd-pagination__item'" :page-link-class="'atbd-pagination__link'"
          :prev-link-class="'atbd-pagination__link pagination-control'"
          :next-link-class="'atbd-pagination__link pagination-control'">
        </paginate>
      </div>
      <spinner :active="loader.active" />
    </div>
  </div>
</template>

<script>
  import Paginate from "vuejs-paginate";
  import {
    apiClient
  } from '../../plugins/restclient';
  import {
    getTimestamp
  } from "@/utilities";
  import {
    roleMap
  } from "@/utilities/constant";
  import {
    getNumberAlias
  } from "@/utilities";
  import Spinner from '../../components/Spinner.vue';

  export default {
    components: {
      Paginate,
        Spinner
    },
    data() {
      return {
        size: 8,
        roleMap: roleMap,
        officers: [],
        recordSet: '',
        prevText: '<span class="la la-angle-left"></span>',
        nextText: '<span class="la la-angle-right"></span>',
        currentPage: 0,
        totalPage: 0,
        xPage: '',
        spinner: 'Spinner',
        loader: {
          active: false,
          fullpage: false,
        },
        username: '',
        userNotFound: false,
      }
    },
    created() {
      this.getOfficers(1)
    },
    watch: {
      username(newval) {
        if (!newval) {
          this.officers = this.recordSet
          this.userNotFound = false
        }
      }
    },
    methods: {
      getAvatar(user) {
        return getNumberAlias(user.fname) + '.png'
      },
      loadNext(num) {
        this.getOfficers(num);
        return;
      },
      findOfficer() {

        if (!this.username.trim().length) return

        this.loader.active = true
        apiClient.get(`/v1/office/operation/users/user/${this.username}`, {
            headers: {
              "X-Timestamp": getTimestamp(),
              "X-Ulid": `${this.$store.state.user.ulid}`,
            }
          })
          .then(res => {
            this.officers = [res.data.info.user]
            this.userNotFound = false
            this.loader.active = false
          })
          .catch(() => {
            this.loader.active = false
            this.userNotFound = true
          })
      },
      getOfficers(page) {
        this.loader.active = true
        apiClient.get(`/v1/office/operation/users/fetch/role/8?offset=${(page-1)*this.size}&size=${this.size}`, {
            headers: {
              "X-Timestamp": getTimestamp(),
              "X-Ulid": `${this.$store.state.user.ulid}`,
            }
          })
          .then(res => {
            this.currentPage = Number(page);
            this.xPage = "";
            this.recordSet = res.data.data
            this.officers = this.recordSet
            if (!this.officers.length) this.userNotFound = true
            this.totalPage = Math.floor(res.data.info.total / this.size);
            this.loader.active = false
          })
          .catch(() => {
            this.loader.active = false
            this.userNotFound = true

          });
      },
    },
  }
</script>

<style>
  .swdt {
    width: 65%;
  }

  .search-icon {
    position: relative;
    right: -35px;

  }
  .rounded{
        border-radius: 44px !important;
    margin-left: 0px !important;
  }
  .bg-whie{
    background-color: #ffffff;
  }
  .search-input {
    padding-left: 35px;
  }
</style>