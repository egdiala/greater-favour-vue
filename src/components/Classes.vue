<template>
          <div class="contents">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="project-progree-breadcrumb">
                            <div class="breadcrumb-main user-member justify-content-sm-between ">
                                <div class=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                    <div class="d-flex align-items-center user-member__title justify-content-center">
                                        <h4 class="text-capitalize fw-500 breadcrumb-title" v-if="clasname">clasname</h4>
                                    </div>
                                </div>
                                <div class="action-btn" >
                                    <a @click="clearAll()" href="#" class="btn px-15 btn-primary" data-toggle="modal" data-backdrop="static" data-target="#add-subject">
                                        <i class="las la-plus fs-16"></i>create new Subject</a>
                                    <!-- Modal -->
                                   
                                    <!-- Modal -->
                                </div>
                            </div>

                            <div class="modal fade new-member" id="add-subject" data-backdrop="static" role="dialog" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content  radius-xl">
                                        <div class="modal-header">
                                            <h6 class="modal-title fw-500" id="staticBackdropLabel">Add Subject</h6>
                                            <button id="myBtn" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <i class="las la-times fs-16"></i>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="new-member-modal">
                                                    <div class="form-group mb-20">
                                                        <label class="mb-15">Select Class</label>
                                                            <div class="category-member">
                                                                <v-select v-model="newSubject.cllid" item-text="nick"  item-value="cllid" label="nick" :options="classType"></v-select>
                                                            </div>
                                                            <transition name="slide-fade"><span v-if="err && newSubject.cllid == '' || newSubject.cllid == null" class="text-danger">Select a class.</span></transition>
                                                    </div>
                                                    <div class="form-group mb-20">
                                                        <label class="mb-15">Select Theme</label>
                                                            <div class="category-member">
                                                                <v-select v-model="newSubject.thlid" item-text="name"  item-value="thlid" label="name" :options="themes"></v-select>
                                                            </div>
                                                            <transition name="slide-fade"><span v-if="err && newSubject.thlid == '' || newSubject.thlid == null" class="text-danger">Select a theme.</span></transition>
                                                    </div>
                                                    
                                                 
                                                    <div class="button-group d-flex pt-25">
                                                        <button class="btn btn-primary btn-default btn-squared text-capitalize float-right" @click="addSubject()">add new subject
                                                        </button>
                                                        <button class="btn btn-light btn-default btn-squared fw-400 text-capitalize float-right b-light color-light" data-dismiss="modal" aria-label="Close">cancel
                                                        </button>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <transition name="slide-fade">
                        <div
                        v-if="error"
                        class="signUp-topbar d-flex align-items-center justify-content-md-end justify-content-center mt-md-0 mb-md-0 mt-5 mb-1"
                        style="position: fixed; top: 1em; right: 1em;"
                        >
                        <div class="mb-0 mt-3">
                            <div class="alert alert-primary" role="alert">
                            {{ errMsg }}
                            </div>
                        </div>
                        </div>
                    </transition>
                </div>

                <div class="row">
                    <div class="col-lg-4 mb-25">
                        <!-- Card 1 -->
                        <div class="ap-po-details radius-xl bg-white d-flex justify-content-between rel-pos">
                            <div>
                                <div class="overview-content">
                                    <h1>{{prySub}}</h1>
                                    <p>Total Subjects</p>
                                </div>
                            </div>
                            <div class="side-icon2">
                                <img src="@/assets/img/custom/books.gif" width="80">
                           </div>
                        </div>
                        <!-- Card 1 End -->
                    </div>

                    <div class="col-lg-4 mb-25">
                        <!-- Card 2 End  -->
                        <div class="ap-po-details radius-xl bg-white d-flex justify-content-between rel-pos">
                            <div>
                                <div class="overview-content">
                                    <h1>{{classType.length}}</h1>
                                    <p>Total Class</p>
                                    
                                </div>
                            </div>
                            <div class="side-icon2">
                                <img src="@/assets/img/custom/class.gif" width="80">
                           </div>
                        </div>
                        <!-- Card 2 End  -->
                    </div>

                    <div class="col-lg-4 mb-25">
                        <!-- Card 3 -->
                        <div class="ap-po-details radius-xl bg-white d-flex justify-content-between rel-pos">
                            <div>
                                <div class="overview-content">
                                    <h1>0</h1>
                                    <p>Total Students</p>
                                    
                                </div>
                            </div>
                            <div class="side-icon2">
                                <img src="@/assets/img/custom/students.gif" width="80">
                           </div>
                        </div>
                        <!-- Card 3 End -->
                    </div>

                </div>

                <div class="row">
                    <div class="col-lg-12">
                        <div class="project-top-wrapper project-top-progress d-flex justify-content-between flex-wrap">
                            <div class="project-top-left d-flex flex-wrap justify-content-lg-between justify-content-center mt-n10">
                                <div class="project-tap global-shadow order-lg-1 order-2 my-10 nomargbtm">
                                    <ul class="nav px-1" id="ap-tab" role="tablist">
                                        <li v-for="(cType, c) in classType" :key="c" class="nav-item">
                                            <a v-if="c == 0" class="nav-link active" id="ap-overview-tab" data-toggle="pill" href="#ap-overview" role="tab" aria-controls="ap-overview" aria-selected="true" @click="loadContent(cType.cllid, cType.nick)">{{cType.nick}}</a>
                                            <a v-else class="nav-link" id="ap-overview-tab" data-toggle="pill" href="#ap-overview" role="tab" aria-controls="ap-overview" aria-selected="false" @click="loadContent(cType.cllid, cType.nick)">{{cType.nick}}</a>
                                        </li>
                                    </ul>
                                </div>
                              
                            </div>
                           

                        </div>
                    </div>
                </div>
                <!-- Tab Menu End -->
                <div class="projects-tab-content projects-tab-content--progress">
                    <div class="tab-content" id="ap-tabContent">
                        <div class="tab-pane fade show active" id="ap-overview" role="tabpanel" aria-labelledby="ap-overview-tab">                            
                            <div class="row">
                                <div v-if="isLoading == true && classSub.length < 1" class="col-12">
                                    <div class="spin-container text-center" style="margin-top: 20%;">
                                            <div class="atbd-spin-dots spin-lg">
                                                <span class="spin-dot badge-dot dot-primary"></span>
                                                <span class="spin-dot badge-dot dot-primary"></span>
                                                <span class="spin-dot badge-dot dot-primary"></span>
                                                <span class="spin-dot badge-dot dot-primary"></span>
                                            </div>
                                    </div>
                                </div>
                                <div v-else-if="isLoading == false && classSub.length < 1" class="col-12">
                                    <div class="card card-default card-md mb-4 no-content text-center">
                                       <div class="card-body">
                                            <img src="@/assets/img/custom/puppy-no-content.png" width="200" />
                                            <br />
                                            <h3>Oops</h3>
                                            <h6>No Content here...</h6>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="col-lg-12">
                                    <div class="table-responsive card mb-25">
                                        <table class="table table-bordered table-social card-body">
                                            <thead>
                                                <tr>
                                                    <th> Subjects </th>
                                                    <th> <span class="userDatatable-title float-right">Topics</span>  </th>
                                                    <th> <span class="userDatatable-title float-right"> Questions</span> </th>
                                                    <th class=""> <span class="userDatatable-title float-right mr-17">Actions</span> </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(cSub, s) in classSub" :key="s">
                                                    <td>
                                                        <router-link :to="{ name: 'classes-topics', params: { sid: cSub.sulid, sname: cSub.name, cname: clsName, clsId: clsId }}">{{cSub.name.toUpperCase()}}</router-link>
                                                    </td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td class="">
                                                        <ul class="orderDatatable_actions mb-0 d-flex flex-wrap float-right">
                                                    <li>
                                                        <router-link :to="{ name: 'classes-topics', params: { sid: cSub.sulid, sname: cSub.name, cname: clsName, clsId: clsId }}" class="view">
                                                            <i class="las la-eye fs-16"></i>
                                                        </router-link>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="view">
                                                            <i class="las la-archive fs-16"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <!-- <div v-if="classSub.length > 0" class="row">
                                <div class="col-lg-12">
                                    <div class="d-flex justify-content-sm-end justify-content-star mt-1 mb-30">
                                        <nav class="atbd-page ">
                                            <ul class="atbd-pagination d-flex">
                                                <li class="atbd-pagination__item">
                                                    <a href="#" class="atbd-pagination__link pagination-control"><span class="la la-angle-left"></span></a>
                                                    <a href="#" class="atbd-pagination__link"><span class="page-number">1</span></a>
                                                    <a href="#" class="atbd-pagination__link active"><span class="page-number">2</span></a>
                                                    <a href="#" class="atbd-pagination__link"><span class="page-number">3</span></a>
                                                    <a href="#" class="atbd-pagination__link pagination-control"><span class="page-number">...</span></a>
                                                    <a href="#" class="atbd-pagination__link"><span class="page-number">12</span></a>
                                                    <a href="#" class="atbd-pagination__link pagination-control"><span class="la la-angle-right"></span></a>
                                                    <a href="#" class="atbd-pagination__option">
                                                    </a>
                                                </li>
                                                <li class="atbd-pagination__item">
                                                    <div class="paging-option">
                                                        <select name="page-number" class="page-selection">
                                                            <option value="20">20/page</option>
                                                            <option value="40">40/page</option>
                                                            <option value="60">60/page</option>
                                                        </select>
                                                    </div>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
    <transition name="slide-fade">
      <div
        v-if="error"
        class="alert alert-primary"
        role="alert"
        style="position: fixed; top: 10%; right: 1em;"
      >
        <div class="alert-content">
          <p>
            <i class="las la-exclamation-circle"></i>&nbsp;&nbsp;
            {{ errMsg }}
          </p>
        </div>
      </div>
    </transition>
        </div>
