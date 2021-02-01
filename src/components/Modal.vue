<template>
    <div class="modal-info-confirmed modal fade show" :id="config.name" tabindex="-1" data-backdrop="static"
        role="dialog" aria-hidden="true">

        <div class="modal-dialog modal-info" :class="`${config.class}`" role="document">
            <div class="modal-content">
                <div class="modal-header" v-if="config.header">
                    <h6 class="modal-title">{{config.title}}</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg></button>
                </div>
                <div class="modal-body" v-if="config.type == 1">
                    <div class="modal-info-body" :class="{'d-flex': !config.header}">
                        <div class="modal-info-icon warning" :class="config.icon.bg">
                            <span :class="config.icon.fg"></span>
                        </div>
                        <div class="modal-info-text" v-if="!config.header">
                            <h6>{{config.title}}</h6>
                            <p>{{config.subTitle}}</p>
                        </div>
                        <slot></slot>
                    </div>
                </div>
                <div class="modal-body" v-else>
                    <div class="modal-info-body">
                        <div class="modal-info-text">
                            <div class="atbd-notice">
                                <div class="card card-default card-md mb-4">
                                    <div class="card-body">
                                        <div class="atbd-notice__content">
                                            <div class="atbd-notice__top text-center">
                                                <div class="atbd-notice__icon" :class="config.icon.bg">
                                                    <i class="color-white" :class="config.icon.fg"></i>
                                                </div>
                                                <div class="atbd-notice__text">
                                                    <h4>{{config.title}}</h4>
                                                    <p>{{config.subTitle}}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <slot></slot>
                                    </div>
                                </div><!-- ends: .card -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" v-for="(button,k) in config.buttons" :key="k" class="btn btn-outlined btn-sm"
                        :class="button.class" data-dismiss="modal">
                        {{button.label}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['config'],
    watch:{
        trigger(){

        }
    },
    methods:{
        open(){
            Window.openVueBsModal(this.config.name)
        },
        close(){
            this.$refs.closeModal.click()
        }
    }
}
</script>

<style>

</style>