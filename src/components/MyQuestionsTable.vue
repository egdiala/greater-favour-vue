<template>
    <div class="tab-pane fade show active" :id="`timeline${id}`" role="tabpanel" aria-labelledby="ap-overview-tab">
        <div v-if="isLoading && !$store.state.asyncLoader" class="row mt-5 mb-5">
            <div class="col-12">
                <div class="spin-container text-center">
                        <div class="atbd-spin-dots spin-lg">
                            <span class="spin-dot badge-dot dot-primary"></span>
                            <span class="spin-dot badge-dot dot-primary"></span>
                            <span class="spin-dot badge-dot dot-primary"></span>
                            <span class="spin-dot badge-dot dot-primary"></span>
                        </div>
                </div>
            </div>
        </div>
        <div v-if="!isLoading && filteredList.length < 1" class="row mt-5 mb-5">
            <div class="col-12">
                <div class="mb-4 no-content text-center">
                    <img src="@/assets/img/custom/fish.gif" width="200"> <br/>
                    <h3> Oops </h3>
                    <h6> There are no questions </h6> <br>
                </div>
            </div>
        </div>        
        <!-- Start Table Responsive -->
        <div v-else-if="!isLoading && filteredList.length > 0"  class="table-responsive">
            <table class="table mb-0 table-hover table-borderless border-0">
                <thead>
                    <tr class="userDatatable-header">
                        <th>
                            <span class="userDatatable-title">Questions</span>
                        </th>
                        <th>
                            <span class="userDatatable-title">Type</span>
                        </th>
                        <th>
                            <span class="userDatatable-title">Version</span>
                        </th>
                        <th v-if="headers">
                            <span class="userDatatable-title">{{headers}}</span>
                        </th>
                        <th>
                            <span class="userDatatable-title float-right">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(question, q) in filteredList" :key="q">
                        
                        <td>
                            <div class="orderDatatable-title" v-html="question.description.substring(0,61)+'<br>'+question.description.substring(61,question.description.length)">
                                
                            </div>
                        </td>
                        <td>
                            <div v-if="question.type == 2" class="userDatatable-content">
                                Simple
                            </div>
                            <div v-else-if="question.type == 1" class="userDatatable-content">
                                Dichotomous
                            </div>
                            <div v-else-if="question.type == 4" class="userDatatable-content">
                                Multi
                            </div>
                            <div v-else-if="question.type == 8" class="userDatatable-content">
                                Rank
                            </div>
                            <div v-else-if="question.type == 16" class="userDatatable-content">
                                Open
                            </div>
                        </td>
                        <td>
                            <div class="userDatatable-content d-inline-block">
                                <span v-if="question.version" class="bg-opacity-primary color-primary rounded-pill userDatatable-content-status active">{{question.version}}</span>
                            </div>
                        </td>
                        <td v-if="headers">
                            <div v-if="question.status == 1" class="orderDatatable-status d-inline-block">
                                <span class="order-bg-opacity-success  text-success rounded-pill active">Approved</span>
                            </div>
                            <div v-if="question.status == 0 && question.level" class="orderDatatable-status d-inline-block">
                                <span class="order-bg-opacity-warning  text-warning rounded-pill active">Awaiting Approval</span>
                            </div>
                            <div v-else-if="question.status == 0 && !question.level" class="orderDatatable-status d-inline-block">
                                <span class="order-bg-opacity-info  text-info rounded-pill active">Pending</span>
                            </div>
                            <div v-if="question.status == -1" class="orderDatatable-status d-inline-block">
                                <span class="order-bg-opacity-danger  text-danger rounded-pill active">Disapproved</span>
                            </div>
                        </td>
                        <td>
                            <ul class="orderDatatable_actions mb-0 d-flex flex-wrap float-right">
                                    <li>
                                    <a href="#" class="view">
                                            <i class="las la-eye"></i>
                                        </a>
                                    </li>
                                <li>
                                    <a href="#" class="edit">
                                        <i class="las la-edit"></i>
                                        </a>
                                    </li>
                                <li>
                                    <a style="pointer-events: none" href="#" class="remove">
                                        <i class="las la-archive" style="color: grey;"></i>
                                        </a>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Table Responsive End -->
    </div>
</template>

<script>
export default {
    props: ['questions', 'id', 'headers', 'apiQuestions', 'search', 'isLoading'],
    computed: {
        tableData() {
            return this.id === 1 ? this.apiQuestions : this.questions;
        },
        filteredList() {
            return this.tableData.filter(question => {
                return question.description.toLowerCase().includes(this.search.toLowerCase());
            })
        },
    }
}
</script>

<style>

</style>