<template>
  <div>
    <LoaderOverlay :active="isLoading"/>
    <div class="table-responsive" v-if="isLoading == false">
      <table class="table mb-0 table-hover table-borderless border-0">
        <thead>
          <tr class="userDatatable-header">
            <th v-for="(header, k) in headers" :key="k">
              <span class="userDatatable-title">{{header}}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="q in questions" :key="q.qlid">
            <td>
              <div class="orderDatatable-title">
                <router-link :to="{name:'questions-reviews-overview', params:{qlid: q.qlid}}">{{q[headers[0]]}}</router-link>
              </div>
            </td>
            <td><div class="userDatatable-content"> {{questionTypeMap[q[headers[1]]]}} </div></td>
            <!-- <td>
              <div class="orderDatatable-status d-inline-block">
                
              </div>
            </td> -->
            <td>
              <div class="orderDatatable-title d-inline-block">
                <span class="bg-opacity-primary color-primary rounded-pill userDatatable-content-status active">{{q[headers[2]]}}</span>
                
              </div>
            </td>
            <td>
              <div class="orderDatatable-status d-inline-block">
                <span class="order-bg-opacity-info rounded-pill active" :class="progressColour[q[headers[3]]]">{{progress[q[headers[3]]]}}</span>
              </div>
            </td>
            <td>
              <ul class="orderDatatable_actions mb-0 d-flex flex-wrap float-right">
                <li>
                  <router-link :to="{name:'questions-reviews-overview', params:{qlid: q.qlid}}" class="view">
                    <i class="las la-eye"></i>
                  </router-link>
                </li>
              </ul>
            </td>
          </tr>
          <!-- End: tr -->
        </tbody>
      </table>
    </div>

    <NoContent v-if="false"/>
  </div>
</template>

<script>
import { questionTypeMap, progress, progressColour } from "@/utilities/constant";
import { apiClient } from "@/plugins/restclient";
import { getTimestamp } from "@/utilities";
import NoContent from './NoContent';
import LoaderOverlay from "./LoaderOverlay";
export default {
  components: { NoContent, LoaderOverlay },
  data(){
    return{
      questionTypeMap,
      progress,
      progressColour,
      isLoading: false
    }
  },
  props:['headers', 'questions', 'params'],
  created(){
    this.fetchQuestions()
  },
  methods:{
    fetchQuestions(){
    this.isLoading = true
          apiClient.get(`/v1/office/assessment/question/fetch/state?status=${this.params.status}&level=${this.params.level}`,{
           headers:{
                  "X-Timestamp": getTimestamp(),
                  "X-Ulid": `${this.$store.state.user.ulid}`,
              }
        })
            .then(res => {
                this.questions = res.data.data
                this.isLoading = false
            })
            .catch(() => {
              this.isLoading = false
            })
        }
  }
}
</script>

<style>

</style>