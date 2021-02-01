<template>
        <footer class="footer-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <div class="footer-copyright">
                <p>GreaterFavour Foundation &copy; {{(new Date()).getFullYear()}} <span style="color:#c4c4c4">|</span> v {{envVariables.VUE_APP_VERSION}}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="footer-menu text-right">
                <ul>
                  <li>
                    <a href="#">About</a>
                  </li>
                </ul>
              </div>
              <!-- ends: .Footer Menu -->
            </div>
          </div>
        </div>
      </footer>
</template>

<script>

export default {
}

</script>

<style>

</style>