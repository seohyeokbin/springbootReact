import React, { useEffect, useRef, useState } from "react";
import { getOne } from "../../api/productApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";

import { API_SERVER_HOST } from "../../api/todoApi";

const host = API_SERVER_HOST;
const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  uploadFileNames: [],
};

const ReadComponent = ({ pno }) => {
  //부모 component에서 props(객체) 로 전달됨
  console.log("readcomponent", pno);
  const [product, setProduct] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const uploadRef = useRef();
  const { moveToList, moveToModify } = useCustomMove();
  useEffect(() => {
    setFetching(true);
    getOne(pno).then((data) => {
      console.log(data);
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}

      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">PNO</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.pno}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">PNAME</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.pname}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">PRICE</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.price}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">PDESC</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.pdesc}
          </div>
        </div>
      </div>
      <div className="w-full justify-center flex  flex-col m-auto items-center">
        {product.uploadFileNames.map((imgFile, i) => (
          <img
            alt="product"
            key={i}
            className="p-4 w-1/2"
            src={`${host}/api/products/view/${imgFile}`}
          />
        ))}
      </div>

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32  text-white bg-red-500"
          onClick={() => moveToModify(pno)}
        >
          Modify
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={moveToList}
        >
          List
        </button>
      </div>
    </div>
  );
};

export default ReadComponent;

// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getOne } from "../../api/productApi";
// import FetchingModal from "../common/FetchingModal";
// import useCustomMove from "../../hooks/useCustomMove";
// import { API_SERVER_HOST } from "../../api/todoApi";

// const host = API_SERVER_HOST;
// const initState = {
//   pno: 0,
//   pname: "",
//   pdesc: "",
//   price: 0,
//   uploadFileNames: [],
// };

// const ReadComponent = () => {
//   const { pno } = useParams();
//   const pnoNumber = Number(pno); // ✅ pno를 숫자로 변환
//   const [product, setProduct] = useState(initState);
//   const [fetching, setFetching] = useState(false);
//   const uploadRef = useRef();
//   const { moveToList, moveToModify } = useCustomMove();

//   console.log("✅ ReadComponent - pno:", pnoNumber); // ✅ pno 값 확인

//   useEffect(() => {
//     console.log("🔍 useEffect 내부 - pno:", pnoNumber);

//     if (!pnoNumber || isNaN(pnoNumber)) {
//       console.error("❌ Invalid pno:", pnoNumber);
//       return;
//     }

//     setFetching(true);

//     getOne(pnoNumber)
//       .then((data) => {
//         console.log("✅ Fetched product:", data);
//         setProduct(data || initState); // ✅ 값이 없을 경우 기본값 설정
//       })
//       .catch((error) => {
//         console.error("❌ Error fetching product:", error);
//       })
//       .finally(() => {
//         setFetching(false);
//       });
//   }, [pnoNumber]);

//   const handleChangeProduct = (e) => {
//     const { name, value } = e.target;
//     setProduct((prev) => ({ ...prev, [name]: value })); // ✅ 값이 변경될 때 state 반영
//   };

//   const deleteOldImages = (imageName) => {
//     console.log("이미지 삭제");
//     const resultFileNames = product.uploadFileNames;
//     setProduct({ ...product });
//   };

//   return (
//     <div className="border-2 border-sky-200 mt-10 m-2 p-4">
//       {fetching ? <FetchingModal /> : <></>}

//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           <div className="w-1/5 p-6 text-right font-bold">제품명</div>
//           <input
//             type="text"
//             name="pname"
//             value={product.pname}
//             className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
//             onChange={handleChangeProduct}
//           />
//         </div>
//       </div>
//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           <div className="w-1/5 p-6 text-right font-bold">상세설명</div>
//           <textarea
//             className="w-4/5 round-r border border-solid border-neutral-300 shadow-md resize-y"
//             name="pdesc"
//             rows="4"
//             onChange={handleChangeProduct}
//             value={product.pdesc}
//           ></textarea>
//         </div>
//       </div>
//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           <div className="w-1/5 p-6 text-right font-bold">가격</div>
//           <input
//             className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
//             name="price"
//             type="number"
//             value={product.price}
//             onChange={handleChangeProduct}
//           />
//         </div>
//       </div>
//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           <div className="w-1/5 p-6 text-right font-bold">이미지들</div>
//           <div className="w-4/5 justify-center flex flex-wrap items-start">
//             {product.uploadFileNames.map((imgFile, i) => (
//               <div
//                 className="flex justify-center flex-col w-1/3 m-1 align-baseline"
//                 key={i}
//               >
//                 <button
//                   className="bg-blue-500 text-3xl text-white"
//                   onClick={() => deleteOldImages(imgFile)}
//                 >
//                   DELETE
//                 </button>
//                 <img alt="img" src={`${host}/api/products/view/s_${imgFile}`} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end p-4">
//         <button
//           type="button"
//           className="rounded p-4 m-2 text-xl text-white bg-blue-500"
//           onClick={moveToList}
//         >
//           목록
//         </button>
//         <button
//           type="button"
//           className="rounded p-4 m-2 text-xl text-white bg-blue-500"
//           onClick={() => moveToModify(product.pno)}
//         >
//           수정
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReadComponent;

// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getOne } from "../../api/productApi";
// import FetchingModal from "../common/FetchingModal";
// import useCustomMove from "../../hooks/useCustomMove";
// import { API_SERVER_HOST } from "../../api/todoApi";

// const host = API_SERVER_HOST;
// const initState = {
//   pno: 0,
//   pname: "",
//   pdesc: "",
//   price: 0,
//   uploadFileNames: [],
// };

// const ReadComponent = () => {
//   const { pno } = useParams(); // ✅ useParams()를 사용하여 pno 가져오기
//   const [product, setProduct] = useState(initState);
//   const [fetching, setFetching] = useState(false);
//   const uploadRef = useRef();
//   const { moveToList, moveToModify } = useCustomMove();

//   console.log("✅ ReadComponent - pno:", pno); // ✅ pno 값 확인

//   useEffect(() => {
//     console.log("🔍 useEffect 내부 - pno:", pno); // ✅ useEffect 안에서 pno 확인

//     if (!pno || isNaN(Number(pno))) {
//       console.error("❌ Invalid pno:", pno);
//       return;
//     }

//     setFetching(true);

//     getOne(pno)
//       .then((data) => {
//         console.log("✅ Fetched product:", data);
//         setProduct(data);
//       })
//       .catch((error) => {
//         console.error("❌ Error fetching product:", error);
//       })
//       .finally(() => {
//         setFetching(false);
//       });
//   }, [pno]);

//   const handleChangeProduct = (e) => {
//     product[e.target.name] = e.target.vale;
//     setProduct({ ...product });
//   };
//   const deleteOldImages = (imageName) => {
//     console.log("이미지 삭제");
//   };

//   return (
//     <div className="border-2 border-sky-200 mt-10 m-2 p-4">
//       {fetching ? <FetchingModal /> : <></>}

//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           <div className="w-1/5 p-6 text-right font-bold">제품명</div>
//           <input
//             type="text"
//             name="pname"
//             value={product.pname}
//             className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
//             onChange={handleChangeProduct}
//           />
//         </div>
//       </div>
//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           <div className="w-1/5 p-6 text-right font-bold">상세설명</div>
//           <textarea
//             className="w-4/5 round-r border border-solid border-neutral-300 shadow-md resize-y"
//             name="pdesc"
//             rows="4"
//             onChange={handleChangeProduct}
//             value={product.pdesc}
//           ></textarea>
//         </div>
//       </div>
//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           <div className="w-1/5 p-6 text-right font-bold">가격</div>
//           <input
//             className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
//             name="price"
//             type={"number"}
//             value={product.price}
//             onChange={handleChangeProduct}
//           />
//         </div>
//       </div>
//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           <div className="w-1/5 p-6 text-right font-bold">삭제</div>
//           <select
//             name="delFlag"
//             value={product.delFlag}
//             onChange={handleChangeProduct}
//             className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
//           >
//             <option value={false}>사용</option>
//             <option value={true}>삭제</option>
//           </select>
//         </div>
//       </div>
//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           <div className="w-1/5 p-6 text-right font-bold">파일들</div>
//           <input
//             ref={uploadRef}
//             className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
//             type={"file"}
//             multiple={true}
//           />
//         </div>
//       </div>
//       <div className="flex justify-center">
//         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//           <div className="w-1/5 p-6 text-right font-bold">이미지들</div>
//           <div className="w-4/5 justify-center flex flex-wrap items-start">
//             {product.uploadFileNames.map((imgFile, i) => (
//               <div
//                 className="flex justify-center flex-col w-1/3 m-1 align-baseline"
//                 key={i}
//               >
//                 <button className="bg-blue-500 text-3xl text-white">
//                   삭제
//                 </button>
//                 <img alt="img" src={`${host}/api/products/view/s_${imgFile}`} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReadComponent;
