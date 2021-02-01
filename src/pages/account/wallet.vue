<template>
  <div class="contents">
    <div class="profile-setting ">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12 mb-2 sticky">
            <div
              class="breadcrumb-main p-3"
              style="background-color: #f4f5f7 !important;"
            >
              <h4 class="text-capitalize breadcrumb-title">
                My Wallet
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
                      >Account</span
                    >
                    <span class="breadcrumb__seperator">
                      <span class="la la-slash bread-item"></span>
                    </span>
                  </li>
                  <li class="atbd-breadcrumb__item">
                    <span class="bread-item">Wallet</span>
                  </li>
                </ul>
              </h4>
            </div>
          </div>

          <div class="col-lg-6 mb-25">
            <!-- Card 1 -->
            <div
              class="ap-po-details radius-xl bg-white d-flex justify-content-between rel-pos"
            >
              <div>
                <div class="overview-content">
                  <h1>{{ approved }} | {{ questionCount }}</h1>
                  <h4 class="no-marg-btm txt-under">Approved | Questions</h4>
                  <div
                    class="ap-po-details-time atbd-button-list d-flex flex-wrap"
                  >
                    <router-link :to="{ name: 'account-questions' }">
                      <button
                        class="btn btn-warning btn-default btn-squared btn-transparent-warning"
                      >
                        <i class="las la-eye"></i> View
                      </button>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="side-icon">
                <img src="@/assets/img/custom/exam.svg" width="80" />
              </div>
            </div>
            <!-- Card 1 End -->
          </div>

          <div class="col-lg-6 mb-25">
            <!-- Card 3 -->
            <div
              class="ap-po-details radius-xl bg-white d-flex justify-content-between rel-pos"
            >
              <div>
                <div class="overview-content">
                  <h1>₦{{ !wallet.balance ? 0 : wallet.balance / 100 }}</h1>
                  <h4 class="no-marg-btm txt-under">Wallet Balance</h4>
                  <div class="ap-po-details-time">
                    <button class="btn btn-default btn-squared btn-success">
                      <i class="las la-money-bill-wave"></i> Cash Out
                    </button>
                  </div>
                </div>
              </div>
              <div class="side-icon">
                <img src="@/assets/img/custom/wallet-icon.svg" width="80" />
              </div>
            </div>
            <!-- Card 3 End -->
          </div>

          <div class="container-fluid">
            <div class="row">
              <div v-if="isLoading && !$store.state.asyncLoader" class="col-12">
                <div
                  class="spin-container text-center"
                  style="margin-top: 10%;"
                >
                  <div class="atbd-spin-dots spin-lg">
                    <span class="spin-dot badge-dot dot-primary"></span>
                    <span class="spin-dot badge-dot dot-primary"></span>
                    <span class="spin-dot badge-dot dot-primary"></span>
                    <span class="spin-dot badge-dot dot-primary"></span>
                  </div>
                </div>
              </div>
              <div v-if="!isLoading && transactions.length < 1" class="col-12">
                <div
                  class="card card-default card-md mb-4 no-content text-center"
                >
                  <div class="card-body">
                    <img
                      src="@/assets/img/custom/puppy-no-content.png"
                      width="200"
                    />
                    <br />
                    <h3>Oops</h3>
                    <h6>No Transaction yet...</h6>
                  </div>
                </div>
              </div>
              <div
                v-if="!isLoading && transactions.length > 0"
                class="col-lg-12"
              >
                <div
                  class="userDatatable orderDatatable sellerDatatable global-shadow border mb-30 py-30 px-sm-30 px-20 bg-white radius-xl w-100"
                >
                  <div
                    class="project-top-wrapper d-flex justify-content-between flex-wrap mb-25 mt-n10"
                  >
                    <div
                      class="d-flex align-items-center flex-wrap justify-content-center"
                    >
                      <div
                        class="project-search order-search  global-shadow mt-10"
                      >
                        <h4>Transaction history</h4>
                      </div>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table mb-0 table-borderless border-0">
                      <thead>
                        <tr class="userDatatable-header">
                          <th scope="col">
                            <span class="userDatatable-title">Ref</span>
                          </th>
                          <th scope="col">
                            <span class="userDatatable-title">Description</span>
                          </th>
                          <th scope="col" class="">
                            <span class="userDatatable-title float-right"
                              >Credit</span
                            >
                          </th>
                          <th scope="col">
                            <span class="userDatatable-title float-right"
                              >Debit</span
                            >
                          </th>
                          <th scope="col">
                            <span class="userDatatable-title float-right"
                              >Date</span
                            >
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(trans, t) in transactions" :key="t">
                          <td>
                            <div class="d-flex align-items-center">
                              <div class="orderDatatable-title">
                                <p class="d-block mb-0">
                                  {{ trans.ref }}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="orderDatatable-title">
                              <a href="#"> {{ trans.dec }} </a>
                            </div>
                          </td>
                          <td>
                            <div class="orderDatatable-title float-right">
                              <span
                                v-if="trans.credit > 0"
                                class="text-success"
                                >{{ trans.credit }}</span
                              >
                              <span v-else>{{ trans.credit }}</span>
                            </div>
                          </td>
                          <td>
                            <div class="orderDatatable-title float-right">
                              <span
                                v-if="trans.debit > 0"
                                class="text-danger"
                                >{{ trans.debit }}</span
                              >
                              <span v-else>{{ trans.debit }}</span>
                            </div>
                          </td>
                          <td>
                            <div class="orderDatatable-title float-right">
                              <span class="">{{ formatDate(trans.date) }}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="d-flex justify-content-end mt-15 pt-25 border-top"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paginate from "vuejs-paginate";
import { authComputed } from "@/vuex/helpers.js";
import { apiClient } from "@/plugins/restclient.js";
import moment from "moment";
export default {
  name: "account-wallet",
  components: {
    Paginate,
  },
  data() {
    return {
      isLoading: false,
      wallet: {},
      approved: 0,
      status: 1,
      level: 2048,
      questionCount: 0,
      transactions: [],
      totalPage: 0,
      currentPage: 0,
      size: 10,
    };
  },
  metaInfo: {
    title: "Greater Favour",
    titleTemplate: "%s | Wallet",
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
  created() {
    this.getApproved();
    this.getWallet(1);
  },
  mounted() {
    this.getQuestions();
  },
  methods: {
    getWallet(num) {
      var ts = Math.round(+new Date() / 1000);

      this.isLoading = true;
      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      let url = `/v1/office/account/wallet/transaction/fetch`;
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
          this.currentPage = Number(num);
          this.totalPage = Math.ceil(res.data.info.total / this.size);
          this.transactions = res.data.data;
          this.wallet = res.data.info;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    getQuestions() {
      var ts = Math.round(+new Date() / 1000);

      this.isLoading = true;
      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      apiClient
        .get(
          `/v1/office/assessment/question/fetch/user/${this.$store.state.user.ulid}`,
          { headers: headers }
        )
        .then((res) => {
          this.isLoading = false;
          this.questionCount = res.data.info.total;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    getApproved() {
      var ts = Math.round(+new Date() / 1000);

      this.isLoading = true;
      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      apiClient
        .get(
          `/v1/office/assessment/question/fetch/state?status=${this.status}&level=${this.level}`,
          { headers: headers }
        )
        .then((res) => {
          this.isLoading = false;
          this.approved = res.data.info.total;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    formatDate(date) {
      return moment(date).format("LLL");
    },
  },
};
</script>

<style scoped>
.bread-item:hover {
  color: #9299b8 !important;
}
</style>
