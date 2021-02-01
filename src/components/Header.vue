<template>
    <header class="header-top">
        <nav class="navbar navbar-light">
            <div class="navbar-left">
                <a href="" class="sidebar-toggle">
                    <img class="svg" src="@/assets/img/svg/bars.svg" alt="img"></a>
                <a class="navbar-brand" href="#"><img class="svg dark" src="@/assets/img/custom/greater-favour.png" alt=""><img class="light" src="@/assets/img/Logo_white.png" alt=""></a>
            
            </div>
            <!-- ends: navbar-left -->
            <div class="navbar-right">
                <ul class="navbar-right__menu">
                    <li class="nav-search d-none">
                        <a href="#" class="search-toggle">
                            <i class="la la-search"></i>
                            <i class="la la-times"></i>
                        </a>
                        <form action="/" class="search-form-topMenu">
                            <span class="search-icon" data-feather="search"></span>
                            <input class="form-control mr-sm-2 box-shadow-none" type="search" placeholder="Search..." aria-label="Search">
                        </form>
                    </li>
                  
                    <!-- ends: nav-message -->
                    <li class="nav-notification">
                        <div class="dropdown-custom">
                            <a href="javascript:;" class="nav-item-toggle">
                                <span data-feather="bell"></span></a>
                            <div class="dropdown-wrapper">
                                <!-- <h2 class="dropdown-wrapper__title">Notifications <span class="badge-circle badge-warning ml-1">4</span></h2> -->
                                <h2 class="dropdown-wrapper__title">No Notification</h2>
                                <!-- <ul>
                                    <li class="nav-notification__single nav-notification__single--unread d-flex flex-wrap">
                                        <div class="nav-notification__type nav-notification__type--primary">
                                            <span data-feather="inbox"></span>
                                        </div>
                                        <div class="nav-notification__details">
                                            <p>
                                                <a href="" class="subject stretched-link text-truncate" style="max-width: 180px;">James</a>
                                                <span>sent you a message</span>
                                            </p>
                                            <p>
                                                <span class="time-posted">5 hours ago</span>
                                            </p>
                                        </div>
                                    </li>
                                </ul> -->
                                <!-- <a href="" class="dropdown-wrapper__more">See all incoming activity</a> -->
                            </div>
                        </div>
                    </li>
                    <li class="nav-author">
                        <div class="dropdown-custom">
                            <a href="javascript:;" class="nav-item-toggle">
                                <!-- <img :src="user.avatar ? user.avatar.replace('block://', envVariables.VUE_APP_STORAGE_BUCKET) : `/img/custom/avatar-` + getAvatar(user.fname)" alt="" class="rounded-circle"> -->
                                <span v-if="user" class="rounded-circle s-30" :style="{backgroundImage: `url(${getAvatar(user)})`}"> </span>
                                <!-- <span class="rounded-circle s-30" :style="{'backgroundImage': 'url('+ `/img/custom/avatar-` + getAvatar(user.fname) + ')', color: 'red'  }"> </span> -->
                            </a>
                            <div class="dropdown-wrapper">
                                <div class="nav-author__info">
                                    <div class="author-img">
                                       <span v-if="user" class="rounded-circle bg-pos s-30" :style="{backgroundImage: `url(${getAvatar(user)})`}"> </span>
                                    </div>
                                    <div v-if="user">
                                        <h6>{{user.lname}} {{user.fname}}</h6>
                                        <span>{{roleMap[user.role]}}</span>
                                    </div>
                                </div>
                                <div class="nav-author__options">
                                    <ul>
                                        <li>
                                            <router-link :to="{name: 'user-profile'}">
                                                <span data-feather="user"></span> Profile</router-link>
                                        </li>
                                    </ul>
                                    <a @click="logout()" class="nav-author__signout logout-link">
                                        <span data-feather="log-out"></span> Sign Out
                                    </a>
                                </div>
                            </div>
                            <!-- ends: .dropdown-wrapper -->
                        </div>
                    </li>
                    <!-- ends: .nav-author -->
                </ul>
                <!-- ends: .navbar-right__menu -->
            </div>
            <!-- ends: .navbar-right -->
        </nav>
    </header>
</template>

<script>
import { roleMap } from "@/utilities/constant";
import { mapState } from 'vuex';
export default {
    data(){
        return{
            roleMap
        }
    },
    computed:{
        ...mapState(['user']),
        

    },
    methods: {
        
        logout() {
            this.$store.dispatch("logout");
        },
    }
}
</script>

<style>
.logout-link {
    cursor: pointer;
}
.s-30{
    width: 30px !important;
    height: 30px;
    display: inline-block;
    background-position: center;
    background-size: cover;
}
</style>