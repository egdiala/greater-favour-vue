<template>
  <!--- main Content Part -->
  <div class="contents">
    <ResponseModal ref="resModal" style="z-index: 99999 !important;" />
    <div class="container-fluid">
      <div class="profile-content mb-50">
        <div class="row">

          <!-- Data Tables Starts and Certifications -->
          <div class="col">
            <!-- Tab Menu -->
            <div class="ap-tab ap-tab-header sticky mt-4" style="background-color: #f4f5f7 !important;">
              <div class="row" style="background-color: #f4f5f7 !important;">
                <div class="col-12">
                  <div
                    class="breadcrumb-main add-contact justify-content-sm-between "
                  >
                    <div
                      class=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper"
                    >
                      <div
                        class="d-flex align-items-center add-contact__title justify-content-center mr-sm-25"
                      >
                        <h4 class="text-capitalize fw-500 breadcrumb-title">
                          <a style="color: #D94F00; cursor: pointer;" @click="prev"
                            ><i class="las la-arrow-left"></i></a
                          >&nbsp;&nbsp; {{ tname }}
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
                                  <router-link :to="url">{{url.slice(9, url.length)}}</router-link>
                                  <span class="breadcrumb__seperator">
                                      <span class="la la-slash"></span>
                                  </span>
                              </li>
                              <li class="atbd-breadcrumb__item">
                                  <router-link to="/classes/topics">Topics</router-link>
                                  <span class="breadcrumb__seperator">
                                      <span class="la la-slash"></span>
                                  </span>
                              </li>
                              <li class="atbd-breadcrumb__item">
                                  <router-link to="/classes/topics/questions">Questions</router-link>
                                  <span class="breadcrumb__seperator">
                                      <span class="la la-slash"></span>
                                  </span>
                              </li>
                              <li class="atbd-breadcrumb__item">
                                  <span>Add</span>
                              </li>
                          </ul>
                        </h4>
                        <span class="sub-title ml-sm-25 pl-sm-25">{{
                          contentLength > 1
                            ? `${contentLength} contents`
                            : `${contentLength} content`
                        }}</span>
                      </div>
                    </div>
                    <div
                      v-if="ready"
                      class="action-btn"
                    >
                      <span @click="buildQuestion()" class="btn px-15 mr-2 btn-primary">
                        <i class="las la-plus fs-16"></i>Build</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="ap-tab-wrapper">
                <ul class="nav px-25 ap-tab-main" id="ap-tab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="ap-overview-tab"
                      data-toggle="pill"
                      href="#ap-overview"
                      role="tab"
                      aria-controls="ap-overview"
                      aria-selected="true"
                      >Question</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="timeline-tab"
                      data-toggle="pill"
                      href="#timeline"
                      role="tab"
                      aria-controls="timeline"
                      aria-selected="false"
                      >Answer</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="activity-tab" data-toggle="pill" href="#activity" role="tab" aria-controls="activity" aria-selected="false">Content Restore</a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- Tab Menu End -->
            <div class="tab-content mt-25" id="ap-tabContent">
              <div
                class="tab-pane fade active show"
                id="ap-overview"
                role="tabpanel"
                aria-labelledby="ap-overview-tab"
              >
                <div class="ap-content-wrapper">
                  <div class="row">
                    <div class="col-lg-3">
                      <aside class="mailbox-sidebar-container">
                        <div class="atbd-mail-sidebar show mb-30 ">
                          <div class="card normHeight">
                            <div class="card-body">
                              <div
                                class="d-flex align-content-center content-center px-15"
                              >
                                <button class="btn-compose btn btn-md btn-primary btn-shadow-primary" @click="copyId()" disabled>
                                   Question Settings
                                </button>
                              </div>
                              <div class="presets ">
                                <span class="hh"> Description </span>
                                <span class="hs">
                                  <span
                                    class="atbd-tag tag-primary tag-transparented"
                                    >{{ question.description }}</span
                                  >
                                </span>
                                <span class="hh"> Question Type </span>
                                <span class="hs">
                                  <span
                                    v-if="question.type == 2"
                                    class="atbd-tag tag-primary tag-transparented"
                                    >Simple</span
                                  >
                                  <span
                                    v-else-if="question.type == 1"
                                    class="atbd-tag tag-primary tag-transparented"
                                    >Dichotomous</span
                                  >
                                  <span
                                    v-else-if="question.type == 4"
                                    class="atbd-tag tag-primary tag-transparented"
                                    >Multi</span
                                  >
                                  <span
                                    v-else-if="question.type == 8"
                                    class="atbd-tag tag-primary tag-transparented"
                                    >Rank</span
                                  >
                                  <span
                                    v-else-if="question.type == 16"
                                    class="atbd-tag tag-primary tag-transparented"
                                    >Open</span
                                  >
                                </span>

                                <span class="hh"> Class </span>
                                <span class="hs">
                                  <span
                                    class="atbd-tag tag-primary tag-transparented"
                                    >{{ question.category_class }}</span
                                  >
                                </span>
                                <span class="hh"> Label </span>
                                <span class="hs">
                                  <span
                                    class="atbd-tag tag-primary tag-transparented"
                                    >{{ question.label }}</span
                                  >
                                </span>

                                <span class="hh"> Scheme </span>
                                <span class="hs">
                                  <span
                                    v-for="(quest,
                                    q) in question.category_scheme"
                                    :key="q"
                                    class="atbd-tag tag-primary tag-transparented"
                                  >
                                    {{ quest }}<sup v-if="quest == 1">st</sup
                                    ><sup v-if="quest == 2">nd</sup
                                    ><sup v-if="quest == 3">rd</sup> Term</span
                                  >
                                </span>

                                <span class="hh"> Difficulty </span>
                                <span class="hs">
                                  <span
                                    class="atbd-tag tag-primary tag-transparented"
                                    >{{ question.difficulty }}</span
                                  >
                                </span>

                                <span class="hh"> Duration </span>
                                <span class="hs">
                                  <span class="atbd-tag tag-danger tag-transparented">{{question.duration}} seconds</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <!-- ends: .card -->
                        </div>
                        <!-- ends: .atbd-mail-sidebar -->
                      </aside>
                    </div>
                    <!-- ends: .col-lg-2 -->
                    <div class="col-lg-9">
                      <div class="mailbar-toggle d-md-none">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div class="mailbox-container mb-30">
                        <div class="mail-read-wrapper">
                          <div class="card mb-30">
                            <div class="card-body">
                              <div class="mail-read-content">
                                <div class="note-single">
                                    <div class="note-card note-default paddCard">
                                      <div class="card border-0">
                                        <div class="card-body">
                                          <h4 class="note-title mb-15">Preview</h4>
                                            <div
                                              v-for="(data, d) in activeQuest"
                                              :key="d"
                                              class="mt-1"
                                            >
                                              <div v-if="data.engine == 'latex' && data.status === 1">
                                                <span class="note-excerpt">
                                                  <katex-element :expression="data.data"/>
                                                        <a href="#" class="txt-fade color-blue" @click="setEdit(data.engine, data.clid, data.data)" data-toggle="tooltip" data-placement="top" title="Edit"> <i class="las la-pen"></i> </a>
                                                        <a href="#" class="txt-fade" @click="deleteContent(data.clid)" data-toggle="tooltip" data-placement="top" title="Delete"> <i class="las la-trash"></i> </a>   
                                                </span>
                                              </div>
                                              
                                              <div 
                                                v-else-if="data.engine != 'latex' && data.status === 1"
                                                
                                              >
                                                <span class="note-excerpt" v-html="compiledMarkdown(data.data)">
                                                </span>
                                                <span>
                                                      <a href="#" class="txt-fade color-blue" @click="setEdit(data.engine, data.clid, data.data)" data-toggle="tooltip" data-placement="top" title="Edit"> <i class="las la-pen"></i> </a>
                                                      <a href="#" class="txt-fade" @click="deleteContent(data.clid)" data-toggle="tooltip" data-placement="top" title="Delete"> <i class="las la-trash"></i> </a></span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                              <!-- ends: .atbd-mailCompose -->
                                </div>
                              </div>

                          <!-- Card for editor -->

                          <div class="card card-default card mb-4">
                            <div class="card-header">
                              <h6>Editor</h6>
                            </div>
                            <div class="">
                              <div class="atbd-nav-controller">
                                <div
                                  class="btn-group atbd-button-group btn-group-normal nav padtab"
                                  role="tablist"
                                >
                                  <a
                                    href="#large"
                                    class="btn btn-sm btn-outline-light nav-link active"
                                    id="question-text"
                                    data-toggle="tab"
                                    role="tab"
                                    aria-controls="large"
                                    aria-selected="true"
                                    @click="setEngine('text')"
                                    >Text</a
                                  >
                                  <a
                                    href="#latex"
                                    class="btn btn-sm btn-outline-light nav-link"
                                    id="question-latex"
                                    data-toggle="tab"
                                    role="tab"
                                    aria-controls="latex"
                                    aria-selected="false"
                                    @click="setEngine('latex')"
                                    >Latex</a
                                  >
                                  <a href="#default" class="btn btn-sm btn-outline-light nav-link" id="question-media" data-toggle="tab" role="tab" aria-controls="default" aria-selected="false" @click="setEngine('media')">Media</a>
                                </div>
                              </div>
                              <div class="tab-content">
                                <div
                                  v-if="engine == 'text'"
                                  class="tab-pane fade show active"
                                  id="large"
                                  role="tabpanel"
                                  aria-labelledby="question-text"
                                >
                                  <div class="card-body ">
                                    <div class="mail-read-content inputBG">
                                    <div class="row">
                                      <div class="col-12">
                                        <div class="form-group">
                                          <markdown-editor :options="{lineWrapping: true}" toolbar="clean redo undo bold italic strikethrough heading image link numlist bullist code quote preview fullscreen" height="auto" theme="default" v-model="questionData"></markdown-editor>                                          
                                        </div>
                                      </div>
                                    </div>
                                      <transition name="slide-fade"
                                        ><small><span
                                          v-if="err && questionData == ''"
                                          class="text-danger"
                                          >Question content cannot be
                                          empty.</span
                                        ></small></transition
                                      >
                                      <br />
                                      <button v-if="!edit"
                                        @click="addContent()"
                                        class="btn btn-primary btn-default btn-squared btn-shadow-primary"
                                      >
                                        <span
                                          v-if="isLoading"
                                          class="spinner-border spinner-border-sm"
                                        ></span
                                        >Add
                                      </button>
                                      <button v-else
                                        @click="editContent()"
                                        class="btn btn-primary btn-default btn-squared btn-shadow-primary"
                                      >
                                        <span
                                          v-if="isLoading"
                                          class="spinner-border spinner-border-sm"
                                        ></span
                                        >Edit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  v-else-if="engine == 'latex'"
                                  class="tab-pane fade show active"
                                  id="latex"
                                  role="tabpanel"
                                  aria-labelledby="question-latex"
                                >
                                  <div class="card-body ">
                                    <div class="mail-read-content inputBG">
                                      <div class="row">
                                        <div class="col-md-6">
                                          <textarea
                                            v-model="questionData"
                                            type="text"
                                            class="form-control"
                                            id="name2" rows="6"
                                            placeholder="Enter latex..."
                                          />                                         
                                        </div>
                                        <div class="col-md-6">
                                    <div class="note-card note-default paddCard">
                                      <div class="card border-0">
                                        <div class="card-body">
                                          <label class="note-title">Latex Preview</label>
                                          <katex-element :expression="questionData"/>
                                        </div></div></div>
                                        </div>                                                                                 
                                      </div>
                                       <transition name="slide-fade"
                                        ><small><span
                                          v-if="errs && questionData == ''"
                                          class="text-danger"
                                          >Question content cannot be
                                          empty.</span
                                        ></small></transition
                                      >

                                      <br />
                                      <button v-if="!edit"
                                        @click="addContent()"
                                        class="btn btn-primary btn-default btn-squared btn-shadow-primary "
                                      >
                                        <span
                                          v-if="isLoading"
                                          class="spinner-border spinner-border-sm"
                                        ></span
                                        >Add
                                      </button>
                                      <button v-else
                                        @click="editContent()"
                                        class="btn btn-primary btn-default btn-squared btn-shadow-primary"
                                      >
                                        <span
                                          v-if="isLoading"
                                          class="spinner-border spinner-border-sm"
                                        ></span
                                        >Edit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div v-if="engine == 'media'" class="tab-pane fade show active" id="default" role="tabpanel" aria-labelledby="question-media">
                                  <div class="card-body ">
                                    <div class="mail-read-content inputBG">
                                      <markdown-editor toolbar="clean redo undo bold italic strikethrough heading image link numlist bullist code quote preview fullscreen" height="auto" theme="default" v-model="questionData"></markdown-editor>
                                      <transition name="slide-fade"
                                        ><small><span
                                          v-if="err && questionData == ''"
                                          class="text-danger"
                                          >Media data cannot be
                                          empty.</span
                                        ></small></transition
                                      >
                                      <br />
                                      <button v-if="!edit"
                                        @click="reg('question')"
                                        class="btn btn-primary btn-default btn-squared btn-shadow-primary "
                                      >
                                        <span
                                          v-if="isLoading"
                                          class="spinner-border spinner-border-sm"
                                        ></span
                                        >Add
                                      </button>
                                      <button v-else
                                        @click="reg('question')"
                                        class="btn btn-primary btn-default btn-squared btn-shadow-primary"
                                      >
                                        <span
                                          v-if="isLoading"
                                          class="spinner-border spinner-border-sm"
                                        ></span
                                        >Edit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="card"></div>
                          <!-- Card for editor end -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="timeline"
                role="tabpanel"
                aria-labelledby="timeline-tab"
              >
                <div class="ap-post-content">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="answerWrapper">
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="note-contents">
                              <!-- ends: .col-lg-2 -->
                              <div class="note-grid-wrapper mb-30">
                                <div class="notes-wrapper">
                                  <div class="card-body">
                                    <div class="atbd-nav-controller">
                                      <div
                                        class="btn-group atbd-button-group btn-group-normal nav mb-20"
                                        role="tablist"
                                      >
                                        <a
                                          href="#large2"
                                          class="btn btn-sm btn-outline-light nav-link active"
                                          id="size-large2"
                                          data-toggle="tab"
                                          role="tab"
                                          aria-controls="large2"
                                          aria-selected="true"
                                          >Option</a
                                        >
                                        <a
                                          href="#default2"
                                          class="btn btn-sm btn-outline-light nav-link"
                                          id="size-default2"
                                          data-toggle="tab"
                                          role="tab"
                                          aria-controls="default2"
                                          aria-selected="false"
                                          >Solution</a
                                        >
                                        <a
                                          href="#small2"
                                          class="btn btn-sm btn-outline-light nav-link"
                                          id="size-small2"
                                          data-toggle="tab"
                                          role="tab"
                                          aria-controls="small2"
                                          aria-selected="false"
                                          >Tip</a
                                        >
                                      </div>
                                    </div>
                                    <div class="tab-content">
                                      <!-- Answers -->
                                      <div
                                        class="tab-pane fade show active"
                                        id="large2"
                                        role="tabpanel"
                                        aria-labelledby="size-large2"
                                      >
                                      <div class="no-content text-center" v-if="compAns.length < 1 && question.type != 16">
                                        <img
                                          src="@/assets/img/custom/fish.gif"
                                          width="200"
                                        />
                                        <br />
                                        <h3>Oops</h3>
                                        <h6>No answer</h6>
                                        <br />
                                        <button
                                          class="btn btn-primary btn-default btn-squared btn-shadow-primary mx-auto"
                                          data-toggle="modal"
                                          data-target="#addOptions"
                                          id="displayAnswer"
                                        >
                                          Add Answer
                                        </button>
                                      </div>
                                      <AnswerCard v-if="compAns.length > 0 && question.type != 16" :qType="question.type" :answers="compAns" :correctAns="question.answer" :isCorrect="isCorrect" :qlid="question.qlid" :method="getAnswers" :method1="getQuestion"/>
                                      <div class="no-content text-center" v-if="!question.answer && question.type == 16">
                                        <img
                                          src="@/assets/img/custom/fish.gif"
                                          width="200"
                                        />
                                        <br />
                                        <h3>Oops</h3>
                                        <h6>No answer</h6>
                                        <br />
                                        <button
                                          class="btn btn-primary btn-default btn-squared btn-shadow-primary mx-auto"
                                          data-toggle="modal"
                                          data-target="#addOptions"
                                          id="displayAnswer"
                                        >
                                          Add Answer
                                        </button>
                                      </div>
                                      <AnswerOpen v-else-if="question.answer && question.type == 16" :answers="question.answer" :changeAns="changeAns"/>
                                        
                                      </div>
                                      <!-- Solution -->
                                      <div
                                        class="tab-pane fade"
                                        id="default2"
                                        role="tabpanel"
                                        aria-labelledby="size-default2"
                                      >
                                        <div class="note-single mb-20">
                                          <div class="note-card note-default">
                                            <div class="card border-0">
                                              <div class="card-body">
                                                <h4 class="note-title">
                                                  Solution
                                                </h4>
                                                <div
                                                  v-for="(solu, s) in compSolu"
                                                  :key="s"
                                                >
                                                  <div v-if="solu.engine == 'latex' && solu.status === 1">
                                                    <span class="note-excerpt">
                                                      <katex-element :expression="solu.data"/>
                                                            <a href="#" class="txt-fade color-blue" @click="soluEdit(solu.engine, solu.clid, solu.data)" data-toggle="tooltip" data-placement="top" title="Edit"> <i class="las la-pen"></i> </a>
                                                            <a href="#" class="txt-fade" @click="deleteContent(solu.clid)" data-toggle="tooltip" data-placement="top" title="Delete"> <i class="las la-trash"></i> </a>   
                                                    </span>
                                                  </div>

                                                  <div 
                                                    v-else-if="solu.engine != 'latex' && solu.status === 1"
                                                    
                                                  >
                                                    <p class="note-excerpt" v-html="compiledMarkdown(solu.data)">
                                                    </p>
                                                          <a href="#" class="txt-fade color-blue" @click="soluEdit(solu.engine, solu.clid, solu.data)" data-toggle="tooltip" data-placement="top" title="Edit"> <i class="las la-pen"></i> </a>
                                                          <a href="#" class="txt-fade" @click="deleteContent(solu.clid)" data-toggle="tooltip" data-placement="top" title="Delete"> <i class="las la-trash"></i> </a>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div class="mb-20">
                                          <div class="atbd-nav-controller">
                                            <div
                                              class="btn-group atbd-button-group btn-group-normal nav padtab2"
                                              role="tablist"
                                            >
                                              <a
                                                @click="engineSolu = 'text'"
                                                href="#largeOp2"
                                                class="btn btn-sm btn-outline-light nav-link active"
                                                id="solution-text"
                                                data-toggle="tab"
                                                role="tab"
                                                aria-controls="largeOp"
                                                aria-selected="true"
                                                >Text</a
                                              >
                                              <a
                                                @click="engineSolu = 'latex'"
                                                href="#defaultOp2"
                                                class="btn btn-sm btn-outline-light nav-link"
                                                id="solution-latex"
                                                data-toggle="tab"
                                                role="tab"
                                                aria-controls="defaultOp"
                                                aria-selected="false"
                                                >Latex</a
                                              >
                                              <a
                                                @click="engineSolu = 'media'"
                                                href="#mediaSolu"
                                                class="btn btn-sm btn-outline-light nav-link"
                                                id="solution-media"
                                                data-toggle="tab"
                                                role="tab"
                                                aria-controls="defaultOp"
                                                aria-selected="false"
                                                >Media</a
                                              >
                                            </div>
                                          </div>
                                          <div class="tab-content">
                                            <div
                                              class="tab-pane fade active show"
                                              id="largeOp2"
                                              role="tabpanel"
                                              aria-labelledby="solution-text"
                                            >
                                              <div>
                                                <div class="inputBG">
                                                <markdown-editor toolbar="clean redo undo bold italic strikethrough heading image link numlist bullist code quote preview fullscreen" height="auto" theme="default" v-model="solution"></markdown-editor>
                                                  <transition name="slide-fade"
                                                    ><span
                                                      v-if="
                                                        errsolu && solution == ''
                                                      "
                                                      class="text-danger"
                                                      >Solution content cannot
                                                      be empty.</span
                                                    ></transition
                                                  >
                                                  <br />
                                                  <button v-if="!editSolu"
                                                    class="btn btn-primary btn-default btn-squared btn-shadow-primary"
                                                    @click="addSolution()"
                                                  >
                                                    Add
                                                  </button>
                                                  <button v-else
                                                    @click="editSolution()"
                                                    class="btn btn-primary btn-default btn-squared btn-shadow-primary"
                                                  >
                                                    <span
                                                      v-if="isLoading"
                                                      class="spinner-border spinner-border-sm"
                                                    ></span
                                                    >Edit
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              class="tab-pane fade"
                                              id="defaultOp2"
                                              role="tabpanel"
                                              aria-labelledby="solution-latex"
                                            >
                                              <div class="inputBG">
                                                <div class="row">
                                                  <div class="col-md-6 mb-2">
                                                    <form @submit.prevent="!editSolu ? addSolution() : editSolution()">
                                                    <textarea
                                                      v-model="solution"
                                                      type="text" rows="6"
                                                      class="form-control"
                                                      id="name4"
                                                      placeholder="Enter latex..."
                                                    />
                                                    </form>
                                                  </div>
                                                  <div class="col-md-6">
                                    <div class="note-card note-default paddCard">
                                      <div class="card border-0">
                                        <div class="card-body">
                                                    <label class="note-title">Latex Preview</label>
                                                    <katex-element :expression="solution"/></div></div></div>
                                                  </div>
                                                </div>
                                                <br />
                                                <transition name="slide-fade"
                                                  ><span
                                                    v-if="
                                                      errsolu && solution == ''
                                                    "
                                                    class="mt-2 text-danger"
                                                    >Solution content cannot be
                                                    empty.</span
                                                  ></transition
                                                >
                                                <button v-if="!editSolu"
                                                  class="mt-3 btn btn-primary btn-default btn-squared btn-shadow-primary"
                                                  @click="addSolution()"
                                                >
                                                  Add
                                                </button>
                                                  <button v-else
                                                    @click="editSolution()"
                                                    class="mt-3 btn btn-primary btn-default btn-squared btn-shadow-primary"
                                                  >
                                                    <span
                                                      v-if="isLoading"
                                                      class="spinner-border spinner-border-sm"
                                                    ></span
                                                    >Edit
                                                  </button>
                                              </div>
                                            </div>
                                            <div
                                              class="tab-pane fade"
                                              id="mediaSolu"
                                              role="tabpanel"
                                              aria-labelledby="solution-media"
                                            >
                                              <div class="inputBG">
                                                <markdown-editor toolbar="clean redo undo bold italic strikethrough heading image link numlist bullist code quote preview fullscreen" height="auto" theme="default" v-model="solution"></markdown-editor>
                                                <transition name="slide-fade"
                                                  ><span
                                                    v-if="
                                                      errsolu && solution == ''
                                                    "
                                                    class="text-danger"
                                                    >Solution content cannot be
                                                    empty.</span
                                                  ></transition
                                                >
                                                <br />
                                                <button v-if="!editSolu"
                                                  class="btn btn-primary btn-default btn-squared btn-shadow-primary"
                                                  @click="reg('solution')"
                                                >
                                                  Add
                                                </button>
                                                  <button v-else
                                                    @click="reg('solution')"
                                                    class="btn btn-primary btn-default btn-squared btn-shadow-primary"
                                                  >
                                                    <span
                                                      v-if="isLoading"
                                                      class="spinner-border spinner-border-sm"
                                                    ></span
                                                    >Edit
                                                  </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <!-- Tips -->
                                      <div
                                        class="tab-pane fade"
                                        id="small2"
                                        role="tabpanel"
                                        aria-labelledby="size-small2"
                                      >
                                        <div class="note-single mb-20">
                                          <div class="note-card note-work">
                                            <div class="card border-0">
                                              <div class="card-body">
                                                <h4 class="note-title">Tip</h4>
                                                <div
                                                  v-for="(tip, t) in tips"
                                                  :key="t"
                                                >
                                                  <div v-if="tip.engine == 'latex' && tip.status === 1">
                                                    <span class="note-excerpt">
                                                      <katex-element :expression="tip.data"/>
                                                            <a href="#" class="txt-fade color-blue" @click="tipEdit(tip.engine, tip.clid, tip.data)" data-toggle="tooltip" data-placement="top" title="Edit"> <i class="las la-pen"></i> </a>
                                                            <a href="#" class="txt-fade" @click="deleteContent(tip.clid)" data-toggle="tooltip" data-placement="top" title="Delete"> <i class="las la-trash"></i> </a>   
                                                    </span>
                                                  </div>

                                                  <div 
                                                    v-else-if="tip.engine != 'latex' && tip.status === 1"
                                                    
                                                  >
                                                    <p class="note-excerpt" v-html="compiledMarkdown(tip.data)">
                                                    </p>
                                                          <a href="#" class="txt-fade color-blue" @click="tipEdit(tip.engine, tip.clid, tip.data)" data-toggle="tooltip" data-placement="top" title="Edit"> <i class="las la-pen"></i> </a>
                                                          <a href="#" class="txt-fade" @click="deleteContent(tip.clid)" data-toggle="tooltip" data-placement="top" title="Delete"> <i class="las la-trash"></i> </a>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div class="mb-20">
                                          <div class="atbd-nav-controller">
                                            <div
                                              class="btn-group atbd-button-group btn-group-normal nav padtab2"
                                              role="tablist"
                                            >
                                              <a
                                                @click="engineTip = 'text'"
                                                href="#largeOp3"
                                                class="btn btn-sm btn-outline-light nav-link active"
                                                id="tip-text"
                                                data-toggle="tab"
                                                role="tab"
                                                aria-controls="largeOp"
                                                aria-selected="true"
                                                >Text</a
                                              >
                                              <a
                                                @click="engineTip = 'latex'"
                                                href="#defaultOp3"
                                                class="btn btn-sm btn-outline-light nav-link"
                                                id="tip-latex"
                                                data-toggle="tab"
                                                role="tab"
                                                aria-controls="defaultOp"
                                                aria-selected="false"
                                                >Latex</a
                                              >
                                              <a
                                                @click="engineTip = 'media'"
                                                href="#tipMedia"
                                                class="btn btn-sm btn-outline-light nav-link"
                                                id="tip-media"
                                                data-toggle="tab"
                                                role="tab"
                                                aria-controls="defaultOp"
                                                aria-selected="false"
                                                >Media</a
                                              >
                                            </div>
                                          </div>
                                          <div class="tab-content">
                                            <div
                                              class="tab-pane fade active show"
                                              id="largeOp3"
                                              role="tabpanel"
                                              aria-labelledby="size-largeO3"
                                            >
                                              <div class=" ">
                                                <div class=" inputBG">
                                                <markdown-editor toolbar="clean redo undo bold italic strikethrough heading image link numlist bullist code quote preview fullscreen" height="auto" theme="default" v-model="tip"></markdown-editor>
                                                  <transition name="slide-fade"
                                                    ><span
                                                      v-if="
                                                        errortip && tip == ''
                                                      "
                                                      class="text-danger"
                                                      >Tip content cannot be
                                                      empty.</span
                                                    ></transition
                                                  >
                                                  <br />
                                                  <button v-if="!editTp"
                                                    class="btn btn-primary btn-default btn-squared btn-shadow-primary"
                                                    @click="addTip()"
                                                  >
                                                    Add
                                                  </button>
                                                  <button v-else
                                                    @click="editTip()"
                                                    class="btn btn-primary btn-default btn-squared btn-shadow-primary"
                                                  >
                                                    <span
                                                      v-if="isLoading"
                                                      class="spinner-border spinner-border-sm"
                                                    ></span
                                                    >Edit
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              class="tab-pane fade"
                                              id="defaultOp3"
                                              role="tabpanel"
                                              aria-labelledby="size-defaultO3"
                                            >
                                              <div class=" inputBG">
                                                <div class="row">
                                                  <div class="col-md-6 mb-2">
                                                <form @submit.prevent="!editTp ? addTip() : editTip()">
                                                <textarea
                                                  v-model="tip"
                                                  type="text" rows="6"
                                                  class="form-control"
                                                  id="name6"
                                                  placeholder="Enter latex..."
                                                />
                                                </form>
                                                </div>
                                                  <div class="col-md-6">
                                    <div class="note-card note-default paddCard">
                                      <div class="card border-0">
                                        <div class="card-body">
                                                    <label class="note-title">Latex Preview</label>
                                                    <katex-element :expression="tip"/></div></div></div>
                                                  </div>
                                                </div>
                                                <br />
                                                <transition name="slide-fade"
                                                  ><span
                                                    v-if="errortip && tip == ''"
                                                    class="mt-2 text-danger"
                                                    >Tip content cannot be
                                                    empty.</span
                                                  ></transition
                                                >
                                                <button v-if="!editTp"
                                                  class="mt-3 btn btn-primary btn-default btn-squared btn-shadow-primary"
                                                  @click="addTip()"
                                                >
                                                  Add
                                                </button>
                                                  <button v-else
                                                    @click="editTip()"
                                                    class="mt-3 btn btn-primary btn-default btn-squared btn-shadow-primary"
                                                  >
                                                    <span
                                                      v-if="isLoading"
                                                      class="spinner-border spinner-border-sm"
                                                    ></span
                                                    >Edit
                                                  </button>
                                              </div>
                                            </div>
                                            <div
                                              class="tab-pane fade"
                                              id="tipMedia"
                                              role="tabpanel"
                                              aria-labelledby="size-defaultO3"
                                            >
                                              <div class=" inputBG">
                                                <markdown-editor toolbar="clean redo undo bold italic strikethrough heading image link numlist bullist code quote preview fullscreen" height="auto" theme="default" v-model="tip"></markdown-editor>
                                                <transition name="slide-fade"
                                                  ><span
                                                    v-if="errortip && tip == ''"
                                                    class="text-danger"
                                                    >Tip content cannot be
                                                    empty.</span
                                                  ></transition
                                                >
                                                <br />
                                                <button v-if="!editTp"
                                                  class="btn btn-primary btn-default btn-squared btn-shadow-primary"
                                                  @click="reg('tip')"
                                                >
                                                  Add
                                                </button>
                                                  <button v-else
                                                    @click="reg('tip')"
                                                    class="btn btn-primary btn-default btn-squared btn-shadow-primary"
                                                  >
                                                    <span
                                                      v-if="isLoading"
                                                      class="spinner-border spinner-border-sm"
                                                    ></span
                                                    >Edit
                                                  </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- ends: .col-lg-10 -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- End: .col -->
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="activity-tab">
                <div class="atbd-nav-controller">
                  <div
                    class="btn-group atbd-button-group btn-group-normal nav mb-20"
                    role="tablist"
                  >
                    <a @click.prevent="restoreId = 1"
                      href="#restore1"
                      class="btn btn-sm btn-outline-light nav-link active"
                      id="size-restore1"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="restore1"
                      aria-selected="true"
                      >Question</a
                    >
                    <a @click.prevent="restoreId = 2"
                      href="#restore2"
                      class="btn btn-sm btn-outline-light nav-link"
                      id="size-restore2"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="restore2"
                      aria-selected="false"
                      >Solution</a
                    >
                    <a @click.prevent="restoreId = 3"
                      href="#restore3"
                      class="btn btn-sm btn-outline-light nav-link"
                      id="size-restore3"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="restore3"
                      aria-selected="false"
                      >Tip</a
                    >
                    <a @click.prevent="restoreId = 4"
                      href="#restore3"
                      class="btn btn-sm btn-outline-light nav-link"
                      id="size-restore3"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="restore3"
                      aria-selected="false"
                      >Answer</a
                    >
                  </div>
                </div>
                <div class="tab-content">
                  <ContentRestore :id="restoreId" :questions="inactiveQuest" :solutions="inactiveSolu" :tips="inactiveTips" :answers="inactiveAns" :getContents="getContents" :getSolutions="getSolutions" :getTips="getTips" :getAnswers="getAnswers" />
                </div>
              </div>
            </div>
          </div>
          <!-- Data Tables and Certifications Ends -->
        </div>
      </div>
    </div>
    <LoaderOverlay v-if="loader.active && !$store.state.asyncLoader"
      :active="loader.active"
      :fullpage="loader.fullpage"
      bgColor="#2a2a2a55"
      zIndex="99999"
    ></LoaderOverlay>
    <!-- Modal -->
    <transition name="slide-fade">
			<div v-if="error && errMsg"
				class="signUp-topbar d-flex align-items-center justify-content-md-end justify-content-center mt-md-0 mb-md-0 mt-20 mb-1" style="position: fixed; top: 3em; right: 1em; z-index:9999"
			>
				<div class="mb-0 mt-3">
				<div class="alert alert-danger" role="alert">
						{{errMsg}}
				</div> 
				</div>
			</div>
		</transition>
    <div class="modal fade new-member" id="new-asset" data-backdrop="static" role="dialog" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content radius-xl" style="max-height: 700px;">
                <div class="modal-header">
                    <h6 class="modal-title fw-500" id="staticBackdropLabel">Upload Media</h6>
                    <button id="mediaClose" type="button" class="close" data-dismiss="modal" aria-label="Close" ref="mediaClose">
                        <i class="las la-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="new-member-modal">
                      <div v-for="(media, m) in mediaRef" :key="m" class="row">
                        <div class="col">
                            <div class="form-group mb-20">
                                <label for="name47">Name</label>
                                <input :value="media.name" class="form-control" type="text" placeholder="enter score.." disabled/>
                            </div>
                            <div class="form-group mb-20">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <label for="labelType">Position</label>
                                        <div class="category-member">
                                            <v-select v-model="media.position" :options="positions"></v-select>
                                            <transition name="slide-fade"><span v-if="imgErr && !media.position" class="text-danger">Select a position.</span></transition>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <label for="name">Scale</label>
                                        <div class="category-member">
                                            <v-select v-model="media.scale" :options="scales"></v-select>
                                            <transition name="slide-fade"><span v-if="imgErr && !media.scale" class="text-danger">Select a scale.</span></transition>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group mb-20">
                              <div class="atbd-tag-wrap">
                                <div class="atbd-upload">
                                    <form enctype="multipart/form-data">
                                    <div class="atbd-upload__button">
                                        <a href="javascript:void(0)" @click="imgId = m" class="btn btn-lg btn-outline-lighten btn-upload" :onclick="`$('#upload-${m}').click()`"> <span data-feather="upload"></span> Select Media</a>
                                        <input type="file" :name="`upload-${m}`" class="upload-one" :id="`upload-${m}`" accept="image/*" @change="Images_onFileChanged">
                                        <transition name="slide-fade"><span v-if="imgErr && !media.data" class="text-danger">Select a media to upload.</span></transition>
                                    </div>
                                    </form>
                                    <div class="atbd-upload__file">
                                        <ul>
                                            <li v-if="media.imgName != ''">
                                                <a href="#" class="file-name" v-bind="media"><i class="las la-paperclip"></i> <span class="name-text">{{media.imgName}}<span></span></span></a>
                                                <a href="#" class="btn-delete" @click="removeImg(m)"><i class="la la-trash"></i></a>
                                            </li>
                                        </ul>
                                    </div> <br>
                                    <button @click="addMedia(m)" class="btn btn-primary btn-default btn-squared btn-shadow-primary">
                                        <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>Upload
                                    </button>
                                </div>
                              </div>
                            </div>
                            <hr v-show="m < mediaRef.length - 1"/>                        
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
                                <span
                              data-toggle="modal"
                              data-target="#new-asset"
                              id="displayAsset"
                            >
                            </span>
    <!-- Modal -->
    <div
      class="modal fade new-member"
      id="addOptions"
      data-backdrop="static"
      role="dialog"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content  radius-xl">
          <div class="modal-header">
            <h6 class="modal-title fw-500" id="staticBackdropLabel">
              Answer Content
            </h6>
            <button @click="clear()"
              id="myChecks"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <i class="las la-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="new-member-modal">
              <form>
                <div class="mb-20">
                  <div class="atbd-nav-controller">
                    <div
                      class="btn-group atbd-button-group btn-group-normal nav padtab2"
                      role="tablist"
                    >
                      <a
                        @click="ansEng = 'text'"
                        href="#largeOp"
                        class="btn btn-sm btn-outline-light nav-link active"
                        id="size-largeOp"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="largeOp"
                        aria-selected="true"
                        >Text</a
                      >
                      <a
                        @click="ansEng = 'latex'" v-if="question.type != 16"
                        href="#defaultOp"
                        class="btn btn-sm btn-outline-light nav-link"
                        id="size-defaultOp"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="defaultOp"
                        aria-selected="false"
                        >Latex</a
                      >
                      <a
                        @click="ansEng = 'media'" v-if="question.type != 16"
                        href="#mediaAnswer"
                        class="btn btn-sm btn-outline-light nav-link"
                        id="size-defaultOp"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="defaultOp"
                        aria-selected="false"
                        >Media</a
                      >
                    </div>
                  </div>
                  <div class="tab-content">
                    <div
                      class="tab-pane fade active show"
                      id="largeOp"
                      role="tabpanel"
                      aria-labelledby="size-largeOp"
                    >
                        <markdown-editor id="ans-markdown" toolbar="clean redo undo bold italic strikethrough heading image link numlist bullist code quote preview fullscreen" height="auto" width="100%" theme="default" v-model="ansText"></markdown-editor>
                      <div class=" ">
                        <div class="inputBG">
                          <transition name="slide-fade"
                            ><span
                              v-if="errs && ansText == ''"
                              class="text-danger"
                              >Answer content cannot be empty.</span
                            ></transition
                          >
                          <br />
                          <span
                            class="btn btn-primary btn-default btn-squared btn-shadow-primary"
                            @click="addAnswer()"
                            >Add
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="defaultOp"
                      role="tabpanel"
                      aria-labelledby="size-defaultOp"
                    >
                      <div class=" ">
                        <div class="inputBG">
                          <div class="row">
                            <div class="col-md-6 mb-2">
                              <form @submit.prevent="addAnswer()">
                              <textarea
                                v-model="ansText"
                                type="text"
                                class="form-control"
                                id="name8"
                                placeholder="Answer latex..."
                              />
                              </form>
                            </div>
                            <div class="col-md-6">
                              <label>Latex Preview</label>
                              <katex-element :expression="ansText"/>
                            </div>
                          </div>
                          <br />
                          <transition name="slide-fade"
                            ><span
                              v-if="errs && ansText == ''"
                              class="mt-2 text-danger"
                              >Answer content cannot be empty.</span
                            ></transition
                          >
                          <span
                            class="mt-3 btn btn-primary btn-default btn-squared btn-shadow-primary"
                            @click="addAnswer()"
                            >Add
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="mediaAnswer"
                      role="tabpanel"
                      aria-labelledby="size-mediaAnswer"
                    >
                      <div class=" ">
                        <div class="inputBG">
                          <markdown-editor toolbar="clean redo undo bold italic strikethrough heading image link numlist bullist code quote preview fullscreen" height="auto" theme="default" v-model="ansText"></markdown-editor>

                          <transition name="slide-fade"
                            ><span
                              v-if="errs && ansText == ''"
                              class="text-danger"
                              >Answer content cannot be empty.</span
                            ></transition
                          >
                          <br />
                          <span
                            class="btn btn-primary btn-default btn-squared btn-shadow-primary" :disabled="disabled"
                            @click="reg('answer')"
                            >Add
                          </span>
                        </div>
                      </div>

                    </div>
                    <!--<div class="tab-pane fade" id="small" role="tabpanel" aria-labelledby="size-small">
                                               
                                            </div>-->
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- main Content Part Ends -->
</template>

