<template>
  <div class="modal-info-success modal fade show" id="api-response-modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-info" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="modal-info-body">
                    <div class="modal-info-text">
                        <div class="atbd-notice">
                            <div class="card card-default card-md mb-4">
                                <div class="card-body">
                                    <div class="atbd-notice__content">
                                        <div class="atbd-notice__top text-center">
                                            <div class="atbd-notice__icon bg-success" v-if="type == 'success'">
                                                <i class="fas fa-check color-white"></i>
                                            </div>
                                            <div class="atbd-notice__icon bg-danger" v-else>
                                                <i class="fas fa-times color-white"></i>
                                            </div>
                                            <div class="atbd-notice__text">
                                                <h4> {{type == 'success' ? 'Success': 'Error'}}</h4>
                                                <p>{{message}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- ends: .card -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Ok</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            type: '',
            message: ''
        }
    },
    methods:{

        open({type, message}){
            this.type = type
            this.message = message
            setTimeout(()=>{
                Window.vueBsModal('api-response-modal')
            }, 300)
        }
    }

}
</script>

<style>

</style>