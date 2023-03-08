// Configuration
const COUNT_FORMATS = [
  {
    // 0 - 999
    letter: "",
    limit: 1e3,
  },
  {
    // 1,000 - 999,999
    letter: "K",
    limit: 1e6,
  },
  {
    // 1,000,000 - 999,999,999
    letter: "M",
    limit: 1e9,
  },
  {
    // 1,000,000,000 - 999,999,999,999
    letter: "B",
    limit: 1e12,
  },
  {
    // 1,000,000,000,000 - 999,999,999,999,999
    letter: "T",
    limit: 1e15,
  },
];

// Format Method:
function formatCount(value) {
  if (!value) return 0;

  const format = COUNT_FORMATS.find((format) => value < format.limit);
  const formatted = { value: (1000 * value) / format.limit };
  formatted.value = Math.round(formatted.value * 10) / 10; // keep one decimal number, only if needed

  return (formatted.value || 0) + format.letter;
}

export { formatCount };
// Test:
// const test = [274, 1683, 56512, 523491, 9523489, 5729532709, 9421032489032];
// test.forEach((value) => console.log(`${value} >>> ${formatCount(value)}`));
