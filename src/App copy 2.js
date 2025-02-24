
import { RouterProvider } from "react-router-dom";
import "./App.css";
import A from "./components/A";
import root from "./router/root";


function App() {
  return <RouterProvider router={root}></RouterProvider>;
}
// function App() {
//   return <div>
//     <A />
//   </div>;
// }

export default App;
