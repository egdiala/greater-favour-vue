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
                My Documents
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
                    <span class="bread-item">Document upload</span>
                  </li>
                </ul>
              </h4>

              <div class="breadcrumb-action justify-content-center flex-wrap">
                <div @click="clear()" class="action-btn">
                  <a
                    href=""
                    class="btn btn-sm btn-primary btn-add"
                    data-toggle="modal"
                    data-target="#upload-file"
                  >
                    <i class="la la-plus"></i> Upload</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal fade new-member"
            id="upload-file"
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
                    Document Uploads (PDF Only)
                  </h6>
                  <button
                    id="closeDoc"
                    @click="clear()"
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <i class="las la-times fs-16"></i>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="new-member-modal">
                    <form @submit.prevent="addDocument()">
                      <div class="form-group">
                        <label for="name1">Document Type</label>
                        <v-select
                          v-model="docTitle"
                          label="category"
                          :options="category"
                        ></v-select>
                        <transition
                          v-if="(errors && docTitle == '') || docTitle == null"
                          name="slide-fade"
                          ><span class="text-danger"
                            >Document Type is required.</span
                          ></transition
                        >
                      </div>
                      <div class="add-product__body-img px-sm-40 px-20">
                        <form
                          v-cloak
                          class="box"
                          @drop.prevent="addFile"
                          @dragover.prevent
                          enctype="multipart/form-data"
                        >
                          <span class="upload-product-img px-10 d-block">
                            <span class="file-upload">
                              <span data-feather="upload"></span>
                              <input
                                type="file"
                                id="upload"
                                class="file-upload__input"
                                accept="application/pdf"
                                @change="Document_onFileChanged"
                                name="file-upload"
                              />
                            </span>
                            <span class="pera">Drag and drop a file</span>
                            <span
                              >or
                              <label
                                style="cursor: pointer;"
                                for="upload"
                                class="color-secondary"
                                >Browse</label
                              >
                              to choose a file</span
                            >
                          </span>
                        </form>
                        <transition
                          v-if="(errors && doc == '') || doc == null"
                          name="slide-fade"
                          ><span class="text-danger"
                            >Select a document to upload.</span
                          ></transition
                        >
                        <div
                          v-if="doc.base64"
                          class="upload-product-media d-flex justify-content-between align-items-center mt-25"
                        >
                          <div class="upload-media-area d-flex">
                            <object
                              v-if="doc.type == 'application/pdf'"
                              width="100"
                              height="80"
                              :data="doc.base64"
                              :type="doc.type"
                            >
                              <embed :src="doc.base64" :type="doc.type" />
                            </object>
                            <!-- <iframe :src="doc.base64" alt="img" style="border-radius: 6px; width: 100px; height: 80px; flex: 1; overflow: hidden;" scrolling="no"></iframe> -->
                            <div
                              class=" upload-media-area__title  d-flex flex-wrap align-items-center ml-10"
                            >
                              <div>
                                <p>{{ doc.name }}</p>
                                <span>{{ parseInt(doc.size / 1000) }} KB</span>
                              </div>
                              <div class="upload-media-area__btn">
                                <button
                                  type="button"
                                  class="transparent rounded-circle wh-30 border-0 color-danger"
                                  @click="clear()"
                                >
                                  <i class="las la-trash-alt"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="button-group d-flex pt-25">
                        <button
                          type="submit"
                          class="btn btn-primary btn-default btn-squared text-capitalize float-right"
                        >
                          add Document
                        </button>
                        <button
                          class="btn btn-light btn-default btn-squared fw-400 text-capitalize float-right b-light color-light"
                          data-dismiss="modal"
                          aria-label="Close"
                          @click="clear()"
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

          <!-- Data Tables and Certifications Ends -->

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
              <div v-if="!isLoading && documents.length < 1" class="col-12">
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
                    <h6>No Document here...</h6>
                  </div>
                </div>
              </div>
              <div v-if="!isLoading && documents.length > 0" class="col-lg-12">
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
                        <div class="order-search__form">
                          <span><i class="las la-search"></i></span>
                          <input
                            v-model="searchValue"
                            class="form-control mr-sm-2 border-0 box-shadow-none"
                            type="search"
                            placeholder="Filter by document"
                            aria-label="Search"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table mb-0 table-borderless border-0">
                      <thead>
                        <tr class="userDatatable-header">
                          <th scope="col">
                            <span class="userDatatable-title">Document</span>
                          </th>
                          <th scope="col">
                            <span class="userDatatable-title">Note</span>
                          </th>
                          <th scope="col" class="">
                            <span class="userDatatable-title">Status</span>
                          </th>
                          <th scope="col">
                            <span class="userDatatable-title float-right"
                              >Action</span
                            >
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(docs, d) in filteredList" :key="d">
                          <td>
                            <div class="orderDatatable-title">
                              <a
                                :href="
                                  `${envVariables.VUE_APP_STORAGE_BUCKET}${docs.src}`
                                "
                                target="_blank"
                              >
                                {{ docs.name }}
                              </a>
                            </div>
                          </td>
                          <td>
                            <div class="d-flex align-items-center">
                              <p v-if="docs.note" class="d-block mb-0">
                                {{ docs.note }}
                              </p>
                              <p
                                v-else
                                class="d-block mb-0"
                                style="color: #9299b8;"
                              >
                                No Note.
                              </p>
                            </div>
                          </td>
                          <td>
                            <div class="orderDatatable-title">
                              <span
                                v-if="docs.status == 0"
                                class="atbd-tag tag-warning tag-transparented"
                                >Pending</span
                              >
                              <span
                                v-if="docs.status == 1"
                                class="atbd-tag tag-success tag-transparented"
                                >Approved</span
                              >
                              <span
                                v-if="docs.status == -1"
                                class="atbd-tag tag-danger tag-transparented"
                                >Disapproved</span
                              >
                            </div>
                          </td>
                          <td>
                            <ul
                              class="orderDatatable_actions mb-0 d-flex flex-wrap float-right"
                            >
                              <li>
                                <a
                                  :href="
                                    `${envVariables.VUE_APP_STORAGE_BUCKET}${docs.src}`
                                  "
                                  target="_blank"
                                  class="remove"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="View"
                                >
                                  <i class="las la-eye"></i>
                                </a>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- <div class="d-flex justify-content-end mt-15 pt-25 border-top">
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
                                        </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ResponseModal ref="resModal" />
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
import ResponseModal from "@/components/ResponseModal.vue";

