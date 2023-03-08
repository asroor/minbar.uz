<template>
  <div
    class="flex items-center space-x-3 group clickable-block hover:cursor-pointer"
  >
    <img
      v-if="picture"
      :src="picture"
      :alt="name"
      class="w-16 h-16 rounded-full flex-shrink-0 object-cover object-top"
    />
    <span
      v-else
      class="bg-gray-100 rounded-full w-16 h-16 flex-shrink-0"
    ></span>
    <p>
      <nuxt-link
        :to="
          localePath({
            name: 'author-slug',
            params: {
              slug: slug,
            },
          })
        "
        class="block font-medium text-gray-600 group-hover:underline"
        >{{ name ? name : "Isimsiz Foydalanuvchi" }}</nuxt-link
      ><span v-if="item" class="text-sm text-gray-400"
        >{{ item }} {{ type === "user" ? "" : " obunachi" }}</span
      >
    </p>
  </div>
</template>
<script>
export default {
  name: "FollowersItem",
  props: {
    picture: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    item: {
      type: [String, Number],
      default: null,
    },
    type: {
      type: String,
      default: "user",
      validator(value) {
        return ["user", "organization"].includes(value);
      },
    },
    slug: {
      type: String,
      default: null,
    },
  },
};
</script>
