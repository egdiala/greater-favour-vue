<template>
        <div class="contents">
            <div class="container-fluid">
                <div class="row mb-2 sticky" style="background-color: #f4f5f7 !important;">
                    <div class="col-lg-12">
                        <div class="contact-breadcrumb">
                            <div class="breadcrumb-main add-contact justify-content-sm-between p-3">
                                <div class=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                    <div class="d-flex align-items-center add-contact__title justify-content-center">
                                        <h4 class="text-capitalize fw-500 breadcrumb-title">{{sname}}
                                            <ul class="atbd-breadcrumb nav">
                                                <li class="atbd-breadcrumb__item">
                                                    <a href="/">
                                                        <span class="la la-home"></span>
                                                    </a>
                                                    <span class="breadcrumb__seperator">
                                                        <span class="la la-slash"></span>
                                                    </span>
                                                </li>
                                                <li class="atbd-breadcrumb__item">
                                                    <router-link :to="url" style="color: #9299b8; cursor: pointer;">{{url.slice(9, url.length)}}</router-link>
                                                    <span class="breadcrumb__seperator">
                                                        <span class="la la-slash"></span>
                                                    </span>
                                                </li>
                                                <li class="atbd-breadcrumb__item">
                                                    <span class="bread-item">Topics</span>
                                                </li>
                                            </ul>
                                        </h4>
                                        <span class="sub-title ml-sm-25 pl-sm-25">{{cname}}</span>
                                    </div>
                                <div class="d-flex align-items-center user-member__form my-sm-0 my-2 mr-sm-25" style="border-color: #e3e3e3 !important;">
                                    <span><i class="las la-search"></i></span>
                                    <input v-model="searchValue" class="form-control mr-sm-2 border-0 box-shadow-none" type="search" placeholder="Search by Topic" aria-label="Search">
                                </div>
                                </div>
                                <div class="action-btn">
                                    <a @click="clear()" href="#" class="btn px-15 btn-primary" data-toggle="modal" data-target="#new-member" :disabled="disabled">
                                        <i class="las la-plus fs-16"></i>Create New Topic</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Tab Menu End -->
                <div class="projects-tab-content projects-tab-content--progress">
                    <div class="tab-content " id="ap-tabContent">
                        <div class="tab-pane fade show active" id="ap-overview" role="tabpanel" aria-labelledby="ap-overview-tab">
                            <div class="row">
                                <div v-if="isLoading && !$store.state.asyncLoader" class="col-12">
                                    <div class="spin-container text-center" style="margin-top: 20%;">
                                            <div class="atbd-spin-dots spin-lg">
                                                <span class="spin-dot badge-dot dot-primary"></span>
                                                <span class="spin-dot badge-dot dot-primary"></span>
                                                <span class="spin-dot badge-dot dot-primary"></span>
                                                <span class="spin-dot badge-dot dot-primary"></span>
                                            </div>
                                    </div>
                                </div>
                                <div v-if="!isLoading && filteredList.length < 1" class="col-12">
                                    <div class="card card-default card-md mb-4 no-content text-center">
                                       <div class="card-body">
                                            <img src="@/assets/img/custom/puppy-no-content.png" width="200" />
                                            <br />
                                            <h3>Oops</h3>
                                            <h6>No topics here...</h6>
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="!isLoading && filteredList.length > 0" v-for="(topic, t) in filteredList" :key="t"  class="col-xl-3 mb-25 col-md-6">
                                    <div class="user-group radius-xl bg-white media-ui media-ui--early pt-30 pb-25">
                                        <div class=" px-30 rel-pos">
                                            <router-link :to="{ name: 'classes-topics-questions', params: { tid: topic.tolid, tname: topic.name, clsId: clsId, sid: subId, url: url }}">
                                                <div class="media user-group-media d-flex justify-content-between">
                                                    <div class="media-body d-flex align-items-center flex-wrap text-capitalize my-sm-0 my-n2">
                                                        <h6 class="mt-0  fw-500 mr-main">{{topic.name}}</h6>
                                                    </div>
                                                </div>
                                                <div class="user-group-people mt-15 text-capitalize">
                                                    <p>No description</p>
                                                
                                                </div>
                                                <div class="user-group-project" style="margin-bottom: -20px; margin-right:">
                                                    <div class="d-flex align-items-center user-group-progress-top">
                                                        <div>
                                                            <span class="color-light fs-12">Questions</span>
                                                            <p class="fs-14 fw-500 color-dark mb-0">{{topic.stat_question}}</p>
                                                        </div>
                                                        <div class="mr-30">
                                                            <span class="color-light fs-12">Contributors</span>
                                                            <p class="fs-16 fw-500 color-success mb-0">{{topic.stat_contributor}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </router-link>
                                            <div class="mt-n15 dots">
                                                <div class="dropdown dropleft">
                                                    <button class="btn-link border-0 bg-transparent p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                                    </button>
                                                    <div class="dropdown-menu">
                                                        <a class="dropdown-item" href="" @click.prevent="editTopic(topic.tolid, topic.name)" data-toggle="modal" data-target="#new-member">edit topic</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                            <!-- <div v-if="isLoading == false && subjectTopics.length > 0" class="row">
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
                <!-- Modal -->
                <div class="modal fade new-member" id="new-member" data-backdrop="static" role="dialog" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content  radius-xl">
                            <div class="modal-header">
                                <h6 v-if="!editId" class="modal-title fw-500" id="staticBackdropLabel">Create Topic</h6>
                                <h6 v-else class="modal-title fw-500" id="staticBackdropLabel">Edit Topic</h6>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" :disabled="disabled">
                                    <i class="las la-times"></i>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="new-member-modal">
                                    <form @submit.prevent="!editId ? addTopic() : changeTopic()">
                                        <div class="form-group mb-20">
                                            <label class="mb-15">Topic name</label>
                                            <input v-model="name" type="text" class="form-control" id="name47" placeholder="Enter here">
                                            <transition v-if="error && message != ''" name="slide-fade"><span class="text-danger">{{message}}</span></transition>
                                        </div>
                                    </form>    
                                        
                                        <div class="button-group d-flex pt-25">
                                            <button v-if="!editId" class="btn btn-primary btn-default btn-squared text-capitalize float-right" @click="addTopic()" :disabled="disabled">add new topic
                                            </button>
                                            <button v-else class="btn btn-primary btn-default btn-squared text-capitalize float-right" @click="changeTopic()" :disabled="disabled">edit topic
                                            </button>
                                            <button id="myBtn" class="btn btn-light btn-default btn-squared fw-400 text-capitalize float-right b-light color-light" data-dismiss="modal" aria-label="Close" :disabled="disabled">cancel
                                            </button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Modal -->
        <ResponseModal ref="resModal" />
    <LoaderOverlay :active="loader.active" :fullpage="loader.fullpage" bgColor="#2a2a2a55" zIndex="99999"></LoaderOverlay>
        </div>
</template>

<script>
import { authComputed } from "@/vuex/helpers.js";
import { apiClient } from "@/plugins/restclient.js";
import LoaderOverlay from "@/components/LoaderOverlay";
import ResponseModal from "@/components/ResponseModal.vue";

export default {
  name: "classes-topics",
    components: {
        LoaderOverlay,
        ResponseModal
    },
  data() {
    return {
        isLoading: false,
        disabled: false,
            loader: {
                fullpage: true,
                active: false
            },
        name: "",
        url: '',
        editId: '',
        searchValue: '',
        subjectTopics: [],
        cls: [],
        subId: "",
        clsId: "",
        sname: '',
        cname: '',
        message: '',
        error: null,
        errors: false,
        errMsg: ''
    };
  },
  metaInfo: {
    title: "Greater Favour",
    titleTemplate: "%s | Topics",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
  computed: {
    ...authComputed,
    filteredList() {
        return this.subjectTopics.filter(subjectTopic => {
            return subjectTopic.name.toLowerCase().includes(this.searchValue.toLowerCase()) && subjectTopic.status === 1;
        })
    },
  },
  beforeMount() {
    if (this.loggedIn == false) {
      this.$router.push({ path: "/login" });
    }
  },
  mounted() {
    if (this.$route.params.sid) {
        this.url = this.$route.params.url;
        this.subId = this.$route.params.sid;
        this.clsId = this.$route.params.clsId;
        this.sname = this.$route.params.sname;
        this.cname = this.$route.params.cname;
        let obj = {
            subId: this.subId,
            clsId: this.clsId,
            sname: this.sname,
            cname: this.cname,
            url: this.url
        };
        localStorage.setItem("topics", JSON.stringify(obj));
        this.getTopics();
    } else {
        var jun = JSON.parse(localStorage.getItem("topics"));
        this.subId = jun.subId;
        this.clsId = jun.clsId;
        this.sname = jun.sname;
        this.cname = jun.cname;
        this.url = jun.url;
        this.getTopics();
    }
  },
  methods: {
    getTopics() {
        this.isLoading = true;
        var ts = Math.round(+new Date() / 1000);

      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      apiClient
        .get(`/v1/office/frame/topic/fetch/subject/${this.subId}`, {
          headers: headers,
        })
        .then((res) => {
            this.isLoading = false;
            this.errors = false;
          this.subjectTopics = res.data.data;
        })
        .catch((err) => {
            this.isLoading = false;
            this.errors = true;
            this.errMsg = err.response.data.message;
            
        });
    },
    clear() {
        this.name = '';
        this.editId = '';
    },
    addTopic() {
        if (this.name.trim() != '') {
            this.isLoading = true;
            this.disabled = true;
            this.loader.active = true;
            var ts = Math.round(+new Date() / 1000);
            
            const headers = {
                "X-Timestamp": ts,
                "X-Ulid": `${this.$store.state.user.ulid}`,
            };

            const reqBody = {
                sulid: this.subId,
                name: this.name.trim()
            };

            apiClient.post('/v1/office/frame/topic/add', reqBody, { headers: headers }).then((res) => {
                setTimeout(() => {
                   document.getElementById("myBtn").click(); 
                }, 1000);
            this.isLoading = false;
            this.disabled = false;
            this.loader.active = false;
            this.error = null;
            this.errors = false;
            this.$refs.resModal.open({type:'success', message: res.data.message})
            this.getTopics();
            }).catch(err => {
            this.isLoading = false;
            this.errors = true;
            this.$refs.resModal.open({type:'error', message: err.response.data.message})
            this.disabled = false;
            this.loader.active = false;
            }); 
        } else {
            this.error = true;
            this.message = 'Topic name cannot be empty.';
        }
    },
    changeTopic() {
        this.isLoading = true;
        this.loader.active = true;
        var ts = Math.round(+new Date() / 1000);

      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      apiClient
        .patch(`/v1/office/frame/topic/change`, { tolid: this.editId, name: this.name } ,{
          headers: headers,
        })
        .then((res) => {
            setTimeout(() => {
                document.getElementById("myBtn").click(); 
            }, 1);
            this.$refs.resModal.open({type:'success', message: res.data.message})
            this.editId = '';
            this.name = '';
            this.loader.active = false;
            this.isLoading = false;
            this.errors = false;
            this.getTopics();
        })
        .catch((err) => {
            this.isLoading = false;
            this.errors = true;
            this.$refs.resModal.open({type:'error', message: err.response.data.message})
        });
    },
    editTopic(id, name) {
        this.editId = id;
        this.name = name;
    },
    show(i) {
      var clssName = document.getElementById(i);
      clssName.className = "active";
    },
    prev() {
        this.$router.go(-1);
    }
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.bread-item:hover {
    color: #9299b8 !important;
}
</style>
