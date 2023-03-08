<template>
  <ckeditor
    :editor="editor"
    :value="value"
    :config="config"
    :tag-name="tagName"
    :disabled="disabled"
    @input="(event) => $emit('input', event)"
  />
</template>
<script>
let ClassicEditor;
let CKEditor;

if (process.client) {
  require("@ckeditor/ckeditor5-build-classic/build/translations/ar");
  require("@ckeditor/ckeditor5-build-classic/build/translations/uz");
  const Alignment = require("@ckeditor/ckeditor5-alignment/src/alignment");

  ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
  CKEditor = require("@ckeditor/ckeditor5-vue2");
  // ClassicEditor.builtinPlugins = [Alignment];

  // console.log(ClassicEditor.defaultConfig.toolbar);
  // console.log("Alignment", Alignment);
  // console.log(
  //   "ClassicEditor.builtinPlugins",
  ClassicEditor.builtinPlugins.push(Alignment);
  // );
} else {
  CKEditor = { component: { template: "<div></div>" } };
}

export default {
  components: {
    ckeditor: CKEditor.component,
  },
  props: {
    value: {
      type: String,
      required: false,
    },
    tagName: {
      type: String,
      required: false,
      default: "div",
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    uploadUrl: {
      type: String,
      required: false,
    },
    config: {
      type: Object,
      required: false,
      default() {},
    },
  },
  data() {
    return {
      editor: ClassicEditor,
    };
  },
};
</script>
