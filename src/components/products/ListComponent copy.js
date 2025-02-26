import React, { useEffect, useState } from "react"; 
import { getList } from "../../api/productApi"; 
import useCustomMove from "../../hooks/useCustomMove"; 
import PageComponent from "../common/PageComponent";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomLogin from "../../hooks/useCustomLogin";

const host = API_SERVER_HOST;


const initState = {
  dtoList: [], 
  pageNumList: [], 
  pageRequestDTO: null,
  prev: false, 
  next: false, 
  totalCount: 0, 
  prevPage: 0, 
  nextPage: 0, 
  totalPage: 0, 
  current: 0, 
};


const ListComponent = () => {

  const {exceptionHandle} = useCustomLogin()

  const { page, size, refresh, moveToList, moveToRead } = useCustomMove(); 

  console.log("현재 페이지 정보 - page:", page, "size:", size); 


  const [serverData, setServerData] = useState(initState);

  const [fetching, setFetching] = useState(false);
 
  useEffect(() => {
    setFetching(true);
    getList({ page, size }) 
      .then((data) => {
        console.log("서버에서 받은 데이터:", data); 

        if (!data || !Array.isArray(data.dtoList)) {
          console.error("서버 데이터 오류 - 배열x:", data);
          setFetching(false);
          return;
        }

        setServerData(data);
        setFetching(false);
      })
      .catch((err) => {
        exceptionHandle(err)
      });
  }, [page, size, refresh]); 


  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">

      <div className="flex flex-wrap mx-auto justify-center p-6">

        {serverData.dtoList.map((i) => {
          console.log("리스트에서 pno 확인:", i); 

          return (
            <div
              key={i.pno}
              className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
              onClick={() => {
                console.log("moveToRead 호출 pno:", i.pno); 
                moveToRead(i.pno);
              }}
            >
              <div className="flex flex-col h-full">
                <div className="font-extrabold text-2xl p-2 w-full">
                  {i.pno}{" "}
                </div>
                <div className="text-1xl m-1 p-2 w-full flex flex-col">
                  <div className="w-full overflow-hidden">
                    <img
                      alt="product"
                      className="m-auto rounded-md w-60"
                      src={`${host}/api/products/view/s_${i.uploadFileNames[0]}`}
                    />
                  </div>
                  <div className="bottom-0 font-extrabold bg-white">
                    <div className="text-center p-1">이름 : {i.pname}</div>
                  </div>
                  <div className="bottom-0 font-extrabold bg-white">
                    <div className="text-center p-1">가격 : {i.price}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
};

export default ListComponent;
