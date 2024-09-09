"use client";
import Nav from "./components/nav";
import {
  faEnvelope,
  faSignIn,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import Mail from "./components/Mail";
import ListItemComponent from "./components/ListItemComponent";
import db from "@/firebase/index";
import { useState } from "react";
import Registed from "./components/Registed";
import Edit from "./components/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  function login() {
    if (![username, password].includes("")) {
      db.get("member/" + username).then((snapshot) => {
        console.log("member/" + username, snapshot.val())
        if (snapshot.val()["password"] == password) {
          dispatch({
            type: "setLogin",
            payload: snapshot.val()["full_name_en"],
          });
          router.push("/main");
        } else {
        }
      });
    }
  }
  return (
    <>
      <main className="w-full h-dvh align-middle inline-block pt-60 select-none bg-zinc-900">
        <motion.div
          className="w-1/6 m-auto"
          initial={initialVar}
          animate={animateVar}
          transition={{ delay: 1 }}
        >
          <div className="w-full bg-zinc-800 shadow-lg p-3 pb-10 rounded-lg">
            <Image
              src={require("./../public/logo_mobile.png")}
              alt={""}
              className="w-60 m-auto pl-6 pr-6 mt-10 mb-16"
            />
            <input
              type="text"
              placeholder="Employee Number"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              className="cursor-pointer border-1 mt-10 bg-zinc-600  text-white p-3 w-5/6 m-auto rounded-md block outline-none"
            />
            <input
              type="password"
              placeholder="Password"
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
            <div className="w-full p-6 pb-0">
              <motion.div whileTap={{ scale: 0.9 }}>
                <button
                  className="bg-lime-500 w-full p-4 rounded-md hover:bg-lime-600 text-white"
                  onClick={() => login()}
                >
                  <span className="mr-2">Sign In</span>
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
