import axios from "axios";
import React, { useEffect, useState } from "react";

const ListPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8080/green/list");
      console.log(res.data);
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 w-full bg-green-200">
      <div className="text-3xl font-extrabold">
        green List Page Component
        <p>
          {data.map((i) => (
            <div>
              <span>{i.price}</span>,<span>{i.total}</span>,
              <span className="underline">{i.name}</span>
              <span>{i.vat}</span>
              <br />
            </div>
          ))}
        </p>
      </div>
    </div>
  );
};

export default ListPage;
