<template>
  <div class="bg d-flex justify-content-center" @click.self="close" :class="{'no-display': !open}"> 

      <div class="document">
          <div class="topbar">
            
              <button class="btn btn-primary btn-close" @click="close" >
                <i class="fa fa-times"></i>
            </button>
          </div>
            
        
       <iframe :src="`${envVariables.VUE_APP_STORAGE_BUCKET}${document.src}`" style="width:960px; height:95vh;" frameborder="0"></iframe>
       <!-- <embed :src="`${envVariables.VUE_APP_STORAGE_BUCKET}${document.src}`" type="application/pdf" width="100%" height="100%"> -->

        <div class=" toolbar d-flex justify-content-center" :class="{'no-display': document.status}">
          <div class="action-btn mx-2">
            <a href="#!" class="btn btn-success btn-sm btn-default btn-squared btn-transparent-success" @click="fileDocument(1)">
                <i class="la la-check"></i> Approve</a>
        </div>
          <div class="action-btn mx-2"  data-toggle="modal" data-target="#rejectionModal">
            <a href="#!" class="btn btn-danger btn-default btn-sm btn-squared btn-shadow-danger">
                <i class="la la-times"></i> Reject </a>
        </div>
          
        </div>
      </div>
      <div class="modal fade" id="rejectionModal" tabindex="-1" role="dialog" aria-labelledby="rejectionModalTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Rejection Reason</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body p-0">
        <div class="form-group mb-0">
            <textarea v-model="note" class="form-control" id="rejectionReasons" rows="5" style="resize: none; border:0"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="fileDocument(-1)" data-dismiss="modal">Save changes</button>
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
    layout:'plain',
    data(){
        return{
            open: false,
            docPath:'',
            note: ''
        }
    },
    computed:{
      storage(){
        return process.env.V
      }
    },
    props:['document'],
    watch:{
      document(){
        this.open = true
      }
    },
    methods:{
      close(){
        this.open = false
        this.$emit('documentClose')
      },
      preview(){
        this.docPath = this.document.src
      },
      fileDocument(status){
        this.$store.commit('loader', true)
        apiClient.patch('/v1/office/account/document/approve',
        {
          dolid: this.document.dolid,
          tag: this.document.name.split(' ')[1].toUpperCase(),
          note: this.note,
          status: status
        },
        {
          headers:{
              "X-Timestamp": getTimestamp(),
              "X-Ulid": `${this.$store.state.user.ulid}`,
          }
        }
        )
        .then(res =>{
          this.$store.commit('loader', false)
          this.$store.commit('toast', {message: res.data.message, type: 'success'})
          this.open = false
          this.$emit('docStatus')
          
        })
        .catch(err => {
          this.$store.commit('loader', false)
          this.$store.commit('ctoast', {message: err.response.data.message, type: 'danger'})
          this.open = false
        })
      }
    }
}
</script>

<style>
.bg{
    background: #4e4d4d9e;
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    z-index: 9999;
    width: 100%;
}
.topbar{
    text-align: right;
}
.btn-close{
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    position: absolute;
    right: 10px;
    top: 10px;
    background: #323639;
    border: 0px;
}
.btn-close i{
    margin: 0px;
}
.document{
    position: relative;
    padding: 30px;
    background:#535658;
}
.no-display{
    display: none !important;
}
.toolbar{
    position: absolute;
    width: 100%;
    bottom: 100px;
    opacity: 0;
}
.document:hover .toolbar{
    opacity: 1;
}
</style>