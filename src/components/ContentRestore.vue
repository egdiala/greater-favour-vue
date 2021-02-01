<template>
    <div class="tab-pane fade show active" :id="`restore${id}`" role="tabpanel" :aria-labelledby="`size-restore${id}`">
        <div class="card mb-30">
            <div class="card-body">
                <div class="note-single">
                    <div class="note-card note-default paddCard">
                        <div class="card border-0">
                            <div class="card-body" v-if="this.id === 1">
                                <h4 class="note-title mb-15">Content</h4>
                                <div
                                    v-for="(data, d) in questions"
                                    :key="d"
                                    class="mt-1"
                                >
                                    <div v-if="data.engine == 'latex'">
                                    <span class="note-excerpt">
                                        <katex-element :expression="data.data"/>
                                            <a href="#" class="txt-fade" @click="restore(data.clid)" data-toggle="tooltip" data-placement="top" title="Restore"> <i class="las la-undo-alt fs-24"></i></a>   
                                    </span>
                                    </div>
                                    
                                    <div 
                                    v-else-if="data.engine != 'latex'"
                                    
                                    >
                                    <span class="note-excerpt" v-html="compiledMarkdown(data.data)">
                                    </span>
                                    <span>
                                            <a href="#" class="txt-fade" @click="restore(data.clid)" data-toggle="tooltip" data-placement="top" title="Delete"> <i class="las la-undo-alt fs-24"></i> </a></span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body" v-if="this.id === 2">
                                <h4 class="note-title mb-15">Content</h4>
                                <div
                                    v-for="(data, d) in solutions"
                                    :key="d"
                                    class="mt-1"
                                >
                                    <div v-if="data.engine == 'latex'">
                                    <span class="note-excerpt">
                                        <katex-element :expression="data.data"/>
                                            <a href="#" class="txt-fade" @click="restore(data.clid)" data-toggle="tooltip" data-placement="top" title="Restore"> <i class="las la-undo-alt fs-24"></i> </a>   
                                    </span>
                                    </div>
                                    
                                    <div 
                                    v-else-if="data.engine != 'latex'"
                                    
                                    >
                                    <span class="note-excerpt" v-html="compiledMarkdown(data.data)">
                                    </span>
                                    <span>
                                            <a href="#" class="txt-fade" @click="restore(data.clid)" data-toggle="tooltip" data-placement="top" title="Restore"> <i class="las la-undo-alt fs-24"></i> </a></span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body" v-if="this.id === 3">
                                <h4 class="note-title mb-15">Content</h4>
                                <div
                                    v-for="(data, d) in tips"
                                    :key="d"
                                    class="mt-1"
                                >
                                    <div v-if="data.engine == 'latex'">
                                    <span class="note-excerpt">
                                        <katex-element :expression="data.data"/>
                                            <a href="#" class="txt-fade" @click="restore(data.clid)" data-toggle="tooltip" data-placement="top" title="Restore"> <i class="las la-undo-alt fs-24"></i> </a>   
                                    </span>
                                    </div>
                                    
                                    <div 
                                    v-else-if="data.engine != 'latex'"
                                    
                                    >
                                    <span class="note-excerpt" v-html="compiledMarkdown(data.data)">
                                    </span>
                                    <span>
                                            <a href="#" class="txt-fade" @click="restore(data.clid)" data-toggle="tooltip" data-placement="top" title="Restore"> <i class="las la-undo-alt fs-24"></i> </a></span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body" v-if="this.id === 4">
                                <h4 class="note-title mb-15">Content</h4>
                                <div
                                    v-for="(data, d) in answers"
                                    :key="d"
                                    class="mt-1"
                                >
                                    <div v-if="data.engine == 'latex'">
                                    <span class="note-excerpt">
                                        <katex-element :expression="data.data"/>
                                            <a href="#" class="txt-fade" @click="restore(data.alid)" data-toggle="tooltip" data-placement="top" title="Restore"> <i class="las la-undo-alt fs-24"></i> </a>   
                                    </span>
                                    </div>
                                    
                                    <div 
                                    v-else-if="data.engine != 'latex'"
                                    
                                    >
                                    <span class="note-excerpt" v-html="compiledMarkdown(data.data)">
                                    </span>
                                    <span>
                                            <a href="#" class="txt-fade" @click="restoreAns(data.alid)" data-toggle="tooltip" data-placement="top" title="Restore"> <i class="las la-undo-alt fs-24"></i> </a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <LoaderOverlay :active="loader.active" :fullpage="loader.fullpage" bgColor="#2a2a2a55" zIndex="99999"></LoaderOverlay>
    </div>
</template>

<script>
import { apiClient } from "@/plugins/restclient.js";
import LoaderOverlay from "@/components/LoaderOverlay";
import marked from 'marked';
import DOMPurify from 'dompurify';
export default {
    props: ['id', 'questions', 'solutions', 'answers', 'tips', 'getContents', 'getSolutions', 'getTips', 'getAnswers'],
    components: {
        LoaderOverlay,
    },
    data() {
        return {
            loader: {
                fullpage: true,
                active: false,
            },
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
        restore(id) {
            this.loader.active = true;
            var ts = Math.round(+new Date() / 1000);

            const headers = {
                "X-Timestamp": ts,
                "X-Ulid": `${this.$store.state.user.ulid}`,
            };

            apiClient
                .patch('/v1/office/assessment/content/restore', { clid: id } ,{
                headers: headers,
                })
                .then(() => {
                    this.loader.active = false;
                    switch (this.id) {
                        case 1:
                            this.getContents();
                            break;
                    
                        case 2:
                            this.getSolutions();
                            break;
                    
                        case 3:
                            this.getTips();
                            break; 
                    }           
                })
                .catch(() => {
                this.loader.active = false;
                });      
        },
        restoreAns(id) {
            this.loader.active = true;
            var ts = Math.round(+new Date() / 1000);

            const headers = {
                "X-Timestamp": ts,
                "X-Ulid": `${this.$store.state.user.ulid}`,
            };

            apiClient
                .patch('/v1/office/assessment/answer/restore', { alid: id } ,{
                headers: headers,
                })
                .then(() => {
                    this.loader.active = false;
                    this.getAnswers();
                })
                .catch(() => {
                this.loader.active = false;
                });      
        },
    }
}
</script>

<style>

</style>