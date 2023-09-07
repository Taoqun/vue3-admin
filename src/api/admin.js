import { initApi } from "./index";

const list = [
  {
    name: "getAdminList",
    url: "/api/admin/user/list",
  },
  {
    name: "getAdminDetail",
    url: "/api/admin/user/info",
  },
];

const ObjApi = initApi({}, list);

export default ObjApi;
