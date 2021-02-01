<template>
    <div class="contents">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 mb-2 sticky">
            <div
              class="breadcrumb-main p-3"
              style="background-color: #f4f5f7 !important;"
            >
              <h4 class="text-capitalize breadcrumb-title">
                All Questions
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
                    <span class="bread-item" style="color: #9299b8;"
                      >Questions</span
                    >
                    <span class="breadcrumb__seperator">
                      <span class="la la-slash"></span>
                    </span>
                  </li>
                  <li class="atbd-breadcrumb__item">
                    <span class="bread-item">Review</span>
                  </li>
                </ul>
              </h4>

            </div>
          </div>
            <div class="col-lg-12">
                <div
                    class="userDatatable orderDatatable global-shadow border py-30 px-sm-30 px-20 bg-white radius-xl w-100 mb-30">
                    <div class="project-top-wrapper d-flex justify-content-between flex-wrap mb-25 mt-n10">
                        <div class="d-flex align-items-center flex-wrap justify-content-center">
                            <div class="project-search order-search  global-shadow mt-10">
                                <form action="/" class="order-search__form">
                                    <i class="las la-search"></i>
                                    <input class="form-control mr-sm-2 border-0 box-shadow-none" type="search"
                                        placeholder="Filter by keyword" aria-label="Search">
                                </form>
                            </div><!-- End: .project-search -->
                            <div class="project-category d-flex align-items-center ml-md-30 mt-xl-10 mt-15">
                                <p class="fs-14 color-gray text-capitalize mb-10 mb-md-0  mr-10">
                                    Status :</p>
                                <div class="project-tap order-project-tap global-shadow">
                                    <ul class="nav px-1" id="ap-tab" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="ap-overview-tab" data-toggle="pill"
                                                href="#ap-overview2" role="tab" aria-controls="ap-overview"
                                                aria-selected="true">All</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="timeline-tab" data-toggle="pill" href="#timeline2"
                                                role="tab" aria-controls="timeline" aria-selected="false">Approved</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="activity-tab" data-toggle="pill" href="#activity"
                                                role="tab" aria-controls="activity" aria-selected="false">Awaiting
                                                Approval</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="draft-tab" data-toggle="pill" href="#draft"
                                                role="tab" aria-controls="draft" aria-selected="false">Disapprove</a>
                                        </li>
                                    </ul>
                                </div>
                            </div><!-- End: .project-category -->
                        </div><!-- End: .d-flex -->
                        <div class="content-center mt-10">
                        </div><!-- End: .content-center -->
                    </div><!-- End: .project-top-wrapper -->
                    <div class="tab-content" id="ap-tabContent">
                        <div class="tab-pane fade show active" id="ap-overview2" role="tabpanel"
                            aria-labelledby="ap-overview-tab">
                            <!-- Start Table Responsive -->
                            <QuestionsTable :headers="headers" :questions="questions" :params="{status:0, level:2048}"></QuestionsTable>
                            <!-- Table Responsive End -->
                        </div>
                        <div class="tab-pane fade" id="timeline2" role="tabpanel" aria-labelledby="timeline-tab">
                            <!-- Start Table Responsive -->
                            <QuestionsTable></QuestionsTable>
                            <!-- Table Responsive End -->
                        </div>
                        <div class="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="activity-tab">
                            <!-- Start Table Responsive -->
                            <QuestionsTable></QuestionsTable>
                            <!-- Table Responsive End -->
                        </div>
                        <div class="tab-pane fade" id="draft" role="tabpanel" aria-labelledby="draft-tab">
                            <!-- Start Table Responsive -->
                            <QuestionsTable></QuestionsTable>
                            <!-- Table Responsive End -->
                        </div>
                    </div>
                    <div class="d-flex justify-content-sm-end justify-content-start mt-15 pt-25 border-top">
                        <nav class="atbd-page ">
                            <paginate v-if="questions.length > 1" :page-count="totalPage" :click-handler="loadNext" :prev-text="'Prev'"
                            :next-text="'Next'" :hide-prev-next="false" :container-class="'atbd-pagination d-flex justify-content-end py-3'"
                            :page-class="'atbd-pagination__item'" :page-link-class="'atbd-pagination__link'"
                            :prev-link-class="'atbd-pagination__link pagination-control'"
                            :next-link-class="'atbd-pagination__link pagination-control'">
                            </paginate>
                        </nav>
                    </div>
                </div><!-- End: .userDatatable -->
            </div><!-- End: .col -->
        </div>
        </div>
    </div>
</template>

<script>
import Paginate from "vuejs-paginate";
import  QuestionsTable  from '@/components/QuestionsTable';
import { apiClient } from '@/plugins/restclient';
import { getTimestamp } from "@/utilities";
export default {
    components:{
        QuestionsTable,
        Paginate
    },
    data(){
        return {
            questions:[],
            totalPage: 0,
            currentPage: 0,
            size: 10,
            headers:[
                'description',
                'type',
                'version',
                'status',
                'action'
            ]
        }
    },
    created(){
        this.fetchQuestions(1);
    },
    methods:{
        fetchQuestions(num){

            let url = '/v1/office/assessment/question/fetch/state?status=0&level=2048';
            url = num != undefined && num != '' ? `${url}&offset=${(num-1)*this.size}&size=${this.size}` : url;

            apiClient.get(`${url}`,{
            headers:{
                  "X-Timestamp": getTimestamp(),
                  "X-Ulid": `${this.$store.state.user.ulid}`,
              }
            })
            .then(res => {
                this.currentPage = Number(num);
                this.questions = res.data.data;
                this.totalPage = Math.ceil(res.data.info.total / this.size);
            })
            .catch(() => {
            })
        },
        loadNext(num) {
            this.fetchQuestions(num);
            return;
        },
    }
}
</script>

<style>

</style>