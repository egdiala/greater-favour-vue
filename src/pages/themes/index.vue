<template>
  <div class="contents">
    <div class="container-fluid">
      <div class="row mb-2 sticky">
        <div class="col-lg-12">
          <div
            class="breadcrumb-main p-3"
            style="background-color: #f4f5f7 !important;"
          >
            <h4 class="text-capitalize fw-500 breadcrumb-title">
              Themes
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
                    >Operations</span
                  >
                  <span class="breadcrumb__seperator">
                    <span class="la la-slash bread-item"></span>
                  </span>
                </li>
                <li class="atbd-breadcrumb__item">
                  <span class="bread-item">Themes</span>
                </li>
              </ul>
            </h4>
            <div class="action-btn">
              <a
                @click="clear()"
                href="#"
                class="btn px-15 btn-primary"
                data-toggle="modal"
                data-target="#add-subject"
              >
                <i class="las la-plus fs-16"></i>Create New Theme</a
              >
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade new-member"
        id="add-subject"
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
                Add Theme
              </h6>
              <button
                id="myCheck"
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
                <form @submit.prevent="addTheme()">
                  <div class="form-group mb-20">
                    <label class="mb-15">Theme Name</label>
                    <input
                      v-model="newTheme.name"
                      type="text"
                      class="form-control"
                      id="name47"
                      placeholder="enter here"
                    />
                    <transition
                      v-if="error && newTheme.name == ''"
                      name="slide-fade"
                      ><span class="text-danger"
                        >Theme name is required.</span
                      ></transition
                    >
                  </div>
                  <div class="category-member form-group mb-20">
                    <label class="mb-15">Select Category</label>
                    <v-select
                      v-model="newTheme.category"
                      label="category"
                      :options="category"
                    ></v-select>
                    <transition
                      v-if="
                        (error && newTheme.category == '') ||
                          newTheme.category == null
                      "
                      name="slide-fade"
                      ><span class="text-danger"
                        >Category is required.</span
                      ></transition
                    >
                  </div>
                  <div class="form-group mb-20">
                    <label class="mb-15">Theme Description</label>
                    <textarea
                      v-model="newTheme.description"
                      type="text"
                      class="form-control"
                      id="name48"
                      placeholder="enter here"
                    ></textarea>
                    <transition
                      v-if="error && newTheme.description == ''"
                      name="slide-fade"
                      ><span class="text-danger"
                        >Theme description is required.</span
                      ></transition
                    >
                  </div>

                  <div class="button-group d-flex pt-25">
                    <button
                      type="button"
                      class="btn btn-primary btn-default btn-squared text-capitalize float-right"
                      @click="addTheme()"
                    >
                      add new theme
                    </button>
                    <button
                      class="btn btn-light btn-default btn-squared fw-400 text-capitalize float-right b-light color-light"
                      data-dismiss="modal"
                      aria-label="Close"
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
      <div
        class="modal fade new-member"
        id="edit-theme"
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
                Edit Theme
              </h6>
              <button
                id="myChecks"
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
                <form @submit.prevent="patchTheme()">
                  <div class="form-group mb-20">
                    <label class="mb-15">Theme Name</label>
                    <input
                      v-model="editTheme.name"
                      type="text"
                      class="form-control"
                      id="name49"
                      placeholder="enter here"
                    />
                    <transition
                      v-if="errors && editTheme.name == ''"
                      name="slide-fade"
                      ><span class="text-danger"
                        >Theme name is required.</span
                      ></transition
                    >
                  </div>
                  <div class="category-member form-group mb-20">
                    <label class="mb-15">Select Category</label>
                    <v-select
                      v-model="editTheme.category"
                      label="category"
                      :options="category"
                    ></v-select>
                    <transition
                      v-if="
                        (errors && editTheme.category == '') ||
                          editTheme.category == null
                      "
                      name="slide-fade"
                      ><span class="text-danger"
                        >Theme category is required.</span
                      ></transition
                    >
                  </div>
                  <div class="form-group mb-20">
                    <label class="mb-15">Theme Description</label>
                    <textarea
                      v-model="editTheme.description"
                      type="text"
                      class="form-control"
                      id="name40"
                      placeholder="enter here"
                    ></textarea>
                    <transition
                      v-if="errors && editTheme.description == ''"
                      name="slide-fade"
                      ><span class="text-danger"
                        >Theme description is required.</span
                      ></transition
                    >
                  </div>

                  <div class="button-group d-flex pt-25">
                    <button
                      type="submit"
                      class="btn btn-primary btn-default btn-squared text-capitalize float-right"
                      @click="patchTheme()"
                    >
                      Edit theme
                    </button>
                    <button
                      class="btn btn-light btn-default btn-squared fw-400 text-capitalize float-right b-light color-light"
                      data-dismiss="modal"
                      aria-label="Close"
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
      <div
        class="modal fade new-member"
        id="avatar-upload"
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
                Upload Avatar
              </h6>
              <button
                id="dismiss"
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i class="las la-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="my-3">
                <small>Maximum width and height supported is 512 * 512.</small>
              </div>
              <div class="new-member-modal">
                <div class="form-group">
                  <div class="atbd-tag-wrap">
                    <div class="atbd-upload">
                      <form enctype="multipart/form-data">
                        <div class="atbd-upload__button">
                          <a
                            href="javascript:void(0)"
                            class="btn btn-lg btn-outline-lighten btn-upload"
                            onclick="$('#upload-1').click()"
                          >
                            <span data-feather="upload"></span> Select Avatar</a
                          >
                          <input
                            type="file"
                            name="upload-1"
                            class="upload-one"
                            id="upload-1"
                            accept="image/png,image/jpg"
                            @change="Images_onFileChanged"
                          />
                          <transition name="slide-fade"
                            ><div class="my-2">
                              <small
                                v-if="imgErr == true"
                                class="text-danger"
                                >{{ imgMsg.trim() }}</small
                              >
                            </div></transition
                          >
                        </div>
                      </form>
                      <div v-if="imgToUpload != ''" class="atbd-upload__file">
                        <a href="#" class="file-name"
                          ><i class="las la-paperclip"></i>
                          <span class="name-text"
                            >{{ imgToUpload }}<span></span></span
                        ></a>
                        <a @click="clear()" href="#" class="btn-delete"
                          ><i class="la la-trash"></i
                        ></a>
                      </div>
                      <br />
                      <button
                        @click="addMedia()"
                        class="btn btn-primary btn-default btn-squared btn-shadow-primary"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <!-- Tab Menu End -->
      <div class="projects-tab-content projects-tab-content--progress">
        <div class="tab-content" id="ap-tabContent">
          <div
            class="tab-pane fade show active"
            id="ap-overview"
            role="tabpanel"
            aria-labelledby="ap-overview-tab"
          >
            <div class="row">
              <div
                v-if="
                  isLoading == true &&
                    themes.length < 1 &&
                    !$store.state.asyncLoader
                "
                class="col-12"
              >
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
                v-else-if="isLoading == false && themes.length < 1"
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
                    <h6>No Content here...</h6>
                  </div>
                </div>
              </div>
              <div v-else class="col-lg-12">
                <div class="table-responsive card mb-25">
                  <table class="table table-bordered table-social card-body">
                    <thead>
                      <tr>
                        <th>Avatar</th>
                        <th>Theme</th>
                        <th>Description</th>
                        <th class="">
                          <span class="userDatatable-title float-right mr-17"
                            >Actions</span
                          >
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(cSub, s) in themes" :key="s">
                        <td>
                          <img
                            v-if="cSub.image != ''"
                            height="65"
                            width="65"
                            :src="
                              `${envVariables.VUE_APP_STORAGE_BUCKET}${cSub.image}`
                            "
                            alt=""
                            class="rounded-circle"
                          />
                          <img
                            v-else
                            height="65"
                            width="65"
                            src="@/assets/img/custom/subject.svg"
                            alt=""
                            class="rounded-circle"
                          />
                        </td>
                        <td
                          @click="
                            setTheme(
                              cSub.thlid,
                              cSub.name,
                              cSub.category,
                              cSub.description
                            )
                          "
                          data-toggle="modal"
                          data-target="#edit-theme"
                        >
                          <a class="float-left" style="cursor: pointer;">{{
                            cSub.name.toUpperCase()
                          }}</a>
                        </td>
                        <td>
                          <span class="float-left" style="text-align: left;">{{
                            cSub.description
                          }}</span>
                        </td>
                        <td class="">
                          <ul
                            class="orderDatatable_actions mb-0 d-flex flex-wrap float-right"
                          >
                            <li
                              @click="setAvatar(cSub.thlid)"
                              data-toggle="modal"
                              data-target="#avatar-upload"
                            >
                              <a
                                href="#"
                                class="edit"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Add Avatar"
                                ><i class="las la-image"></i
                              ></a>
                            </li>
                            <li
                              @click="
                                setTheme(
                                  cSub.thlid,
                                  cSub.name,
                                  cSub.category,
                                  cSub.description
                                )
                              "
                              data-toggle="modal"
                              data-target="#edit-theme"
                            >
                              <a
                                href="#"
                                class="edit"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Edit"
                              >
                                <i class="las la-edit"></i>
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
          </div>
        </div>
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
import LoaderOverlay from "@/components/LoaderOverlay";
import ResponseModal from "@/components/ResponseModal.vue";

