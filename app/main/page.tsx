"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../components/nav";
import {
  faEnvelope,
  faFolderOpen,
  faMailBulk,
  faSignOut,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import Mail from "../components/Mail";
import ListItemComponent from "../components/ListItemComponent";
import { useEffect, useState } from "react";
import Registed from "../components/Registed";
import Edit from "../components/Edit";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
export default function Main() {
  const [numActive, setNumAtive] = useState(2);
  const [addEmployee, employee] = useState(false);
  const [stateNewEmployee, setStateNewEmployee] = useState("");

  const stateStore = useSelector((state: any) => state.storage);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setStateNewEmployee(stateStore.stateNewEmployee);
  }, [stateStore.stateNewEmployee]);

  useEffect(() => {
    if (stateStore.login == "") {
      router.push("/");
    }
  }, [stateStore.login]);

  useEffect(() => {
    if (stateStore.login == "") {
      dispatch({
        type: "setLogin",
        payload: "",
      });
      router.push("/");
    }
  }, []);

  return (
    <>
      {stateStore.login != "" && (
        <>
          <motion.div
            className="z-50 absolute left-0 w-full"
            initial={{ opacity: 1, y: -60 }}
            animate={{ opacity: 1, y: -8 }}
          >
            <Nav />
          </motion.div>

          <div className="w-full block h-max font-fontFamily">
            <div className="grid grid-cols-12 h-full scroll">
              <div className="col-span-2 w-full relative block ">
                <motion.div
                  initial={{ opacity: 0.5, left: -400 }}
                  animate={{ opacity: 1, left: -10 }}
                  className="max-h-dvh h-dvh w-full absolute bg-main-color z-20 pt-16"
                >
                  <div className="mt-5 pl-5 w-full">
                    <span className="text-main-text-color font-bold pl-5 pt-10">
                      เมนูจัดการ
                    </span>
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
                  <div
                    onClick={() => {
                      setNumAtive(3);
                    }}
                    className="hover:bg-stone-800"
                  >
                    <ListItemComponent
                      name="ผลทดสอบ"
                      icon={faFolderOpen}
                      active={numActive === 3}
                    />
                  </div>
                  <div
                    onClick={() => {
                      setNumAtive(4);
                    }}
                    className="hover:bg-stone-800"
                  >
                    <ListItemComponent
                      name="ใบคำลา"
                      icon={faFolderOpen}
                      active={numActive === 4}
                    />
                  </div>
                  <div
                    onClick={() => {
                      setNumAtive(5);
                    }}
                    className="hover:bg-stone-800"
                  >
                    <ListItemComponent
                      name="ประกาศ"
                      icon={faFolderOpen}
                      active={numActive === 5}
                    />
                  </div>
                  <div
                    onClick={() => {
                      router.push("/");
                    }}
                    className="hover:bg-stone-800"
                  >
                    <ListItemComponent
                      name="ออกจากระบบ"
                      icon={faSignOut}
                      active={numActive === 9}
                    />
                  </div>
                </motion.div>
              </div>
              <div className="col-span-10 h-dvh pt-20">
                {numActive === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Mail />
                  </motion.div>
                )}
                {numActive === 2 && stateNewEmployee === "0" && (
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Registed />
                  </motion.div>
                )}
                {numActive === 2 && stateNewEmployee === "1" && (
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Edit />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