export default {
  name: "account-document",
  components: {
    LoaderOverlay,
    ResponseModal,
  },
  data() {
    return {
      isLoading: false,
      documents: [],
      files: [],
      doc: "",
      docTitle: "",
      category: ["AGREEMENT", "NDA", "CV", "WAEC", "NCE", "BSC", "OND", "HND"],
      loader: {
        fullpage: true,
        active: false,
      },
      erro: false,
      errors: false,
      searchValue: "",
      errMsg: "",
    };
  },
  metaInfo: {
    title: "Greater Favour",
    titleTemplate: "%s | Verify Document",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
  computed: {
    ...authComputed,
    filteredList() {
      return this.documents.filter((doc) => {
        return doc.name.toLowerCase().includes(this.searchValue.toLowerCase());
      });
    },
  },
  beforeMount() {
    if (this.loggedIn == false) {
      this.$router.push({ path: "/login" });
    }
  },
  mounted() {
    this.getDocuments();
  },
  methods: {
    getDocuments() {
      var ts = Math.round(+new Date() / 1000);

      this.isLoading = true;
      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      apiClient
        .get(
          `/v1/office/account/document/list/${this.$store.state.user.ulid}`,
          { headers: headers }
        )
        .then((res) => {
          this.isLoading = false;
          var docs = res.data.info.documents;
          this.documents = Object.keys(docs).map((i) => docs[i]);
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    addDocument() {
      if (!this.doc && !this.docTitle) {
        this.errors = true;
        return;
      }
      if (this.doc == null || this.doc == "") {
        this.errors = true;
        return;
      }
      if (this.docTitle == "" || this.docTitle == null) {
        this.errors = true;
        return;
      }
      var ts = Math.round(+new Date() / 1000);

      this.isLoading = true;
      this.loader.active = true;
      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      const reqBody = {
        title: `${this.docTitle} document`,
        data: this.doc.base64,
      };

      apiClient
        .post(`/v1/office/account/document/add`, reqBody, { headers: headers })
        .then((res) => {
          this.isLoading = false;
          this.loader.active = false;
          this.$refs.resModal.open({
            type: "success",
            message: res.data.message,
          });
          this.getDocuments();
          setTimeout(() => {
            document.getElementById("closeDoc").click();
          }, 100);
        })
        .catch((err) => {
          this.isLoading = false;
          this.loader.active = false;
          if (err.response) {
            this.$refs.resModal.open({
              type: "error",
              message: err.response.data.message,
            });
          }
          setTimeout(() => {
            this.erro = false;
          }, 5000);
        });
    },
    Document_onFileChanged(event) {
      var selectedFile = event.target.files[0];
      if (!selectedFile) return;
      var reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      let baseFile = "";
      reader.onload = () => {
        // <------ use arrow function
        baseFile = reader.result;
        const docs = {
          name: event.target.files[0].name,
          size: event.target.files[0].size,
          lastModifiedDate: event.target.files[0].lastModifiedDate,
          base64: baseFile,
          type: event.target.files[0].type,
        };
        this.$emit("input", docs);
        this.doc = docs;
      };
    },
    addFile(e) {
      let droppedFile = e.dataTransfer.files[0];
      if (!droppedFile) return;
      var reader = new FileReader();
      reader.readAsDataURL(droppedFile);
      let baseFile = "";
      reader.onload = () => {
        // <------ use arrow function
        baseFile = reader.result;
        const docs = {
          name: droppedFile.name,
          size: droppedFile.size,
          lastModifiedDate: droppedFile.lastModifiedDate,
          base64: baseFile,
        };
        this.$emit("input", docs);
        this.doc = docs;
      };
    },
    clear() {
      this.errors = null;
      this.docTitle = "";
      this.doc = "";
      document.getElementById("upload").value = "";
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
