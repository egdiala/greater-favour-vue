<template>
    <div>
        <div class="note-grid">
            <div v-for="(ans, a) in answers" :key="a" class="note-single">
                <div :class="`note-card note-${correctAns.includes(ans.alid)  || makeCorrect.includes(ans.alid) ? 'work' : 'social'}`">
                    <div class="card border-0">
                        <div class="card-body">
                            <h4 class="note-title">
                                <div :class="`${cardClass} d-flex`">
                                <input v-show="cardClass == 'form-check' && !correctAns.includes(ans.alid)" @click="setAnsId(ans.alid)" :value="ans.alid" :checked="correctAns.includes(ans.alid)  || makeCorrect.includes(ans.alid) ? 'checked' : ''" :class="cardClass == 'form-check' ? 'form-check-input' : 'checkbox'" :type="cardClass == 'form-check' ? 'radio' : 'checkbox'" :name="cardClass == 'form-check' ? 'radioInput' : ''" :id="`check-grp-${a}`">
                                <label :for="`check-grp-${a}`" style="margin-top: 0.14px;"> {{correctAns.includes(ans.alid)  || makeCorrect.includes(ans.alid) ? 'Correct' : 'Incorrect'}}</label>
                                </div> 
                            </h4>
                            <p v-if="ans.engine != 'latex'" class="note-excerpt" v-html="compiledMarkdown(ans.data)"></p>
                            <p v-else><katex-element :expression="ans.data"/></p>
                            <div class="note-action">
                                <div class="note-action__left">
                                    <a href="" @click.prevent="removeAnswer(ans.alid)"> <i class="las la-trash"></i> </a>
                                </div>
                                <div v-if="splitted" class="note-action__right">
                                    <span v-if="qType == 8">{{splitted.indexOf(ans.alid) + 1}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="makeCorrect.length < 1" class="addbtn">
            <button class="btn btn-icon btn-primary btn-circle mx-auto mt-20 cusbtn" data-toggle="modal" data-target="#addOptions" @click="errs = false">
                <span class="las la-plus"></span>
            </button>
        </div>
        <div class="button-group d-flex pt-25" v-else-if="makeCorrect.length > 0 && qType != 8">
            <button class="btn btn-icon btn-success btn-circle mx-auto mt-20 cusbtn" @click="setAnswer()">
                <span class="las la-check"></span>
            </button>
            <button class="btn btn-icon btn-danger btn-circle mx-auto mt-20 cusbtn" @click="unsetAnswer()">
                <span class="las la-times"></span>
            </button>
        </div>
        <div class="button-group d-flex pt-25" v-else-if="makeCorrect.length == answers.length && qType == 8">
            <button class="btn btn-icon btn-success btn-circle mx-auto mt-20 cusbtn" @click="setAnswer()">
                <span class="las la-check"></span>
            </button>
            <button class="btn btn-icon btn-danger btn-circle mx-auto mt-20 cusbtn" @click="unsetAnswer()">
                <span class="las la-times"></span>
            </button>
        </div>
        <ResponseModal ref="resModal" />
    <LoaderOverlay
      :active="loader.active"
      :fullpage="loader.fullpage"
      bgColor="#2a2a2a55"
      zIndex="99999"
    ></LoaderOverlay>
    </div>
</template>

<script>
import { apiClient } from "@/plugins/restclient.js";
import LoaderOverlay from "@/components/LoaderOverlay";
import ResponseModal from "@/components/ResponeModal.vue";
import marked from 'marked';
import DOMPurify from 'dompurify';
export default {
    props: ['qType', 'correctAns', 'answers', 'isCorrect', 'qlid', 'method', 'method1'],
    components: {
        LoaderOverlay,
        ResponseModal
    },
    data() {
        return {
            makeCorrect: [],
            loader: {
                fullpage: true,
                active: false,
            },
        }
    },
    computed: {
        cardClass() {
            return this.qType == 1 || this.qType == 2 ? 'form-check' : 'checkbox-theme-default custom-checkbox checkbox-group__single';
        },
        correctCard() {
            return this.correctAns.includes(this.isCorrect) && this.makeCorrect.includes(this.setAns) ? 'work' : 'social';
        },
        splitted() {
            return this.correctAns.split("|");
        }
    },
    methods: {
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
        removeAnswer(id) {
        this.loader.active = true;
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
            this.loader.active = false;
            this.unsetAnswer();
            this.method1();
            this.method();
            })
            .catch((err) => {
            this.loader.active = false;
            if (err.response) {
            this.$refs.resModal.open({type:'error', message: err.response.data.message})
                setTimeout(() => {
                this.error = false;
                }, 3000);            
            }
            });      
        },
        setAnsId(id) {
            if (this.qType == 1 || this.qType == 2) {
                this.makeCorrect = [];
                this.setAns = id;
                this.makeCorrect[0] = id;
            } else {
                if (this.makeCorrect.includes(id)) {
                    var index = this.makeCorrect.indexOf(id);
                    this.makeCorrect.splice(index, 1);
                } else {
                    this.makeCorrect.push(id);
                }
            }
        },
        setAnswer() {
        this.loader.active = true;
        var ts = Math.round(+new Date() / 1000);

        const headers = {
            "X-Timestamp": ts,
            "X-Ulid": `${this.$store.state.user.ulid}`,
        };

        switch (this.qType) {
            case 4:
            if (this.makeCorrect.length > 1) {
                
                var req = {
                qlid: this.qlid,
                items: this.makeCorrect,
                };

                apiClient
                .patch("/v1/office/assessment/question/correct", req, {
                    headers: headers,
                })
                .then(() => {
                    this.makeCorrect = [];
                    this.method1();
                    this.method();
                    this.isAnswering = false;
                    this.loader.active = false;
                })
                .catch((err) => {
                    this.isAnswering = false;
                    this.loader.active = false;
            this.$refs.resModal.open({type:'error', message: err.response.data.message})
                setTimeout(() => {
                this.error = false;
                }, 3000);
                });
                this.error = null;
                this.errMsg = "";
            } else {
                this.loader.active = false;
                this.error = true;
                this.$refs.resModal.open({type:'error', message: "Correct answers should be more than 1"})
                setTimeout(() => {
                this.error = false;
                }, 3000);
            }

            break;

            default:
            var reqBody = {
                qlid: this.qlid,
                items: this.makeCorrect,
            };

            apiClient
                .patch("/v1/office/assessment/question/correct", reqBody, {
                headers: headers,
                })
                .then(() => {
                this.isAnswering = false;
                this.loader.active = false;
                this.makeCorrect = [];
                this.method1();
                this.method();
                })
                .catch((err) => {
                this.isAnswering = false;
                this.loader.active = false;
                this.$refs.resModal.open({type:'error', message: err.response.data.message})
                setTimeout(() => {
                this.error = false;
                }, 3000);
                });
            break;
        }
        },
        unsetAnswer() {
            this.makeCorrect = [];
        },
    }

}
</script>

<style>

</style>