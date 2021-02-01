<template>
  <div class="main-content">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <!-- Start: error page -->
                    <div class="min-vh-100 content-center  multi_step_form">
                        <div class="error-page text-center">
                            <img src="/img/custom/greater-favour.png" class="mb-10 mt-50" width="200"> <br>
                            <h5 class="fw-500">Role <br> <small> Applocation</small> </h5> <br>

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
                                      <div class="form-group mb-30" v-for="(d, k) in $route.params.documents" :key="k">
                                        <label for="exampleFormControlFile1" class="text-capitalize">{{ d.action.replace('.', ' ')}}</label>
                                        <input type="file" class="form-control-file" id="exampleFormControlFile1">
                                      </div>
                                        <div class="d-flex justify-content-center  ">
                                           <div class="mt-50 mb-25">
                                                <strong>Need help? Check our help </strong> 
                                                <a href="#">section</a>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                

                            </div>
                           <div class="content-center mt-30">
                                <a class="btn btn-primary btn-default btn-squared px-30 link text-white">Done</a>
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
export default {
  layout:'plain',
  methods:{
    uploadDocuments(){
      
    }
  }
}
</script>

<style>

</style>