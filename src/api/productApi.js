import axios from "axios";
import jwtAxios from "../util/jwtUtil";

const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/products`;

//p253
export const postAdd = async (productObj) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await axios.post(`${prefix}/`, productObj, header);
  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, { params: { page, size } });
  return res.data;
};

export const getOne = async (pno) => {
  console.log("🔍 getOne API 호출됨 - pno:", pno); // ✅ 확인용 로그 추가

  if (!pno || isNaN(Number(pno))) {
    console.error("❌ Invalid API request: pno is undefined or not a number.");
    return null;
  }

  const res = await jwtAxios.get(`${API_SERVER_HOST}/api/products/${pno}`);
  return res.data;
};

export const deleteOne = async (pno) => {
  const res = await axios.delete(`${prefix}/${pno}`);
  return res.data;
};

export const putOne = async (pno, product) => {
  console.log("putOne api todo:", product);
  const header = { header: { "Content-Type": "multipart/form-data" } };
  const res = await axios.put(`${prefix}/${pno}`, product, header);
  return res.data;
};
