import React, { useEffect, useState } from "react";
import axios from "axios";

const BackendConnection = () => {
  // 📌 입력 폼 데이터 상태 (초기값: 수학 66, 영어 88, 국어 77)
  const [formData, setFormData] = useState({
    math: "66",
    eng: "88",
    korea: "77",
  });

  // 📌 서버 응답 데이터를 저장할 상태
  const [response, setResponse] = useState(null);

  // 📌 오류 발생 시 저장할 상태
  const [error, setError] = useState(null);

  // 📌 입력 필드 값이 변경될 때 호출되는 함수
  const handleChange = (e) => {
    setFormData({
      ...formData, // 기존 데이터 유지
      [e.target.name]: e.target.value, // 변경된 입력 필드만 업데이트
    });
  };

  // 📌 폼이 제출될 때 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출(페이지 새로고침) 방지

    try {
      // 📌 백엔드로 POST 요청을 보냄
      const res = await axios.post("http://localhost:8080/calc", formData, {
        headers: { "Content-Type": "application/json" }, // JSON 형식으로 보냄
      });

      setResponse(res.data); // 📌 서버에서 받은 응답을 저장
      setError(null); // 📌 오류 상태 초기화
    } catch (err) {
      setError(err); // 📌 오류 발생 시 상태 저장
    }
  };

  return (
    <div>
      {/* 📌 점수를 입력받는 폼 */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="math"
          value={formData.math}
          onChange={handleChange} // 입력값 변경 감지
          placeholder="수학점수"
        />
        <input
          type="text"
          name="eng"
          value={formData.eng}
          onChange={handleChange} // 입력값 변경 감지
          placeholder="영어점수"
        />
        <input
          type="text"
          name="korea"
          value={formData.korea}
          onChange={handleChange} // 입력값 변경 감지
          placeholder="국어점수"
        />
        <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="주소"
        />
    

        <button type="submit">데이터 전송</button>
      </form>

      {/* 📌 서버 응답이 있을 경우 화면에 표시 */}
      {response && <p>{JSON.stringify(response)}</p>}

      {/* 📌 오류 발생 시 화면에 에러 메시지 표시 */}
      {error && <p style={{ color: "red" }}>서버 요청 중 오류 발생!</p>}
    </div>
  );
};

export default BackendConnection;
