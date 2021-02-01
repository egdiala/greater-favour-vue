<template>
  <div>
    <Header></Header>
    <transition name="slide-fade">
      <div v-if="ctoast.message"
        class="signUp-topbar d-flex align-items-center justify-content-md-end justify-content-center mt-md-0 mb-md-0 mt-20 mb-1" style="position: fixed; top: 1em; right: 1em; z-index: 99999"
      >
        <div class="mb-0 mt-3">
        <div class="alert alert-danger" role="alert" :class="ctoast.type">
            {{ctoast.message}}
        </div> 
        </div>
      </div>
    </transition>
    <div class="main-content">
      <SideNav :primary="primary" :junior="junior" :senior="senior" :themes="themes" :fees="fees" />
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
      <Footer></Footer>
       <LoaderOverlay :active="asyncLoader" :fullpage="true" bgColor="#2a2a2a55" zIndex="99999"></LoaderOverlay>
        <!-- <LoaderOverlay :active="loader.active" :fullpage="loader.fullpage" bgColor="#2a2a2a55" zIndex="99999"></LoaderOverlay> -->
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";
import { authComputed } from "../vuex/helpers.js";
import { apiClient } from "@/plugins/restclient.js";
import LoaderOverlay from "@/components/LoaderOverlay";
import { mapState } from 'vuex';
export default {
  components: {
    Header,
    SideNav,
    Footer,
    LoaderOverlay
  },
  data () {
    return {
      classes: [],
      successRefresh: 0,
      failedRefresh: 0,
      refreshHandler: '',
      loader: {
          fullpage: true,
          active: false
      },
      subjects: [],
      topics: [],
      primary: [],
      junior: [],
      senior: [],
      primarySub: [],
      juniorSub: [],
      seniorSub: [],
      themes: [],
      fees: []
    }
  },
  watch:{
      ctoast(){
        setTimeout(()=>{
          this.$store.commit('ctoast', {message:'', type: ''})
        },7000)
      }
  },
  computed: {
    ...mapState(['asyncLoader', 'ctoast']),
    ...authComputed,
  },
  beforeDestroy() {
    clearInterval(this.refreshHandler);
  },
  created() {
    this.refresh();
  },
  beforeMount(){
    if (localStorage.getItem("verification")) {
      this.$router.push({ path: "/login" });
    } else if (this.loggedIn == false){
      this.$router.push({ path: "/login" });
    }
  },
  mounted() {
    require("../assets/js/main");
    if (this.loggedIn == true){
      this.getClasses();
    }
    
    // $(document).ready(function() {
    //   $(function() {
    //     $("#modal-basic").modal({
    //       backdrop: true,
    //     });
    //   });
    // });
  },
  methods:{
    refresh() {
      this.refreshHandler = setInterval(() => {
        this.tokenRefresh();
      }, 420000);
    },
    tokenRefresh() {
        var ts = Math.round(+new Date() / 1000);
        
        const headerz = {
          "X-Ulid": `${this.$store.state.user.ulid}`,
          "X-Timestamp": ts,
        };

        apiClient
          .get("/v1/engine/auth/refresh", {
            headers: headerz,
          })
          .then((res) => {
            this.successRefresh++;
            this.failedRefresh = 0;
            localStorage.removeItem("jwt");
            localStorage.setItem("jwt", res.data.info.token);
          }).catch((err) => {
            this.failedRefresh++
            if (err.response != undefined) {
             var errMsg = err.response.data.message;
              if (errMsg == 'access denied') {
                this.failedRefresh < 3 ? this.retry() : this.logout();
              } else {
                this.failedRefresh < 3 ? this.retry() : this.logout();              
              }              
            } else {
                this.failedRefresh < 3 ? this.retry() : this.logout(); 
            }

          });

          apiClient.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwt")}`;
    },
    retry() {
      setInterval(() => {
        this.tokenRefresh();
      }, 30000);
    },
    getClasses() {
      
      this.$store.commit('loader', true)
      var ts = Math.round(+new Date() / 1000);

      const headers = {
        'X-Ulid': `${this.$store.state.user.ulid}`,
        "X-Timestamp": ts,
      };

      apiClient.get('/v1/engine/core/environment', {
        headers: headers,
          }).then(res => {
            
        this.$store.commit('loader', false)
            var response = res.data.info;
            var classes = response.classes;
            var subjects = response.subjects;
            var topics = response.topics;
            var themes = response.themes;
            var fees = response.fees;
            var banks = response.banks.data

            this.$store.commit('BANK_LISTING', banks)
            this.classes = Object.keys(classes).map(i => classes[i]);
            this.subjects = Object.keys(subjects).map(i => subjects[i]);
            this.topics = Object.keys(topics).map(i => topics[i]);
            this.themes = Object.keys(themes).map(i => themes[i]);

            this.fees = Object.keys(fees).map(i => fees[i]);

            this.$store.commit('SET_THEMES', this.themes)
            this.$store.commit('SET_THEMES', this.themes)

            var primary =  this.classes.filter(function(hero) {
              return hero.category == "PRIMARY";
            });
            
            this.primary = primary;
           

            var junior =  this.classes.filter(function(hero) {
              return hero.category == "JUNIOR";
            });
            
            this.junior = junior;

            var senior =  this.classes.filter(function(hero) {
              return hero.category == "SENIOR";
            });
            
            this.senior = senior;

            var primarySub =  this.subjects.filter(function(hero) {
              return hero.category_class == "PRIMARY";
            });
            
            this.primarySub = primarySub;

            var juniorSub =  this.subjects.filter(function(hero) {
              return hero.category_class == "JUNIOR";
            });
            
            this.juniorSub = juniorSub;

            var seniorSub =  this.subjects.filter(function(hero) {
              return hero.category_class == "SENIOR";
            });
            
            this.seniorSub = seniorSub;
             let filteredClasses = this.classes;
             let filteredSubjects = this.subjects;
             let filteredTopics = this.topics;

            this.$store.commit('TOTAL_CLASSES', filteredClasses );
            this.$store.commit('TOTAL_SUBJECTS', filteredSubjects );
            this.$store.commit('TOTAL_TOPICS', filteredTopics );
             this.$store.commit('primary', this.primary)
             this.$store.commit('junior', this.junior)
             this.$store.commit('senior', this.senior)
             this.$store.commit('fees', this.fees)
        }).catch((err) => {
          this.$store.commit('loader', false)
          if (err.response.data.message == "access denied" && err.response.data.tags.includes("access denied")) {
            this.logout();
          }
        });
    },
    logout() {
      this.$store.dispatch("logout");
    }
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
