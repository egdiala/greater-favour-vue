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
                Normalisation
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
                    <span class="bread-item">Normalisation</span>
                  </li>
                </ul>
              </h4>

              <div class="breadcrumb-action justify-content-center flex-wrap">
                <div class="action-btn">
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
              <div v-else-if="!isLoading && files.length < 1" class="col-12">
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
                    <h6>No Topics here...</h6>
                  </div>
                </div>
              </div>
              <div v-else-if="!isLoading && files.length > 0" class="col-12">
                <div
                  class="userDatatable orderDatatable sellerDatatable global-shadow border mb-30 py-30 px-sm-30 px-20 bg-white radius-xl w-100"
                >
                  <div class="table-responsive">
                    <table class="table mb-0 table-borderless border-0">
                      <thead>
                        <tr class="userDatatable-header">
                          <th scope="col">
                            <span class="userDatatable-title">Subject</span>
                          </th>
                          <th scope="col">
                            <span class="userDatatable-title">Topic</span>
                          </th>
                          <th scope="col">
                            <span class="userDatatable-title">Questions</span>
                          </th>
                          <th scope="col">
                            <span class="userDatatable-title"
                              >File Uploaded</span
                            >
                          </th>
                          <th scope="col" class="">
                            <span class="userDatatable-title">Claimed</span>
                          </th>
                          <th scope="col" class="">
                            <span class="userDatatable-title">Status</span>
                          </th>
                          <th scope="col">
                            <span class="userDatatable-title float-right"
                              >Actions</span
                            >
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr v-for="(file, f) in files" :key="f">
                          <td>
                            <div class="d-flex align-items-center">
                              <div class="orderDatatable-title">
                                <p class="d-block mb-0">
                                  {{ subjectFilter(file.sulid)[0].name }}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="d-flex align-items-center">
                              <div class="orderDatatable-title">
                                <p class="d-block mb-0">
                                  {{ topicFilter(file.tolid)[0].name }}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="d-flex align-items-center">
                              <div class="orderDatatable-title">
                                <p class="d-block mb-0">
                                  {{ file.questions }}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="orderDatatable-title">
                              <a
                                v-if="file.file != '*unclaimed*'"
                                :href="
                                  `${envVariables.VUE_APP_STORAGE_BUCKET}${file.file}`
                                "
                                target="_blank"
                              >
                                Document-{{ file.nolid }}.pdf
                              </a>
                              <a v-else href="" @click.prevent>
                                Document-{{ file.nolid }}.pdf
                              </a>
                            </div>
                          </td>
                          <td>
                            <div v-if="file.claim" class="orderDatatable-title">
                              <span
                                class="atbd-tag tag-success tag-transparented"
                                >Yes</span
                              >
                            </div>
                            <div v-else class="orderDatatable-title">
                              <span
                                class="atbd-tag tag-danger tag-transparented"
                                >No</span
                              >
                            </div>
                          </td>
                          <td>
                            <div
                              v-if="file.status == 1"
                              class="orderDatatable-title"
                            >
                              <span
                                class="atbd-tag tag-success tag-transparented"
                                >Approved</span
                              >
                            </div>
                            <div
                              v-if="file.status == 0"
                              class="orderDatatable-title"
                            >
                              <span
                                class="atbd-tag tag-warning tag-transparented"
                                >Pending</span
                              >
                            </div>
                            <div
                              v-if="file.status == -1"
                              class="orderDatatable-title"
                            >
                              <span
                                class="atbd-tag tag-danger tag-transparented"
                                >Declined</span
                              >
                            </div>
                          </td>
                          <td>
                            <ul
                              class="orderDatatable_actions mb-0 d-flex flex-wrap float-right"
                            >
                              <li v-if="file.file != '*unclaimed*'">
                                <a
                                  :href="
                                    `${envVariables.VUE_APP_STORAGE_BUCKET}${file.file}`
                                  "
                                  target="_blank"
                                  class="remove"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="View Question"
                                >
                                  <i class="las la-eye"></i>
                                </a>
                              </li>
                              <li v-else>
                                <a
                                  href=""
                                  @click.prevent
                                  target="_blank"
                                  class="remove"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="No View"
                                >
                                  <i class="las la-eye-slash"></i>
                                </a>
                              </li>
                              <li v-if="!file.claim">
                                <a
                                  href=""
                                  @click.prevent="claim(file.nolid)"
                                  class="remove"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Claim"
                                >
                                  <i class="fas fa-handshake"></i>
                                </a>
                              </li>
                              <li v-else>
                                <a
                                  href=""
                                  @click.prevent
                                  class="remove"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Claimed"
                                >
                                  <i class="fas fa-handshake-slash"></i>
                                </a>
                              </li>
                              <div class="dropdown dropleft mt-2 mx-2">
                                <a
                                  href="#"
                                  role="button"
                                  id="revenue"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i class="las la-ellipsis-v fs-24"></i>
                                </a>
                                <div
                                  class="dropdown-menu"
                                  aria-labelledby="revenue"
                                >
                                  <a
                                    class="dropdown-item"
                                    href="#"
                                    @click.prevent="approve(file.nolid, 1)"
                                    >Approve</a
                                  >
                                  <a
                                    class="dropdown-item"
                                    href="#"
                                    @click.prevent="approve(file.nolid, -1)"
                                    >Decline</a
                                  >
                                </div>
                              </div>
                            </ul>
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
    <div
      class="modal fade new-member"
      id="upload-file"
      role="dialog"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content  radius-xl">
          <div class="modal-header">
            <h6 class="modal-title fw-500" id="staticBackdropLabel">
              Document Uploads
            </h6>
            <button
              id="closeDoc"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span><i class="las la-times"></i></span>
            </button>
          </div>
          <div class="modal-body">
            <div class="new-member-modal">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group mb-20">
                    <label for="name47">Select Class</label>
                    <div class="category-member">
                      <v-select
                        v-model="selectedClass"
                        label="nick"
                        :options="allClasses"
                      ></v-select>
                      <transition name="slide-fade"
                        ><span
                          v-if="
                            (errors && selectedClass == '') ||
                              selectedClass == null
                          "
                          class="text-danger"
                          >Select a class.</span
                        ></transition
                      >
                    </div>
                  </div>
                </div>
                <transition name="slide-fade">
                  <div v-if="selectedClass" class="col-sm-12">
                    <div class="form-group mb-20">
                      <label for="name47">Select Subject</label>
                      <div class="category-member">
                        <v-select
                          v-model="selectedSubject"
                          label="name"
                          :options="filteredSubjects"
                        ></v-select>
                        <transition name="slide-fade"
                          ><span
                            v-if="
                              (errors && selectedSubject == '') ||
                                selectedSubject == null
                            "
                            class="text-danger"
                            >Select a subject.</span
                          ></transition
                        >
                      </div>
                    </div>
                  </div>
                </transition>
                <transition name="slide-fade">
                  <div v-if="selectedSubject" class="col-sm-12">
                    <div class="form-group mb-20">
                      <label for="name47">Select Topic</label>
                      <div class="category-member">
                        <v-select
                          v-model="selectedTopic"
                          label="name"
                          :options="filteredTopics"
                        ></v-select>
                        <transition name="slide-fade"
                          ><span
                            v-if="
                              (errors && selectedTopic == '') ||
                                selectedTopic == null
                            "
                            class="text-danger"
                            >Select a topic.</span
                          ></transition
                        >
                      </div>
                    </div>
                  </div>
                </transition>
                <transition name="slide-fade">
                  <div v-if="selectedTopic" class="col-sm-12">
                    <div class="form-group mb-20">
                      <label for="name47">Total Number of Questions</label>
                      <div class="category-member">
                        <input
                          v-model="count"
                          class="form-control"
                          type="text"
                          placeholder="Total number of questions (min. 10)"
                        />
                        <transition name="slide-fade"
                          ><span
                            v-if="(errors && count == '') || count == null"
                            class="text-danger"
                            >Enter total number of questions.</span
                          ></transition
                        >
                      </div>
                    </div>
                  </div>
                </transition>
              </div>

              <div class="add-product__body-img px-sm-40 px-20">
                <form
                  v-if="!doc.base64"
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
                        id="upload"
                        class="file-upload__input"
                        type="file"
                        accept="application/pdf"
                        @change="Document_onFileChanged"
                        name="file-upload"
                      />
                    </span>
                    <span class="pera">Drag and drop a document</span>
                    <span
                      >or
                      <label
                        style="cursor: pointer;"
                        for="upload"
                        class="color-secondary"
                        >Browse</label
                      >
                      to choose a document</span
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
                          <i class="las la-trash-alt fs-24"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="button-group d-flex pt-25">
                <button
                  class="btn btn-primary btn-default btn-squared text-capitalize float-right"
                  @click="addDocument()"
                >
                  Add File
                </button>
                <button
                  class="btn btn-light btn-default btn-squared fw-400 text-capitalize float-right b-light color-light"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  cancel
                </button>
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
import Paginate from "vuejs-paginate";
import { authComputed } from "@/vuex/helpers.js";
import { apiClient } from "@/plugins/restclient.js";
import { mapGetters } from "vuex";
import LoaderOverlay from "@/components/LoaderOverlay";
import ResponseModal from "@/components/ResponseModal.vue";
export default {
  name: "questions-normalisation",
  components: {
    LoaderOverlay,
    ResponseModal,
    Paginate,
  },
  data() {
    return {
      isLoading: false,
      errors: false,
      totalPage: 0,
      size: 10,
      files: [],
      loader: {
        fullpage: true,
        active: false,
      },
      selectedClass: "",
      selectedSubject: "",
      selectedTopic: "",
      count: "",
      id: 1,
      cType: "",
      sType: "",
      doc: "",
      docTitle: "",
      statusCode: "",
      searchValue: "",
      headers: "Status",
    };
  },
  metaInfo: {
    title: "Greater Favour",
    titleTemplate: "%s | Normalisation",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
  computed: {
    ...authComputed,
    ...mapGetters(["allClasses", "allSubjects", "allTopics"]),
    filteredSubjects() {
      return this.allSubjects.filter((subject) => {
        return this.selectedClass
          ? subject.cllid === this.selectedClass.cllid
          : "";
      });
    },
    filteredTopics() {
      return this.allTopics.filter((topic) => {
        return this.selectedSubject
          ? topic.sulid === this.selectedSubject.sulid
          : "";
      });
    },
  },
  created() {
    this.getFiles(1);
  },
  beforeMount() {
    if (this.loggedIn == false) {
      this.$router.push({ path: "/login" });
    }
  },
  // mounted() {
  //   this.getFiles();
  // },
  methods: {
    getFiles(num) {
      var ts = Math.round(+new Date() / 1000);

      this.isLoading = true;
      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      let url = "/v1/office/assessment/normal/fetch";
      url =
        num != undefined && num != ""
          ? `${url}?offset=${(num - 1) * this.size}&size=${this.size}`
          : url;

      apiClient
        .get(`${url}`, { headers: headers })
        .then((res) => {
          this.isLoading = false;
          this.totalPage = Math.ceil(res.data.info.total / this.size);
          this.files = res.data.data;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    loadNext(num) {
      this.getFiles(num);
      return;
    },
    subjectFilter(sId) {
      return this.allSubjects.filter((subject) => {
        return subject.sulid === sId ? subject.name : "";
      });
    },
    topicFilter(sId) {
      return this.allTopics.filter((topic) => {
        return topic.tolid === sId ? topic.name : "";
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
    addDocument() {
      if (!this.doc && !this.docTitle) {
        this.errors = true;
        if (this.doc == null || this.doc == "") {
          this.errors = true;
          if (this.docTitle == "" || this.docTitle == null) {
            this.errors = true;
            if (!this.selectedClass.cllid || !this.selectedSubject.sulid) {
              this.errors = true;
              return;
            }
          }
        }
      } else {
        var ts = Math.round(+new Date() / 1000);

        this.isLoading = true;
        this.loader.active = true;
        const headers = {
          "X-Timestamp": ts,
          "X-Ulid": `${this.$store.state.user.ulid}`,
        };

        const reqBody = {
          cllid: this.selectedClass.cllid,
          sulid: this.selectedSubject.sulid,
          tolid: this.selectedTopic.tolid,
          questions: parseInt(this.count),
          data: this.doc.base64,
        };

        apiClient
          .post(`/v1/office/assessment/normal/add`, reqBody, {
            headers: headers,
          })
          .then((res) => {
            this.isLoading = false;
            this.loader.active = false;
            this.$refs.resModal.open({
              type: "success",
              message: res.data.message,
            });
            this.getFiles();
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
      }
    },
    claim(nId) {
      var ts = Math.round(+new Date() / 1000);

      this.loader.active = true;
      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      const reqBody = {
        nolid: nId,
      };

      apiClient
        .patch(`/v1/office/assessment/normal/claim`, reqBody, {
          headers: headers,
        })
        .then((res) => {
          this.getFiles();
          this.loader.active = false;
          this.$refs.resModal.open({
            type: "success",
            message: res.data.message,
          });
        })
        .catch((err) => {
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
    approve(nId, code) {
      var ts = Math.round(+new Date() / 1000);

      this.loader.active = true;
      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      const reqBody = {
        nolid: nId,
        status: code,
      };

      apiClient
        .patch(`/v1/office/assessment/normal/approve`, reqBody, {
          headers: headers,
        })
        .then((res) => {
          this.getFiles();
          this.loader.active = false;
          this.$refs.resModal.open({
            type: "success",
            message: res.data.message,
          });
        })
        .catch((err) => {
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
    clear() {
      this.errors = false;
      this.docTitle = "";
      this.doc = "";
      if (document.getElementById("upload")) {
        document.getElementById("upload").value = "";
      }
    },
  },
};
</script>

<style scoped>
.bread-item:hover {
  color: #9299b8 !important;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.row-hover:hover {
  background-color: #f5f5f5 !important;
}
</style>
