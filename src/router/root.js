import { lazy, Suspense } from "react";
import todoRouter from "./todoRouter";
import productRouter from "./productRouter";

const { createBrowserRouter } = require("react-router-dom");

const Loading = <div>Loading</div>;
const Main = lazy(() => import("../pages/MainPage"));
const About = lazy(() => import("../pages/AboutPage"));
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"));
const ProductsIndex = lazy(() => import("../pages/products/IndexPage"));

const GreenIndex = lazy(() => import("../pages/green/IndexPage"));
const GreenList = lazy(() => import("../pages/green/ListPage"));



const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },

  {
    path: "about",
    element: (
      <Suspense fallback={Loading}>
        <About />
      </Suspense>
    ),
  },

  {
    path: "todo",
    element: (
      <Suspense fallback={Loading}>
        <TodoIndex />
      </Suspense>
    ),
    children: todoRouter(),
  },

  {
    path: "green",
    element: (
      <Suspense fallback={Loading}>
        <GreenIndex />
      </Suspense>
    ),
    children: [
      {
        path: "list",
        element: (
          <Suspense fallback={Loading}>
            {" "}
            <GreenList />{" "}
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "products",
    element: (
      <Suspense fallback={Loading}>
        <ProductsIndex />
      </Suspense>
    ),
    children: productRouter(),
  },
]);
export default root;

// import { lazy, Suspense } from "react"; // 📌 React의 lazy 로딩과 Suspense를 가져옴
// import BackendConnection from "../pages/BackendConnection"; // 📌 직접 import한 페이지

// const { createBrowserRouter } = require("react-router-dom"); // 📌 React Router의 createBrowserRouter 가져오기

// // 📌 로딩 중에 보여줄 UI (로딩 표시)
// const Loading = <div> Loading....</div>;

// // 📌 페이지 컴포넌트를 lazy 로딩 방식으로 불러옴 (필요할 때만 가져옴)
// const Main = lazy(() => import("../pages/MainPage")); // MainPage를 필요할 때 로드
// const About = lazy(() => import("../pages/AboutPage")); // AboutPage를 필요할 때 로드

// // 📌 라우터 설정 (createBrowserRouter를 사용해 경로와 컴포넌트를 연결)
// const root = createBrowserRouter([
//   {
//     path: "", // 📌 기본 경로 ('/')
//     element: (
//       <Suspense fallback={Loading}>
//         <Main />{" "}
//         {/* 📌 MainPage 컴포넌트 렌더링 (로딩 중에는 Loading UI 표시) */}
//       </Suspense>
//     ),
//   },

//   {
//     path: "about", // 📌 '/about' 경로 설정
//     element: (
//       <Suspense fallback={Loading}>
//         <BackendConnection /> {/* 📌 BackendConnection 페이지 렌더링 */}
//       </Suspense>
//     ),
//   },
// ]);

// export default root; // 📌 설정된 라우터 내보내기
