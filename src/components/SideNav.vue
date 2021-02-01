<template>
  <aside class="sidebar">
    <div class="sidebar__menu-group">
      <ul class="sidebar_nav">
        <MenuItem :type="menuItem.type" :menu="menuItem.menu" v-for="(menuItem, k) in menu" :key="k"/>
        <!-- <MenuItem :type="m.type" :menu="m" v-for="(m,k) in menu" :key="k"/> -->
        
        
      </ul>
    </div>
  </aside>
</template>

<script>
import {menuBuilder, menuParser} from "@/config/menu";
import {menuSections} from "@/config/menuDictionary";
import adminMenu from "@/config/adminMenu";
import approvalMenu from "@/config/approvalMenu";
import financeMenu from "@/config/financeMenu";
import realmMenu from "@/config/realmMenu";
import normaliserMenu from "@/config/normaliserMenu";
import officerMenu from "@/config/officerMenu";
import reviewMenu from "@/config/reviewMenu";
import supportMenu from "@/config/supportMenu";
import teacherMenu from "@/config/teacherMenu";
import MenuItem from "@/components/MenuItem";
import { mapState } from 'vuex';
export default {
  props: ["primary", "junior", "senior", "themes", "fees"],
  components:{
    MenuItem,
  },
  data(){
    return{
      menu:'',
      adminMenu,
      approve: approvalMenu,
      finance: financeMenu,
      realm: realmMenu,
      normalizer: normaliserMenu,
      officerMenu,
      reviewer: reviewMenu,
      support: supportMenu,
      teacher: teacherMenu
    }
  },
  computed:{
    ...mapState(['user']),
    permission(){

      let permission = []
      
      if(this.user.role == 8){

        let attr = this.user.idiosyncrasy
        const list = Object.keys(attr).filter(role => attr[role] == true)
        if(list.length > 0){
          for(let p of list){
            permission.push(this[p])
          }
        }else{
          permission = [this.officerMenu]
        }
        

      }else if(this.user.role == 16){

        permission = [this.supportMenu]

      }else if(this.user.role == 32){

        permission = [this.adminMenu]

      }else if(this.user.role >= 64){
        permission = [this.realm]
        
      }

      return permission
    }
  },
  created(){
    if(!this.user) return
    let sections = Object.assign({}, menuSections)
     let menu = menuBuilder(this.permission, sections)
     this.menu = menuParser(menu)[0]
  },
};
</script>

<style></style>
