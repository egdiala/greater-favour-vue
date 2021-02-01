<template>
    <paginate v-if="officers.length > 1" :page-count="totalPage" :click-handler="loadNext" 
          :prev-text="prevText"
          :next-text="nextText"
          :hide-prev-next="true"
          :container-class="'atbd-pagination d-flex justify-content-end py-3'"
          :page-class="'atbd-pagination__item'" :page-link-class="'atbd-pagination__link'"
          :prev-link-class="'atbd-pagination__link pagination-control'"
          :next-link-class="'atbd-pagination__link pagination-control'">
        </paginate>
</template>
<script>
import Paginate from "vuejs-paginate";
export default {
    components:{
        Paginate,
    },
    props:['size', 'url'],
    data(){
        return{
            prevText: '<span class="la la-angle-left"></span>',
            nextText: '<span class="la la-angle-right"></span>',
        }
    },
    methods:{
        loadNext(num) {
        this.getRecords(num);
        return;
      },
      getRecords(page) {
        this.loader.active = true
        apiClient.get(`${url}${(page-1)*this.size}&size=${this.size}`, {
            headers: {
              "X-Timestamp": getTimestamp(),
              "X-Ulid": `${this.$store.state.user.ulid}`,
            }
          })
          .then(res => {
            this.currentPage = Number(page);
            this.xPage = "";
            this.recordSet = res.data.data
            this.officers = this.recordSet
            if (!this.officers.length) this.userNotFound = true
            this.totalPage = Math.floor(res.data.info.total / this.size);
            this.loader.active = false
          })
          .catch(() => {
            this.loader.active = false
            this.userNotFound = true

          });
      },
    }
    
}
</script>