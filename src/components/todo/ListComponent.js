import React, { useEffect, useState } from "react"; // 리액트에서 useEffect와 useState를 불러옴
import { getList } from "../../api/todoApi"; // API 호출을 위한 getList 함수 불러옴
import useCustomMove from "../../hooks/useCustomMove"; // 커스텀 훅을 불러와서 페이지네이션 관련 데이터(page, size)를 가져옴
import PageComponent from "../common/PageComponent";

// 초기 상태 값 설정
const initState = {
  dtoList: [], // 서버에서 받아올 데이터 리스트 (초기값은 빈 배열)
  pageNumList: [], // 페이지 번호 리스트
  pageRequestDTO: null, // 요청 정보를 담을 객체 (nullable)
  prev: false, // 이전 페이지 존재 여부 (초기값은 false)
  next: false, // 다음 페이지 존재 여부 (초기값은 false)
  totalCount: 0, // 전체 데이터 개수 (초기값은 0)
  prevPage: 0, // 이전 페이지 번호 (초기값은 0)
  nextPage: 0, // 다음 페이지 번호 (초기값은 0)
  totalPage: 0, // 전체 페이지 개수 (초기값은 0)
  current: 0, // 현재 페이지 번호 (초기값은 0)
};

// 리액트 함수형 컴포넌트 정의
const ListComponent = () => {
  const { page, size, moveToList, moveToRead } = useCustomMove(); // useCustomMove 훅을 사용하여 현재 페이지와 페이지 크기를 가져옴
  console.log("page:", page, "size", size); // 현재 페이지와 페이지 크기를 콘솔에 출력

  // 서버에서 가져온 데이터를 저장할 상태 변수 설정 (초기값은 initState)
  const [serverData, setServerData] = useState(initState);

  // 컴포넌트가 처음 렌더링될 때 또는 page, size 값이 변경될 때 실행
  useEffect(() => {
    getList({ page, size }) // getList 함수를 호출하여 서버에서 데이터를 가져옴
      .then((data) => {
        // 비동기 처리: 데이터가 응답되면 실행
        console.log(data); // 응답 데이터를 콘솔에 출력
        setServerData(data); // 상태를 업데이트하여 화면을 리렌더링
      })
      .catch((error) => {
        console.error("API 요청 실패:", error);
      });
  }, [page, size]); // page 또는 size 값이 변경될 때마다 useEffect 실행

  // 컴포넌트의 렌더링 부분
  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      {/* 전체 컨테이너 div: 테두리와 간격을 설정 */}
      <div className="flex flex-wrap mx-auto justify-center p-6">
        {/* 데이터 리스트를 출력할 영역 (flexbox로 아이템들을 감싸고 정렬) */}
        {serverData.dtoList.map((i) => (
          // serverData.dtoList의 각 항목을 출력
          <div
            key={i.tno}
            className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
            onClick={() => moveToRead(i.tno)}
          >
            {/* 각 항목을 감싸는 div, 최소 너비 400px, 여백(padding, margin), rounded 모서리 */}
            <div className="flex">
              {/* 내부 항목들을 flex로 정렬 */}
              <div className="font-extrabold text-2xl p-2 w-1/12">{i.tno}</div>
              {/* tno(할 일 번호)를 출력 */}
              <div className="font-extrabold text-2xl p-2 w-1/12">
                {i.title}
              </div>
              {/* title(할 일 제목)을 출력 */}
              <div className="font-extrabold text-2xl p-2 w-1/12">
                {i.dueDate}
              </div>
              {/* dueDate(할 일 기한)를 출력 */}
            </div>
          </div>
        ))}
      </div>
      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
    </div>
  );
};

export default ListComponent; // 컴포넌트를 외부에서 사용할 수 있도록 export
