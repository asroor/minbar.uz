<script>
import MRuknlar from "~/components/layout/MRuknlar";
import Poll from "~/components/layout/RightSidebar.vue";
import FollowersCard from "~/components/followers/card.vue";

function fetchData({ store, query }) {
  const { page, limit = 10, ordering, categories } = query;
  return store.dispatch("followers/GET_ALL", {
    limit,
    ordering,
    page,
    categories,
  });
}

export default {
  components: {
    FollowersCard,
    MRuknlar,
    Poll,
  },
  fetch({ store, query }) {
    return fetchData({ store, query });
  },
  computed: {
    users() {
      return this.$store.getters["followers/getUsers"];
    },
    organizations() {
      return this.$store.getters["followers/getOrganizations"];
    },
  },
};
</script>
<template>
  <div>
    <div class="container mx-auto">
      <div class="flex flex-wrap -mx-3">
        <MRuknlar />
        <div class="content w-full md:w-8/12 lg:w-7/12 px-3 pb-6">
          <div class="space-y-4 sm:space-y-6">
            <FollowersCard
              :count="users.length"
              title="Shaxslar"
              :items="users"
            />
            <FollowersCard
              :count="organizations.length"
              title="Tashkilotlar"
              type="organization"
              :items="organizations"
            />
          </div>
        </div>
        <Poll />
      </div>
    </div>
  </div>
</template>
