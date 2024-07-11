"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../components/nav";
import {
  faEnvelope,
  faMailBulk,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import Mail from "../mail/page";
import ListItemComponent from "../components/ListItemComponent";
import { useState } from "react";
import Registed from "../components/Registed";
import Edit from "../components/Edit";
import { useDispatch, useSelector } from "react-redux";

export default function Main() {
  const [numActive, setNumAtive] = useState(2);
  const [addEmployee, employee] = useState(false);


  const stateStore = useSelector((state: any)=> state.storage)
  const dispatch = useDispatch()
  

  return (
    <>
      <Nav />
      <div className="w-full block h-max font-fontFamily">
        <div className="grid grid-cols-12 h-full scroll">
          <div className="col-span-2 bg-main-color max-h-dvh w-full block pt-20">
            <div className="mt-5 pl-5 w-full">
              <span className="text-main-text-color font-bold">เมนูจัดการ</span>
            </div>
            <div
              onClick={() => {
                setNumAtive(1);
              }}
              className="hover:bg-stone-800"
            >
              <ListItemComponent
                name="กล่องข้อความ"
                icon={faEnvelope}
                active={numActive === 1}
              />
            </div>
            <div
              onClick={() => {
                setNumAtive(2);
              }}
              className="hover:bg-stone-800"
            >
              <ListItemComponent
                name="รายชื่อพนักงาน"
                icon={faUserGroup}
                active={numActive === 2}
              />
            </div>
          </div>
          <div className="col-span-10 h-dvh pt-20">
            {numActive === 1 && <Mail />}
            {(numActive === 2 && stateStore.stateNewEmployee === "0") && <Registed />}
            {(numActive === 2 && stateStore.stateNewEmployee === "1") && <Edit />}
          </div>
        </div>
      </div>
    </>
  );
}
