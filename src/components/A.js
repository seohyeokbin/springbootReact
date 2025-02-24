import React from "react";
import B from "./B";

const A = () => {
//     const f = (i) => console.log(i*100);
//   return (
//     <div>
//       A<B a="홍길동" b="홍길서" c={f} d={1}></B>
//     </div>
//   );


const g = ({ props: { b } }) => {
    let sum = 0;
    for (let i = 0; i < b.length; i++) {
      sum += b[i];
    }
    return sum;
  };

// const g = (j) => {
//     let sum = 0;
//     const arr = j.props.b;
//     for (let i=0; i<arr.length; i++) {
//         sum += j.props.b[i];
//     }
//     return sum;
// }
return (
<div>
    A<B d = {g}></B></div>
    );
};
export default A;

