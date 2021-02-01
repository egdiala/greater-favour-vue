<template>
    <div class="static-bg" v-if="active" :style="{'backgroundColor': bg}">
        <div class="d-flex justify-content-center align-items-center">
            <span class="atbd-spin-dots spin-lg">
            <span class="spin-dot badge-dot dot-primary"></span>
            <span class="spin-dot badge-dot dot-primary"></span>
            <span class="spin-dot badge-dot dot-primary"></span>
            <span class="spin-dot badge-dot dot-primary"></span>
        </span>
        </div>
    </div>
</template>

<script>
export default {
    props:['active', 'bg']
}
</script>
<style>
.static-bg{
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    z-index: 999999;
    top: 0;
    left: 0;
}
</style>