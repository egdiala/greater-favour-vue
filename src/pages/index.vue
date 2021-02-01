<template>
  <div>
    <div class="contents">
      <div class="container-fluid">
        <div class="social-dash-wrap">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcrumb-main">
                  <h4 class="text-capitalize breadcrumb-title">Dashboard</h4>
                  <!-- <div class="breadcrumb-action justify-content-center flex-wrap">
                      <div class="dropdown action-btn">
                          <div class="atbd-tag-wrap">
                              <div class="tag-box">
                                  <span><a class="atbd-tag tag-danger tag-transparented" href="#">Verification pending!!! click to complete it</a></span>
                                </div>
                          </div>
                      </div>
                  </div> -->
              </div>
            </div>

                                   <!---  Dashboard Cards -->
                    <div class="col-xl-4 col-xxl-6 col-ssm-12 mb-30">
                        <!-- Card 1 -->
                        <div class="ap-po-details p-25 radius-xl bg-white d-flex justify-content-between rel-pos">
                            <div>
                                <div class="overview-content">
                                    <h1>{{subjects.length}}</h1>
                                    <p>{{subjects.length > 1 ? 'Subjects' : 'Subject'}}</p>
                                    
                                </div>
                            </div>
                            <div class="side-icon2">
                                <img src="@/assets/img/custom/books.gif" width="80">
                           </div>
                        </div>
                        <!-- Card 1 End -->
                    </div>
                    <div class="col-xl-4 col-xxl-6 col-ssm-12 mb-30">
                        <!-- Card 2 End  -->
                        <div class="ap-po-details p-25 radius-xl bg-white d-flex justify-content-between rel-pos">
                            <div>
                                <div class="overview-content">
                                    <h1>{{classes.length}}</h1>
                                    <p>{{classes.length > 1 ? 'Classes' : 'Class'}}</p>
                                   
                                </div>
                            </div>
                            <div class="side-icon2">
                                <img src="@/assets/img/custom/classes.gif" width="80">
                           </div>
                        </div>
                        <!-- Card 2 End  -->
                    </div>
                    <div class="col-xl-4 col-xxl-6 col-ssm-12 mb-30">
                        <!-- Card 3 -->
                        <div class="ap-po-details p-25 radius-xl bg-white d-flex justify-content-between rel-pos">
                            <div>
                                <div class="overview-content">
                                    <h1>{{questionTotal}}</h1>
                                    <p>{{questionTotal > 1 ? 'Questions' : 'Question'}}</p>
                                   
                                </div>
                            </div>
                            <div class="side-icon2">
                                <img src="@/assets/img/custom/ques.gif" width="80">
                           </div>
                        </div>
                        <!-- Card 3 End -->
                    </div>
                  

                       <!--  Dashboard Cards end -->

            <div class="col-lg-12 mb-25 col-xxl">
              <div class="card border-0">
                <div class="card-header">
                  <h6>Classes</h6>
                  <div class="card-extra">
                    <div
                      class="card-tab btn-group atbd-button-group mr-3 nav nav-tabs"
                    >
                      <a v-if="primary.length > 0"
                        class="btn btn-xs btn-white border"
                        id="f_today-tab"
                        data-toggle="tab"
                        href="#st_matrics-today"
                        role="tab"
                        area-controls="st_matrics"
                        aria-selected="false"
                        >Primary</a
                      >
                      <a v-if="junior.length > 0"
                        class="btn btn-xs btn-white active border"
                        id="f_week-tab"
                        data-toggle="tab"
                        href="#st_matrics-week"
                        role="tab"
                        area-controls="st_matrics"
                        aria-selected="true"
                        >Junior Secondary</a
                      >
                      <a v-if="senior.length > 0"
                        class="btn btn-xs btn-white border"
                        id="f_month-tab"
                        data-toggle="tab"
                        href="#st_matrics-month"
                        role="tab"
                        area-controls="st_matrics"
                        aria-selected="false"
                        >Senior Secondary</a
                      >
                    </div>
                  </div>
                </div>
                <div v-if="classes.length > 0" class="card-body p-0">
                  <div class="tab-content">
                    <div
                      class="tab-pane fade"
                      id="st_matrics-today"
                      role=""
                      aria-labelledby="st_matrics-tab"
                    >
                      <div class="table-responsive">
                        <div v-if="primarySub.length < 1" class="no-content text-center">
                          <img
                            src="@/assets/img/custom/puppy-no-content.png"
                            width="200"
                          />
                          <br />
                          <h3>Oops</h3>
                          <h6>No Content here...</h6>
                        </div>
                        <div v-else class="table-responsive">
                        <table class="table table-bordered table-social">
                          <thead>
                            <tr>
                              <th scope="col" colspan="3">Subjects</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(pSub, i) in primarySub" :key="i">
                              <td><router-link :to="{ name: 'classes-topics', params: { sid: pSub.sulid, sname: pSub.name, cname: pSub.nick, clsId: pSub.cllid }}">{{pSub.name}}</router-link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade active show"
                      id="st_matrics-week"
                      role="tabpanel"
                      aria-labelledby="st_matrics-tab"
                    >
                      <div class="table-responsive">
                        <div v-if="juniorSub.length < 1" class="no-content text-center">
                          <img
                            src="@/assets/img/custom/puppy-no-content.png"
                            width="200"
                          />
                          <br />
                          <h3>Oops</h3>
                          <h6>No Content here...</h6>
                        </div>
                        <table v-else class="table table-bordered table-social">
                          <thead>
                            <tr>
                              <th scope="col" colspan="3">Subjects</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(jSub, j) in juniorSub" :key="j">
                              <td><router-link
                          :to="{
                            name: 'classes-topics',
                            params: { sid: jSub.sulid, sname: jSub.name, cname: jSub.nick, clsId: jSub.cllid },
                          }"
                          >{{jSub.name}}</router-link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="st_matrics-month"
                      role="tabpanel"
                      aria-labelledby="st_matrics-tab"
                    >
                      <div class="table-responsive">
                        <div v-if="seniorSub.length < 1" class="no-content text-center">
                          <img
                            src="@/assets/img/custom/puppy-no-content.png"
                            width="200"
                          />
                          <br />
                          <h3>Oops</h3>
                          <h6>No Content here...</h6>
                        </div>
                        <table v-else class="table table-bordered table-social">
                          <thead>
                            <tr>
                              <th scope="col" colspan="3">Subjects</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(sSub, k) in seniorSub" :key="k">
                              <td><router-link :to="{
                            name: 'classes-topics',
                            params: { sid: sSub.sulid, sname: sSub.name, cname: sSub.nick, clsId: sSub.cllid },
                          }">{{sSub.name}}</router-link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="overlay-dark-sidebar"></div>
    <div class="customizer-overlay"></div>
    <!-- ends: .atbd-page-content -->
    <div
      class="modal-basic modal fade show"
      id="modal-basic"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md modal-info" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-info-body d-flex">
              <div class="modal-info-text text-center">
                <h4>✌🏽 Hi <span class="apptxt"> Jadesola Chukwuma </span></h4>
                <div class="text-center">
                  <img src="@/assets/img/custom/new-book.gif" width="200" />
                </div>
                <br />
                <h6>
                  Here are some verification you need to fulfill to enable you
                  have access to the amazing features
                </h6>
                <p>Some descriptions</p>
                <div class="row btn-auto">
                  <button
                    type="button"
                    class="btn btn-light btn-outlined btn-sm"
                    data-dismiss="modal"
                  >
                    I am not ready
                  </button>
                  <button
                    type="button"
                    class="btn btn-info btn-sm"
                    onclick="window.location.href='verifyme.html';"
                    data-dismiss="modal"
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
            <br />
          </div>
          <!--<div class="modal-footer">
                <button type="button" class="btn btn-light btn-outlined btn-sm" data-dismiss="modal">I am not ready</button>
                <button type="button" class="btn btn-info btn-sm" data-dismiss="modal">Ok</button>
            </div>-->
        </div>
      </div>
    </div>
    <!-- ends: .modal-Basic -->

    <div
      class="modal-info-confirmed modal fade show"
      id="modal-info-confirmed"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-sm modal-info" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-info-body d-flex">
              <div class="modal-info-icon warning">
                <span data-feather="info"></span>
              </div>
              <div class="modal-info-text">
                <h6>Do you Want to delete these items?</h6>
                <p>Some descriptions</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-light btn-outlined btn-sm"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-info btn-sm"
              data-dismiss="modal"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authComputed } from "../vuex/helpers.js";
