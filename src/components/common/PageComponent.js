import React from "react"; // React를 가져옴

// 페이지네이션 컴포넌트 정의
// serverData: 현재 페이지네이션 상태 정보
// movePage: 페이지를 변경하는 함수
const PageComponent = ({ serverData, movePage }) => {
  return (
    <div className="m-6 flex justify-center">
      {/* 이전 페이지 버튼 (prev가 true일 때만 렌더링) */}
      {serverData.prev ? (
        <div
          className="m-2 p-2 w-1/6 text-center font-bold to-blue-400 cursor-pointer"
          onClick={() => movePage({ page: serverData.prevPage })} // 이전 페이지로 이동
        >
          이전
        </div>
      ) : (
        <></> // prev가 false면 아무것도 렌더링하지 않음
      )}

      {/* 페이지 번호 리스트 출력 */}
      {serverData.pageNumList.map((pageNum) => (
        <div
          key={pageNum} // React에서 리스트 렌더링 시 key 필수
          className={`m-2 p-2 w-12 text-center rounded shadow-md text-white cursor-pointer
                ${
                  serverData.current === pageNum ? "bg-gray-500" : "bg-blue-400"
                }`} // 현재 페이지면 회색(bg-gray-500), 아니면 파란색(bg-blue-400)
          onClick={() => movePage({ page: pageNum })} // 해당 페이지로 이동
        >
          {pageNum} {/* 페이지 번호 표시 */}
        </div>
      ))}

      {/* 다음 페이지 버튼 (next가 true일 때만 렌더링) */}
      {serverData.next ? (
        <div
          className="m-2 p-2 w-1/6 text-center font-bold to-blue-400 cursor-pointer"
          onClick={() => movePage({ page: serverData.nextPage })} // 다음 페이지로 이동
        >
          다음
        </div>
      ) : (
        <></> // next가 false면 아무것도 렌더링하지 않음
      )}
    </div>
  );
};

export default PageComponent; // 컴포넌트를 외부에서 사용할 수 있도록 export
