import React, { useState } from "react";
import { login, loginPostAsync } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
  email: "",
  pw: "",
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });

  const { doLogin, moveToPath } = useCustomLogin();

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;

    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = (e) => {
    // dispatch(login(loginParam)) //동기화된 호출
    // 비동기 호출
    doLogin(loginParam) // loginSlice의 비동기 호출
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert("이메일 비밀번호도 제대로 못침?");
        } else {
          alert("어 어서오고");
          moveToPath("/"); // 뒤로 가기 했을때 로그인 화면을 볼수 없게
        }
      });
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">
          LoginComponent
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold">Email</div>
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            name="email"
            type={"text"}
            value={loginParam.email}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold">Password</div>
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            name="pw"
            type={"password"}
            value={loginParam.pw}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full justify-center">
          <div className="w-2/5 p-6 flex justify-center font-bold">
            <button
              className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
              onClick={handleClickLogin}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
