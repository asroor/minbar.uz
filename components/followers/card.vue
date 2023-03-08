<template>
  <div class="box relative">
    <p class="flex items-center space-x-3 text-gray-600">
      <UsersIcon v-if="type === 'user'" />
      <OrganizationIcon v-else />

      <span class="font-medium text-lg text-gray-600"
        >{{ title }}
        <span class="italic font-serif text-sm text-gray-500"
          >({{ count }} nafar)</span
        ></span
      >
    </p>

    <hr class="border-t mt-3 mb-6" />

    <div class="flex flex-wrap -mx-3 mb-3">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="w-full md:w-6/12 px-3 border-b md:border-b-0 pb-3 mb-3"
      >
        <FollowersItem
          :picture="item.picture"
          :name="item.name"
          :item="item.item"
          :type="type"
          :slug="item.slug"
        />
      </div>
    </div>

    <div class="flex justify-center">
      <a
        href="#"
        class="px-3 py-2 border border-blue-500 border-opacity-50 text-blue-500 text-xs tracking-wider uppercase rounded mt-auto opacity-80 hover:opacity-100 hover:text-white hover:border-opacity-100 hover:bg-blue-500 transition"
        >Barchasini ko'rish</a
      >
    </div>
  </div>
</template>
<script>
import UsersIcon from "~/components/icons/main-layout/UsersIcon.vue";
import OrganizationIcon from "~/components/icons/main-layout/OrganizationIcon.vue";
import FollowersItem from "~/components/followers/item.vue";

export default {
  name: "FollowersCard",
  components: { FollowersItem, OrganizationIcon, UsersIcon },
  props: {
    type: {
      type: String,
      default: "user",
      validator(value) {
        return ["user", "organization"].includes(value);
      },
    },
    title: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      icon: "dasd",
    };
  },
};
</script>
