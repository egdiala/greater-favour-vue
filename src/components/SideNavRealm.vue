<template>
  <aside class="sidebar">
    <div class="sidebar__menu-group">
      <ul class="sidebar_nav">
        <li class="menu-title">
          <span>Main menu</span>
        </li>
        <li class="">
          <router-link to="/">
            <span data-feather="home" class="nav-icon"></span>
            <span class="menu-text">Dashboard</span>
          </router-link>
        </li>
        <li class="has-child">
          <a href="#" class="">
            <span data-feather="layout" class="nav-icon"></span>
            <span class="menu-text">Subjects</span>
            <span class="toggle-icon"></span>
          </a>
          <ul>
            <li id="primary">
              <router-link :to="{
                  name: 'classes-primary',
                  params: { classType: primary, themes: themes },
                }" class="">Primary</router-link>
            </li>
            <li>
              <router-link :to="{
                  name: 'classes-junior',
                  params: { classType: junior, themes: themes },
                }" class="">Junior Secondary</router-link>
            </li>
            <li>
              <router-link :to="{
                  name: 'classes-senior',
                  params: { classType: senior, themes: themes },
                }" class="">Senior Secondary</router-link>
            </li>
          </ul>
        </li>
        <li class="has-child">
          <a href="#" class="">
            <span data-feather="users" class="nav-icon"></span>
            <span class="menu-text"> Users </span>
            <span class="toggle-icon"></span>
          </a>
          <ul>
            <li>
              <router-link :to="{ path: '/users/guardians' }" class="">Guardians
              </router-link>
            </li>
            <li>
              <router-link :to="{ path: '/users/students' }" class="">Students</router-link>
            </li>
          </ul>
        </li>
         <li class="has-child">
          <a href="#" class="">
             <span data-feather="help-circle" class="nav-icon"></span>
            <span class="menu-text"> Questions </span>
            <span class="toggle-icon"></span>
          </a>
          <ul>
            <li class="">
              <router-link class="" :to="{name: 'account-questions'}">
                <span class="menu-text">My Questions</span>
              </router-link>
            </li>
            <li class="">
              <router-link class="" :to="{name: 'questions-upload'}">
                <span class="menu-text">Question Upload</span>
              </router-link>
            </li>
            <li class="">
              <router-link class="" :to="{name: 'reviews'}">
                <span class="menu-text">Questions Review</span>
              </router-link>
            </li>
            <li class="">
              <router-link class="" :to="{name: 'questions-normalisation'}">
                <span class="menu-text">Normalisation</span>
              </router-link>
            </li>
          </ul>
         </li>
        <li class="menu-title m-top-30">
          <span>Actions</span>
        </li>
        <li class="">
          <router-link :to="{name: 'action-payout'}">
            <span data-feather="layers" class="nav-icon"></span>
            <span class="menu-text">Payouts</span>
          </router-link>
        </li>
        <li class="">
          <router-link :to="{name: 'action-documentation'}">
            <span data-feather="map" class="nav-icon"></span>
            <span class="menu-text">Documentation</span>
          </router-link>
        </li>
        <li class="menu-title m-top-30">
          <span>Verfification</span>
        </li>
        <li class="">
          <router-link :to="{name : 'action-document-verification'}">
             <span data-feather="shield" class="nav-icon"></span>
            <span class="menu-text">Document Verification</span>
          </router-link>
        </li>
        <li class="">
          <router-link :to="{name : 'action-attribute-verification'}">
             <span data-feather="user-plus" class="nav-icon"></span>
            <span class="menu-text">Attribute Verification</span>
          </router-link>
        </li>
        <li class="">
          <router-link :to="{name: 'action-interest-verification'}">
             <span data-feather="user-check" class="nav-icon"></span>
            <span class="menu-text">Interest Verfification</span>
          </router-link>
        </li>

        <li class="menu-title m-top-30">
          <span>Operations</span>
        </li>
        <li class="">
          <router-link class="" :to="{ name: 'cashout' }">
            <span data-feather="shopping-cart" class="nav-icon"></span>
            <span class="menu-text">Cashout</span>
          </router-link>
        </li>

        <li class="has-child">
          <a href="#" class="">
            <span data-feather="user" class="nav-icon"></span>
            <span class="menu-text">Officers</span>
            <span class="toggle-icon"></span>
          </a>
          <ul>
            <li>
              <router-link class="" :to="{ name: 'officers-manage' }">Manage</router-link>
            </li>
          </ul>
        </li>

        <li class="has-child">
          <a href="" class="">
            <span data-feather="grid" class="nav-icon"></span>
            <span class="menu-text">Themes</span>
            <span class="toggle-icon"></span>
          </a>
          <ul>
            <li>
              <router-link :to="{ name: 'themes', params: { themes: themes } }" class="">View</router-link>
            </li>
          </ul>
        </li>
        <li class="has-child">
          <a href="" class="">
            <span data-feather="activity" class="nav-icon"></span>
            <span class="menu-text">Settlement</span>
            <span class="toggle-icon"></span>
          </a>
          <ul>
            <li>
              <router-link class="" :to="{ name: 'operations-settlement' }"
                >View</router-link
              >
            </li>
          </ul>
        </li>
        <li class="menu-title m-top-30">
          <span>Account</span>
        </li>
        <li class="">
          <router-link class="" :to="{ name: 'account-document' }">
            <span data-feather="folder" class="nav-icon"></span>
            <span class="menu-text">Document Upload</span>
          </router-link>
        </li>
        <li class="">
          <router-link class="" :to="{ name: 'account-wallet' }">
             <span data-feather="folder-plus" class="nav-icon"></span>
            <span class="menu-text">Wallet</span>
          </router-link>
        </li>
        <li class="">
          <router-link class="" :to="{ name: 'settings-fees', params: { fees: fees } }">
            <span data-feather="gift" class="nav-icon"></span>
            <span class="menu-text">Content Fees</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  props: ["primary", "junior", "senior", "themes", "fees"],
};
</script>

<style></style>
