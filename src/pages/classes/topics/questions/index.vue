<template>
  <div class="contents">
    <LoaderOverlay
      :active="loader.active"
      :fullpage="loader.fullpage"
      bgColor="#2a2a2a55"
      zIndex="99999"
    ></LoaderOverlay>
    <ResponseModal ref="resModal" style="z-index: 99999 !important;" />
    <div class="container-fluid">
      <div class="row mb-2 sticky">
        <div class="col-lg-12 contact-breadcrumb">
          <div
            class="breadcrumb-main add-contact justify-content-sm-between p-3"
            style="background-color: #f4f5f7 !important;"
          >
            <div
              class=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper"
            >
              <div
                class="d-flex align-items-center add-contact__title justify-content-center"
              >
                <h4 class="text-capitalize fw-500 breadcrumb-title">
                  {{ tname }}
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
                      <router-link :to="url">{{
                        url.slice(9, url.length)
                      }}</router-link>
                      <span class="breadcrumb__seperator">
                        <span class="la la-slash"></span>
                      </span>
                    </li>
                    <li class="atbd-breadcrumb__item">
                      <a @click="$router.go(-1)" style="cursor: pointer;"
                        >Topics</a
                      >
                      <span class="breadcrumb__seperator">
                        <span class="la la-slash"></span>
                      </span>
                    </li>
                    <li class="atbd-breadcrumb__item">
                      <span class="bread-item">Question</span>
                    </li>
                  </ul>
                </h4>
              </div>
              <div
                class="d-flex align-items-center user-member__form my-sm-0 my-2 mr-sm-25"
                style="border-color: #e3e3e3 !important;"
              >
                <span><i class="las la-search"></i></span>
                <input
                  v-model="searchValue"
                  class="form-control mr-sm-2 border-0 box-shadow-none"
                  type="search"
                  placeholder="Search by Description"
                  aria-label="Search"
                />
              </div>
            </div>
            <div class="action-btn">
              <a
                @click="clearAll()"
                href="#"
                class="btn px-15 btn-primary"
                data-toggle="modal"
                data-target="#new-question"
              >
                <i class="las la-plus fs-16"></i>Add New Question</a
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div
        class="modal fade new-member"
        id="new-question"
        data-backdrop="static"
        role="dialog"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content  radius-xl">
            <div class="modal-header">
              <h6 class="modal-title fw-500" id="staticBackdropLabel">
                Question Settings
              </h6>
              <button
                id="myCheck"
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                ref="clsBtn"
                :disabled="disabled"
              >
                <i class="las la-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="new-member-modal">
                <form @submit.prevent="check()">
                  <div class="form-group mb-20">
                    <label for="name">Description</label>
                    <input
                      v-model="description"
                      class="form-control"
                      type="text"
                      placeholder="Enter description"
                    />
                    <transition name="slide-fade"
                      ><span v-if="err && !description" class="text-danger"
                        >Description cannot be empty.</span
                      ></transition
                    >
                  </div>
                  <div class="form-group mb-20">
                    <div class="row">
                      <div class="col-sm-6">
                        <label for="name">Score</label>
                        <input
                          v-model="score"
                          class="form-control"
                          type="text"
                          placeholder="Enter score"
                        />
                        <transition name="slide-fade"
                          ><span
                            v-if="(err && score == '') || isNaN(score)"
                            class="text-danger"
                            >Score cannot be empty.</span
                          ></transition
                        >
                        <transition name="slide-fade"
                          ><span
                            v-if="(err && score > 10) || isNaN(score)"
                            class="text-danger"
                            >Score cannot be greater than 10</span
                          ></transition
                        >
                      </div>
                      <div class="col-sm-6">
                        <label for="name47">Duration</label>
                        <input
                          v-model="secs"
                          type="text"
                          class="form-control"
                          placeholder="Enter duration"
                        />
                        <transition name="slide-fade"
                          ><span
                            v-if="(err && secs == null) || isNaN(secs)"
                            class="text-danger"
                            >{{ errMsg }}</span
                          ></transition
                        >
                      </div>
                    </div>
                  </div>
                  <div class="form-group mb-20">
                    <div class="row">
                      <div class="col-sm-6">
                        <label for="labelType">Label Type</label>
                        <div class="category-member">
                          <v-select
                            v-model="lType"
                            :options="labelTypes"
                          ></v-select>
                          <transition name="slide-fade"
                            ><span
                              v-if="(err && lType == '') || lType == null"
                              class="text-danger"
                              >Select a label type.</span
                            ></transition
                          >
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <label for="name47">Question Type</label>
                        <div class="category-member">
                          <v-select
                            v-model="qType"
                            :options="questionTypes"
                          ></v-select>
                          <transition name="slide-fade"
                            ><span
                              v-if="(err && qType == '') || qType == null"
                              class="text-danger"
                              >Select a question type.</span
                            ></transition
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group textarea-group">
                    <label class="mb-15">Scheme</label>
                    <div class="d-flex">
                      <div
                        class="project-task-list__left d-flex align-items-center"
                      >
                        <div class="checkbox-group d-flex mr-50 pr-10">
                          <div
                            class="checkbox-theme-default custom-checkbox checkbox-group__single d-flex"
                          >
                            <input
                              class="checkbox"
                              type="checkbox"
                              id="check-grp-1"
                              :value="1"
                              v-model="term"
                              checked
                            />
                            <label
                              for="check-grp-1"
                              class="fs-14 color-light strikethrough"
                            >
                              1<sup>st</sup> Term
                            </label>
                          </div>
                        </div>
                        <div class="checkbox-group d-flex mr-50 pr-10">
                          <div
                            class="checkbox-theme-default custom-checkbox checkbox-group__single d-flex"
                          >
                            <input
                              class="checkbox"
                              type="checkbox"
                              id="check-grp-2"
                              :value="2"
                              v-model="term"
                            />
                            <label
                              for="check-grp-2"
                              class="fs-14 color-light strikethrough"
                            >
                              2<sup>nd</sup> Term
                            </label>
                          </div>
                        </div>
                        <div class="checkbox-group d-flex">
                          <div
                            class="checkbox-theme-default custom-checkbox checkbox-group__single d-flex"
                          >
                            <input
                              class="checkbox"
                              type="checkbox"
                              id="check-grp-3"
                              :value="3"
                              v-model="term"
                            />
                            <label
                              for="check-grp-3"
                              class="fs-14 color-light strikethrough"
                            >
                              3<sup>rd</sup> Term
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <transition name="slide-fade"
                      ><span v-if="err && term.length < 1" class="text-danger"
                        >Select at least one term.</span
                      ></transition
                    >
                  </div>

                  <div class="form-group mb-20">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label class="mb-15"
                            >Select difficulty level
                            <small> from 1 to 10 </small>
                          </label>
                          <div class="slider-wrapper">
                            <vue-slider
                              v-model="difficulty"
                              :min="0"
                              :max="10"
                            ></vue-slider>
                            <transition name="slide-fade"
                              ><span
                                v-if="err && difficulty == 0"
                                class="text-danger"
                                >Difficulty cannot be at zero.</span
                              ></transition
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="button-group d-flex pt-25">
                    <button
                      type="submit"
                      class="btn btn-primary btn-default btn-squared text-capitalize"
                      @click="check()"
                      :disabled="disabled"
                    >
                      add Question
                    </button>
                    <button
                      class="btn btn-light btn-default btn-squared fw-400 text-capitalize b-light color-light"
                      data-dismiss="modal"
                      aria-label="Close"
                      :disabled="disabled"
                    >
                      cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->

      <div class="row">
        <div v-if="isLoading && !$store.state.asyncLoader" class="col-lg-12">
          <div class="spin-container text-center" style="margin-top: 20%;">
            <div class="atbd-spin-dots spin-lg">
              <span class="spin-dot badge-dot dot-primary"></span>
              <span class="spin-dot badge-dot dot-primary"></span>
              <span class="spin-dot badge-dot dot-primary"></span>
              <span class="spin-dot badge-dot dot-primary"></span>
            </div>
          </div>
        </div>
        <div v-else class="col-lg-12" style="height: 100%;">
          <div
            class="userDatatable global-shadow border p-30 bg-white radius-xl w-100"
          >
            <div class="mb-20">
              <h4 class="text-right">
                <small> Total Questions: </small> {{ totalQuestions }}
              </h4>
            </div>
            <div
              v-if="!isLoading && filteredList.length < 1"
              class="mb-4 no-content text-center"
            >
              <img src="@/assets/img/custom/fish.gif" width="200" /> <br />
              <h3>Oops</h3>
              <h6>No questions</h6>
              <br />
            </div>
            <div v-else class="table-responsive">
              <table class="table mb-0 table-borderless">
                <thead>
                  <tr class="userDatatable-header">
                    <th>
                      <span class="userDatatable-title">Description</span>
                    </th>
                    <th>
                      <span class="userDatatable-title">Type</span>
                    </th>
                    <th>
                      <span class="userDatatable-title">Version</span>
                    </th>
                    <th>
                      <span class="userDatatable-title">Status</span>
                    </th>
                    <th>
                      <span class="userDatatable-title float-right"
                        >Action</span
                      >
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(question, q) in filteredList" :key="q">
                    <td>
                      <div class="userDatatable-content">
                        <router-link
                          :to="{
                            name: 'classes-topics-questions-add',
                            params: {
                              qlid: question.qlid,
                              clsId: clsId,
                              tname: tname,
                              url: url,
                            },
                          }"
                          class="view"
                          v-html="
                            question.description.substring(0, 61) +
                              '<br>' +
                              question.description.substring(
                                61,
                                question.description.length
                              )
                          "
                        >
                        </router-link>
                      </div>
                    </td>
                    <td>
                      <div
                        v-if="question.type == 2"
                        class="userDatatable-content"
                      >
                        Simple
                      </div>
                      <div
                        v-else-if="question.type == 1"
                        class="userDatatable-content"
                      >
                        Dichotomous
                      </div>
                      <div
                        v-else-if="question.type == 4"
                        class="userDatatable-content"
                      >
                        Multi
                      </div>
                      <div
                        v-else-if="question.type == 8"
                        class="userDatatable-content"
                      >
                        Rank
                      </div>
                      <div
                        v-else-if="question.type == 16"
                        class="userDatatable-content"
                      >
                        Open
                      </div>
                    </td>
                    <td>
                      <div class="userDatatable-content d-inline-block">
                        <span
                          v-if="question.version"
                          class="bg-opacity-primary color-primary rounded-pill userDatatable-content-status active"
                          >{{ question.version }}</span
                        >
                      </div>
                    </td>
                    <td align="">
                      <div class="userDatatable-content d-inline-block">
                        <span
                          v-if="question.level == 2048"
                          class="bg-opacity-warning  color-warning rounded-pill userDatatable-content-status active"
                          >Review</span
                        >
                        <span
                          v-else-if="question.level == 4096"
                          class="bg-opacity-success  color-success rounded-pill userDatatable-content-status active"
                          >Approved</span
                        >
                        <span
                          v-else-if="!question.level"
                          class="bg-opacity-info  color-info rounded-pill userDatatable-content-status active"
                          >In Progress</span
                        >
                      </div>
                    </td>
                    <td>
                      <ul class="orderDatatable_actions mb-0 d-flex flex-wrap">
                        <li>
                          <router-link
                            :to="{
                              name: 'classes-topics-questions-add',
                              params: {
                                qlid: question.qlid,
                                clsId: clsId,
                                tname: tname,
                                url: url,
                              },
                            }"
                            class="remove"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="View"
                          >
                            <i class="las la-eye"></i>
                          </router-link>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <nav class="atbd-page ">
          <paginate
            v-if="totalPage > 1"
            :page-count="totalPage"
            :click-handler="loadNext"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :hide-prev-next="false"
            :container-class="'atbd-pagination d-flex justify-content-end py-3'"
            :page-class="'atbd-pagination__item'"
            :page-link-class="'atbd-pagination__link'"
            :prev-link-class="'atbd-pagination__link pagination-control'"
            :next-link-class="'atbd-pagination__link pagination-control'"
          >
          </paginate>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import Paginate from "vuejs-paginate";
