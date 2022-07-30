import React, { useEffect, useState } from "react";
import axios from "axios";
import { render, fireEvent, waitFor } from "@testing-library/react";
import User from "../../models/User";
import MockAdapter from "axios-mock-adapter";

// api 서버를 가짜 데이터를 만들어 테스트하는 mocking 테스트 예시/
// api server 테스트가 아님
// const mock = new MockAdapter(axios);

// const Users = () => {
//   const [userInfo, setUserInfo] = useState(null);
//   useEffect(() => {
//     axios.get("/api/user/62e4d415a0c264729ff122ad").then((res) => {
//       setUserInfo(res.data);
//       console.log(res.data);
//     });
//   }, []);
//   return <div>test</div>;
// };

// const setup = () => {
//   const user = new User();
//   user.set("_id", "62e4d415a0c264729ff122ad");
//   user.set("nickName", "kimson");
//   user.set("email", "kimson@naver.com");
//   user.set("password", "123123qQ!");
//   user.set("profileImg", "");
//   user.set("phone", "010-5050-2020");
//   user.set("isFaceSign", false);
//   user.set("terms", false);
//   user.set("regdate", 1659166657347);
//   user.set("updates", 1659166657347);
//   user.set("_class", undefined);

//   mock.onGet("/api/user/62e4d415a0c264729ff122ad").reply(200, user);
//   const utils = render(<Users />);
//   return { utils };
// };

// describe("인증 API 테스트", () => {
//   test("user find by id pathVariable test", async () => {
//     const { utils } = setup();
//     await waitFor(() => expect(utils.getByText("test")).toBeTruthy());
//   });
// });