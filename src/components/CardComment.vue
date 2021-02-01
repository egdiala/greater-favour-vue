<template>
  <div class="ap-main-post">
    <div class="card mb-25">
        <div class="card-body pb-0 px-25 ap-main-post__header">
            <div class="d-flex flex-row pb-20 border-top-0 border-left-0 border-right-0 ap-post-content__title align-items-center ">
                <div class="d-inline-block align-middle mr-15">
                    <span class=" profile-image bg-opacity-secondary rounded-circle d-block avatar avatar-md m-0" style="background-image:url('img/author/2.jpg'); background-size: cover;"></span>
                </div>
                <h6 class="mb-0 flex-1 text-dark">
                    Alexendra Dhadio
                    <small class="m-0 d-block">
                        2 days ago
                    </small>
                </h6>
                <div class="dropdown  dropdown-click ">
                    <button class="btn-link border-0 bg-transparent p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                    </button>
                    <div class="dropdown-default dropdown-bottomRight dropdown-menu">
                        <a class="dropdown-item" href="#">Item One</a>
                        <a class="dropdown-item" href="#">Item Two</a>
                        <a class="dropdown-item" href="#">Item Three</a>
                    </div>
                </div>
            </div>
            <div class="mb-15">
                <img src="img/post-image.png" alt="post image" class="ap-post-attach__headImg w-100">
            </div>
            <div class="pb-3 border-top-0 border-left-0 border-right-0 ap-post-content__p">
                Nam malesuada dolor tellus pretium amet was hendrerit facilisi
                tempor quis enim sed ornare there suspendisse sed orci neque ac sed aliquet risus faucibus in pretium molestee.
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { apiClient } from '@/plugins/restclient';
import { getTimestamp } from "@/utilities";

export default {
    data(){
        return{
            reviews: []
        }
    },
    props:['qlid'],
    created(){
        console.log('card comm')
        this.getAllReviews()
    },
    methods:{
         getAllReviews(){
          apiClient.get(`/v1/office/assessment/question/review/fetch/question/${this.qlid}`,{
            headers:{
                "X-Timestamp": getTimestamp(),
                "X-Ulid": `${this.$store.state.user.ulid}`,
            }
          })
          .then(res =>{
              this.reviews = res.data
          })
          .catch()
      },
    }
}
</script>

<style>

</style>