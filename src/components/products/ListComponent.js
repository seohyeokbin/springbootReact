import React, { useEffect, useState } from "react"; // 리액트에서 useEffect와 useState를 불러옴
import { getList } from "../../api/productApi"; // API 호출을 위한 getList 함수 불러옴
import useCustomMove from "../../hooks/useCustomMove"; // 커스텀 훅을 불러와서 페이지네이션 관련 데이터(page, size)를 가져옴
import PageComponent from "../common/PageComponent";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomLogin from "../../hooks/useCustomLogin";

const host = API_SERVER_HOST;

// 초기 상태 값 설정
const initState = {
  dtoList: [], // 서버에서 받아올 데이터 리스트 (초기값은 빈 배열)
  pageNumList: [], // 페이지 번호 리스트
  pageRequestDTO: null, // 요청 정보를 담을 객체 (nullable)
  prev: false, // 이전 페이지 존재 여부 (초기값은 false)
  next: false, // 다음 페이지 존재 여부 (초기값은 false)]
  totalCount: 0, // 전체 데이터 개수 (초기값은 0)
  prevPage: 0, // 이전 페이지 번호 (초기값은 0)
  nextPage: 0, // 다음 페이지 번호 (초기값은 0)
  totalPage: 0, // 전체 페이지 개수 (초기값은 0)
  current: 0, // 현재 페이지 번호 (초기값은 0)
};

// 리액트 함수형 컴포넌트 정의
const ListComponent = () => {

  const {exceptionHandle} = useCustomLogin()

  const { page, size, refresh, moveToList, moveToRead } = useCustomMove(); // useCustomMove 훅을 사용하여 현재 페이지와 페이지 크기를 가져옴

  console.log("✅ 현재 페이지 정보 - page:", page, "size:", size); // 현재 페이지와 페이지 크기를 콘솔에 출력

  // 서버에서 가져온 데이터를 저장할 상태 변수 설정 (초기값은 initState)
  // serverData는 나중에 사용
  const [serverData, setServerData] = useState(initState);

  //for FetchingModal
  const [fetching, setFetching] = useState(false);

  // 컴포넌트가 처음 렌더링될 때 또는 page, size 값이 변경될 때 실행
  useEffect(() => {
    setFetching(true);
    getList({ page, size }) // getList 함수를 호출하여 서버에서 데이터를 가져옴
      .then((data) => {
        console.log("✅ 서버에서 받은 데이터:", data); // 응답 데이터를 콘솔에 출력

        if (!data || !Array.isArray(data.dtoList)) {
          console.error("❌ 서버 데이터 오류 - dtoList가 배열이 아님:", data);
          setFetching(false);
          return;
        }

        setServerData(data); // 상태를 업데이트하여 화면을 리렌더링
        setFetching(false);
      })
      .catch((err) => {
        exceptionHandle(err)
      });
  }, [page, size, refresh]); // page 또는 size 값이 변경될 때마다 useEffect 실행

  // 컴포넌트의 렌더링 부분
  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      {/* 전체 컨테이너 div: 테두리와 간격을 설정 */}
      <div className="flex flex-wrap mx-auto justify-center p-6">
        {/* 데이터 리스트를 출력할 영역 (flexbox로 아이템들을 감싸고 정렬) */}
        {serverData.dtoList.map((i) => {
          console.log("🔍 리스트에서 pno 확인:", i); // ✅ pno 값 확인

          return (
            <div
              key={i.pno}
              className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
              onClick={() => {
                console.log("🟢 moveToRead 호출 - pno:", i.pno); // ✅ 이동 전에 pno 값 확인
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
