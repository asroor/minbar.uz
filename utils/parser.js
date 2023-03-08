export function getUrlVars(paramsUrl) {
  const vars = {};
  // eslint-disable-next-line no-unused-vars
  const t = (paramsUrl || "").replace(
    /[?|#&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    }
  );
  return vars;
}
