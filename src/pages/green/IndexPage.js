import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { Outlet } from "react-router-dom";

const IndexPage = () => {
  return (
    <BasicLayout>
      <div className="w-full flex m-2 p-2">
      <div className="text-xl m-1 p-2 w-20 font-extrabold text-center underline">LIST</div>
      </div>
      <div className="flex flex-wrap w-full">
        <Outlet/>
      </div>
    </BasicLayout>
  );
};

export default IndexPage;
