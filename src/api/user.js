import { initApi } from "./index";

const list = [
  {
    name: "login",
    url: "/api/admin/user/login",
    type: "post",
  },
  {
    name: "logout",
    url: "/api/admin/user/loginOut",
    type: "post",
  },
  {
    name: "validateCode",
    url: "/api/admin/user/validateCode",
    type: "get",
  },
  {
    name: "getUserInfo",
    url: "/api/admin/user/info",
  },
  {
    name: "updateUserInfo",
    url: "/api/admin/user/update",
    type: "post",
  },
  {
    name: "getUserList",
    url: "/api/admin/user/list",
  },
];

const ObjApi = initApi({}, list);

export default ObjApi;
