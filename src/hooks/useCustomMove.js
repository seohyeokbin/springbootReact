import { useState } from "react";
import {
  createSearchParams, // 쿼리스트링을 생성하는 함수
  useNavigate, // 페이지 이동을 위한 훅
  useSearchParams, // 현재 URL의 쿼리스트링을 가져오는 훅
} from "react-router-dom";

const getNum = (param, defaultValue) => {
  if (!param) {
    // 값이 없으면 기본값 반환
    return defaultValue;
  }
  return parseInt(param); // 문자열을 숫자로 변환
};

const useCustomMove = () => {
  const navigate = useNavigate(); // 네비게이션 함수
  const [refresh, setRefresh] = useState(false); // 리스트 이동 시 리렌더링을 위한 상태
  const [queryParams] = useSearchParams(); // 현재 URL의 쿼리스트링을 가져옴

  const page = getNum(queryParams.get("page"), 1); // "page" 값을 가져오고 없으면 기본값 1
  const size = getNum(queryParams.get("size"), 10); // "size" 값을 가져오고 없으면 기본값 10

  const queryDefault = createSearchParams({ page, size }).toString();
  // 기본적으로 유지할 쿼리스트링 생성 (예: "page=1&size=10")

  const moveToModify = (num) => {
    console.log(queryDefault);
    navigate({
      pathname: `../modify/${num}`, // 수정 페이지로 이동 (예: ../modify/5)
      search: queryDefault, // 기존의 쿼리스트링 유지
    });
  };

  const moveToRead = (num) => {
    console.log(queryDefault);
    navigate({
      pathname: `../read/${num}`, // 읽기 페이지로 이동 (예: ../read/12)
      search: queryDefault, // 기존의 쿼리스트링 유지
    });
  };

  const moveToList = (pageParam) => {
    let queryStr = "";
    if (pageParam) {
      // 새로운 페이지 값이 있으면 해당 값으로 쿼리스트링 생성
      const pageNum = getNum(pageParam.page, 1);
      const sizeNum = getNum(pageParam.size, 10);

      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      // 값이 없으면 기존 쿼리스트링 유지
      queryStr = queryDefault;
    }

    navigate({ pathname: `../list`, search: queryStr }); // 리스트 페이지로 이동
    setRefresh(!refresh); // 상태 변경을 통해 페이지 리렌더링 유도
  };

  return { moveToList, moveToModify, moveToRead, page, size, refresh };
  // 이동 함수들과 현재 페이지 정보, 리렌더링 상태 반환
};

export default useCustomMove;