import { authComputed } from "@/vuex/helpers.js";
import { apiClient } from "@/plugins/restclient.js";
import LoaderOverlay from "@/components/LoaderOverlay";
import ResponseModal from "@/components/ResponseModal.vue";
export default {
  name: "classes-topics-questions",
  components: {
    LoaderOverlay,
    ResponseModal,
    Paginate,
  },
  data() {
    return {
      isLoading: false,
      disabled: false,
      questions: [],
      totalPage: 0,
      totalQuestions: "",
      size: 10,
      searchValue: "",
      subId: "",
      clsId: "",
      topId: "",
      tname: "",
      url: "",
      currentTopic: "",
      course: [],
      qType: "",
      lType: "",
      term: [],
      mins: "",
      errMsg: "",
      secs: null,
      difficulty: 0,
      description: "",
      err: null,
      error: null,
      score: "",
      loader: {
        fullpage: true,
        active: false,
      },
      questionTypes: [
        {
          label: "DICHOTOMOUS",
          code: 1,
        },
        {
          label: "SIMPLE",
          code: 2,
        },
        {
          label: "MULTI",
          code: 4,
        },
        {
          label: "RANK",
          code: 8,
        },
        {
          label: "OPEN",
          code: 16,
        },
      ],
      labelTypes: [
        {
          label: "ALPHA",
          code: "alpha",
        },
        {
          label: "NUMBER",
          code: "number",
        },
        {
          label: "ROMAN",
          code: "roman",
        },
        {
          label: "BULLET",
          code: "bullet",
        },
        {
          label: "NONE",
          code: "none",
        },
      ],
    };
  },
  metaInfo: {
    title: "Greater Favour",
    titleTemplate: "%s | Questions",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
  computed: {
    ...authComputed,
    filteredList() {
      return this.questions.filter((question) => {
        return question.description
          .toLowerCase()
          .includes(this.searchValue.toLowerCase());
      });
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
      this.topId = this.$route.params.tid;
      this.subId = this.$route.params.sid;
      this.clsId = this.$route.params.clsId;
      this.tname = this.$route.params.tname;
      let obj = {
        subId: this.subId,
        clsId: this.clsId,
        topId: this.topId,
        tname: this.tname,
        url: this.url,
      };
      localStorage.setItem("questions", JSON.stringify(obj));
      this.getQuestions(1);
    } else {
      var jun = JSON.parse(localStorage.getItem("questions"));
      this.subId = jun.subId;
      this.clsId = jun.clsId;
      this.topId = jun.topId;
      this.tname = jun.tname;
      this.url = jun.url;
      this.getQuestions(1);
    }
  },
  methods: {
    setTopicId(value) {
      if (value != null) {
        this.qType = value.code;
      }
    },
    setLabelId(value) {
      if (value != null) {
        this.lType = value.code;
      }
    },
    getQuestions(num) {
      this.isLoading = true;
      var ts = Math.round(+new Date() / 1000);

      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      let url = `/v1/office/assessment/question/fetch/topic/${this.topId}`;
      url =
        num != undefined && num != ""
          ? `${url}?offset=${(num - 1) * this.size}&size=${this.size}`
          : url;

      apiClient
        .get(`${url}`, {
          headers: headers,
        })
        .then((res) => {
          this.isLoading = false;
          this.error = false;
          this.totalQuestions = res.data.info.total;
          this.questions = res.data.data;
          this.totalPage = Math.ceil(res.data.info.total / this.size);
        })
        .catch((err) => {
          this.isLoading = false;
          this.error = true;
          this.errMsg = err.response.data.message;
        });
    },
    loadNext(num) {
      this.getQuestions(num);
      return;
    },
    addQuestion() {
      this.isLoading = true;
      this.loader.active = true;
      this.disabled = true;
      var ts = Math.round(+new Date() / 1000);

      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      const reqBody = {
        cllid: this.clsId,
        sulid: this.subId,
        tolid: this.topId,
        duration: parseInt(this.secs),
        score: parseInt(this.score),
        description: this.description,
        difficulty: parseInt(this.difficulty),
        label: this.lType.code,
        scheme: this.term,
        type: this.qType.code,
      };

      apiClient
        .post("/v1/office/assessment/question/add", reqBody, {
          headers: headers,
        })
        .then((res) => {
          this.isLoading = false;
          this.loader.active = false;
          this.disabled = false;
          this.error = false;
          var qlid = res.data.info.qlid;
          setTimeout(() => {
            this.$refs.clsBtn.click();
            this.$router.push({
              name: "classes-topics-questions-add",
              params: {
                clsId: this.clsId,
                qlid: qlid,
                tname: this.tname,
                url: this.url,
              },
            });
          }, 1000);
        })
        .catch((err) => {
          this.isLoading = false;
          this.loader.active = false;
          this.disabled = false;
          this.error = true;
          this.$refs.resModal.open({
            type: "error",
            message: err.response.data.message,
          });
          setTimeout(() => {
            this.error = false;
          }, 5000);
        });
    },
    clearAll() {
      document.getElementsByClassName("vs__clear")[0].click();
      document.getElementsByClassName("vs__clear")[1].click();
      this.err = null;
      this.qType = "";
      this.description = "";
      this.lType = "";
      this.score = "";
      this.term = [];
      this.difficulty = 0;
      this.secs = null;
    },
    check() {
      if (this.description != "") {
        if (this.qType != "") {
          if (this.lType != "") {
            if (this.score != "" && this.score < 11) {
              if (this.term != []) {
                if (this.difficulty != 0) {
                  if (this.secs != 0 && this.secs != null) {
                    if (parseInt(this.secs) <= 300) {
                      this.addQuestion();
                    } else {
                      this.err = true;
                    }
                  } else {
                    this.err = true;
                    this.err = true;
                  }
                } else {
                  this.err = true;
                }
              } else {
                this.err = true;
              }
            } else {
              this.err = true;
            }
          } else {
            this.err = true;
          }
        } else {
          this.err = true;
        }
      } else {
        this.err = true;
      }
    },
    activate(i) {
      if (i) {
        this.activeClass = "active";
      }
    },
    prev() {
      this.$router.go(-1);
    },
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
