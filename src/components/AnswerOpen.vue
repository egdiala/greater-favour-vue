<template>
  <div>
      <div class="note-grid">
        <div class="note-single" v-for="(ans, a) in sortAns" :key="a">
            <div class="note-card note-work">
                <div class="card border-0">
                    <div class="card-body">
                        <p class="note-excerpt">{{ans}}</p>
                        <div class="note-action">
                            <div class="note-action__left">
                                <a href="" @click.prevent="editOpen(ans)" class="" data-toggle="modal" data-target="#addOptions"> <i class="las la-pen"></i> </a>
                            </div>        
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    props: ['answers', 'changeAns'],
    computed: {
        sortAns() {
            return this.answers.split(',')
        }
    },
    methods: {
        editOpen(ans) {
            setTimeout(() => {
                this.changeAns(ans);
            }, 200);
        }
    }
}
</script>

<style>

</style>