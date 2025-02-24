import React from "react";

const B = (props) => {
//   console.log(props);
//   console.log(props.c(5));
  console.log(props.d({props:{
    "b":[1,2,3,4,5,6,11]
  }}));
  return <div>B</div>;
};

export default B;
