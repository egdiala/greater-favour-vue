<template>
  <div class="main-content">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <!-- Start: error page -->
                    <div class="min-vh-100 content-center  multi_step_form">
                        <div class="error-page text-center">
                            <img src="/img/custom/greater-favour.png" class="mb-10 mt-50" width="200"> <br>
                            <h5 class="fw-500">Upload <br> <small> Document</small> </h5> <br>

                            <div class="card mb-25">
                                
                                <div v-if="false" class="mt-5">
                                    <div class="text-center my-5">
                                        <span style="overflow:hidden; display:inline-block">
                                            <img src="@/assets/img/checkmark.gif" width="100" alt="failed-icon">
                                        </span>
                                        
                                    </div>	
                                    <div class="text-center">
                                        <h2 class="text-danger">Yeah!</h2>
                                        <p class="mt-4 mb-50">Success</p>
                                    </div>
                                </div>
                                <div>
                                    <div class="card-body mt-20 p-20">
                                       
                                             <div class="application-faqs">
                                        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                            <!-- panel 1 -->
                                            <div class="panel mb-3 panel-default" v-for="(d, k) in documents" :key="k" :class="{'disabled': k != 0}" :data-accordion="d.action.replace('.', '')">
                                                <div class="panel-heading" role="tab" id="headingOne">
                                                    <h4 class="panel-title text-uppercase">
                                                        <a data-toggle="collapse" data-parent="#accordion" :href="`#${d.action.replace('.', '')}`" :ref="d.action.replace('.', '')" aria-expanded="true" aria-controls="collapseOne">
                                                            {{d.action.split('.')[1]}} 
                                                        </a>
                                                    </h4>
                                                </div>
                                                <div :id="d.action.replace('.', '')" class="panel-collapse collapse" :class="{'show': k == 0}" role="tabpanel" aria-labelledby="headingOne">
                                                    <div class="panel-body text-left">
                                                        <p class="mb-sm-35 mb-20">{{ getContent(d.action)}} </p>
                                                            <a type="button" :href="getLink(d.action)" download="" class="order-bg-opacity-secondary text-secondary btn radius-md" v-if="getLink(d.action)" @click="showSmartButtons(d.action)">Download PDF </a> <br>
                                                             <div class="form-group mb-30 d-flex align-items-center" v-if="!getLink(d.action) || smartButtons[d.action.replace('.','')]">
                                                                 <smart-upload-button :document="d" @uploadSuccess="nextAccordion"/>
                                                            </div>
                                                       
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                         
                                    </div>
                                     
                                        <div class="d-flex justify-content-center  ">
                                           <div class="mt-50 mb-25">
                                                <strong>Need help? Check our help </strong> 
                                                <a href="/help#onboarding-document-upload">section</a>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                

                            </div>
                           <div class="content-center mt-30">
                                <button class="btn btn-primary btn-default btn-squared px-30 link text-white" :disabled="!continueButton" @click="proceed">Continue</button>
                            </div>
                            
                        </div>
                    </div>
                    <!-- End: error page -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import jQ from "jquery";
import documentMeta from "@/config/documentMeta";
import { mapState } from 'vuex';
import SmartUploadButton from '../../components/SmartUploadButton.vue';
export default {
  components: { SmartUploadButton },
  layout:'plain',
  data(){
      return{
          documentMeta,
          files:{},
          fileReader: '',
          smartButtons:{},
          accordionsId:[],
          continueButton: false
      }
  },
  computed:{
    documents(){
      const data = JSON.parse(localStorage.getItem('onboarding'))
      return data.documents
    },
    ...mapState(['user'])
  },
  created(){
      jQ('body').on('click', '.disabled', function(e){
          e.stopPropagation()
          
      })
      jQ('body').on('click', '.accordion-success', function(e){
          e.stopPropagation()
      })
      for(let i of this.documents){
            this.accordionsId.push(i.action.replace('.', ''))
            const tag = i.action.replace('.', '')
            this.$set(this.smartButtons, tag, false)  
      }
  },

  methods:{
    getContent(meta){
        const data = this.documentMeta[meta]
        if(data){
            return data.message
        }
        return
    },
    getFile(data){

        if(this.files[data]){
            return this.files[data].name
        }
        return
    },

    getLink(meta){
        const data = this.documentMeta[meta]
        if(data){
            return data.link
        }
        return
    },

    proceed(){
        this.$store.dispatch('checkStatus')
    },

    showSmartButtons(tag){
        tag = tag.replace('.','')
        this.smartButtons[tag] = true
    },

    nextAccordion(currentAccordion){
        const selector = `[href="#${currentAccordion}"]`
        Window.trigger('click', selector)

        jQ('[data-accordion="' + currentAccordion + '"').addClass('accordion-success')
        jQ('[data-accordion="' + currentAccordion + '"').removeClass('disabled')
        this.accordionsId.splice(this.accordionsId.indexOf(currentAccordion), 1)
        const nextAccordion = this.accordionsId[0]
        const nextSelector = `[href="#${nextAccordion}"]`
        jQ('[data-accordion="' + nextAccordion + '"').removeClass('disabled')
        Window.trigger('click', nextSelector)

        if(this.accordionsId.length == 0){
            this.continueButton = true
        }  
    }
  }
}
</script>

<style>

.accordion-success *{
    background-color:#edf9f5;
}
.disabled *{
    background-color: #fafafa;
    color:  #d0cfcf !important;
}
</style>