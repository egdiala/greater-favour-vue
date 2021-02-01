<template>
  <button type="submit"
        class="btn btn-primary btn-default btn-squared text-capitalize lh-normal py-15"
        :class="`${klass}`"
        :disabled="loading || disabled"
    >
        <span
        v-if="loading"
        class="spinner-border spinner-border-sm"
        ></span>
        {{ loading ? "" : label }}
    </button>
</template>

<script>
export default {
    props:['label', 'klass', 'loading', 'width', 'disabled'],
}
</script>

<style>

</style>