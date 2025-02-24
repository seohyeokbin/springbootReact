import axios from "axios";
import React, { useEffect, useState } from "react";

const ListPage = () => {
    const [data, setData] = useState([]);

useEffect(() => {
    const fetchData = async() => {
        const res = await axios.get("http://localhost:8080/todo/list");
        console.log(res.data);
        setData(res.data);
    };
    fetchData();
},[]);

  return (
    <div className="p-4 w-full bg-orange-200">
      <div className="text-3xl font-extrabold">
        Todo List Page Component
        <p>
            {data.map(i=> (
                <div>
                    <span>{i.work}</span>,
                    <span className="underline">{i.name}</span>
                    <br />
                    </div>))}
        </p>
    </div>
    </div>
  );
};

export default ListPage;
