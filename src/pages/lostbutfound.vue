<template>
  <main class="main-content">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-12">
                    <!-- Start: error page -->
                    <div class="min-vh-100 content-center">
                        <div class="error-page text-center">
                            <img src="/img/svg/404.svg" alt="404" class="svg">
                            <div class="error-page__title">Lost but Found</div>
                            <h5 class="fw-500">Seems you are lost. Let us take you home</h5>
                            <div class="content-center mt-30">
                                <a @click="$router.go(step)" class="btn btn-primary btn-default btn-squared px-30 link text-white">Back</a>
                            </div>
                        </div>
                    </div>
                    <!-- End: error page -->
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { mapState } from 'vuex'
import store from "@/vuex/store";
export default {
    layout:'plain',
    computed:{
        ...mapState(['router']),
        step(){
            console.log(this.router.from, 'from')
            if(this.router.from.path == '/'){
                return -2
            }else{
                return -1
            }
        }
    },
    beforeRouteEnter(to,from,next){
        store.commit('router', {from})
        next()
    }
}
</script>

<style>

</style>