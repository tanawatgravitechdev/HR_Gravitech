"use client";
import Nav from "./components/nav";
import {
  faEnvelope,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import Mail from "./components/Mail";
import ListItemComponent from "./components/ListItemComponent";
import { useState } from "react";
import Registed from "./components/Registed";
import Edit from "./components/Edit";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [numActive, setNumAtive] = useState(2);
  const [addEmployee, employee] = useState(false);


  const stateStore = useSelector((state: any)=> state.storage)
  const dispatch = useDispatch()
  

  return (
    <>
      <Nav />
      <div className="w-full block h-max font-fontFamily">
        
      </div>
    </>
  );
}
