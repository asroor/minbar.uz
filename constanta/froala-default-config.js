const UNLICENSED_COPY_TEXT =
  "Unlicensed copy of the Froala Editor. Use it legally by purchasing a license.";

export default function () {
  return {
    events: {
      initialized() {
        const frWrapper = document.querySelector(".fr-wrapper");

        if (Array.from(frWrapper)) {
          const childNodes = Array.from(frWrapper.childNodes) || [];
          childNodes.forEach((item) => {
            if (item.innerText === UNLICENSED_COPY_TEXT) {
              item.outerHTML = null;
            }
          });
        }
      },
    },

    placeholderText: "",
    height: "150px",

    pluginsEnabled: [
      "align",
      "fontSize",
      "colors",
      "fontFamily",
      "link",
      "quote",
      "table",
      "lineHeight",
      "emoticons",
      "lists",
      "specialCharacters",
    ],
    language: "ru",
    listAdvancedTypes: true,

    toolbarButtons: {
      // name for block of buttons
      moreText: {
        // buttons you need on this block
        buttons: [
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "fontFamily",
          "fontSize",
          "textColor",
          "backgroundColor",
          "clearFormatting",
          "quote",
          "specialCharacters",
        ],
        align: "left",
        buttonsVisible: 3,
      },
      moreParagraph: {
        buttons: [
          "alignLeft",
          "alignCenter",
          "formatOLSimple",
          "alignRight",
          "alignJustify",
          "formatUL",
          "paragraphFormat",
          "lineHeight",
          "outdent",
          "indent",
          "link",
          "table",
        ],
        align: "left",
        buttonsVisible: 3,
      },
      moreRich: {
        buttons: [
          "insertLink",
          "insertImage",
          "insertVideo",
          "insertTable",
          "emoticons",
          "lists",
          "formatOL",
          "formatUL",
        ],
        align: "left",
        buttonsVisible: 6,
      },
    },
  };
}
