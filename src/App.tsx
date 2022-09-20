import React, { useState } from "react";
import Class from "./Class";
import "@/app.less";
import bigIMg from "../assets/big.png";
import minIMg from "../assets/min.png";

function App() {
  // 测试环境变量
  // console.log("NODE_ENV", process.env.NODE_ENV);
  // console.log("BASE_ENV", process.env.BASE_ENV);
  const [count, setCounts] = useState("");
  const onChange = (e: any) => {
    setCounts(e.target.value);
  };
  return (
    <div className="app">
      <h1>搭建webpack5 + ts + react全家桶</h1>
      <img src={bigIMg} alt="" />
      <img src={minIMg} alt="" />
      <Class />
      <p>输入框666</p>
      <input type="text" value={count} onChange={onChange} />
    </div>
  );
}
export default App;
