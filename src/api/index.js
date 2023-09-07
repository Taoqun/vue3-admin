import axios from "axios";

export async function post(url = "", params = {}, config = {}) {
  const res = await axios
    .post(url, params, config)
    .catch(() => ({ data: { status: 0 } }));
  return res.data;
}

export async function get(url = "", params = {}, config = {}) {
  const res = await axios
    .get(url, {
      params: params,
      config,
    })
    .catch(() => ({ data: { status: 0 } }));

  return res.data;
}

export function initApi(apiObj = {}, list) {
  for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i];
    apiObj[item.name] = (data = {}, config = {}) => {
      return `${item.type}`.toLowerCase() === "post"
        ? post(item.url, data, config)
        : get(item.url, data, config);
    };
  }
  return apiObj;
}

export default {
  post,
  get,
};
