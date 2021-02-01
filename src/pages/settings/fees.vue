<template>
  <div class="contents">
    <div class="container-fluid">
      <div class="profile-content mb-50">
        <div class="row">
          <div class="col-lg-12 mb-2 sticky">
            <div
              class="breadcrumb-main p-3"
              style="background-color: #f4f5f7 !important;"
            >
              <h4 class="text-capitalize breadcrumb-title">
                Content Fees
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
                    <span class="bread-item">Content Fees</span>
                  </li>
                </ul>
              </h4>
              <div
                class="breadcrumb-action justify-content-center flex-wrap"
              ></div>
            </div>
          </div>
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
          <div v-if="!isLoading && fees.length < 1" class="col-12">
            <div class="card card-default card-md mb-4 no-content text-center">
              <div class="card-body">
                <img
                  src="@/assets/img/custom/puppy-no-content.png"
                  width="200"
                />
                <br />
                <h3>Oops</h3>
                <h6>No Fees here...</h6>
              </div>
            </div>
          </div>

          <!-- Data Tables and Certifications Ends -->
          <div
            v-for="(fee, f) in fees"
            :key="f"
            class="col-xl-4 col-lg-4 col-sm-6 mb-30"
          >
            <div class="card h-100">
              <div class="card-body p-30">
                <div class="pricing d-flex align-items-center">
                  <span
                    v-if="sortTags(fee.ref) == 'approval'"
                    class="pricing__tag color-dark order-bg-opacity-dark rounded-pill"
                    >{{ fee.ref }}</span
                  >
                  <span
                    v-if="sortTags(fee.ref) == 'normal'"
                    class="pricing__tag color-primary order-bg-opacity-primary rounded-pill"
                    >{{ fee.ref }}</span
                  >
                  <span
                    v-if="sortTags(fee.ref) == 'question'"
                    class="pricing__tag color-secondary order-bg-opacity-secondary rounded-pill"
                    >{{ fee.ref }}</span
                  >
                  <span
                    v-if="sortTags(fee.ref) == 'review'"
                    class="pricing__tag atbd-tag tag-info tag-transparented rounded-pill"
                    >{{ fee.ref }}</span
                  >
                </div>
                <div class="pricing__price rounded">
                  <p
                    class="pricing_value display-3 color-dark d-flex align-items-center text-capitalize fw-600 mb-1"
                  >
                    <sup>₦</sup>{{ fee.value / 100 }}
                    <small class="pricing_user">Per question</small>
                  </p>
                </div>
              </div>
            </div>
            <!-- End: .card -->
          </div>
          <!-- End: .col -->
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <div
        v-if="erro"
        class="alert alert-primary"
        role="alert"
        style="position: fixed; top: 10%; right: 1em; z-index: 99999;"
      >
        <div class="alert-content">
          <p>
            <i class="las la-exclamation-circle"></i>&nbsp;&nbsp;
            {{ errMsg }}
          </p>
        </div>
      </div>
    </transition>
    <LoaderOverlay
      :active="loader.active"
      :fullpage="loader.fullpage"
      bgColor="#2a2a2a55"
      zIndex="99999"
    ></LoaderOverlay>
  </div>
</template>

<script>
import { authComputed } from "@/vuex/helpers.js";
import { apiClient } from "@/plugins/restclient.js";
import LoaderOverlay from "@/components/LoaderOverlay";

export default {
  name: "settings-fees",
  components: {
    LoaderOverlay,
  },
  data() {
    return {
      isLoading: false,
      fees: [],
      loader: {
        fullpage: true,
        active: false,
      },
      erro: false,
      errMsg: "",
    };
  },
  metaInfo: {
    title: "Greater Favour",
    titleTemplate: "%s | Fees",
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
    if (!this.$route.params.fees || this.$route.params.fees) {
      this.getFees();
    } else {
      this.fees = this.$route.params.fees;
    }
  },
  methods: {
    getFees() {
      var ts = Math.round(+new Date() / 1000);

      this.isLoading = true;
      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      apiClient
        .get(`/v1/engine/core/environment`, { headers: headers })
        .then((res) => {
          this.isLoading = false;
          var response = res.data.info;
          var fee = response.fees;
          this.fees = Object.keys(fee).map((i) => fee[i]);
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    sortTags(data) {
      var arr = data.split(".");
      return arr[0];
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
