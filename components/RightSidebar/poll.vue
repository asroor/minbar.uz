<template>
  <div class="box p-4">
    <p>
      <strong class="block font-medium text-lg text-gray-600"
        >Siz bilasizmi?</strong
      >
    </p>
    <hr class="-mx-4 my-4 border-t" />
    <div class="font-serif italic space-y-4">
      <p>{{ onePollItem.title }}</p>
      <form @submit.prevent="PollCheck()">
        <div class="poll">
          <div v-show="isPoll === 'questions'" class="poll-questions space-y-4">
            <label
              v-for="(choice, i) in onePollItem.choices"
              :key="choice.id"
              :for="i"
              class="c-radio items-start cursor-pointer"
            >
              <input
                :id="i"
                v-model="selected"
                :value="choice"
                type="radio"
                name="question-1"
              />
              <span class="c-radio__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="8.16"
                >
                  <g id="check-icon" transform="translate(-508 -397.92)">
                    <path
                      id="Path_28"
                      data-name="Path 28"
                      d="M17.309 7.651a.72.72 0 010 1.018l-6.72 6.72a.72.72 0 01-1.018 0l-3.84-3.84a.72.72 0 111.018-1.018l3.331 3.331 6.211-6.211a.72.72 0 011.018 0z"
                      transform="translate(502.48 390.48)"
                      fill="#fff"
                      fill-rule="evenodd"
                    ></path>
                  </g>
                </svg>
              </span>
              <span class="c-radio__title not-italic">{{ choice.answer }}</span>
            </label>
          </div>
          <div
            v-if="isPoll === 'answers'"
            x-transition:enter="transition ease-out duration-200"
            x-transition:enter-start="opacity-0 translate-x-5"
            x-transition:enter-end="opacity-100 translate-x-0"
            class="poll-results"
          >
            <div class="space-y-2 not-italic">
              <div
                v-for="(choice, i) in isAnswer.choices"
                :key="i"
                class="flex space-x-2"
              >
                <div class="flex flex-col">
                  <span class="min-w-[2rem] font-sans text-sm mt-1"
                    >{{ choice.percent }}%</span
                  >
                  <svg
                    v-show="choice.is_correct"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    v-show="!choice.is_correct && selected.id === choice.id"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-accent"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="flex flex-col flex-grow space-y-1">
                  <span>{{ choice.answer }} </span>
                  <span
                    :style="`width: ${choice.percent}%`"
                    :class="{
                      'bg-accent':
                        !choice.is_correct && selected.id === choice.id,
                    }"
                    class="bg-blue-500 w-auto h-[5px] rounded-full"
                  >
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            v-show="isPoll === `questions`"
            type="submit"
            class="font-sans w-full px-2 py-1 mt-[2rem!important] border border-blue-500 text-blue-500 rounded hover:text-white hover:bg-blue-500 transition"
          >
            Javob berish
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Polls",
  data() {
    return {
      isPoll: "questions",
      selected: null,
      isAnswer: null,
    };
  },
  computed: {
    ...mapState({
      onePollItem: (state) => state.polls.polls.results?.[0] || {},
    }),
    // pollVotes() {
    //   return Array.from(this.poll.choices)
    //     .map((x) => x.votes)
    //     .reduce((acc, item) => {
    //       return (acc += item);
    //     }, 0);
    // },
  },
  methods: {
    PollCheck() {
      if (this.selected !== null)
        this.$store
          .dispatch("polls/PollCheck", {
            id: this.poll.id,
            choice_id: this.selected.id,
          })
          .then((res) => {
            // console.log(res);
            this.isPoll = "answers";
            this.isAnswer = res;
          })
          .catch((error) => {
            console.log(error);
            this.isPoll = "answers";
          });
    },
  },
};
</script>
