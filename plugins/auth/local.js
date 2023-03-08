const name = "local";
const url = "/users/profile/";

function getStrategyFields(params) {
  const { access_token } = params;
  return { access_token };
}

// function fetch({ token, refreshToken, $app }) {
//   return axios
//     .get(url, {
//       headers: {
//         Authorization: token,
//       },
//     })
//     .then((res) => {
//       return {
//         access_token: token,
//         refresh_token: refreshToken,
//       };
//     });
// }

export default {
  name,
  url,
  getStrategyFields,
};
