import React from "react";

const ResultModal = ({ title, content, callbackFn, v}) => {
  // title: 모달의 제목
  // content: 모달 내용
  // callbackFn: 모달이 닫힐 때 실행할 콜백 함수
  // v: 함수 형태의 prop (예: alert를 띄우는 용도로 사용 가능)

  return (
    <div
      className={`fixed top-0 left-0 z-[1055] flex h-full w-full justify-center bg-black
    bg-opacity-20`} // 화면 전체를 덮는 반투명한 검은색 배경
      onClick={() => {
        // 배경을 클릭하면 모달 닫힘
        if (callbackFn) {
          callbackFn(); // callbackFn이 있다면 실행
        }
        if (v) v("사랑합니다"); // v가 있으면 실행 (예: alert 창 띄우기)
      }}
    >
      <div className="absolute bg-white shadow dark:bg-gray-700 opacity-100 w-1/4 rounded mt10 mb-10 px-6 min-w-[600px]">
        {/* 모달 본체: 흰색 배경, 그림자 효과, 최소 너비 600px */}

        <div className="justify-center bg-warning-400 mt-6 mb-6 text-2xl border-b-4 bordergray-500">
          {" "}
          {title} {/* 모달 제목 표시 */}
        </div>

        <div className="text-4xl border-orange-400 border-b-4 pt-4 pb-4">
          {" "}
          {content} {/* 모달 내용 표시 */}
        </div>

        <div className="justify-end flex ">
          <button
            className="rounded bg-blue-500 mt-4 mb-4 px-6 pt-4 pb-4 text-lg text-white"
            onClick={() => {
              if (callbackFn) {
                callbackFn(); // "Close Modal" 버튼을 클릭하면 모달 닫기
              }
            }}
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
