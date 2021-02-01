<template>
 
    <li class="has-child" v-if="type == 'tree'">
      <a href="#">
        <span :data-feather="menu.icon" class="nav-icon"></span>
        <span class="menu-text">{{menu.label}}</span>
        <span class="toggle-icon"></span>
      </a>
      <ul>
        <li id="primary" v-for="(child,k) in menu.children" :key="k">
          <router-link :to="child.to">{{child.label}}</router-link>
        </li>
      </ul>
    </li>
    <li class="" v-else-if="type == 'item'">
      <router-link :to="menu.to">
        <span :data-feather="menu.icon" class="nav-icon"></span>
        <span class="menu-text">{{menu.label}}</span>
      </router-link>
    </li>
    <li class="menu-title mt-4" v-else-if="type == 'title'">
      <span>{{menu.label}}</span>
    </li>

</template>

<script>
export default {
    props:['type', 'menu' ],
    created(){
      // console.log(this.menu)
    }
}
</script>

<style>

</style>