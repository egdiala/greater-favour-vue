<template>
  <div class="contents">
    <div class="profile-setting">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12 mb-2 sticky">
            <div
              class="breadcrumb-main p-3"
              style="background-color: #f4f5f7 !important;"
            >
              <h4 class="text-capitalize breadcrumb-title">
                My Questions
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
                    <span class="bread-item" style="color: #9299b8;"
                      >Questions</span
                    >
                    <span class="breadcrumb__seperator">
                      <span class="la la-slash bread-item"></span>
                    </span>
                  </li>
                  <li class="atbd-breadcrumb__item">
                    <span class="bread-item">View</span>
                  </li>
                </ul>
              </h4>
            </div>
          </div>
          <div class="col-lg-12">
            <div
              class="userDatatable orderDatatable global-shadow border py-30 px-sm-30 px-20 bg-white radius-xl w-100 mb-30"
            >
              <div
                class="project-top-wrapper d-flex justify-content-between flex-wrap mb-25 mt-n10"
              >
                <div
                  class="d-flex align-items-center flex-wrap justify-content-center"
                >
                  <div class="project-search order-search  global-shadow mt-10">
                    <div class="order-search__form">
                      <i class="las la-search"></i>
                      <input
                        v-model="searchValue"
                        class="form-control mr-sm-2 border-0 box-shadow-none"
                        type="search"
                        placeholder="Filter by description"
                        aria-label="Search"
                      />
                    </div>
                  </div>
                  <!-- End: .project-search -->
                  <div
                    class="project-category d-flex align-items-center ml-md-30 mt-xl-10 mt-15"
                  >
                    <p
                      class="fs-14 color-gray text-capitalize mb-10 mb-md-0  mr-10"
                    >
                      Status :
                    </p>
                    <div class="project-tap order-project-tap global-shadow">
                      <ul class="nav px-1" id="ap-tab" role="tablist">
                        <li class="nav-item">
                          <a
                            @click="setStatus('', 1)"
                            class="nav-link active"
                            id="ap-overview-tab"
                            data-toggle="pill"
                            href="#timeline1"
                            role="tab"
                            aria-controls="ap-overview"
                            aria-selected="true"
                            >All</a
                          >
                        </li>
                        <li class="nav-item">
                          <a
                            @click="setStatus(1, 2)"
                            class="nav-link"
                            id="timeline-tab"
                            data-toggle="pill"
                            href="#timeline2"
                            role="tab"
                            aria-controls="timeline"
                            aria-selected="false"
                            >Approved</a
                          >
                        </li>
                        <li class="nav-item">
                          <a
                            @click="setStatus(0, 3)"
                            class="nav-link"
                            id="activity-tab"
                            data-toggle="pill"
                            href="#timeline3"
                            role="tab"
                            aria-controls="activity"
                            aria-selected="false"
                            >Awaiting Approval</a
                          >
                        </li>
                        <li class="nav-item">
                          <a
                            @click="setStatus(-1, 4)"
                            class="nav-link"
                            id="draft-tab"
                            data-toggle="pill"
                            href="#timeline4"
                            role="tab"
                            aria-controls="draft"
                            aria-selected="false"
                            >Disapproved</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- End: .project-category -->
                </div>
                <!-- End: .d-flex -->
                <div class="content-center mt-10"></div>
                <!-- End: .content-center -->
              </div>
              <!-- End: .project-top-wrapper -->
              <div class="tab-content" id="ap-tabContent">
                <MyQuestionsTable
                  :questions="filteredQuestions"
                  :apiQuestions="questions"
                  :id="id"
                  :headers="headers"
                  :isLoading="isLoading"
                  :search="searchValue"
                />
              </div>
              <div
                class="d-flex justify-content-sm-end justify-content-start mt-15 pt-25 border-top"
              >
                <nav class="atbd-page ">
                  <paginate
                    v-if="totalPage > 1"
                    :page-count="totalPage"
                    :click-handler="loadNext"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :hide-prev-next="false"
                    :container-class="
                      'atbd-pagination d-flex justify-content-end py-3'
                    "
                    :page-class="'atbd-pagination__item'"
                    :page-link-class="'atbd-pagination__link'"
                    :prev-link-class="
                      'atbd-pagination__link pagination-control'
                    "
                    :next-link-class="
                      'atbd-pagination__link pagination-control'
                    "
                  >
                  </paginate>
                </nav>
              </div>
            </div>
            <!-- End: .userDatatable -->
          </div>
          <!-- End: .col -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paginate from "vuejs-paginate";
import { authComputed } from "@/vuex/helpers.js";
import { apiClient } from "@/plugins/restclient.js";
import MyQuestionsTable from "@/components/MyQuestionsTable.vue";
export default {
  name: "account-questions",
  components: {
    MyQuestionsTable,
    Paginate,
  },
  data() {
    return {
      isLoading: false,
      questions: [],
      totalPage: 0,
      currentPage: 0,
      size: 10,
      id: 1,
      statusCode: "",
      searchValue: "",
      headers: "Status",
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
    filteredQuestions() {
      return this.questions.filter((question) => {
        return question.status === this.statusCode && question.level;
      });
    },
  },
  created() {
    this.getQuestions(1);
  },
  beforeMount() {
    if (this.loggedIn == false) {
      this.$router.push({ path: "/login" });
    }
  },
  // mounted() {
  //   this.getQuestions();
  // },
  methods: {
    getQuestions(num) {
      var ts = Math.round(+new Date() / 1000);

      this.isLoading = true;
      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      let url = `/v1/office/assessment/question/fetch/user/${this.$store.state.user.ulid}`;
      url =
        num != undefined && num != ""
          ? `${url}?offset=${(num - 1) * this.size}&size=${this.size}`
          : url;

      apiClient
        .get(`${url}`, { headers: headers })
        .then((res) => {
          this.isLoading = false;
          this.currentPage = Number(num);
          this.totalPage = Math.ceil(res.data.info.total / this.size);
          this.questions = res.data.data;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    loadNext(num) {
      this.getQuestions(num);
      return;
    },
    setStatus(id, tab) {
      this.statusCode = id;
      this.id = tab;
      if (this.id == 1) {
        this.headers = "Status";
      } else {
        this.headers = "";
      }
    },
  },
};
</script>

<style scoped>
.bread-item:hover {
  color: #9299b8 !important;
}
</style>
