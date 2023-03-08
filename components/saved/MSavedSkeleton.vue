<template>
  <li class="pb-12">
    <div role="status" class="rounded animate-pulse">
      <div
        class="h-8 bg-gray-200 rounded-full w-2 float-right mt-2 dark:bg-gray-700 mb-2.5"
      ></div>
      <div class="flex items-center space-x-3 mb-4">
        <svg
          class="w-14 h-14 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <div>
          <div
            class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-80 mb-2"
          ></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div>
      <div
        class="h-5 bg-gray-200 rounded-full w-5/6 dark:bg-gray-700 mt-7 mb-4"
      ></div>
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <span class="sr-only">Loading...</span>
      <div
        class="h-6 bg-gray-200 rounded-full w-32 mt-6 dark:bg-gray-700 mb-2.5"
      ></div>
    </div>
  </li>
</template>
