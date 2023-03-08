export default function (str) {
  return str?.replace(/( )/gi, "-")?.replace(/[^a-zA-Z0-9\\-]/gi, "") || "";
}
