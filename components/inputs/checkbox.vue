<template>
  <label
    for=""
    class="c-checkbox items-start cursor-pointer"
    @click="$emit('input', !value)"
  >
    <input :checked="value" type="checkbox" />
    <span class="c-checkbox__icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8.16">
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
    <span class="c-checkbox__title not-italic !text-gray-600">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "input",
  },

  props: {
    value: {
      type: [Boolean, String, Number],
    },
  },
};
</script>
