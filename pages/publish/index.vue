<template>
  <div class="container mx-auto">
    <div class="flex flex-wrap -mx-3">
      <MRuknlar class="md:w-2/12" />

      <div class="content w-full lg:w-10/12 px-3 pb-6">
        <div class="box">
          <div class="mb-4 w-full bg-[#fafafa] p-3">
            <svg
              v-show="!imageFile"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-full h-80"
              @click="$refs.imageRef.click()"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                style="stroke-width: 1px; stroke: #ccc"
              />
            </svg>

            <img
              v-if="imageToBlob"
              class="w-full max-w-[603px] max-h-96 object-cover mx-auto"
              :src="imageToBlob"
              alt=""
            />

            <button
              class="p-3 my-3 flex space-x-2 items-center justify-center text-blue-500 border border-blue-400 rounded hover:bg-blue-500 hover:border-transparent hover:text-white transition duration-300 mx-auto"
              @click="$refs.imageRef.click()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              Rasm tanlash
            </button>
            <input
              ref="imageRef"
              type="file"
              hidden
              accept="image/jpeg, image/png"
              @change="onImageInputChange"
            />
          </div>

          <div class="my-4">
            <MCheckbox v-model="postForm.visible">Maqola statusi</MCheckbox>
          </div>

          <div class="mb-4">
            <MCheckbox v-model="postForm.allow_comments"
              >Izohlarga (komment) ruxsat</MCheckbox
            >
          </div>

          <div class="mb-4">
            <h4 class="mb-2">Muallifni tanlang</h4>
            <Multiselect
              v-model="postAuthor"
              :options="followedPages"
              label="name"
              track-by="id"
              placeholder="Muallifni tanlang"
              selected-label="Tanlangan"
              select-label="Tanlash uchun bosing"
              deselect-label="O'chirish uchun bosing"
              @input="onAuthorSelect"
            />
            <p
              v-show="$v.postForm.author.$dirty && $v.postForm.author.$error"
              class="mt-2 text-red-500 text-sm"
              style="display: none"
            >
              Iltimos, Muallif tanlang
            </p>
          </div>

          <div class="mb-4">
            <h4 class="mb-2">Sarlavha kirilda</h4>
            <input
              id="title_uz_cy"
              v-model="$v.postForm.title_uz_cy.$model"
              class="w-full py-3 px-4 rounded border border-gray-200 transition"
              type="text"
              name="title_uz_cy"
              placeholder="Sarlavha kirilda"
              @input="
                onInputChange({
                  formKey: 'title',
                  value: lotinga($v.postForm.title_uz_cy.$model),
                })
              "
            />

            <p
              v-show="
                $v.postForm.title_uz_cy.$dirty && $v.postForm.title_uz_cy.$error
              "
              class="mt-2 text-red-500 text-sm"
              style="display: none"
            >
              Sarlavha kiritilishi shart!
            </p>
          </div>

          <div class="mb-4">
            <h4 class="mb-2">Sarlavha lotinda</h4>
            <input
              id="title"
              v-model="$v.postForm.title.$model"
              class="w-full py-3 px-4 rounded border border-gray-200 transition"
              type="text"
              name="title"
              placeholder="Sarlavha lotinda"
              @input="updateSlug"
            />
            <p
              v-show="$v.postForm.title.$dirty && $v.postForm.title.$error"
              class="mt-2 text-red-500 text-sm"
              style="display: none"
            >
              Sarlavha kiritilishi shart!
            </p>
          </div>

          <div class="mb-4">
            <h4 class="mb-2">Slug (ЧПУ)</h4>
            <input
              id="title"
              :value="$v.postForm.slug.$model"
              readonly
              class="w-full py-3 px-4 rounded border border-gray-200 transition"
              type="text"
              name="title"
              placeholder="Sarlavha slug ko'rinishida"
            />
          </div>

          <div class="mb-4">
            <h4 class="mb-2">Matn kirilda</h4>
            <client-only>
              <froala
                ref="postTitleCyrilRef"
                v-model="$v.postForm.body_uz_cy.$model"
                :tag="'textarea'"
                :config="config"
                @input="onCyrillBodyInput"
              ></froala>
            </client-only>
            <p
              v-show="
                $v.postForm.body_uz_cy.$dirty && $v.postForm.body_uz_cy.$error
              "
              class="mt-2 text-red-500 text-sm"
              style="display: none"
            >
              Matn kiritilishi shart!
            </p>
          </div>

          <div class="mb-4">
            <h4 class="mb-2">Matn lotinda</h4>
            <client-only>
              <froala
                ref="postTitleLatinRef"
                v-model="$v.postForm.body.$model"
                :tag="'textarea'"
                :config="config"
              ></froala>
            </client-only>
            <p
              v-show="$v.postForm.body.$dirty && $v.postForm.body.$error"
              class="mt-2 text-red-500 text-sm"
              style="display: none"
            >
              Matn kiritilishi shart!
            </p>
          </div>

          <div class="mb-4">
            <h4 class="mb-2">Maqola rukn(lar)i</h4>

            <Multiselect
              v-model="formTempCategories"
              :options="categoryList"
              label="name"
              placeholder="Rukn(lar) tanlang"
              :close-on-select="false"
              track-by="id"
              selected-label="Tanlangan"
              select-label="Tanlash uchun bosing"
              deselect-label="O'chirish uchun bosing"
              multiple
              @input="onCategoryInput"
            />

            <p
              v-show="
                $v.postForm.categories.$dirty && $v.postForm.categories.$error
              "
              class="mt-2 text-red-500 text-sm"
              style="display: none"
            >
              Rukn tanlang!
            </p>
          </div>

          <div class="mt-10">
            <button
              class="w-full p-3 flex space-x-2 items-center justify-center text-blue-500 border border-blue-400 rounded hover:bg-blue-500 hover:border-transparent hover:text-white transition duration-300"
              :disabled="pending"
              :class="[
                {
                  'bg-gray-200 text-black-200 pointer-events-none border-transparent':
                    pending,
                },
              ]"
              @click="onSubmit"
            >
              <div class="flex space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>

                <span>{{ pending ? "Saqlanyapti..." : "Saqlash" }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- <RightSidebar /> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import debounce from "lodash.debounce";
import Multiselect from "vue-multiselect";
import { required } from "vuelidate/lib/validators";
import { lotinga } from "@/plugins/cyril-latin.js";
import stdReplacer from "@/utils/spaces-to-dash-replacer.js";
import defaultFroalConfig from "@/constanta/froala-default-config.js";
import MRuknlar from "~/components/layout/MRuknlar";
import MCheckbox from "@/components/inputs/checkbox.vue";
import defaultAvatar from "@/assets/images/avatar-person.svg";

const defaultPostForm = () => ({
  author: "",
  title: "",
  title_uz_cy: "",
  slug: "",
  body: "",
  body_uz_cy: "",
  categories: [],
  visible: true,
  allow_comments: true,
});

export default {
  validations() {
    return {
      postForm: {
        author: { required },
        title: { required },
        title_uz_cy: { required },
        slug: { required },
        body: { required },
        body_uz_cy: { required },
        categories: { required },
      },
    };
  },

  components: {
    MRuknlar,
    Multiselect,
    MCheckbox,
  },

  data() {
    return {
      defaultAvatar,

      config: defaultFroalConfig(),
      postForm: defaultPostForm(),
      formTempCategories: [],
      pending: false,
      imageFile: null,
      postAuthor: null,
    };
  },

  computed: {
    ...mapState({
      categoryList: (state) => state.category.categories || [],
      followedPages: (state) => state.followedPages?.results || [],
    }),

    imageToBlob() {
      if (!this.imageFile) return "";

      const blob = URL.createObjectURL(this.imageFile);
      return blob;
    },
  },

  mounted() {
    this.fetchFollowedPages();
  },

  methods: {
    lotinga,
    stdReplacer,

    ...mapActions("followedPages", ["fetchFollowedPages"]),

    onAuthorSelect() {
      this.postForm.author = this.postAuthor?.id;
    },

    onCyrillBodyInput: debounce(function () {
      const editorInnerHTML = this.$refs.postTitleCyrilRef
        .getEditor()
        .html.get();

      const cyrillToLatin = lotinga(editorInnerHTML);
      this.$refs.postTitleLatinRef.getEditor().html.set(cyrillToLatin);

      this.onInputChange({
        formKey: "body",
        value: cyrillToLatin,
      });
    }, 400),

    onSubmit() {
      this.$v.postForm.$touch();
      if (this.$v.postForm.$error) {
        return this.$store.commit("Toast", {
          visible: true,
          text: "Majburiy joylarni to'ldiring",
          type: "error",
        });
      }

      if (!this.imageFile) {
        return this.$store.commit("Toast", {
          visible: true,
          text: "Rasm tanlang",
          type: "error",
        });
      }

      const f = new FormData();
      const { categories, ...form } = this.postForm;
      Object.keys(form).forEach((key) => {
        f.append(key, this.postForm[key]);
      });
      f.append("categories", `${categories?.join?.(",")}`);
      f.append("image", this.imageFile);

      this.pending = true;

      this.$axios
        .post("/pages/posts/", f)
        .then(() => {
          this.pending = false;
          this.formTempCategories = [];
          this.postForm = defaultPostForm();
          this.imageFile = null;
          // console.log("res", res);
          this.$store.commit("Toast", {
            visible: true,
            text: "Maqola tekshirish uchun jo'natildi",
            type: "success",
          });

          this.$nextTick(() => {
            this.$v.postForm.$reset();
          });
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("Toast", {
            visible: true,
            text: "Maqolani jo'natishda xato yuz berdi",
            type: "error",
          });
        });
    },

    onInputChange: debounce(function ({ formKey, value }) {
      this.postForm[formKey] = value;
      if (["title", "title_uz_cy"].includes(formKey)) {
        this.updateSlug();
      }
    }, 400),

    updateSlug: debounce(function () {
      this.postForm.slug = stdReplacer(this.postForm?.title)?.toLowerCase?.();
    }, 400),

    onCategoryInput() {
      this.postForm.categories = this.formTempCategories.map((item) => item.id);
    },

    onImageInputChange(e) {
      const file = e.target?.files?.[0];
      this.imageFile = file;

      e.target.value = null;
    },
  },
};
</script>

<!-- <style lang="scss" scoped></style> -->
