<template>
  <div id="app">
    <transition name="slide" mode="out-in">
      <router-view/>  
    </transition>
  </div>
</template>
<script>
export default {
}
</script>
<style>

#nav a.router-link-exact-active {
  color: #42b983;
}
.slide-enter-active,
.slide-leave-active{
  transition: all 1s;
}

.slide-enter,
.slide-leave-to
{
  opacity: 0;
  
}
</style>
