<template>
  <div class="ap-post-form">
    <div class="card border mb-25">
      <div class="card-header px-md-25 px-3">
        <h6>Post something</h6>
      </div>
      <div class="card-body p-0 px-25">
        <div class="d-flex flex-column">
          <div class="border-0  flex-1 position-relative">
            <div class="pt-20 outline-0 pb-2 pr-0 pl-0 rounded-0 position-relative border-bottom" tabindex="-1">
              <span class="ap-profile-image bg-opacity-secondary rounded-circle d-block position-absolute"
                style="background-image:url('/img/ap-author.png'); background-size: cover;"></span>
              <div class="pl-15 ml-5 pt-10">
                <textarea class="form-control border-0 p-0 fs-xl bg-transparent" rows="3" v-model="review.content"
                  placeholder="Write something..." spellcheck="false"></textarea>
              </div>
            </div>
          </div>
          <div class="ap-post-attach d-flex flex-row align-items-center flex-wrap flex-shrink-0">
            <a href="#" class="btn rounded-pill mr-2">
              
              Photo/Video
            </a>
            <a href="#" class="btn rounded-pill ap-post-attach__drop">
              ...
            </a>
            <a href="#" class="btn rounded-pill btn-primary" @click="submitReview">
              Post Review
            </a>
            <button class="btn btn-primary btn-default btn-squared ap-post-attach__btn" style="margin-left:auto" >Post Review
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/plugins/restclient";
import { getTimestamp } from "@/utilities";
import { mapState } from 'vuex';
export default {
  props:['question'],
  data(){
    return{
      review:{
        content:'',
        media:'',
        engine: 'text',
      }
    }
},
computed:{
  ...mapState(['user'])
},
created(){
  console.log(this.question, 'prop question')
},
  methods:{
    submitReview(){
          apiClient.post('/v1/office/assessment/question/review/add', {
              owner: this.question.qlid,
              data: this.review.content,
              engine: this.review.engine
          },{
            headers:{
                "X-Timestamp": getTimestamp(),
                "X-Ulid": `${this.user.ulid}`,
            }
          })
      },
  }
}
</script>

<style>

</style>