<template>
   <div class="contents">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="breadcrumb-main application-ui mb-0">
                            <div class=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                <div class="d-flex align-items-center user-member__title justify-content-center mr-sm-25">
                                    <h4 class="text-capitalize fw-500 breadcrumb-title"><span @click="$router.go(-1)"><i class="las la-arrow-left fs-16"></i></span>&nbsp;&nbsp; Adverbs and adverbials</h4>
                                    <span class="sub-title ml-sm-25 pl-sm-25">500 questions</span>
                                </div>
                            </div>
                            <div class="action-btn">
                                <a href="" class="btn btn-default btn-squared btn-outline-primary ">
                                    <i class="la la-plus"></i> Approve Question </a>
                            </div>
                            <!-- <div class="d-flex text-capitalize">
                                
                                <button type="button" class="breadcrumb-edit border-0 color-primary content-center bg-white fs-12 fw-500 radius-md">
                                    <span data-feather="edit-3"></span>edit</button>
                                <button type="button" data-toggle="modal" data-target="#modal-info-delete" class="breadcrumb-remove border-0 color-danger content-center bg-white fs-12 fw-500 ml-10 radius-md">
                                    <span data-feather="trash-2"></span>remove</button>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="projects-tab-content mb-30">
                    <div class="row">
                        <div class="col-xl-3 col-lg-3 mb-25">
                          <div class="card normHeight">
                                      
                                <div class="card-body">
                                    
                                    <div class="presets ">
                                        <span class="hh"> Question Type  </span>
                                        <span class="hs"> <span class="atbd-tag tag-primary tag-transparented">Quiz</span> </span>

                                        <span class="hh"> Class  </span>
                                        <span class="hs"> <span class="atbd-tag tag-primary tag-transparented">Basic 6</span>  <span class="atbd-tag tag-primary tag-transparented">Basic 7</span> <span class="atbd-tag tag-primary tag-transparented">Basic 8</span></span>

                                        <span class="hh"> Scheme   </span>
                                        <span class="hs" v-for="(s, k) in question.scheme" :key="k"> <span class="atbd-tag tag-primary tag-transparented"> {{s}}<sup>st</sup> Term</span> </span>

                                        <span class="hh">  Difficulty </span>
                                        <span class="hs">
                                            <div class="slider-wrapper">
                                                <div class="atbd-slider">
                                                    <div class="slider-basic ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content ui-slider-disabled ui-state-disabled">
                                                    <div class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 38%;"></div><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 38%;"><span class="tooltip-text">19</span></span></div>
                                                </div>
                                            </div>    
                                        </span>

                                        <span class="hh"> Duration   </span>
                                        <span class="hs"> <span class="atbd-tag tag-danger tag-transparented">2 minutes</span> </span>

                                    </div>
                                   
                                </div>
                            </div><!-- ends: .card -->
                        </div>
                        <div class="col-xl-6 col-lg-6 " v-if="funishedQuestion">
                          <div class="card mb-25">
                                <div class="card-header py-sm-20 py-3  px-sm-25 px-3">
                                    Question Preview <span class="badge badge-round badge-success badge-lg rel-pos appbadge">
                                        Approved  <span class="badge-mark"><i class="las la-check"></i> </span>
                                    </span> 
                                </div>
                                <div class="card-body">
                                    <div class="about-projects">
                                        <div class="about-projects__details">
                                            <p class="fs-15 mb-25">
                                                <span>
                                                    
                                                </span>
                                                <span v-for="(q,k) in funishedQuestion" :key="k">
                                                    <span></span>
                                                    <span v-if="q.engine == 'text'">
                                                        <VueMarkdown :source="q.data" />
                                                    </span>
                                                    <span v-if="q.engine == 'media'">
                                                        <span v-if="q.position == 'inline'"><img :src="q.data"></span>
                                                        <div v-else><img :src="q.data" alt=""></div>
                                                        
                                                    </span>
                                                    <span v-if="q.engine == 'latex'">
                                                        <span v-katex:auto>
                                                            {{`\\(${q.data}\\)`}}
                                                        </span>
                                                    </span>
                                                </span>
                                            </p>
                                            
                                        </div>
                                        <div class="ansTyp">
                                            <h4> Answer <small> </small> </h4>
                                            <ul class="d-flex text-capitalize">
                                                <li>
                                                    <div class="checkbox-theme-default custom-checkbox ">
                                                        <label for="check-grid-1">
                                                            <span class="checkbox-text">
                                                             Verb  <!--<span class="checkBar"> <i class="las la-check"></i> </span>-->
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <card-comment-form :question="question"></card-comment-form>
                            <card-comment :qlid="question.qlid"></card-comment>
                        </div>
                        <reviewers-card :qlid="question.qlid" />
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import CardComment from '@/components/CardComment.vue'
import CardCommentForm from '@/components/CardCommentForm.vue';
import { getTimestamp } from "@/utilities";
import { apiClient } from '@/plugins/restclient';
import VueMarkdown from 'vue-markdown-render';
import ReviewersCard from '@/components/ReviewersCard.vue';

export default {
  components: { 
    CardComment, 
    CardCommentForm,
    VueMarkdown,
    ReviewersCard
  },
  data(){
      return{
          question:{}
      }
  },
  computed:{
      funishedQuestion(){
        //   console.log(this.question.data.question.map(item => item.data).join(' '), 'array')
        //   console.log(this.question.data.question.flat(), 'flatten')
        //   console.log(this.question.data.question[0].data, 'array')
          return this.question.data.question
      },
  },
  created(){
      apiClient.post('/v1/office/assessment/question/preview',{
          qlid: this.$route.params.qlid
      },
      {
          headers:{
                "X-Timestamp": getTimestamp(),
                "X-Ulid": `${this.$store.state.user.ulid}`,
            }
      }
      )
      .then(res=>{
          this.question = res.data.info.preview
      })
      .catch(() => {
      })
  },
  methods:{
      
     
      
  }

}
</script>

<style>

</style>