import Vue from "vue";
// Require Froala Editor js file.
// Import and use Vue Froala lib.
import VueFroala from "vue-froala-wysiwyg";

import "froala-editor/js/froala_editor.pkgd.min.js";

// Require Froala Editor css files.
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/plugins/colors.min.css";
import "froala-editor/css/plugins/table.min.css";
import "froala-editor/css/plugins/special_characters.min.css";

require("froala-editor/js/languages/ru"); // lang file for localization
require("froala-editor/js/plugins/align.min.js");
require("froala-editor/js/plugins/font_size.min.js");
require("froala-editor/js/plugins/colors.min.js");
require("froala-editor/js/plugins/font_family.min.js");
require("froala-editor/js/plugins/link.min.js");
require("froala-editor/js/plugins/quote.min.js");
require("froala-editor/js/plugins/table.min.js");
require("froala-editor/js/plugins/line_height.min.js");
require("froala-editor/js/plugins/emoticons.min.js");
// require("froala-editor/js/plugins/markdown.min.js");
require("froala-editor/js/plugins/lists.min.js");
require("froala-editor/js/plugins/special_characters.min.js");

Vue.use(VueFroala);
