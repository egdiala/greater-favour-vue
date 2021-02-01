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
             <span data-feather="help-circle" class="nav-icon"></span>
            <span class="menu-text"> Questions </span>
            <span class="toggle-icon"></span>
          </a>
          <ul>
           <li class="">
              <router-link class="" :to="{name: 'reviews'}">
                <span class="menu-text">Questions Review</span>
              </router-link>
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
          <router-link class="" :to="{ name: 'cashout' }">
            <span data-feather="shopping-cart" class="nav-icon"></span>
            <span class="menu-text">Cash Out</span>
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