import { apiClient,publicClient } from "../plugins/restclient.js";
export default {
  name: "home",
  components: {},
  data () {
    return {
      questionTotal: 0,
      classes: [],
      subjects: [],
      topics: [],
      primary: [],
      junior: [],
      senior: [],
      primarySub: [],
      juniorSub: [],
      seniorSub: []
    }
  },
  metaInfo: {
    title: "Greater Favour",
    titleTemplate: "%s | Dashboard",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
  computed: {
    ...authComputed,
  },
  beforeRouteEnter(to,from, next){
    if(!localStorage.getItem('jwt')){
      next('/login')
    }
    next()
  },
  mounted() {
    publicClient
		.post("/v1/daemon/start/login", {username: this.username, password: this.password})
		.then((res) => {
			console.log(res)
		})
		.catch(()=>{
			
		})
    this.getClasses();
    this.getQuestions();
    this.getStudents();
  },
  methods: {
    getClasses() {
      var ts = Math.round(+new Date() / 1000);

      const headers = {
        'X-Ulid': `${this.$store.state.user.ulid}`,
        "X-Timestamp": ts,
      };

      apiClient.get('/v1/engine/core/environment', {
        headers: headers,
          }).then(res => {
            var response = res.data.info;
            var classes = response.classes;
            var subjects = response.subjects;
            var topics = response.topics;
            this.classes = Object.keys(classes).map(i => classes[i]);
            this.subjects = Object.keys(subjects).map(i => subjects[i]);
            this.topics = Object.keys(topics).map(i => topics[i]);

            var primary =  this.classes.filter(function(hero) {
              return hero.category == "PRIMARY";
            });
            
            this.primary = primary;

            var junior =  this.classes.filter(function(hero) {
              return hero.category == "JUNIOR";
            });
            
            this.junior = junior;

            var senior =  this.classes.filter(function(hero) {
              return hero.category == "SENIOR";
            });
            
            this.senior = senior;

            var primarySub =  this.subjects.filter(function(hero) {
              return hero.category_class == "PRIMARY";
            });
            
            this.primarySub = primarySub;

            var juniorSub =  this.subjects.filter(function(hero) {
              return hero.category_class == "JUNIOR";
            });
            
            this.juniorSub = juniorSub;

            var seniorSub =  this.subjects.filter(function(hero) {
              return hero.category_class == "SENIOR";
            });
            
            this.seniorSub = seniorSub;
        }).catch(() => {
        });
    },
    getQuestions() {
      var ts = Math.round(+new Date() / 1000);

      const headers = {
        'X-Ulid': `${this.$store.state.user.ulid}`,
        "X-Timestamp": ts,
      };

      apiClient.get('/v1/office/assessment/question/fetch', {
        headers: headers,
          }).then(res => {
            this.questionTotal = res.data.info.total;
        }).catch(() => {
        });
    },
    getStudents() {
      var ts = Math.round(+new Date() / 1000);

      const headers = {
        'X-Ulid': `${this.$store.state.user.ulid}`,
        "X-Timestamp": ts,
      };

      apiClient.get('/v1/office/operation/users/fetch/role/1', {
        headers: headers,
          }).then(() => {
        }).catch(() => {
        });
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
