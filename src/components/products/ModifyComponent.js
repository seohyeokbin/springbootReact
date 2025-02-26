import React, { useEffect, useRef, useState } from "react";
import { getOne } from "../../api/productApi";
import FetchingModal from "../common/FetchingModal";

import { API_SERVER_HOST, deleteOne, putOne } from "../../api/todoApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { useParams } from "react-router-dom";
const host = API_SERVER_HOST;
const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  uploadFileNames: [],
};

const ModifyComponent = ({pno}) => {
  //부모 component에서 props(객체) 로 전달됨
  console.log("ModifyComponent", pno);
  const [product, setProduct] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(false);
  const uploadRef = useRef();
  const { moveToList, moveToRead } = useCustomMove();

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
  //p289
  const deleteOldImages = (imageName) => {
    console.log("이미지 삭제 ");
    const resultFileNames = product.uploadFileNames.filter(
      (i) => i !== imageName
    );
    product.uploadFileNames = resultFileNames;
    setProduct({ ...product });
  };
  //p290
  const handleClickModify = () => {
    const files = uploadRef.current.fiels;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    //다른 데이터
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    formData.append("delFlag", product.delFlag);
    //p293
    for (let i = 0; i < product.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", product.uploadFileNames[i]);
    }
    setFetching(true);
    putOne(pno, formData).then((i) => {
      setResult("수정되었습니다");
      setFetching(false);
    });
  };
  const closeModal = () => {
    if (result === "수정되었습니다") moveToRead(pno);
    else if (result == "삭제되었습니다") moveToList({ page: 1 });
    setResult(null);
  };
  const handleClickDelete = () => {
    setFetching(true);
    deleteOne(pno).then((data) => {
      setResult("삭제되었어요");
      setFetching(false);
    });
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title={`${result}`}
          content={"정상적으로 처리되었습니다."}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
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
                  type="button"
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
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500 "
          onClick={handleClickDelete}
        >
          삭제
        </button>
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500 "
          onClick={handleClickModify}
        >
          수정
        </button>
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={moveToList}
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default ModifyComponent;
