<template>
  <div class="container mx-auto">
    <div class="flex flex-wrap -mx-3">
      <MRuknlar />
      <div class="content w-full md:w-8/12 lg:w-7/12 px-3 pb-6">
        <MDetail></MDetail>
      </div>
    </div>
  </div>
</template>
<script>
import MRuknlar from "~/components/layout/MRuknlar";
import MDetail from "~/components/post/MDetail.vue";

export default {
  components: { MRuknlar, MDetail },
  fetch({ store, params }) {
    if (!params.id) return;
    return store.dispatch("post/FetchPostDetail", params.id);
  },
  created() {
    this.$store.dispatch("post/FetchComments", this.$route.params.id);
  },
  beforeDestroy() {
    this.$store.commit("post/SET_POST_DETAIL", null);
  },
};
</script>
