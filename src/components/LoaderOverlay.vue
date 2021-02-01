<template>
  <div
    :class="{ fs: fullpage, 'no-display': !active }"
    class="loading"
    :style="{ zIndex: zIndex, backgroundColor: bgColor }"
  >
    <span><Spinner></Spinner></span>
  </div>
</template>

<script>
import Spinner from "./Spinner";
export default {
  data() {
    return {};
  },
  props: ["bgColor", "fullpage", "zIndex", "active"],
  components: {
    Spinner,
  },
};
</script>

<style>
.fs {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading {
  display: flex;
  justify-content: center;
  padding: 20px;
}
.no-display {
  display: none !important;
}
</style>
