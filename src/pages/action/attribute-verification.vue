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
                Attribute Verification
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
                      >Verification</span
                    >
                    <span class="breadcrumb__seperator">
                      <span class="la la-slash"></span>
                    </span>
                  </li>
                  <li class="atbd-breadcrumb__item">
                    <span class="bread-item">Attribute</span>
                  </li>
                </ul>
              </h4>

            </div>
          </div>
          <div class="container-fluid">
            <div class="row">
              <div v-if="isLoading && !$store.state.asyncLoader" class="col-12">
                <div
                  class="spin-container text-center"
                  style="margin-top: 20%;"
                >
                  <div class="atbd-spin-dots spin-lg">
                    <span class="spin-dot badge-dot dot-primary"></span>
                    <span class="spin-dot badge-dot dot-primary"></span>
                    <span class="spin-dot badge-dot dot-primary"></span>
                    <span class="spin-dot badge-dot dot-primary"></span>
                  </div>
                </div>
              </div>
              <div
                v-else-if="!isLoading && attributes.length < 1"
                class="col-12"
              >
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
                    <h6>No Attributes here...</h6>
                  </div>
                </div>
              </div>
              <div
                v-else-if="!isLoading && attributes.length > 0"
                class="col-12"
              >
                <div
                  class="userDatatable orderDatatable sellerDatatable global-shadow border mb-30 py-30 px-sm-30 px-20 bg-white radius-xl w-100"
                >
                  <div class="table-responsive">
                    <table class="table mb-0 table-borderless border-0">
                      <thead>
                        <tr class="userDatatable-header">
                          <th scope="col">
                            <span class="userDatatable-title">Note</span>
                          </th>
                          <th scope="col">
                            <span class="userDatatable-title">Status</span>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr v-for="(attribute, f) in attributes" :key="f">
                          <td>
                            <div class="d-flex align-items-center">
                              <div class="orderDatatable-title">
                                <p v-if="attribute.note" class="d-block mb-0">
                                  {{ attribute.note }}
                                </p>
                                <p v-else class="d-block mb-0">
                                  No note.
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div
                              v-if="attribute.status == 1"
                              class="orderDatatable-title"
                            >
                              <span
                                class="atbd-tag tag-success tag-transparented"
                                >Approved</span
                              >
                            </div>
                            <div
                              v-if="attribute.status == 0"
                              class="orderDatatable-title"
                            >
                              <span
                                class="atbd-tag tag-warning tag-transparented"
                                >Pending</span
                              >
                            </div>
                            <div
                              v-if="attribute.status == -1"
                              class="orderDatatable-title"
                            >
                              <span
                                class="atbd-tag tag-danger tag-transparented"
                                >Declined</span
                              >
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
                </div>
              </div>
              <!-- ends: col-12 -->
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
export default {
  components: {
    Paginate,
  },
  data() {
    return {
      isLoading: false,
      totalPage: 0,
      size: 10,
      attributes: [],
    };
  },
  metaInfo: {
    title: "Greater Favour",
    titleTemplate: "%s | Attribute Verification",
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
    this.getAttributes(1);
  },
  methods: {
    getAttributes(num) {
      var ts = Math.round(+new Date() / 1000);

      this.isLoading = true;
      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      let url = "/v1/office/adjudicate/account/attribute";
      url =
        num != undefined && num != ""
          ? `${url}?offset=${(num - 1) * this.size}&size=${this.size}`
          : url;

      apiClient
        .get(`${url}`, { headers: headers })
        .then((res) => {
          this.isLoading = false;
          this.totalPage = Math.ceil(res.data.info.total / this.size);
          this.attributes = res.data.data;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    loadNext(num) {
      this.getAttributes(num);
      return;
    },
  },
};
</script>
