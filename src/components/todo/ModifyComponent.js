import React, { useEffect, useState } from "react"; // React의 useEffect, useState 훅을 불러옴
import { deleteOne, getOne, putOne } from "../../api/todoApi"; // 특정 할 일 데이터를 가져오는 API 함수 getOne 불러옴


// 초기 상태 정의: 할 일(todo) 객체의 기본 구조를 설정
const initState = {
  tno: 0, // 할 일 번호 (기본값 0)
  title: "", // 제목 (기본값 빈 문자열)
  writer: "", // 작성자 (임시 값 설정)
  dueDate: null, // 마감 기한 (기본값 null)
  complete: false, // 완료 여부 (기본값 false)
};

// ModifyComponent: 할 일 수정 기능을 담당하는 컴포넌트
const ModifyComponent = ({ tno }) => {
  // 상태(state) 선언: 할 일 정보를 저장할 상태 변수 (초기값은 initState)
  const [todo, setTodo] = useState({ ...initState });

  // useEffect 훅: tno 값이 변경될 때마다 실행됨
  useEffect(() => {
    if (tno) {
      // tno가 존재할 경우, API를 호출하여 해당 할 일 데이터를 가져옴
      getOne(tno)
        .then((data) => {
          console.log("불러온 데이터:", data); // 데이터 확인을 위한 콘솔 출력
          setTodo(data); // 상태 업데이트 (가져온 데이터를 todo에 저장)
        })
        .catch((err) => console.error("데이터 가져오기 오류:", err)); // 오류 발생 시 콘솔 출력
    }
  }, [tno]); // tno가 변경될 때마다 실행됨

  // 입력 필드 값 변경 핸들러: 사용자가 입력 필드를 변경하면 상태 업데이트
  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({ ...todo });
  };

  // 완료 여부 변경 핸들러: 드롭다운 값이 변경되면 상태 업데이트
  const handleChangeTodoComplete = (e) => {
    const value = e.target.value === "Y"; // "Y"를 true, "N"을 false로 변환
    setTodo({ ...todo, complete: value });
  };

  const handleClickModify = () => {
    putOne(todo).then((data) => console.log("수정 결과: ", data));
  };

  const handleClickDelete = () => {
    deleteOne(todo.tno).then((data) => console.log("삭제 결과 : ", data));
  };

  return (
    // 전체 컨테이너: 테두리와 여백이 적용된 박스 스타일
    <div className="border-2 border-sky-200 mt-10 mr-2 p-4">
      {/* TNO 표시 (읽기 전용) */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TNO</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
            {todo.tno}
          </div>
        </div>
      </div>

      {/* 작성자 표시 (읽기 전용) */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">작성자</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
            {todo.writer}
          </div>
        </div>
      </div>

      {/* 제목 입력 필드 */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">제목</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="title" // name을 "title"로 설정하여 상태 업데이트 시 key로 사용
            type="text"
            value={todo.title} // 상태 값(todo.title)과 연결
            onChange={handleChangeTodo} // 값 변경 시 handleChangeTodo 실행
          />
        </div>
      </div>

      {/* 마감 기한 입력 필드 */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">만기일</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="dueDate" // name을 "dueDate"로 설정
            type="date" // 날짜 입력을 위해 type="date" 사용
            value={todo.dueDate} // 상태 값(todo.dueDate)과 연결
            onChange={handleChangeTodo} // 값 변경 시 handleChangeTodo 실행
          />
        </div>
      </div>

      {/* 완료 여부 선택 드롭다운 */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">완료 여부</div>
          <select
            name="complete" // name을 "complete"로 설정
            className="border-solid border-2 rounded m-1 p-2"
            onChange={handleChangeTodoComplete} // 값 변경 시 handleChangeTodoComplete 실행
            value={todo.complete ? "Y" : "N"} // 상태 값(todo.complete)을 "Y" 또는 "N"으로 변환하여 설정
          >
            <option value="Y">완료</option> {/* "Y" 선택 시 true로 설정 */}
            <option value="N">미완료</option> {/* "N" 선택 시 false로 설정 */}
          </select>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickDelete}
        >
          삭제
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={handleClickModify}
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default ModifyComponent; // 컴포넌트를 외부에서 사용할 수 있도록 export
