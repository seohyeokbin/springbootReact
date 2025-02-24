import axios from "axios";
import React, { useEffect, useState } from "react";

const GreenPrj = ({ v }) => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const f = async (page, size) => {
    const res = await axios.get(
      `http://localhost:8080/api/products/list?size=${size}&page=${page}`
    );
    console.log("체크", res.data);
    setData(res.data);
  };

  useEffect(() => {
    f(page, size);
  }, []);

  return (
    <div>
      <div>
        <div>
          상품 목록
        </div>
      </div>

      <div>
        {data?.dtoList.map((i) => (
          <div
            key={i.pno}
            className="m-2 p-4 border border-gray-400"
          >
            <p>{i.pname}</p>
            <p>{i.pdesc}</p>
            <p>
              ₩{i.price}
            </p>
          </div>
        ))}
      </div>

      <div>
        현재 페이지:
        <input
          type="number"
          value={page}
          onChange={(e) => setPage(e.target.value)}
          className="border p-2 mx-2 w-16 text-center"
        />
      </div>

      <div>
        페이지당 데이터 개수:
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="border p-2 mx-2 w-16 text-center"
        />
      </div>

      <button
        onClick={() => f(page, size)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        확인
      </button>
    </div>
  );
};

export default GreenPrj;
