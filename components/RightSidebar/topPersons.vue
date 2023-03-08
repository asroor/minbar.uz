<template>
  <div class="box p-4 pb-6">
    <p>
      <strong class="block font-medium text-lg text-gray-600"
        >Mashur shaxslar</strong
      >
    </p>

    <hr class="-mx-4 my-4 border-t" />

    <ul class="flex flex-wrap -mx-4 md:-mx-0 md:block space-y-4 mb-6">
      <li
        v-for="(person, i) in personList"
        :key="i"
        class="flex items-center space-x-3 w-full sm:w-6/12 md:w-full px-4 mt-4 md:px-0 md:pt-0 group clickable-block hover:cursor-pointer"
      >
        <img
          :src="person.picture || avatarPerson"
          :alt="person.name"
          class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-top"
        />
        <p class="leading-tight">
          <strong class="block font-medium text-gray-600 text-sm"
            ><nuxt-link
              :to="
                localePath({
                  name: 'author-slug',
                  params: {
                    slug: person.slug,
                  },
                })
              "
              class="group-hover:underline"
              >{{ person.name }}</nuxt-link
            ></strong
          ><span class="text-sm text-gray-400"
            >{{ person.followers_count }} obunachi</span
          >
        </p>
      </li>
    </ul>

    <p>
      <a href="#" class="text-blue-500 text-sm underline hover:no-underline"
        >Barchasini ko'rish</a
      >
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import avatarPerson from "@/assets/images/avatar-person.svg";
export default {
  name: "TopPersons",
  data() {
    return {
      avatarPerson,
    };
  },
  computed: {
    ...mapState({
      personList: (state) => state.person.people,
    }),
  },
};
</script>