</template>

<script>
import { authComputed } from "@/vuex/helpers.js";
import { apiClient } from "@/plugins/restclient.js";
export default {
    name: "classes",
    props: ['clasname'],
    data() {
        return {
            isLoading: false,
            error: null,
            err: false,
            errMsg: '',
            className: [],
            classId: [],
            classType: [],
            category: ["GENERAL", "ART", "SCIENCE", "COMMERCIAL", "SOCIAL", "LANGUAGE", "EDUCATION"],
            newSubject: {
                cllid: "",
                thlid: "",
            },
            prySub: 0,
            classSub: [],
            clsId: '',
            clsName: '',
            topics: [],
            primary: [],
            junior: [],
            senior: [],
            primarySub: [],
            juniorSub: [],
            seniorSub: [],
            themes: []
        };
    },
    metaInfo: {
        title: "Greater Favour",
        titleTemplate: "%s | Primary Class",
        htmlAttrs: {
        lang: "en",
        amp: true,
        },
    },
    computed: {
        ...authComputed,
    },
    beforeMount() {
        if (this.loggedIn == false) {
        this.$router.push({ path: "/login" });
        }
    },
    mounted() {
        if (localStorage.getItem("class")) {
            var jun = JSON.parse(localStorage.getItem("class"));
            this.classType =jun;
            this.clsId = this.classType[0].cllid;
            this.clsName = this.classType[0].nick;
            this.getSubjects();
        } else {
        this.classType = this.$route.params.classType;
        this.themes = this.$route.params.themes;
        this.clsId = this.$route.params.classType[0].cllid;
        this.clsName = this.$route.params.classType[0].nick;
        localStorage.setItem("class", JSON.stringify(this.classType));
        this.getSubjects();
        }
        this.getClasses();
    },
    methods: {
        getClasses() {
            var ts = Math.round(+new Date() / 1000);

            this.isLoading = true;
            const headers = {
                "X-Timestamp": ts,
                "X-Ulid": `${this.$store.state.user.ulid}`,
            };

        apiClient
            .get("/v1/engine/core/environment", {
            headers: headers,
            })
            .then((res) => {
            let subjects = [];
            subjects = Object.keys(res.data.info.subjects).map(i => res.data.info.subjects[i]);

            var primary =  subjects.filter(function(hero) {
              return hero.category_class == "PRIMARY";
            });
            this.prySub = primary.length;

            var theme = res.data.info.themes;
            this.themes = Object.values(theme);
            this.isLoading = false;
            this.error = false;
            }).catch((err) => {
                this.isLoading = false;
                if (err.response) {
                this.error = true;
                this.errMsg = err.response.data.message;                     
                }
                setTimeout(() => {
                    this.error = false;
                }, 9000); 
            })
        },
        getSubjects() {
            var ts = Math.round(+new Date() / 1000);

            this.isLoading = true;
            const headers = {
                "X-Timestamp": ts,
                "X-Ulid": `${this.$store.state.user.ulid}`,
            };

            apiClient.get(`/v1/office/frame/subject/fetch/class/${this.clsId}`, { headers: headers }).then(res => {
                this.isLoading = false;
                this.error = false;
                this.classSub = res.data.data;
            }).catch((err) => {
                this.isLoading = false;
                if (err.response) {
                this.error = true;
                this.errMsg = err.response.data.message;                     
                }
                setTimeout(() => {
                    this.error = false;
                }, 9000); 
            });
        },
        addSubject() {
            if (this.newSubject.thlid != ""  && this.newSubject.thlid != null) {
                if (this.newSubject.cllid != ""  && this.newSubject.cllid != null) {
                    var ts = Math.round(+new Date() / 1000);
                    
                    this.isLoading = true;
                    const headers = {
                        "X-Timestamp": ts,
                        "X-Ulid": `${this.$store.state.user.ulid}`,
                    };

                    const newSubject = {
                        cllid: this.newSubject.cllid.cllid,
                        thlid: this.newSubject.thlid.thlid,            
                    }

                    apiClient.post('/v1/office/frame/subject/add', newSubject, { headers: headers }).then(() => {
                        document.getElementById('myBtn').click();
                        this.isLoading = false;
                        this.error = false;
                        this.getSubjects();
                    }).catch(err => {
                        this.isLoading = false;
                        if (err.response) {
                        this.error = true;
                        this.errMsg = err.response.data.message;                     
                        }
                        setTimeout(() => {
                            this.error = false;
                        }, 9000); 
         
                    });   
                    
                } else {
                    this.err = true;
                }                 
                } else {
                    this.err = true;
                }
        },
        loadContent(id, name) {
            this.clsId = id;
            this.clsName = name;
            this.classSub = [];
            this.getSubjects();
        },
        clearAll() {
            this.err = false;
            document.getElementsByClassName("vs__clear")[0].click();
            document.getElementsByClassName("vs__clear")[1].click();
            this.newSubject.thlid = '';
            this.newSubject.cllid = '';
        }
    },
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>