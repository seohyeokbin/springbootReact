import axios from "axios";
import React, { useState } from "react";

const AddPage = () => {
  const [form, setForm] = useState({ work: "", name: "", tno: 0 });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm((i) => ({
      ...i,
      [name]: name === "tno" ? Number(value) : value,
    }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("전송 버튼이 눌렸어요");
    const addData = async () => {
      const res = await axios.post("http://localhost:8080/todo.add", form, {
        headers: { "Content-Type": `application/json` },
      });
      console.log(res.data);
    };
    addData();
  };
  return (
    <div className="text-3xl font-extrabold">
      <form onSubmit={submitHandler}>
        <div>
          <label>할일</label>
          <input name="work" onChange={changeHandler} value={form.work} />
        </div>
        <div>
          <label>이름</label>
          <input name="name" onChange={changeHandler} value={form.name} />
        </div>
        <div>
          <label>번호</label>
          <input
            name="tno"
            onChange={changeHandler}
            type="number"
            value={form.tno}
          />
        </div>
        <button type="submit">전송</button>
      </form>
    </div>
  );
};

export default AddPage;
