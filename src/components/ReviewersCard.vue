<template>
  <div class="col-xl-3 col-lg-3 col-12 mb-25">
        <div class="card  normHeight">
            <div class="card-header d-flex justify-content-between align-items-center py-10  px-sm-25 px-3">
                <h6 class="fw-500 ">users</h6>
            </div>
            <div class="card-body">
                <div class="d-flex align-items-center mb-25">
                    <img src="img/tm1.png" class="wh-46 mr-15" alt="img">
                    <div>
                        <p class="fs-14 fw-600 color-dark mb-0">{{reviewers.name}}</p>
                        <span class=" mt-1 fs-14  color-light ">Author</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { apiClient } from '@/plugins/restclient';
import { getTimestamp } from "@/utilities";
export default {
    props:['qlid'],
    data(){
        return{
            reviewers: []
        }
    },
    created(){
        this.getUserApprovedList()
    },
    methods:{
        getUserApprovedList(){
          apiClient.get(`/v1/office/assessment/question/approval/fetch/question/${this.qlid}`,{
            headers:{
                "X-Timestamp": getTimestamp(),
                "X-Ulid": `${this.$store.state.user.ulid}`,
            }
          })
          .then(res => {
              this.reviewers = res.data.data
          })
          .catch()
      }
    }
}
</script>

<style>

</style>