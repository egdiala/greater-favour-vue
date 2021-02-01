import Vue from "vue";
import { getNumberAlias } from "@/utilities";
Vue.mixin({
  computed:{
      envVariables(){
        return process.env
      }
  },
  methods:{
    getAvatar(user) {
      return user.avatar ? user.avatar.replace('block://', this.envVariables.VUE_APP_STORAGE_BUCKET) : `/img/custom/avatar-` + getNumberAlias(user.fname) + '.png'
      
    },
  }
  
})
