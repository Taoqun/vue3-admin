import Mock, { mock, Random } from "mockjs";

mock("/api/admin/user/login", {
  status: 1,
  message: "登陆成功",
});

mock("/api/admin/user/loginOut", {
  status: 1,
  message: "注销成功",
});

mock("/api/admin/user/validateCode", {
  data: Random.dataImage("60*20", "1234"),
});

mock("/api/admin/user/info", {
  status: 1,
  message: "success",
  data: {
    Id: Random.integer(1, 100),
    name: Random.cname(),
    age: 22,
  },
});

mock("/api/admin/user/list", () => {
  const userList = [];

  for (let i = 0; i < 20; i++) {
    const name = Random.cname();

    userList.push({
      id: i,
      name: name,
      mobile: Random.natural(10000000000, 19999999999),
      county: Random.county(),
      province: Random.province(),
      city: Random.city(),
      avatar: Random.dataImage("180x180", name),
      IsDisable: Random.boolean(),
    });
  }

  return {
    status: 1,
    message: "",
    data: {
      list: userList,
      pageIndex: 1,
      pageSize: 20,
      total: 20,
    },
  };
});
