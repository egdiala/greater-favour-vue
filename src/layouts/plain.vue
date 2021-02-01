<template>
  <div>
    <a class="topright btn link text-danger" @click="logout">Sign Out <i class="fa fa-power-off mx-1"></i></a>
    <LoaderOverlay :active="asyncLoader" :fullpage="true" bgColor="#2a2a2a55" zIndex="99999"></LoaderOverlay>
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
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
      
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LoaderOverlay from "@/components/LoaderOverlay";
export default {
  components:{
    LoaderOverlay,
  },
  computed:{
    ...mapState(['ctoast', 'asyncLoader'])
  },
  created(){
    // this.$store.dispatch('checkStatus')
    this.$store.dispatch('environment')
  },
  methods:{
    logout(){
      console.log('one')

      localStorage.removeItem('user')
      localStorage.removeItem('onboarding')
      localStorage.removeItem('jwt')
      location.href = '/login'
      
      
    }
  },
   watch:{
      ctoast(){
        setTimeout(()=>{
          this.$store.commit('ctoast', {message:'', type: ''})
        },7000)
      }
  },
  beforeRouteEnter(to,from,next){
    const pass = localStorage.getItem('user') && localStorage.getItem('jwt') && localStorage.getItem('onboarding')
    console.log(pass, 'pass')
    if(pass){
      next()
      return
    }
    next('/login')
  }
}
</script>

<style>
.topright{
  position: absolute;
  top: 20px;
  right: 30px;
  z-index: 9999;
}
</style>