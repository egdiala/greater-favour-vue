<template>
  <div class="contents">
        <div class="container-fluid">
            <div class="profile-content mb-50">
                <div class="row">
                    <div class="col-lg-12 mb-2 sticky">
                        <div class="breadcrumb-main p-3" style="background-color: #f4f5f7 !important;">
                            <h4 class="text-capitalize breadcrumb-title">My Question Upload
                                <ul class="atbd-breadcrumb nav">
                                    <li class="atbd-breadcrumb__item">
                                        <router-link to="/">
                                            <span class="la la-home"></span>
                                        </router-link>
                                        <span class="breadcrumb__seperator">
                                            <span class="la la-slash"></span>
                                        </span>
                                    </li>
                                    <li class="atbd-breadcrumb__item">
                                        <span class="bread-item" style="color: #9299b8;">Questions</span>
                                        <span class="breadcrumb__seperator">
                                            <span class="la la-slash"></span>
                                        </span>
                                    </li>
                                    <li class="atbd-breadcrumb__item">
                                        <span class="bread-item">Upload</span>
                                    </li>
                                </ul>
                            </h4>

                        </div>
                    </div>
                </div>
                <no-content />
            </div>
        </div>   
    </div>
</template>

<script>
import NoContent from '../../components/NoContent.vue'
export default {
    components:{
        NoContent
        
    }
}
</script>

<style>

</style>