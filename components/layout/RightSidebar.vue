<template>
  <aside class="md:block md:w-4/12 lg:w-3/12 px-3">
    <div class="space-y-4 sm:space-y-6">
      <Poll></Poll>
      <div class="box p-4 pb-6">
        <p>
          <strong class="block font-medium text-lg text-gray-600"
            >Mashhur sahifalar</strong
          >
        </p>

        <hr class="-mx-4 my-4 border-t" />

        <ul class="flex flex-wrap -mx-4 md:-mx-0 md:block space-y-4 mb-6">
          <li
            v-for="(org, i) in orgList"
            :key="i"
            class="flex items-center space-x-3 w-full sm:w-6/12 md:w-full px-4 mt-4 md:px-0 md:pt-0 group hover:cursor-pointer"
          >
            <img
              :src="org.picture"
              class="rounded-full w-12 h-12 flex-shrink-0"
            />
            <p v-if="org" class="leading-tight">
              <strong class="block font-medium text-gray-600 text-sm"
                ><nuxt-link
                  :to="
                    localePath({
                      name: 'author-slug',
                      params: {
                        slug: org.slug,
                      },
                    })
                  "
                  class="group-hover:underline"
                  >{{ org.name || "" }}</nuxt-link
                ></strong
              ><span class="text-sm text-gray-400"
                >{{ org.followers_count }} obunachi</span
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
      <TopPersons></TopPersons>
      <div class="text-sm space-y-3">
        <p class="flex flex-wrap leading-relaxed">
          <a href="#" class="hover:underline">Biz haqimizda</a
          ><span class="mx-1">&middot;</span
          ><a href="#" class="hover:underline">Qoidalar</a
          ><span class="mx-1">&middot;</span
          ><a href="#" class="hover:underline">Biz bilan bog'lanish</a
          ><span class="mx-1">&middot;</span
          ><a href="#" class="hover:underline">Faoliyat</a>
        </p>

        <p>&copy;&nbsp;islom.uz, 2003&mdash;2021</p>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import Poll from "../RightSidebar/poll.vue";
import TopPersons from "../RightSidebar/topPersons.vue";

export default {
  components: { Poll, TopPersons },
  computed: {
    ...mapState({
      orgList: (state) => state.person.organizations.results || [],
    }),
  },
};
</script>