// max size, 100KB, width and height
const MAX_SIZE = 5000000;
const MAX_WIDTH = 512;
const MAX_HEIGHT = 512;

export default {
  name: "themes",
  components: {
    LoaderOverlay,
    ResponseModal,
    Paginate,
  },
  data() {
    return {
      isLoading: false,
      loader: {
        fullpage: true,
        active: false,
      },
      totalPage: 0,
      currentPage: 0,
      size: 10,
      category: [
        "GENERAL",
        "ART",
        "SCIENCE",
        "COMMERCIAL",
        "SOCIAL",
        "LANGUAGE",
        "EDUCATION",
      ],
      newTheme: {
        name: "",
        category: "",
        description: "",
      },
      editTheme: {
        thlid: "",
        name: "",
        category: "",
        description: "",
      },
      avatar: {
        thlid: "",
        data: "",
      },
      image: {
        size: "",
        height: "",
        width: "",
      },
      imgToUpload: "",
      themes: [],
      error: null,
      errors: null,
      erro: null,
      imgErr: false,
      imgMsg: "",
      errMsg: "",
      themeErrors: [],
    };
  },
  metaInfo: {
    title: "Greater Favour",
    titleTemplate: "%s | Themes",
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
    this.getThemes(1);
  },
  methods: {
    setTheme(id, name, cat, desc) {
      this.editTheme.thlid = id;
      this.editTheme.name = name;
      this.editTheme.category = cat;
      this.editTheme.description = desc;
    },
    loadNext(num) {
      this.getThemes(num);
      return;
    },
    setAvatar(id) {
      document.getElementById("upload-1").value = "";
      this.imgToUpload = "";
      this.avatar.data = "";
      this.imgMsg = "";
      this.imgErr = false;
      this.avatar.thlid = id;
    },
    getThemes(num) {
      var ts = Math.round(+new Date() / 1000);

      this.isLoading = true;
      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      let url = "/v1/office/frame/theme/fetch";
      url =
        num != undefined && num != ""
          ? `${url}?offset=${(num - 1) * this.size}&size=${this.size}`
          : url;

      apiClient
        .get(`${url}`, { headers: headers })
        .then((res) => {
          this.isLoading = false;
          this.currentPage = Number(num);
          this.themes = res.data.data;
          this.totalPage = Math.ceil(res.data.info.total / this.size);
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    addTheme() {
      if (this.newTheme.name.trim() != "") {
        if (this.newTheme.category != "" && this.newTheme.category != null) {
          if (this.newTheme.description.trim() != "") {
            var ts = Math.round(+new Date() / 1000);

            this.isLoading = true;
            this.loader.active = true;
            const headers = {
              "X-Timestamp": ts,
              "X-Ulid": `${this.$store.state.user.ulid}`,
            };

            const newTheme = {
              name: this.newTheme.name.trim(),
              category: this.newTheme.category,
              description: this.newTheme.description.trim(),
            };

            apiClient
              .post("/v1/office/frame/theme/add", newTheme, {
                headers: headers,
              })
              .then((res) => {
                this.isLoading = false;
                this.loader.active = false;
                document.getElementById("myCheck").click();
                this.newTheme.name = "";
                this.newTheme.category = "";
                this.newTheme.description = "";
                this.$refs.resModal.open({
                  type: "success",
                  message: res.data.message,
                });
                this.$store.dispatch('environment')
                this.getThemes();
              })
              .catch((err) => {
                this.isLoading = false;
                this.loader.active = false;
                this.$refs.resModal.open({
                  type: "error",
                  message: err.response.data.message,
                });
                setTimeout(() => {
                  this.erro = false;
                }, 5000);
              });
          } else {
            this.error = true;
          }
        } else {
          this.error = true;
        }
      } else {
        this.error = true;
      }
    },
    clear() {
      this.error = false;
      this.imgErr = false;
      this.newTheme.name = "";
      this.newTheme.category = "";
      this.newTheme.description = "";
      this.editTheme.name = "";
      this.editTheme.category = "";
      this.editTheme.description = "";
      this.imgToUpload = "";
      this.avatar.data = "";
    },
    patchTheme() {
      if (this.editTheme.name.trim() != "") {
        if (this.editTheme.description.trim() != "") {
          if (
            this.editTheme.category != "" &&
            this.editTheme.category != null
          ) {
            var ts = Math.round(+new Date() / 1000);

            this.isLoading = true;
            this.loader.active = true;
            const headers = {
              "X-Timestamp": ts,
              "X-Ulid": `${this.$store.state.user.ulid}`,
            };

            const editTheme = {
              thlid: this.editTheme.thlid.trim(),
              name: this.editTheme.name.trim(),
              category: this.editTheme.category.trim(),
              description: this.editTheme.description.trim(),
            };

            apiClient
              .patch("/v1/office/frame/theme/change", editTheme, {
                headers: headers,
              })
              .then((res) => {
                this.isLoading = false;
                this.loader.active = false;
                document.getElementById("myChecks").click();
                this.editTheme.thlid = "";
                this.editTheme.name = "";
                this.editTheme.category = "";
                this.editTheme.description = "";
                this.$refs.resModal.open({
                  type: "success",
                  message: res.data.message,
                });
                this.getThemes();
              })
              .catch((err) => {
                this.isLoading = false;
                this.loader.active = false;
                this.$refs.resModal.open({
                  type: "error",
                  message: err.response.data.message,
                });
                setTimeout(() => {
                  this.erro = false;
                }, 5000);
              });
          } else {
            this.errors = true;
          }
        } else {
          this.errors = true;
        }
      } else {
        this.errors = true;
      }
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatar.data = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    Images_onFileChanged(event) {
      this.imgMsg = "";
      var selectedFile = event.target.files[0];
      // if(!selectedFile || selectedFile.type.indexOf('image/') !== 0) return;
      this.imgToUpload = selectedFile.name;
      this.image.size = selectedFile.size;
      if (this.image.size > MAX_SIZE) {
        this.imgErr = true;
        this.imgMsg = `The image size is too much (max is 5MB).`;
        return;
      }
      let reader = new FileReader();

      reader.readAsDataURL(selectedFile);
      reader.onload = (evt) => {
        let img = new Image();
        img.onload = () => {
          this.image.width = img.width;
          this.image.height = img.height;
          if (this.image.width > MAX_WIDTH || this.image.height > MAX_HEIGHT) {
            this.imgErr = true;
            this.imgMsg = `Width and height is larger than required (w:${this.image.width} x h:${this.image.height})`;
            return;
          }
          this.createBase64Image(selectedFile);
        };
        img.src = evt.target.result;
      };

      reader.onerror = (evt) => {
        console.error(evt);
      };
    },
    addMedia() {
      var ts = Math.round(+new Date() / 1000);

      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      const reqBody = this.avatar;

      if (reqBody.data != "") {
        this.isLoading = true;
        this.loader.active = true;
        this.imgErr = false;
        apiClient
          .patch("/v1/office/frame/theme/avatar", reqBody, {
            headers: headers,
          })
          .then((res) => {
            this.isLoading = false;
            this.loader.active = false;
            this.selectedFile = null;
            setTimeout(() => {
              document.getElementById("dismiss").click();
            }, 100);
            this.$refs.resModal.open({
              type: "success",
              message: res.data.message,
            });
            this.getThemes();
          })
          .catch((err) => {
            this.isLoading = false;
            this.loader.active = false;
            this.$refs.resModal.open({
              type: "error",
              message: err.response.data.message,
            });
            setTimeout(() => {
              this.erro = false;
            }, 3000);
          });
      } else {
        this.imgErr = true;
      }
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
