<template>
  <div class="about">
    
    <main class="main-content">
      <div class="signUP-admin">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-xl-4 col-lg-5 col-md-5 p-0">
              <div class="signUP-admin-left position-relative h-100vh">
                <div class="signUP-overlay">
                  <img
                    class="svg signupTop"
                    src="@/assets/img/svg/signupTop.svg"
                    alt="svg"
                  />
                  <img
                    class="svg signupBottom"
                    src="@/assets/img/svg/signupBottom.svg"
                    alt="svg"
                  />
                </div>
                <div class="signUP-admin-left__content">
                  <div
                    class="text-capitalize mb-md-30 mb-15 d-flex align-items-center justify-content-md-start justify-content-center"
                  >
                    <img
                      src="@/assets/img/custom/greater-favour.png"
                      width="200"
                    />
                  </div>
                  <h1>Administration Panel</h1>
                </div>
                <div class="signUP-admin-left__img">
                  <img
                    class="img-fluid svg"
                    src="@/assets/img/custom/teacher@2x.png"
                    width="280"
                    alt="img"
                  />
                </div>
              </div>
              <!-- End: .signUP-admin-left -->
            </div>
            <!-- End: .col -->
            <div class="col-xl-8 col-md-7 col-sm-8">
              <div class="signUp-admin-right content-center h-100 pb-30">
                <transition name="slide-fade">
                <div v-if="offline"
                  class="signUp-topbar d-flex align-items-center justify-content-md-end justify-content-center mt-md-0 mb-md-0 mt-20 mb-1" style="position: fixed; top: 1em; right: 1em;"
                >
                  <div class="mb-0 mt-3">
                  <div class="alert alert-danger" role="alert">
                      Connection to the server failed.
                  </div> 
                  </div>
                </div>
              </transition>
                <router-view />
                <span class="small" style="position: absolute; bottom: 15px; right:15px">GreaterFavour Foundation &copy; {{(new Date()).getFullYear()}} <span style="color:#c4c4c4">|</span> v {{envVariables.VUE_APP_VERSION}}</span>
              </div>
              <!-- End: .signUp-admin-right -->
            </div>
            <!-- End: .col -->
          </div>
        </div>
      </div>
      <!-- End: .signUP-admin -->
    </main>
  </div>
</template>
<script>

export default {
  data() {
    return {
    }
  },
 computed:{
   offline(){
     this.dismissNotification()
     return this.$store.state.offline ? true : false
   }
 },
 methods:{
   dismissNotification(){
     setTimeout(() => this.$store.commit('SET_OFFLINE', false), 3000)
   }
 }
}
</script>