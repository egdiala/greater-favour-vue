<template>
  <div class="row mb-5">
      <div class="col-12">
        <div class="mb-4 card no-content text-center">
          <img :src="imageUrl || '/img/custom/puppy-no-content.png'" width="200" style="margin:auto"> <br>
          <h3> {{title || 'Oops!'}} </h3>
          <h6> {{ subTitle|| 'No content here ...'}} </h6> <br>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props:['title', 'subTitle', 'imageUrl']
}
</script>

<style>

</style>