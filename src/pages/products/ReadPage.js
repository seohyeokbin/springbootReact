import React from "react";
import { useParams } from "react-router-dom";
import ReadComponent from "../../components/products/ReadComponent";

const ReadPage = () => {
  const { pno } = useParams(); // ✅ URL에서 pno 가져오기
  const pnoNumber = Number(pno); // ✅ 숫자로 변환하여 전달

  console.log("✅ ReadPage - pno:", pnoNumber);

  return (
    <div className="text-extrabold w-full bg-white mt-6">
      <div className="text-3xl font-extrabold">
        📌 제품 상세 페이지: {pnoNumber}
        <ReadComponent pno={pnoNumber} />
      </div>
    </div>
  );
};

export default ReadPage;

// import React, { useCallback } from "react";
// import {
//   createSearchParams,
//   useNavigate,
//   useParams,
//   useSearchParams,
// } from "react-router-dom";
// import ReadComponent from "../../components/todo/ReadComponent";

// const ReadPage = () => {
//   const { pno } = useParams();
//   console.log("ReadPage pno: ", pno);

//   // const moveToModify = useCallback(
//   //   (pno) => {
//   //     navigate({ pathname: `/products/modify/${pno}`, search: queryStr });
//   //   },
//   //   [pno, page, size]
//   // );
//   // const moveToList = useCallback(() => {
//   //   navigate({ pathname: `/products/list`, search: queryStr });
//   // });

//   return (
//     <div className="text-extrabold w-full bg-white mt-6">
//       <div className="text-3xl font-extrabold">
//         Todo Read Page Component{pno}
//         <ReadComponent pno={pno}></ReadComponent>
//       </div>
//     </div>
//   );
// };

// export default ReadPage;
