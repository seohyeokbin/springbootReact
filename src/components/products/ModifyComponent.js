import React, { useEffect, useRef, useState } from "react";
import { getOne } from "../../api/productApi";
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

  useEffect(() => {
    setFetching(true);
    getOne(pno).then((data) => {
      console.log(data);
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);
  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };
  const deleteOldImages = (imageName) => {
    console.log("이미지 삭제 ");
    const resultFileNames = product.uploadFileNames;
  };
  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold"> 제품명</div>
          <input
            type="text"
            name="pname"
            value={product.pname}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            onChange={handleChangeProduct}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold"> 상세설명</div>
          <textarea
            className="w-4/5 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="pdesc"
            rows="4"
            onChange={handleChangeProduct}
            value={product.pdesc}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold"> 가격</div>
          <input
            type="number"
            name="price"
            value={product.price}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            onChange={handleChangeProduct}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold"> 삭제</div>
          <select
            name="delFlag"
            value={product.delFlag}
            onChange={handleChangeProduct}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
          >
            <option value={false}>사용</option>
            <option value={true}>삭제</option>
          </select>
        </div>
      </div>

      <div className="w-full justify-center flex flex-col m-auto items-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">파일들</div>
          <input type="file" ref={uploadRef} multiple={true}></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">이미지들</div>
          <div className="w-4/5 justify-center flex flex-wrap items-start">
            {product.uploadFileNames.map((imgFile, index) => (
              <div
                className="flex justify-center flex-col w-1/3 m-1 align-baseline"
                key={index}
              >
                <button
                  className="bg-blue-500 text-3xl text-white"
                  onClick={() => deleteOldImages(imgFile)}
                >
                  삭제
                </button>
                <img alt="img" src={`${host}/api/products/view/s_${imgFile}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReadComponent;

// import React, { useEffect, useState } from "react";
// import useCustomMove from "../../hooks/useCustomMove";
// import { API_SERVER_HOST } from "../../api/todoApi";
// import FetchingModal from "../common/FetchingModal";
// import { getOne } from "../../api/productApi";

// const initState = {
//   pno: 0,
//   pname: "",
//   pdesc: "",
//   price: 0,
//   uploadFileNames: [],
// };

// const host = API_SERVER_HOST;

// const ReadComponent = ({ pno }) => {
//   //부모 component에서 props(객체)로 전달됨
//   console.log("readCompnet", pno);
//   const [product, setProduct] = useState(initState);
//   const { moveToList, moveToModify } = useCustomMove();
//   const [ fetching, setFetching ] = useState(false);

//   useEffect(() => {
//     setFetching(true);
//     getOne(pno).then((data) => {
//       console.log(data);
//       setProduct(data);
//       setFetching(false);
//     });
//   }, [pno]);

//   return (
//     <div className="border-2 border-sky-200 mt-10 m-2 p-4">
//       {fetching ? <FetchingModal /> : <></>}
//       {makeDiv("Pno", product.pno)}
//       {makeDiv("Pname", product.pname)}
//       {makeDiv("가격", product.price)}
//       {makeDiv("상세설명", product.pdesc)}
//       <div className="w-full justify-center flex flex-col m-auto items-center">
//         {product.uploadFileNames.map((imgFile, index) => (
//           <img
//             alt="product"
//             key={index}
//             className="p-4 w-1/2"
//             src={`${host}/api/products/view/${imgFile}`}
//           />
//         ))}
//       </div>
//       <div className="flex justify-end p-4">
//         <button
//           type="button"
//           className="rounded p-4 m-2 text-xl text-white bg-blue-500"
//           onClick={() => moveToList()}
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
// const makeDiv = (title, value) => (
//   <div className="flex justify-center">
//     <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//       <div className="w-1/5 p-6 text-right font-bold">{title}</div>
//       <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
//         {value}
//       </div>
//     </div>
//   </div>
// );

// export default ReadComponent;
