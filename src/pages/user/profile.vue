<template>
  <div class="contents">
    <!-- <response-modal ref="rModal" /> -->
    <ResponseModal ref="resModal" />
    <div class="profile-setting " v-if="person">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb-main">
              <h4 class="text-capitalize breadcrumb-title">
                My profile
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
                      >Profile</span
                    >
                  </li>
                </ul>
              </h4>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-sm-5">
            <!-- Profile Acoount -->
            <div class="card mb-25">
              <div class="card-body text-center p-0">
                <div
                  class="account-profile border-bottom pt-25 px-25 pb-0 flex-column d-flex align-items-center "
                >
                  <div class="ap-img mb-20 pro_img_wrapper">
                    <!-- <input id="file-upload" type="file" name="fileUpload" class="d-none" @change="fileChange"> -->
                    <input
                      type="file"
                      name="image"
                      accept=".jpg,.jpeg,.png,.bmp"
                      multiple="false"
                      id="file-upload"
                      ref="fileInput"
                      @change="fileChange"
                      class="no-display"
                    />
                    <label for="file-upload">
                      <!-- Profile picture image-->
                      <!-- <img class="ap-img__main rounded-circle wh-120"
                                                    :src="person.user.avatar ? person.user.avatar.replace('block://', envVariables.VUE_APP_STORAGE_BUCKET) : `/img/custom/avatar-` + getAvatar(person.user.fname)" alt="profile"> -->
                      <span
                        class="rounded-circle ap-img__main rounded-circle wh-120 bg-pos"
                        :style="{
                          backgroundImage: `url(${getAvatar(
                            $store.state.user
                          )})`,
                        }"
                      >
                      </span>
                      <span class="cross" id="remove_pro_pic">
                        <span class="las la-camera"></span>
                      </span>
                    </label>
                  </div>
                  <div class="ap-nameAddress pb-3">
                    <h5 class="ap-nameAddress__title">
                      {{ `${person.user.fname} ${person.user.lname}` }}
                    </h5>
                    <p class="ap-nameAddress__subTitle fs-14 m-0">
                      @{{ person.user.username }}
                    </p>
                  </div>
                </div>
                <div class="ps-tab p-20 pb-25">
                  <div
                    class="nav flex-column text-left"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <a
                      class="nav-link active"
                      id="v-pills-home-tab"
                      data-toggle="pill"
                      @click="updateForm = 'biography'"
                      href="#v-pills-home"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      <span class="la la-user-alt" ref="editprofile"></span>Edit
                      profile</a
                    >
                    <a
                      class="nav-link"
                      id="v-pills-profile-tab"
                      data-toggle="pill"
                      href="#v-pills-profile"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                    >
                      <span class="la la-cog"></span>Account setting</a
                    >
                    <a
                      class="nav-link"
                      id="v-pills-messages-tab"
                      data-toggle="pill"
                      @click="updateForm = 'password'"
                      href="#v-pills-messages"
                      role="tab"
                      aria-controls="v-pills-messages"
                      aria-selected="false"
                    >
                      <span class="la la-key"></span>change password</a
                    >
                    <a
                      class="nav-link"
                      id="v-pills-roles-tab"
                      data-toggle="pill"
                      @click="getUserRole"
                      href="#v-pills-roles"
                      role="tab"
                      aria-controls="v-pills-roles"
                      aria-selected="true"
                    >
                      <span class="las la-user-lock"></span> Attributes
                    </a>
                    <a
                      class="nav-link"
                      id="v-pills-bank-tab"
                      data-toggle="pill"
                      @click="getUserBankAccounts"
                      href="#v-pills-bank"
                      role="tab"
                      aria-controls="v-pills-bank"
                      aria-selected="true"
                    >
                      <span class="las la-piggy-bank"></span>Bank Accounts</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <!-- Profile Acoount End -->
          </div>
          <div class="col-xl-9 col-lg-8 col-sm-7">
            <div class="row">
              <div class="col-lg-6 mb-25">
                <!-- Card 1 -->
                <div
                  class="ap-po-details radius-xl bg-white d-flex justify-content-between rel-pos"
                >
                  <div>
                    <div class="overview-content">
                      <h1 class="d-flex align-items-baseline">{{ approved }} <h6 class="mute px-1 text-gray font-weight-light">of</h6> {{ person.questions }} <h6 class="mute px-1 text-gray font-weight-light text-capitalize">approved</h6></h1>
                      <h4 class="no-marg-btm txt-under"> Questions
                      </h4>
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
                    <img src="/img/custom/exam.svg" width="80" />
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
                      <h1>₦ {{ person.available.credit }}</h1>
                      <h4 class="no-marg-btm txt-under">Wallet Balance</h4>
                      <div class="ap-po-details-time">
                        <button
                          class="btn btn-default btn-squared btn-success"
                          @click="
                            $store.commit('ctoast', {
                              message: 'find me if you can',
                              type: 'success',
                              timeout: 0,
                            })
                          "
                        >
                          <i class="las la-wallet"></i> Request Pay Out
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="side-icon">
                    <img src="/img/custom/wallet-icon.svg" width="80" />
                  </div>
                </div>
                <!-- Card 3 End -->
              </div>
            </div>

            <div class="mb-50">
              <div class="tab-content" id="v-pills-tabContent">
                <div
                  class="tab-pane fade  show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <!-- Edit Profile -->
                  <div class="edit-profile">
                    <div class="card">
                      <div class="card-header px-sm-25 px-3">
                        <div class="edit-profile__title">
                          <h6>Edit Profile</h6>
                          <span class="fs-13 color-light fw-400"
                            >Your personal information</span
                          >
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="row justify-content-center">
                          <div class="col-xl-6 col-lg-8 col-sm-10">
                            <div class="edit-profile__body mx-lg-20">
                              <!-- <form @submit.prevent="updateProfile" method="post"> -->
                              <div class="form-group mb-20">
                                <label for="name">name</label>
                                <input
                                  type="text"
                                  disabled
                                  class="form-control"
                                  id="name"
                                  :placeholder="
                                    `${person.user.fname} ${person.user.lname}`
                                  "
                                />
                              </div>
                              <div class="form-group mb-20">
                                <label for="userBio">user bio</label>
                                <textarea
                                  v-model.trim="$v.biography.$model"
                                  :class="{ error: $v.biography.$error }"
                                  class="form-control"
                                  id="userBio"
                                  rows="5"
                                >
                                </textarea>
                              </div>
                              <InterestModal
                                ref="interestModal"
                                :person="person"
                                :userInterest="userInterest"
                                :action="interestAction"
                                @interestUpdated="interestUpdated"
                              />
                              <div class="mt-1 align-items-center flex-wrap">
                                <div class="text-capitalize py-10 flex-1">
                                  <h6>Subject of Interest</h6>
                                </div>
                              </div>
                              <div class="card-body pt-md-1 pt-0">
                                <LoaderOverlay :active="loader.interest" />
                                <ul
                                  class="user-skils-parent"
                                  v-if="!loader.interest"
                                >
                                  <li
                                    class="user-skils-parent__item "
                                    v-for="(i, k) in userInterest"
                                    :key="k"
                                  >
                                    <a class="link">
                                      &nbsp; {{ i.name }} &nbsp;&nbsp;
                                      <i
                                        class="ml-3 mr-0"
                                        :class="
                                          `${progressIcon[i.status]} ${
                                            progressColour[i.status]
                                          }`
                                        "
                                      ></i>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div>
                                <div class="d-flex justify-content-center">
                                  <button
                                    @click="showInterestModal('bulk')"
                                    :disabled="
                                      userInterest.length == themes.length
                                    "
                                    class="btn btn-success btn-default btn-squared btn-transparent-success mr-3"
                                  >
                                    Add interest
                                  </button>
                                  <button
                                    :disabled="userInterest.length == 0"
                                    @click="showInterestModal('trash')"
                                    class="btn btn-danger btn-default btn-squared btn-transparent-danger "
                                  >
                                    Remove Interest
                                  </button>
                                </div>
                              </div>
                              <div
                                class="button-group d-flex flex-wrap pt-30 mb-15"
                              >
                                <span @click="updateProfile">
                                  <spinner-button
                                    label="Update Profile"
                                    :loading="isLoading"
                                    :disabled="oldBiography == biography"
                                    style="width:180px"
                                  />
                                </span>
                              </div>
                              <!-- </form> -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Edit Profile End -->
                </div>
                <div
                  class="tab-pane fade"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <!-- Edit Profile -->
                  <div class="edit-profile">
                    <div class="card">
                      <div class="card-header  px-sm-25 px-3">
                        <div class="edit-profile__title">
                          <h6>Account setting</h6>
                          <span class="fs-13 color-light fw-400"
                            >Your username and email</span
                          >
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="row justify-content-center">
                          <div class="col-xl-6 col-lg-8 col-sm-10">
                            <div class="edit-profile__body mx-lg-20">
                              <form>
                                <div class="form-group mb-20">
                                  <label for="name1">username</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    disabled
                                    id="name1"
                                    :placeholder="person.user.username"
                                  />
                                </div>
                                <div class="form-group mb-5">
                                  <label for="email45">email</label>
                                  <input
                                    type="email"
                                    class="form-control"
                                    disabled
                                    id="email45"
                                    :placeholder="person.user.email"
                                  />
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Edit Profile End -->
                </div>
                <div
                  class="tab-pane fade"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                >
                  <!-- Edit Profile -->
                  <div class="edit-profile">
                    <div class="card">
                      <div class="card-header  px-sm-25 px-3">
                        <div class="edit-profile__title">
                          <h6>change password</h6>
                          <span class="fs-13 color-light fw-400"
                            >Update account password</span
                          >
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="row justify-content-center">
                          <div class="col-lg-6">
                            <div class="edit-profile__body mx-lg-20">
                              <form
                                method="post"
                                @submit.prevent="updateProfile"
                              >
                                <div class="form-group mb-3">
                                  <label for="password-field"
                                    >old password</label
                                  >
                                  <div class="position-relative">
                                    <input
                                      id="password-field"
                                      :type="
                                        toggleOldPassword ? 'text' : 'password'
                                      "
                                      v-model="$v.oldPassword.$model"
                                      class="form-control"
                                      :class="{ error: $v.oldPassword.$error }"
                                      name="password"
                                      value=""
                                    />
                                    <span
                                      @click="
                                        toggleOldPassword = !toggleOldPassword
                                      "
                                      :class="{
                                        'fa-eye': toggleOldPassword,
                                        'fa-eye-slash': !toggleOldPassword,
                                      }"
                                      class="fa fa-fw text-light fs-16 field-icon"
                                    ></span>
                                  </div>
                                </div>
                                <div class="form-group mb-2">
                                  <label for="password-field"
                                    >new password</label
                                  >
                                  <div class="position-relative">
                                    <input
                                      id="password-field"
                                      :type="
                                        togglePassword ? 'text' : 'password'
                                      "
                                      v-model="$v.newPassword.$model"
                                      class="form-control"
                                      :class="{ error: $v.newPassword.$error }"
                                      name="password"
                                      value=""
                                    />
                                    <span
                                      @click="togglePassword = !togglePassword"
                                      :class="{
                                        'fa-eye': togglePassword,
                                        'fa-eye-slash': !togglePassword,
                                      }"
                                      class="fa fa-fw text-light fs-16 field-icon toggle-password2"
                                    ></span>
                                  </div>
                                  <div class="h-15">
                                    <small
                                      class="text-light fs-13"
                                      v-if="
                                        $v.newPassword.$error &
                                          ($v.newPassword.$model !=
                                            $v.oldPassword.$model)
                                      "
                                      >Minimum 6 characters
                                    </small>
                                    <!-- <small class="text-light fs-13" v-if="($v.newPassword.$model != $v.oldPassword.$model) & $v.newPassword.$model.length > 6">
                                                                                old and new cannot be same
                                                                            </small> -->
                                  </div>
                                </div>
                                <div class="form-group mb-1">
                                  <label for="password-field"
                                    >Confirm new password</label
                                  >
                                  <div class="position-relative">
                                    <input
                                      id="password-field"
                                      :type="
                                        togglePassword ? 'text' : 'password'
                                      "
                                      v-model="$v.confirmNewPassword.$model"
                                      class="form-control"
                                      :class="{
                                        error: $v.confirmNewPassword.$error,
                                      }"
                                      name="password"
                                      value=""
                                    />
                                    <span
                                      @click="togglePassword = !togglePassword"
                                      :class="{
                                        'fa-eye': togglePassword,
                                        'fa-eye-slash': !togglePassword,
                                      }"
                                      class="fa fa-fw text-light fs-16 field-icon toggle-password2"
                                    ></span>
                                  </div>
                                  <div class="h-15">
                                    <small
                                      id="passwordHelpInline"
                                      class="text-light fs-13"
                                      v-if="
                                        $v.confirmNewPassword.$invalid &&
                                          $v.confirmNewPassword.$dirty
                                      "
                                    >
                                      Password fields does not match
                                    </small>
                                  </div>
                                </div>
                                <div
                                  class="button-group d-flex flex-wrap pt-45 mb-35"
                                >
                                  <span @click="updateProfile">
                                    <spinner-button
                                      label="Save Changes"
                                      :loading="isLoading"
                                      style="width:180px"
                                    />
                                  </span>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Edit Profile End -->
                </div>
                <div
                  class="tab-pane fade"
                  id="v-pills-roles"
                  role="tabpanel"
                  aria-labelledby="v-pills-roles-tab"
                >
                  <!-- Edit Profile -->
                  <div class="edit-profile">
                    <div class="card">
                      <div class="card-header  px-sm-25 px-3">
                        <div class="edit-profile__title">
                          <h6>Attributes</h6>
                          <span class="fs-13 color-light fw-400"
                            >Attributes assigned to you</span
                          >
                        </div>
                        <div
                          class="action-btn"
                          @click="
                            showModal('addRoleModal');
                            errors.role.message = '';
                          "
                        >
                          <a
                            href="#"
                            class="btn px-15 btn-primary"
                            data-toggle="modal"
                            data-target="#apply-role"
                          >
                            <i class="las la-plus fs-16"></i>apply for new
                            Attribute</a
                          >
                        </div>
                        <Modal ref="addRoleModal" :config="addRoleModalConfig">
                          <div class="new-member-modal">
                            <form
                              method="post"
                              @submit.prevent="addRoleAttribute"
                            >
                              <div class="form-group mb-20">
                                <div
                                  class="alert alert-danger"
                                  v-if="errors.role.message"
                                >
                                  {{ errors.role.message }}
                                </div>
                                <label> Select Attribute </label>
                                <div class="category-member">
                                  <v-select
                                    v-model="$v.selectedRole.$model"
                                    label="name"
                                    :class="{ error: $v.selectedRole.$error }"
                                    item-value="code"
                                    :options="roleAttributes"
                                  >
                                  </v-select>
                                </div>
                              </div>
                              <div class="form-group mb-20">
                                <textarea
                                  class="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows="3"
                                  placeholder="Project description"
                                ></textarea>
                              </div>
                              <div class="button-group d-flex pt-25">
                                <button
                                  class="btn btn-primary btn-default btn-squared text-capitalize"
                                >
                                  Apply
                                </button>
                                <button
                                  class="btn btn-light btn-default btn-squared fw-400 text-capitalize b-light color-light"
                                  data-dismiss="modal"
                                >
                                  cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        </Modal>
                      </div>
                      <div class="card-body">
                        <div class="row justify-content-center">
                          <div class="col-lg-12">
                            <div class="edit-profile__body mx-lg-20">
                              <div class="table-responsive">
                                <table
                                  class="table mb-0 table-borderless border-0"
                                >
                                  <thead>
                                    <tr class="userDatatable-header">
                                      <th scope="col">
                                        <span class="userDatatable-title"
                                          >Role</span
                                        >
                                      </th>
                                      <th scope="col" class="">
                                        <span class="userDatatable-title"
                                          >Status</span
                                        >
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody v-if="!isLoading">
                                    <tr v-for="(role, k) in userRoles" :key="k">
                                      <td>
                                        <div class="d-flex align-items-center">
                                          <div class="orderDatatable-title">
                                            <p class="d-block mb-0">
                                              {{ roleAttributesMap[role.type] }}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <div
                                          class="orderDatatable-status d-inline-block"
                                        >
                                          <!-- <span class="atbd-tag tag-success tag-transparented" :class="progressColour[role.status]">{{progress[role.status]}}</span> -->
                                          <span
                                            class="order-bg-opacity-info rounded-pill active"
                                            :class="progressColour[role.status]"
                                            >{{ progress[role.status] }}</span
                                          >
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <LoaderOverlay :active="isLoading" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Edit Profile End -->
                </div>
                <div
                  class="tab-pane fade"
                  id="v-pills-bank"
                  role="tabpanel"
                  aria-labelledby="v-pills-bank-tab"
                >
                  <!-- Edit Profile -->
                  <div class="edit-profile">
                    <div class="card">
                      <div class="card-header  px-sm-25 px-3">
                        <div class="edit-profile__title">
                          <h6>Bank</h6>
                          <span class="fs-13 color-light fw-400"
                            >Your Bank Accounts</span
                          >
                        </div>
                        <div class="action-btn">
                          <a
                            href="#"
                            class="btn px-15 btn-primary"
                            data-toggle="modal"
                            data-target="#add-bank"
                            @click="
                              showModal('addBankModal');
                              selectedBank = '';
                              accountNumber = '';
                              errors.bank.message = '';
                            "
                          >
                            <i class="las la-plus fs-16"></i>
                            add bank
                          </a>
                        </div>
                        <Modal ref="addBankModal" :config="addBankModalConfig">
                          <div class="new-member-modal">
                            <div
                              class="alert alert-danger"
                              role="alert"
                              v-if="errors.bank.message"
                            >
                              <small>{{ errors.bank.message }}</small>
                            </div>
                            <form
                              method="post"
                              @submit.prevent="addBankAccount"
                            >
                              <div class="form-group mb-20">
                                <label> Account Number </label>
                                <input
                                  type="text"
                                  v-model.trim="$v.accountNumber.$model"
                                  class="form-control"
                                  :class="{
                                    error:
                                      $v.accountNumber.$error || errors.bank,
                                  }"
                                  maxlength="10"
                                  placeholder="Account Number"
                                />
                              </div>
                              <div class="form-group mb-20">
                                <label> Select Bank </label>
                                <v-select
                                  v-model="$v.selectedBank.$model"
                                  label="name"
                                  :class="{ error: $v.selectedBank.$error }"
                                  item-value="code"
                                  :options="$store.state.banks"
                                >
                                </v-select>
                              </div>
                              <div class="button-group d-flex pt-25">
                                <span @click="addBankAccount">
                                  <spinner-button
                                    label="Add Account"
                                    :loading="isLoading"
                                    style="width:180px"
                                  />
                                </span>
                                <button
                                  class="btn btn-light btn-default btn-squared fw-400 text-capitalize b-light color-light"
                                  data-dismiss="modal"
                                >
                                  cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        </Modal>
                      </div>
                      <div class="card-body">
                        <div class="row justify-content-center">
                          <div class="col-lg-12">
                            <div class="edit-profile__body mx-lg-20">
                              <div class="table-responsive">
                                <table
                                  class="table mb-0 table-borderless border-0"
                                >
                                  <thead>
                                    <tr class="userDatatable-header">
                                      <th scope="col">
                                        <span class="userDatatable-title"
                                          >Bank Name</span
                                        >
                                      </th>
                                      <th scope="col" class="">
                                        <span class="userDatatable-title"
                                          >Account Name</span
                                        >
                                      </th>
                                      <th scope="col">
                                        <span
                                          class="userDatatable-title float-right"
                                          >Account Number</span
                                        >
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody v-if="!isLoading">
                                    <tr v-for="(bank, k) in userBanks" :key="k">
                                      <td>
                                        <div class="d-flex align-items-center">
                                          <div class="orderDatatable-title">
                                            <p class="d-block mb-0">
                                              {{
                                                getAlias(
                                                  banks,
                                                  "code",
                                                  bank.bank,
                                                  "name"
                                                )
                                              }}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <div class="orderDatatable-title">
                                          {{ bank.name }}
                                        </div>
                                      </td>
                                      <td>
                                        <div
                                          class="orderDatatable-title float-right"
                                        >
                                          {{ bank["number"] }}
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <LoaderOverlay :active="isLoading" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Edit Profile End -->
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
import { apiClient } from "../../plugins/restclient";
import { getTimestamp } from "@/utilities";
import {
  roleMap,
  roles,
  roleAttributes,
  roleAttributesMap,
  progress,
  progressIcon,
  progressColour,
} from "@/utilities/constant";
import {
  required,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";
import Modal from "../../components/Modal.vue";
import ResponseModal from "../../components/ResponseModal.vue";
import SpinnerButton from "../../components/SpinnerButton.vue";
import InterestModal from "../../components/InterestModal.vue";
import { mapState } from "vuex";
import LoaderOverlay from "../../components/LoaderOverlay.vue";
export default {
  components: {
    Modal,
    ResponseModal,
    SpinnerButton,
    LoaderOverlay,
    InterestModal,
  },
  data() {
    return {
    person: null,
      biography: "",
      oldBiography: "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      interest: "",
      selectedInterest: [],
      userInterest: [],
      roles,
      roleMap,
      roleAttributes,
      roleAttributesMap,
      progressIcon,
      progressColour,
      userRoles: "",
      loader: {},
      approved: 0,
      status: 1,
      level: 2048,
      progress,
      isLoading: false,
      updateForm: "biography",
      interestAction: "",
      togglePassword: false,
      toggleOldPassword: false,
      selectedImage: "",
      userBanks: "",
      accountNumber: "",
      errors: {
        bank: {
          message: "",
        },
        role: {
          message: "",
        },
      },
      selectedBank: "",
      selectedRole: "",
      addBankModalConfig: {
        name: "addBankModal",
        header: true,
        type: 1,
        static: true,
        title: "Add Bank Account",
        subTitle: "",
        icon: {
          fg: "",
          bg: "",
        },
      },
      addRoleModalConfig: {
        name: "addRoleModal",
        header: true,
        type: 1,
        title: "Apply for Attribute",
        subTitle: "",
        icon: {
          fg: "",
          bg: "",
        },
      },
    };
  },
  computed: {
    ...mapState(["themes", "banks"]),
  },
  created() {
    this.$store.commit("loader", true);
    apiClient
      .get(`/v1/office/account/custom/profile`, {
        headers: {
          "X-Timestamp": getTimestamp(),
          "X-Ulid": `${this.$store.state.user.ulid}`,
        },
      })
      .then((res) => {
        this.person = res.data.info;
        this.userInterest = this.arrayFromObject(this.person.interests);
        this.biography = this.person.user.biography;
        this.oldBiography = this.person.user.biography;
        this.$store.commit("loader", false);
      })
      .catch(() => {
        this.$store.commit("loader", false);
      });
  },
  methods: {
    arrayFromObject(obj) {
      return Object.keys(obj).map((k) => obj[k]);
    },
    interestUpdated(data) {
      this.loader.interest = true;
      this.$refs.resModal.open({ type: data.type, message: data.message });
      apiClient
        .get("/v1/engine/settings/interest/fetch", {
          headers: {
            "X-Timestamp": getTimestamp(),
            "X-Ulid": `${this.$store.state.user.ulid}`,
          },
        })
        .then((res) => {
          this.userInterest = res.data.data;
          this.loader.interest = false;
        })
        .catch(() => {
          this.interestUpdated();
          this.loader.interest = false;
        });
      console.log(data);
    },
    showModal(name) {
      this.$refs[name].open();
    },
    showInterestModal(action) {
      this.interestAction = action;
      setTimeout(() => {
        this.$refs.interestModal.open();
      }, 200);
    },
    getAlias(banks, key, value, pluck) {
      const data = banks.filter((i) => i[key] == value)[0];
      return data[pluck];
    },
    fileChange() {
      let fg = new FileReader();
      fg.readAsDataURL(document.getElementById("file-upload").files[0]);

      setTimeout(() => {
        this.updateForm = "avatar";
        this.selectedImage = fg.result;
        console.log(this.selectedImage, "selected image");
        this.updateProfile();
      }, 300);
    },
    getUserBankAccounts() {
      this.isLoading = true;
      apiClient
        .get("/v1/office/account/bank/fetch", {
          headers: {
            "X-Timestamp": getTimestamp(),
            "X-Ulid": `${this.$store.state.user.ulid}`,
          },
        })
        .then((res) => {
          this.userBanks = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    getApproved() {
      this.isLoading = true;
      const headers = {
        "X-Timestamp": getTimestamp(),
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
    addBankAccount() {
      this.$v.bankGroup.$touch();
      if (this.$v.bankGroup.$invalid) {
        return;
      }

      this.isLoading = true;
      apiClient
        .post(
          "/v1/office/account/bank/add",
          {
            bank: this.selectedBank.code,
            number: this.accountNumber,
          },
          {
            headers: {
              "X-Timestamp": getTimestamp(),
              "X-Ulid": `${this.$store.state.user.ulid}`,
            },
          }
        )
        .then((res) => {
          // this.$store.commit('loader', false)
          // this.$store.commit('ctoast', {type: 'success', message: res.data.message, timeout: 9 })
          this.$refs.addBankModal.close();
          setTimeout(() => {
            this.$refs.resModal.open({
              type: "success",
              message: res.data.message,
            });
          }, 800);
          this.getUserBankAccounts();
        })
        .catch((err) => {
          // this.$store.commit('loader', false)
          if (err.response.data.status == -1) {
            this.errors.bank.message = err.response.data.message;
          }
        });
    },
    getUserRole() {
      this.isLoading = true;
      apiClient
        .get("/v1/office/account/attribute/fetch", {
          headers: {
            "X-Timestamp": getTimestamp(),
            "X-Ulid": `${this.$store.state.user.ulid}`,
          },
        })
        .then((res) => {
          this.isLoading = false;
          this.userRoles = res.data.data;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    addRoleAttribute() {
      this.$store.commit("loader", true);

      apiClient
        .post(
          "/v1/office/account/attribute/add",
          {
            type: this.selectedRole.code,
          },
          {
            headers: {
              "X-Timestamp": getTimestamp(),
              "X-Ulid": `${this.$store.state.user.ulid}`,
            },
          }
        )
        .then((res) => {
          this.$store.commit("ctoast", {
            type: "success",
            message: res.data.message,
            timeout: 9,
          });
          this.$store.commit("loader", false);
          this.getUserRole();
          this.$refs.addRoleModal.close();
        })
        .catch((err) => {
          this.$store.commit("loader", false);
          this.errors.role.message = err.response.data.message;
        });
    },
    updateProfile() {
      var data = "";
      var url = "";

      if (this.updateForm != "interest") {
        url = `/v1/engine/settings/profile/${this.updateForm}`;
      } else {
        url = "/v1/engine/settings/interest/add";
      }

      if (this.updateForm == "biography") {
        this.$v.biography.$touch();

        if (this.$v.biography.$error) return;
        data = {
          info: this.biography,
        };
      } else if (this.updateForm == "password") {
        this.$v.passwordGroup.$touch();
        if (this.$v.passwordGroup.$error) return;

        data = {
          old: this.oldPassword,
          new: this.newPassword,
        };
      } else if (this.updateForm == "avatar") {
        data = {
          data: this.selectedImage,
        };
        this.$store.commit("loader", true);
      } else {
        data = {
          thlid: this.interest,
        };
      }

      !this.$store.state.loader ? "" : (this.isLoading = true);
      apiClient
        .patch(url, data, {
          headers: {
            "X-Timestamp": getTimestamp(),
            "X-Ulid": `${this.$store.state.user.ulid}`,
          },
        })
        .then((res) => {
          this.isLoading = false;
          this.oldPassword = "";
          this.newPassword = "";
          this.confirmNewPassword = "";
          if (this.updateForm == "biography") {
            this.oldBiography = this.biography;
          } else if (this.updateForm == "password") {
            this.$v.passwordGroup.$reset();
          } else if (this.updateForm == "avatar") {
            this.$store.commit("avatar", res.data.info.src);
          }
          this.$store.commit("loader", false);
          this.$refs.resModal.open({
            type: "success",
            message: res.data.message,
          });
        })
        .catch(() => {
          this.isLoading = false;
          this.$store.commit("loader", false);
          this.$refs.resModal.open({
            type: "error",
            message: `${this.updateForm} failed`,
          });
        });
    },
  },
  validations: {
    biography: {
      required,
    },
    oldPassword: {
      required,
    },
    newPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(24),
      notSameAsOldPassword: function(value) {
        return value != this.oldPassword;
      },
    },
    confirmNewPassword: {
      required,
      sameAsNewPassword: sameAs("newPassword"),
    },
    accountNumber: {
      required,
    },
    selectedBank: {
      required,
    },
    selectedRole: {
      required,
    },
    passwordGroup: ["oldPassword", "newPassword", "confirmNewPassword"],
    bankGroup: ["accountNumber", "selectedBank"],
  },
};
</script>

<style>
.link:hover {
  color: chocolate;
}
.text-gray{
  color: #949393 !important;
}
</style>
<style scoped>
.bread-item:hover {
  color: #9299b8 !important;
}
</style>
