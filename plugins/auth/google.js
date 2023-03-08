const name = "google";
const url = `/users/social-auth/${name}/`;

function getStrategyFields(params) {
  const { access_token } = params;
  return { access_token };
}

export default {
  name,
  url,
  getStrategyFields,
};
