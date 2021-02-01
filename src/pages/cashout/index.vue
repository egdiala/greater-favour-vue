<template>
    <div class="contents">
        <div class="container-fluid">
            <div class="profile-content mb-50">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="breadcrumb-main">
                            <h4 class="text-capitalize breadcrumb-title">Cashout
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
                                        <span class="bread-item" style="color: #9299b8;">Account</span>
                                        <span class="breadcrumb__seperator">
                                            <span class="la la-slash"></span>
                                        </span>
                                    </li>
                                    <li class="atbd-breadcrumb__item">
                                        <span class="bread-item">Cashout</span>
                                    </li>
                                </ul>
                            </h4>
                            
                           
                        </div>
                    </div>
                    
                    <!-- Data Tables and Certifications Ends -->
                    
                    <!-- <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <div class="contact-list-wrap mb-25">
                                    <div class="contact-list bg-white radius-xl w-100">
                                        <div class="table-responsive">
                                            <table class="table mb-0 table-borderless table-rounded">
                                                <thead>
                                                    <tr class="">
                                                        <th scope="col">
                                                            <span class="userDatatable-title">Officer</span>
                                                        </th>
                                                        <th scope="col">
                                                            <span class="userDatatable-title">Cashout Amount</span>
                                                        </th>
                                                        <th scope="col" class="">
                                                            <span class="userDatatable-title">Status</span>
                                                        </th>
                                                        <th scope="col">
                                                            <span class="userDatatable-title ">Actions</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div class="contact-item d-flex align-items-center">
                                                                
                                                                <div class="contact-personal-info d-flex no-marg-lft">
                                                                    <a href="#" class="profile-image rounded-circle d-block m-0 wh-38" style="background-image:url('img/tm6.png'); background-size: cover;"></a>
                                                                    <div class="contact_title">
                                                                        <h6>
                                                                            <a href="#">Kellie Marquot</a>
                                                                        </h6>
                                                                        <span class="location">me@mail.com</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="d-flex align-items-center">
                                                                
                                                                <div class="orderDatatable-title">
                                                                    <p class="d-block mb-0">
                                                                        ₦ 10,274
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="orderDatatable-title">
                                                                <span class="atbd-tag tag-success tag-transparented">Approved</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="action-btn">
                                                                <a href="" class="btn btn-sm btn-primary btn-add">
                                                                    <i class="la la-times"></i> Disapproved </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="contact-item d-flex align-items-center">
                                                                
                                                                <div class="contact-personal-info d-flex no-marg-lft">
                                                                    <a href="#" class="profile-image rounded-circle d-block m-0 wh-38" style="background-image:url('img/tm1.png'); background-size: cover;"></a>
                                                                    <div class="contact_title">
                                                                        <h6>
                                                                            <a href="#">Kellie Marquot</a>
                                                                        </h6>
                                                                        <span class="location">me@mail.com</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="orderDatatable-title">
                                                                ₦ 10,274
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="orderDatatable-title">
                                                                <span class="atbd-tag tag-success tag-transparented">Approved</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="action-btn">
                                                                <a href="" class="btn btn-sm btn-squared btn-outline-primary" data-toggle="modal" data-target="#modal-info-confirmed">
                                                                    <i class="la la-plus"></i> Approve Officer </a>
                                                                    
                                                            </div>
                                                            <div class="modal-info-confirmed modal fade show" id="modal-info-confirmed" tabindex="-1" role="dialog" aria-hidden="true">
                                                                <div class="modal-dialog modal-sm modal-info" role="document">
                                                                    <div class="modal-content">
                                                                        <div class="modal-body">
                                                                            <div class="modal-info-body d-flex">
                                                                                <div class="modal-info-icon warning">
                                                                                    <span data-feather="info"></span>
                                                                                </div>
                                                                                <div class="modal-info-text">
                                                                                    <h6>Do you Want to Approve this Cashout</h6>
                                                                                    <p>This is where thecashout amount is <br>
                                                                                        <strong> ₦ 10,274 </strong>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="modal-footer">
                                                                            <button type="button" class="btn btn-light btn-outlined btn-sm" data-dismiss="modal">Cancel</button>
                                                                            <button type="button" class="btn btn-info btn-sm" data-dismiss="modal"> Approve </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    
                                                    
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div> -->

                    
                </div>
                <no-content />
            </div>
        </div>
    </div>
</template>

<script>
import NoContent from '../../components/NoContent.vue'
export default {
  components: { NoContent },
    name: "cashout",
}
</script>

<style scoped>
.bread-item:hover {
    color: #9299b8 !important;
}
</style>