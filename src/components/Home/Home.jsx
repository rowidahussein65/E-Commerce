import { useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import Style from "./Home.module.css";

export function Home() {
  let [counter, setCounter] = useState(0);
  let [userName, setUserName] = useState("youssef");

  function increment() {
    setCounter(counter + 1);
  }
  function decrement() {
    setCounter(counter - 1);
  }
  function changeName() {
    setUserName("Salah");
  }
  return (
    <>
      <button onClick={increment} className="btn btn-info">
        +
      </button>

      <button onClick={decrement} className="btn btn-danger">
        -
      </button>

      <button onClick={changeName} className="btn btn-success">
        change name
      </button>
      <h2 className="bg-red-500">counter:{counter}</h2>
      <h1 className={Style.test}>userName:{userName}</h1>
    </>
  );
}
export default Home;
