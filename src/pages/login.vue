<template>
  <div class="about">
    <transition name="slide-fade">
      <div
        v-if="loginFailed"
        class="signUp-topbar d-flex align-items-center justify-content-md-end justify-content-center mt-md-0 mb-md-0 mt-20 mb-1"
        style="position: fixed; top: 1em; right: 1em; z-index:9999"
      >
        <div class="mb-0 mt-3">
          <div class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </transition>
    <div class="signUp-admin-right content-center h-100 pb-30">
      <div
        v-show="!$store.state.verify && !$store.state.verifyBVN"
        class="row justify-content-center"
      >
        <div class="col-md-8 col-sm-10">
          <div class="edit-profile mt-0">
            <div class="card border-0">
              <div class="card-header border-0 pt-0 pb-0">
                <div class="signUp-header-top mt-md-0 mt-30">
                  <h6 class="mt-4">
                    Login to <span class="color-primary">Admin</span>
                  </h6>
                  <p class="mt-md-45 mt-20">
                    Enter the email address/username you used when you joined
                    and we’ll all you gain access to the platform .
                  </p>
                  <p class="mb-0">
                    <strong>
                      Don't have an account?
                      <router-link to="/signup">
                        Sign up
                      </router-link>
                    </strong>
                  </p>
                </div>
              </div>
              <form @submit.prevent="login" method="post">
                <div class="card border-0">
                  <div class="card-body">
                    <div class="edit-profile__body">
                      <div class="form-group mb-20">
                        <label for="username">Username</label>
                        <input
                          v-model.trim="$v.username.$model"
                          type="text"
                          class="form-control"
                          id="username"
                          placeholder="Enter username or email"
                        />
                        <transition name="slide-fade"
                          ><span v-if="$v.username.$error" class="text-danger"
                            >Username cannot be empty.</span
                          ></transition
                        >
                      </div>
                      <div class="form-group mb-15">
                        <label for="password-field">password</label>
                        <div class="position-relative">
                          <input
                            v-model.trim="$v.password.$model"
                            id="password-field"
                            :type="togglePassword ? 'text' : 'password'"
                            placeholder="Enter password"
                            class="form-control"
                            name="password"
                            value=""
                          />
                          <transition name="slide-fade"
                            ><span v-if="$v.password.$error" class="text-danger"
                              >Password cannot be empty.</span
                            ></transition
                          >
                          <div
                            class="fa fa-fw text-light fs-16 field-icon toggle-password2"
                            :class="{
                              'fa-eye-slash': togglePassword,
                              'fa-eye': !togglePassword,
                            }"
                            @click="togglePassword = !togglePassword"
                          ></div>
                        </div>
                      </div>
                      <div class="signUp-condition signIn-condition">
                        <div class="checkbox-theme-default custom-checkbox">
                          <input
                            class="checkbox"
                            type="checkbox"
                            id="check-1"
                          />
                          <label for="check-1">
                            <span class="checkbox-text">Keep me logged in</span>
                          </label>
                        </div>
                        <router-link to="/forgot-password"
                          >forget password</router-link
                        >
                      </div>
                      <div
                        class="button-group d-flex pt-1 justify-content-md-start justify-content-center"
                      >
                        <button
                          type="submit"
                          class="btn btn-primary btn-default btn-squared text-capitalize lh-normal px-50 py-15 signIn-createBtn"
                          :disabled="isLoading"
                        >
                          <span
                            v-if="isLoading"
                            class="spinner-border spinner-border-sm"
                          ></span>
                          {{ isLoading ? "" : "Login" }}
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- End: .card-body -->
                </div>
              </form>
              <!-- End: .card -->
            </div>
            <!-- End: .card -->
          </div>
          <!-- End: .edit-profile -->
        </div>
        <!-- End: col -->
      </div>
      <!-- <otp
                  v-show="$store.state.verify"
                  :timeLimit="$store.state.otp"
                />
                <bvn v-show="$store.state.verifyBVN && !$store.state.verify"/> -->
    </div>
  </div>
</template>

<script>
import { authComputed } from "../vuex/helpers.js";
import { publicClient } from "@/plugins/restclient.js";
import { required } from "vuelidate/lib/validators";
import store from "@/vuex/store";
import { mapState } from 'vuex';
export default {
  components: {},
    layout: "landing",
    data() {
      return {
        isLoading: false,
        username: "",
        password: "",
        togglePassword: false,
        loginFailed: false,
        errorMessage: ''
      };
    },
    metaInfo: {
      title: "Greater Favour",
      titleTemplate: "%s | Login",
      htmlAttrs: {
        lang: "en",
        amp: true,
      },
    },
    computed: {
      ...authComputed,
      ...mapState(['user'])
    },
    watch: {
      loginFailed(newval) {
        newval && setTimeout(() => (this.loginFailed = false), 3000);
      },
    },
    methods: {
      login() {
        this.$v.$touch()

        if (this.$v.$invalid) return

        this.isLoading = true;
        const credentials = {
          username: this.username,
          password: this.password
        }
        this.$store.commit('credentials',  credentials)
        publicClient
          .post("/v1/daemon/start/login", {
            username: this.username,
            password: this.password
          })
          .then((res) => {
            this.isLoading = false;
            this.$store.commit("SET_USER_DATA", res.data);
            this.isLoading = false;
            if (this.$store.state.user.role == 8) {
              this.loginAction()
            } else {
              // this.$router.push('/')
              location.href = '/'
            }


          })
          .catch((err) => {

            this.isLoading = false
            if (err.response.data.status == -1) {
              this.loginFailed = true
              this.errorMessage = 'Invalid login credentials'
              return
            }

            const data = err.response.data
            const action = data.action.name
            const user = {
              ulid: data.info.user.ulid,
              token: data.info.token,
              role: data.info.user.role,
              mobile: data.info.user.mobile,
              fname: data.info.user.fname,
              lname: data.info.user.lname,
              email: data.info.user.email,
            }

            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('jwt', user.token )

            if (action == 'user.bvn') {
              const data  = {
                  step: 'bvn',
              }
              localStorage.setItem('onboarding', JSON.stringify(data))
              this.$router.push({
                name: 'onboarding-bvn'
              })
            } else if (action == 'user.verification') {
              this.$router.push({
                name: 'verify-user',
                params: {
                  user: user,
                  action: action
                }
              })
            }

          });

      },
      loginAction() {
        this.$store.dispatch('checkStatus')
      }
    },
    validations: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
    beforeRouteEnter(to, from,next){
      console.log(store.state.user)
      if(store.state.user != null){
        next('/')
      }
      next()
    }
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
</style>
