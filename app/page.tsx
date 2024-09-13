"use client";
import Nav from "./components/nav";
import {
  faEnvelope,
  faInfo,
  faInfoCircle,
  faSignIn,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import Mail from "./components/Mail";
import ListItemComponent from "./components/ListItemComponent";
import db from "@/firebase/index";
import { useEffect, useState } from "react";
import Registed from "./components/Registed";
import Edit from "./components/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from 'next/dynamic';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false });
import sha256 from "@/encode";
export default function Home() {
  const [numActive, setNumAtive] = useState(2);
  const [addEmployee, employee] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [initialVar, setInitialVar] = useState({ opacity: 0, y: 20, scale: 1 });
  const [animateVar, setAanimateVar] = useState({ opacity: 1, y: 0, scale: 1 });
  const stateStore = useSelector((state: any) => state.storage);
  const dispatch = useDispatch();
  const router = useRouter();

  const [swalProps, setSwalProps] = useState({});

  async function login() {
    if (![username, password].includes("")) {
      db.get("member/" + username).then(async (snapshot) => {
        if (snapshot.val()) {
          let passTmp = await sha256(password);
          if (
            passTmp == snapshot.val()["password"] &&
            (snapshot.val()["employee_number"].includes("GL006") ||
              snapshot.val()["department"].includes("บุคคลและธุรการ"))
          ) {
            dispatch({
              type: "setLogin",
              payload: snapshot.val()["full_name_en"],
            });
            setSwalProps({
              show: true,
              title: "แจ้งเตือน",
              icon: "success",
              text: "ยินดีต้อนรับ",
            });
            router.push("/main");
          } else {
            setSwalProps({
              show: true,
              title: "แจ้งเตือน",
              icon: "warning",
              text: "ไม่สามารถเข้าสู่ระบบได้",
            });
          }
        } else {
          setSwalProps({
            show: true,
            title: "แจ้งเตือน",
            icon: "warning",
            text: "ไม่พบข้อมูล",
          });
        }
      });
    }
  }

  useEffect(() => {
  }, []);
  return (
    <>
      <main className="w-full h-dvh align-middle inline-block pt-60 select-none bg-zinc-900">
        <motion.div
          className="w-1/5 m-auto"
          initial={initialVar}
          animate={animateVar}
          transition={{ delay: 1 }}
        >
          <div className="absolute">
            <SweetAlert2 {...swalProps} />
          </div>
          <div className="w-full bg-zinc-800 shadow-lg p-3 pb-10 rounded-lg">
            <Image
              src={require("./../public/logo_mobile.png")}
              alt={""}
              className="w-60 m-auto pl-6 pr-6 mt-10 mb-16"
            />
            <input
              type="text"
              placeholder="รหัสพนักงาน"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              className="cursor-pointer border-1 mt-10 bg-zinc-600  text-white p-3 w-5/6 m-auto rounded-md block outline-none"
            />
            <input
              type="password"
              placeholder="รหัสผ่าน"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e["key"] == "Enter") {
                  login();
                }
              }}
              value={password}
              className="cursor-pointer border-1 mt-5 bg-zinc-600  text-white p-3 w-5/6 m-auto rounded-md block outline-none"
            />
            <div className="pl-8 text-gray-400 pt-10 pb-1 text-xs">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
              <span>สงวนสิทธิ์เฉพาะเจ้าหน้าที่แผนกทรัพยากรบุคคลและธุรการ</span>
            </div>
            <div className="w-full p-6 pb-0">
              <motion.div whileTap={{ scale: 0.9 }}>
                <button
                  className="bg-lime-500 w-full p-4 rounded-md hover:bg-lime-600 text-white"
                  onClick={() => {
                    login();
                  }}
                  onMouseDown={() => {
                    setSwalProps({
                      show: false,
                    });
                  }}
                >
                  <span className="mr-2">เข้าสู่ระบบ</span>
                  <FontAwesomeIcon icon={faSignIn} />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