<script>
import { authComputed } from "@/vuex/helpers.js";
import { apiClient } from "@/plugins/restclient.js";
import LoaderOverlay from "@/components/LoaderOverlay";
import AnswerCard from "@/components/AnswerCard.vue";
import AnswerOpen from "@/components/AnswerOpen.vue";
import ResponseModal from "@/components/ResponseModal.vue";
import ContentRestore from "@/components/ContentRestore.vue";
import marked from 'marked';
import DOMPurify from 'dompurify';
export default {
  name: "add",
  components: {
    LoaderOverlay,
    AnswerCard,
    AnswerOpen,
    ResponseModal,
    ContentRestore
  },
  data() {
    return {
      restoreId: 1,
      isLoading: false,
      isAnswering: false,
      disabled: false,
      clickCount: 0,
      subId: "",
      loader: {
        fullpage: true,
        active: false,
      },
      checked: false,
      topId: "",
      tname: "",
      cardClass: "",
      currentTopic: "",
      prevData: [],
      content: '',
      qType: "",
      contentLength: 0,
      qT: "",
      type: "text",
      tip: "",
      assetType: 1,
      tips: [],
      engineTip: "text",
      questionData: "",
      solution: "",
      solutions: [],
      engineSolu: "text",
      term: [],
      imgId: 0,
      reqBody: [],
      editorData: "",
      engine: "text",
      selectedFile: "",
      selectedFileNames: [],
      fileToUpload: '',
      contentID: '',
      mediaRef: [],
      medias: [],
      scales: ['small', 'medium', 'large'],
      positions: ['inline', 'newline'],
      clid: '',
      url: '',
      question: {},
      ansId: [],
      isCorrect: [],
      answers: [],
      ansText: "",
      ansEngine: "text",
      ansEng: "text",
      error: false,
      edit: false,
      editSolu: false,
      editTp: false,
      err: null,
      errs: null,
      errortip: null,
      errsolu: null,
      imgErr: null,
      errMsg: "",
      show: "",
      submitSuccess: ''
    };
  },
  metaInfo: {
    title: "Greater Favour",
    titleTemplate: "%s | Add Questions",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
  computed: {
    ...authComputed,
    listByBreaks() {
      return this.prevData.join("\n");
    },
    ansIsAmong() {
      return this.answers.filter(answer => {
          return answer.alid == this.question.answer;
      })
    },
    compAns() {
      return this.answers.filter(ans => {
        return ans.status === 1;
      })
    },
    compSolu() {
      return this.solutions.filter(solu => {
        return solu.status === 1;
      })
    },
    inactiveSolu() {
      return this.solutions.filter(solu => {
        return solu.status === -1;
      })
    },
    activeQuest() {
      return this.prevData.filter(prev => {
        return prev.status === 1;
      })
    },
    inactiveQuest() {
      return this.prevData.filter(prev => {
        return prev.status === -1;
      })
    },
    inactiveTips() {
      return this.tips.filter(tip => {
        return tip.status === -1;
      })
    },
    inactiveAns() {
      return this.answers.filter(ans => {
        return ans.status === -1;
      })
    },
    ready() {
      switch (this.question.type) {
        case 1:
          return this.compSolu.length > 0 && this.compAns.length > 1 && this.activeQuest.length > 0 && this.question.answer != '' ? true : false;

        case 2:
          return this.compSolu.length > 0 && this.compAns.length > 1 && this.activeQuest.length > 0 && this.question.answer != '' ? true : false;

        case 4:
          return this.compSolu.length > 0 && this.compAns.length > 1 && this.activeQuest.length > 0 && this.question.answer != '' ? true : false;

        case 8:
          return this.compSolu.length > 0 && this.compAns.length > 1 && this.activeQuest.length > 0 && this.question.answer != '' ? true : false;

        default:
          return this.compSolu.length > 0 && this.compAns.length > 0 && this.activeQuest.length > 0 && this.question.answer != '' ? true : false;
      }
    }
  },
  beforeMount() {
    if (this.loggedIn == false) {
      this.$router.push({ path: "/login" });
    }
  },
  mounted() {
    if (this.$route.params.qlid) {
      this.url = this.$route.params.url;
      this.qlid = this.$route.params.qlid;
      this.clsId = this.$route.params.clsId;
      this.tname = this.$route.params.tname;
      let obj = {
        clsId: this.clsId,
        qlid: this.qlid,
        tname: this.tname,
        url: this.url
      };
      localStorage.setItem("add", JSON.stringify(obj));
      this.getQuestion();
      this.getContents();
      //this.getAnswers();
      // this.getSolutions();
    } else {
      var jun = JSON.parse(localStorage.getItem("add"));
      this.qlid = jun.qlid;
      this.clsId = jun.clsId;
      this.tname = jun.tname;
      this.url = jun.url;
      this.getQuestion();
      this.getContents();
      //this.getAnswers();
      // this.getSolutions();
    }
  },
  methods: {
    copyId() {
      alert(`${this.question.qlid}`);
      let id = `${this.question.qlid}`;
      id.select();
      this.clickCount++;
      if (this.clickCount > 4) {
        document.execCommand('copy');
      }
    },
    reg(type) {   
      const regex = /^@[a-z]+@$/ig;
      switch (type) {
        case 'question':
          var quest = this.questionData;
          var matches = regex.exec(quest.trim());
          if (!matches) {
            this.$refs.resModal.open({type:'error', message: 'There should only be one ref (e.g @image1@)'});
            return;
          }
          !this.edit ? this.addContent() : this.editContent();
          break;
        case 'answer':
          var ans = this.ansText;
          var match = regex.exec(ans.trim());
          if (!match) {
            this.$refs.resModal.open({type:'error', message: 'There should only be one ref (e.g @image1@)'});
            return;
          }
          !this.edit ? this.addAnswer() : '';  
          break;
        case 'solution':
          var solu = this.solution;
          var similar = regex.exec(solu.trim());
          if (!similar) {
            this.$refs.resModal.open({type:'error', message: 'There should only be one ref (e.g @image1@)'});
            return;
          }
          !this.edit ? this.addSolution() : this.editSolution();
          break;
        case 'tip':
          var tip = this.tip;
          var another = regex.exec(tip.trim());
          if (!another) {
            this.$refs.resModal.open({type:'error', message: 'There should only be one ref (e.g @image1@)'});
            return;
          }
          !this.edit ? this.addTip() : this.editTip(); 
          break;
      }
    },
    compiledMarkdown(text) {
        marked.setOptions({
          renderer: new marked.Renderer(),
          gfm: true,
          tables: true,
          breaks: true,
          pedantic: false,
          sanitizer: false,
          smartLists: true,
          smartypants: false
        });
        return DOMPurify.sanitize(marked(text));
    },
    addContent() {
      if (this.questionData.trim() != "") {
        this.disabled = true;
        var ts = Math.round(+new Date() / 1000);

        this.isLoading = true;
        this.loader.active = true;
        const headers = {
          "X-Timestamp": ts,
          "X-Ulid": `${this.$store.state.user.ulid}`,
        };

        const reqBody = {
          owner: this.qlid,
          type: 1,
          data: this.questionData.trim(),
          engine: this.engine,
        };

        apiClient
          .post("/v1/office/assessment/content/add", reqBody, {
            headers: headers,
          })
          .then((res) => {
            this.assetType = reqBody.type;
            this.isLoading = false;
            this.err = null;
            this.errs = null;
            this.loader.active = false;
            this.disabled = false;
            this.getContents();
            this.prevData.push(this.questionData);
            this.questionData = "";
            if (res.data.info.refs.length > 0) {
              var medias = res.data.info.refs;
              this.clid = res.data.info.clid;
              medias.forEach(media => {
              this.mediaRef.push({
                owner: this.clid,
                type: this.assetType,
                name: media,
                position: "",
                scale: "",
                data: '',
                imgName: ''
              })
              });
              setTimeout(() => {
                this.disabled = true
              document.getElementById('displayAsset').click();               
              }, 1000);

            }
          })
          .catch((err) => {
            this.isLoading = false;
            this.loader.active = false;
            this.err = null;
            this.errs = null;
            this.disabled = false;
            if (err.response) {
            this.$refs.resModal.open({type:'error', message: err.response.data.message})           
            }

            setTimeout(() => {
              this.error = false;
            }, 3000);
          });
      } else {
        if (this.engine == "text") {
          this.err = true;
        } else {
          this.errs = true;
        }
      }
    },
    Images_onFileChanged(event) {
      this.selectedFile = event.target.files[0];
      this.mediaRef[this.imgId].imgName = this.selectedFile.name;
      this.createBase64Image(this.selectedFile);
    },
    removeImg(m) {
      this.mediaRef[m].imgName = '';
      document.getElementById(`upload-${m}`).value = '';
      this.mediaRef[m].data = '';
    },
    addMedia(m) {
      var ts = Math.round(+new Date() / 1000);

      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      const reqBody = {
        owner: this.mediaRef[m].owner,
        type: this.assetType,
        name:this.mediaRef[m].name,
        position: this.mediaRef[m].position,
        scale: this.mediaRef[m].scale,
        data: this.mediaRef[m].data
      };
      if (!reqBody.data && !reqBody.scale && !reqBody.position) {
        this.imgErr = true;
        return;
      }

      if (reqBody.data && reqBody.scale && reqBody.position) {
        this.isLoading = true;
        this.loader.active = true;
        this.imgErr = false;
        apiClient
          .post("/v1/office/assessment/asset/add", reqBody, {
            headers: headers,
          })
          .then(() => {
            this.isLoading = false;
            this.loader.active = false;
            this.selectedFile = null;
            var output = [];

            this.mediaRef.forEach(function (media) {
              if (media.name !== reqBody.name) {
                output.push(media);
              }
            });

            setTimeout(() => {
              this.mediaRef = output;
              if (this.mediaRef.length < 1) {
                this.disabled = false
                setTimeout(() => {
                 document.getElementById('mediaClose').click(); 
                }, 10);
                
              }
            }, 1000);
          })
          .catch((err) => {
            this.isLoading = false;
            this.loader.active = false;
            this.$refs.resModal.open({type:'error', message: err.response.data.message})
            setTimeout(() => {
              this.error = false;
            }, 3000);
          });        
      } else {
        this.imgErr = true;
      }


    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fileToUpload = e.target.result;
        this.mediaRef[this.imgId].data = this.fileToUpload;
      };
      reader.readAsDataURL(fileObject);
    },
    getContents() {
      var ts = Math.round(+new Date() / 1000);

      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      apiClient
        .get(`/v1/office/assessment/content/load/${this.qlid}`, {
          headers: headers,
        })
        .then((res) => {
          var content = res.data.data;
          this.prevData = content;
          this.getAnswers();
        })
        .catch(() => {
        });
    },
    deleteContent(id) {
      this.loader.active = true;

      var ts = Math.round(+new Date() / 1000);

      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

        apiClient
          .patch(`/v1/office/assessment/content/remove`, { clid: id }, {
            headers: headers,
          })
          .then(() => {
            this.isLoading = false;
            this.loader.active = false;
            this.questionData = '';
            this.contentID = '';
            this.edit = false;
            this.solution = '';
            this.contentID = '';
            this.editSolu = false;
            this.tip = '';
            this.contentID = '';
            this.editTp = false;
            this.getContents();
            this.getSolutions();
            this.getTips();
          })
          .catch((err) => {
            this.isLoading = false;
            this.loader.active = false;
            this.err = null;
            this.errs = null;
            this.disabled = false;
            if (err.response) {
            this.error = true;
            this.$refs.resModal.open({type:'error', message: err.response.data.message});            
            }
            setTimeout(() => {
              this.error = false;
            }, 3000);
          });      
    },
    setEdit(eng, id, txt) {
      this.mediaRef = [];
      document.getElementById(`question-${eng}`).click();
      this.engine = eng;
      this.contentID = id;
      if (eng == 'media') {
        this.mediaRef = [];
        this.parseRef(txt);
      } else {
        this.edit = true;
        this.questionData = txt;
      }
      
    },
    soluEdit(eng, id, txt) {
      document.getElementById(`solution-${eng}`).click();
      this.engineSolu = eng;
      this.contentID = id;
      if (eng == 'media') {
        this.mediaRef = [];
        this.parseRef(txt);
      } else {
        this.editSolu = true;
        this.solution = txt;
      }
    },
    tipEdit(eng, id, txt) {
      document.getElementById(`tip-${eng}`).click();
      this.engineTip = eng;
      this.contentID = id;
      if (eng == 'media') {
        this.mediaRef = [];
        this.parseRef(txt);
      } else {
        this.editTp = true;
        this.tip = txt;
      }
    },
    editContent() {
      if (this.questionData.trim() != "") {
        this.disabled = true;
        var ts = Math.round(+new Date() / 1000);

        this.isLoading = true;
        this.loader.active = true;
        const headers = {
          "X-Timestamp": ts,
          "X-Ulid": `${this.$store.state.user.ulid}`,
        };

        const reqBody = {
          clid: this.contentID,
          type: 1,
          data: this.questionData.trim(),
          engine: this.engine,
        };

        apiClient
          .patch("/v1/office/assessment/content/change", reqBody, {
            headers: headers,
          })
          .then(() => {
            this.isLoading = false;
            this.edit = false;
            this.editSolu = false;
            this.err = null;
            this.errs = null;
            this.loader.active = false;
            this.disabled = false;
            this.getContents();
            this.prevData.push(this.questionData);
            this.parseRef(this.questionData.trim());
            this.questionData = "";
          })
          .catch((err) => {
            this.isLoading = false;
            this.loader.active = false;
            this.err = null;
            this.errs = null;
            this.disabled = false;
            if (err.response) {
            this.$refs.resModal.open({type:'error', message: err.response.data.message});             
            }

            setTimeout(() => {
              this.error = false;
            }, 3000);
          });
      } else {
        if (this.engine == "text") {
          this.err = true;
          this.disabled = false;
          setTimeout(() => {
            this.error = false;
            this.err = false;
          }, 3000);
        } else {
          this.errs = true;
          this.disabled = false;
          setTimeout(() => {
            this.error = false;
            this.errs = false;
          }, 3000);
        }
      }
    },
    getQuestion() {
      var ts = Math.round(+new Date() / 1000);

      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      apiClient
        .get(`/v1/office/assessment/question/pull/${this.qlid}`, {
          headers: headers,
        })
        .then((res) => {
          this.question = res.data.info.question;
          this.getSolutions();
        })
        .catch((err) => {
            this.error = true;
            this.errMsg = err.response.data.message;
            setTimeout(() => {
              this.error = false;
            }, 3000);
        });
    },
    getAnswers() {
      var ts = Math.round(+new Date() / 1000);

      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      apiClient
        .get(`/v1/office/assessment/answer/fetch/question/${this.qlid}`, {
          headers: headers,
        })
        .then((res) => {
          var answers = res.data.data;
          this.answers = answers;
          this.getTips();
        })
        .catch((err) => {
            this.error = true;
            this.errMsg = err.response.data.message;
            setTimeout(() => {
              this.error = false;
            }, 3000);
        });
    },
    changeAns(txt) {
      this.ansText = txt;
    },
    addAnswer() {
      if (this.ansText.trim() == '') {
        this.error = true;
        this.errs = true;
        setTimeout(() => {
          this.error = false;
        }, 3000);
        return;
      }
      if (this.compAns.length >= 5 && this.question.type != 1 && this.question.type != 16) {
          this.error = true;
          this.errMsg = 'Cannot create more than 5 answers';
          return;
      }
      if (this.question.type == 1 && this.compAns.length > 1) {
          this.error = true;
          this.errMsg = 'Cannot create more than 2 answers';
          return;
      }
      
      const ts = Math.round(+new Date() / 1000);

      this.isLoading = true;

      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      switch (this.question.type) {
        case 16:
            this.disabled = true;
            var setCorrect = [];
            setCorrect.push(this.ansText.trim());

            var reqBodys = {
              qlid: this.qlid,
              items: setCorrect,
            };
            //this.loader.active = true;

            apiClient
              .patch("/v1/office/assessment/question/correct", reqBodys, { headers: headers })
              .then(() => {
                this.isLoading = false;
                this.loader.active = false;
                this.disabled = false;
                this.errs = false;
                this.assetType = 2;
                this.ansText = "";
                this.getQuestion();
                setTimeout(() => {
                  document.getElementById("myChecks").click();
                }, 1000);
              })
              .catch((err) => {
                setTimeout(() => {
                  document.getElementById("myChecks").click();
                }, 10);
                this.isLoading = false;
                this.loader.active = false;
              this.errs = false;
              this.disabled = false;
              if (err.response) {
                  this.$refs.resModal.open({type:'error', message: err.response.data.message});          
              }
                  setTimeout(() => {
                    this.error = false;
                  }, 3000);
              });             
          break;
      
        default:
            this.disabled = true;

            var reqBody = {
              qlid: this.qlid,
              content: {
                data: this.ansText.trim(),
                engine: this.ansEng,
              },
            };
            //this.loader.active = true;

            apiClient
              .post("/v1/office/assessment/answer/add", reqBody, { headers: headers })
              .then((res) => {
                this.isLoading = false;
                this.loader.active = false;
                this.disabled = false;
                this.errs = false;
                this.assetType = 2;
                this.ansText = "";
                this.getAnswers();
                setTimeout(() => {
                  document.getElementById("myChecks").click();
                }, 1000);
                  if (res.data.info.refs.length > 0) {
                    var medias = res.data.info.refs;
                    this.clid = res.data.info.alid;
                    medias.forEach(media => {
                    this.mediaRef.push({
                      owner: this.clid,
                      type: this.assetType,
                      name: media,
                      position: "",
                      scale: "",
                      data: '',
                      imgName: ''
                    })
                    });
                    setTimeout(() => {
                      this.disabled = true
                    document.getElementById('displayAsset').click();               
                    }, 1000);

                  }
                
              })
              .catch((err) => {
                    setTimeout(() => {
                      this.disabled = true
                    document.getElementById('myChecks').click();               
                    }, 10);
                this.isLoading = false;
                this.loader.active = false;
              this.errs = false;
              this.disabled = false;
              if (err.response) {
                  this.$refs.resModal.open({type:'error', message: err.response.data.message});          
              }
                  setTimeout(() => {
                    this.error = false;
                  }, 3000);
              });          
          break;
      }

    },
    deleteAnswer(id) {
      var ts = Math.round(+new Date() / 1000);

      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      apiClient
        .patch('/v1/office/assessment/answer/remove', { alid: id } ,{
          headers: headers,
        })
        .then(() => {
          this.getAnswers();
        })
        .catch((err) => {
          if (err.response) {
            this.$refs.resModal.open({type:'error', message: err.response.data.message});
            setTimeout(() => {
              this.error = false;
            }, 3000);            
          }
        });      
    },
    addSolution() {
      if (this.solution.trim() != "") {
        var ts = Math.round(+new Date() / 1000);

        this.isLoading = true;
        this.loader.active = true;

        const headers = {
          "X-Timestamp": ts,
          "X-Ulid": `${this.$store.state.user.ulid}`,
        };

        const reqBody = {
          owner: this.question.solution,
          type: 8,
          data: this.solution.trim(),
          engine: this.engineSolu,
        };

        apiClient
          .post("/v1/office/assessment/content/add", reqBody, {
            headers: headers,
          })
          .then((res) => {
            this.assetType = reqBody.type;
            this.getSolutions();
            this.isLoading = false;
            this.errsolu = false;
            this.loader.active = false;
            this.solution = "";
            if (res.data.info.refs.length > 0) {
              var medias = res.data.info.refs;
              this.clid = res.data.info.clid;
              medias.forEach(media => {
              this.mediaRef.push({
                owner: this.clid,
                type: this.assetType,
                name: media,
                position: "",
                scale: "",
                data: '',
                imgName: ''
              })
              });
              setTimeout(() => {
                this.disabled = true
              document.getElementById('displayAsset').click();               
              }, 1000);

            }
            document.getElementById("myCheck").click();
          })
          .catch((err) => {
            this.isLoading = false;
            this.errsolu = false;
            this.loader.active = false;
            if (err.response) {
            this.$refs.resModal.open({type:'error', message: err.response.data.message});              
            }

            setTimeout(() => {
              this.error = false;
            }, 3000);
          });
      } else {
        this.errsolu = true;
          this.error = true;
      }
    },
    editSolution() {
      if (this.solution.trim() != "") {
        var ts = Math.round(+new Date() / 1000);

        this.isLoading = true;
        this.loader.active = true;

        const headers = {
          "X-Timestamp": ts,
          "X-Ulid": `${this.$store.state.user.ulid}`,
        };

        const reqBody = {
          clid: this.contentID,
          type: 8,
          data: this.solution.trim(),
          engine: this.engineSolu,
        };

        apiClient
          .patch("/v1/office/assessment/content/change", reqBody, {
            headers: headers,
          })
          .then(() => {
            this.getSolutions();
            this.isLoading = false;
            this.errsolu = false;
            this.editSolu = false;
            this.loader.active = false;
            this.parseRef(this.solution.trim());
            this.solution = "";
            document.getElementById("myCheck").click();
          })
          .catch((err) => {
            this.isLoading = false;
            this.errsolu = false;
            this.loader.active = false;
            if (err.response) {
            this.$refs.resModal.open({type:'error', message: err.response.data.message});              
            }

            setTimeout(() => {
              this.error = false;
            }, 3000);
          });
      } else {
        console('how?');
        this.errsolu = true;
          this.error = true;
      }
    },
    getSolutions() {
      var ts = Math.round(+new Date() / 1000);

      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      apiClient
        .get(`/v1/office/assessment/content/load/${this.question.solution}`, {
          headers: headers,
        })
        .then((res) => {
          this.solutions = res.data.data;
          this.getTips();
        })
        .catch((err) => {
          this.getTips();
          this.error = true;
          this.errMsg = err.response.data.message;
          setTimeout(() => {
            this.error = false;
          }, 3000);
        });
    },
    addTip() {
      if (this.tip.trim() != "") {
        var ts = Math.round(+new Date() / 1000);

        this.isLoading = true;
        this.loader.active = true;

        const headers = {
          "X-Timestamp": ts,
          "X-Ulid": `${this.$store.state.user.ulid}`,
        };

        const reqBody = {
          owner: this.question.tip,
          type: 4,
          data: this.tip.trim(),
          engine: this.engineTip,
        };

        apiClient
          .post("/v1/office/assessment/content/add", reqBody, {
            headers: headers,
          })
          .then((res) => {
            this.assetType = reqBody.type;
            this.getTips();
            this.isLoading = false;
            this.errortip = false;
            this.loader.active = false;
            this.tip = "";
            if (res.data.info.refs.length > 0) {
              var medias = res.data.info.refs;
              this.clid = res.data.info.clid;
              medias.forEach(media => {
              this.mediaRef.push({
                owner: this.clid,
                type: this.assetType,
                name: media,
                position: "",
                scale: "",
                data: '',
                imgName: ''
              })
              });
              setTimeout(() => {
                this.disabled = true
              document.getElementById('displayAsset').click();               
              }, 1000);

            }
            document.getElementById("myCheck").click();
          })
          .catch((err) => {
            this.isLoading = false;
            this.errortip = false;
            this.loader.active = false;
            if (err.response) {
            this.$refs.resModal.open({type:'error', message: err.response.data.message});               
            }

            setTimeout(() => {
              this.error = false;
            }, 3000);
          });
      } else {
        this.errortip = true;
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 3000);
      }
    },
    editTip() {
      if (this.tip.trim() != "") {
        var ts = Math.round(+new Date() / 1000);

        this.isLoading = true;
        this.loader.active = true;

        const headers = {
          "X-Timestamp": ts,
          "X-Ulid": `${this.$store.state.user.ulid}`,
        };

        const reqBody = {
          clid: this.contentID,
          type: 4,
          data: this.tip.trim(),
          engine: this.engineTip,
        };

        apiClient
          .patch("/v1/office/assessment/content/change", reqBody, {
            headers: headers,
          })
          .then(() => {
            this.getTips();
            this.isLoading = false;
            this.errortip = false;
            this.editTp = false;
            this.loader.active = false;
            this.parseRef(this.tip.trim());
            this.tip = "";
            document.getElementById("myCheck").click();
          })
          .catch((err) => {
            this.isLoading = false;
            this.errortip = false;
            this.loader.active = false;
            if (err.response) {
            this.$refs.resModal.open({type:'error', message: err.response.data.message});               
            }

            setTimeout(() => {
              this.error = false;
            }, 3000);
          });
      } else {
        this.errortip = true;
          this.error = true;
      }
    },
    getTips() {
      var ts = Math.round(+new Date() / 1000);

      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      apiClient
        .get(`/v1/office/assessment/content/load/${this.question.tip}`, {
          headers: headers,
        })
        .then((res) => {
          this.tips = res.data.data;
          this.contentLength = this.prevData.length + this.answers.length + this.solutions.length + this.tips.length;
        })
        .catch(() => {
        });
    },
    buildQuestion() {
      var ts = Math.round(+new Date() / 1000);

      this.isLoading = true;
      this.loader.active = true;

      const headers = {
        "X-Timestamp": ts,
        "X-Ulid": `${this.$store.state.user.ulid}`,
      };

      const reqBody = {
        qlid: this.qlid,
      };

      apiClient
        .post("/v1/office/assessment/question/submit", reqBody, {
          headers: headers,
        })
        .then((res) => {
          this.$refs.resModal.open({type:'success', message: res.data.message});
          this.isLoading = false;
          this.loader.active = false;
          this.getQuestion();
        })
        .catch((err) => {
          this.isLoading = false;
          this.loader.active = false;
          this.error = true;
          this.$refs.resModal.open({type:'error', message: err.response.data.message})
        });
    },
    parseRef(payload) {
    let splitted = payload.split(' ')
    var refs = [];  
      for (var x = 0; x < splitted.length; x++) {
        let item = splitted[x]
        if (item.substring(0, 1).includes("@") &&
        item.substring(item.length - 1).includes("@")) {
          let splits = item.split("@")
          var ref
          for (ref of splits) {
            if (ref) {
              refs.push(ref)
            }
          }
        }
      }
      if (refs.length > 0) {
        refs.forEach(media => {
            this.mediaRef.push({
              owner: this.contentID,
              type: this.assetType,
              name: media,
              position: "",
              scale: "",
              data: '',
              imgName: ''
            })
          });
          setTimeout(() => {
            this.disabled = true
            document.getElementById('displayAsset').click();               
          }, 1000);        
      }

    },
    setEngine(data) {
      this.engine = data;
    },
    setCorrect(id) {
      if (this.question.type == 1 || this.question.type == 2) {
        this.ansId.push(id);
      }            
    },
    prev() {
      this.$router.go(-1);
    },
    clear() {
      this.error = false;
      this.ansText = '';
    }
  },
};
</script>

<style scoped>
.katex {
  font-size: 1.5em;
  line-height: 120%;
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
}

.katex .base {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.item-list {
  cursor: pointer;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
