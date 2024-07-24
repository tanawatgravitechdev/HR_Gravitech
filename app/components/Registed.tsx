"use client";
import {
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
  faClock,
  faEdit,
  faFilter,
  faPlus,
  faPlusSquare,
  faRefresh,
  faSearch,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import db from "@/firebase/index";
import { useDispatch, useSelector } from "react-redux";
import SweetAlert2 from "react-sweetalert2";

export default function Registed() {
  const [jsonData, setJsonData] = useState({});
  const dispatch = useDispatch();

  const [swalProps, setSwalProps] = useState({});
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    console.log("aaa");
    db.get(`member`).then((snapshot) => {
      setJsonData(snapshot.val());
    });
  }, []);

  function reset(keyNumber: string) {
    let jsonTemp: any = {};
    db.get(`member/${keyNumber}`).then((snapshot) => {
      let jsonTmp = snapshot.val();
      jsonTemp[keyNumber] = {
        ...jsonTmp,
        password:
          jsonTmp.full_name_en.split(" ").length > 1
            ? (
                jsonTmp.full_name_en.replaceAll('  ',' ').split(" ")[0] +
                "_" +
                jsonTmp.full_name_en.replaceAll('  ',' ').split(" ")[1].replaceAll(' ','').substring(0, 1)
              ).toLowerCase()
            : "password",
      };
      db.write(jsonTemp);
    });
  }

  function deleteItem(keyNumber: string) {
    let jsonTemp: any = {};
    db.get(`member/${keyNumber}`).then((snapshot) => {
      let jsonTmp = snapshot.val();
      jsonTemp[keyNumber] = {
        ...jsonTmp,
        status: "delete",
      };
      db.write(jsonTemp);
      db.get(`member`).then((snapshot) => {
        setJsonData(snapshot.val());
      });
    });
  }

  return (
    <>
      <div className="pl-10 pr-10 pt-10 ">
        <div className="grid grid-cols-6 w-full mb-10 gap-5">
          <div className="text-center">
            <span className="text-xl font-bold">รายชื่อทั้งหมด</span>
          </div>
          <div className="col-span-2">
            <div className="border-2 border-gray-200 p-1 mt-1 rounded-md w-full">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute mt-1 ml-2 text-gray-300"
              />
              <input
                type="text"
                placeholder="Search"
                className="outline-none text-xs border-0 w-full pl-10"
                value={search}
                onChange={(e)=>{
                  setSearch(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="">
            <div className="bg-white shadow-lg text-xs w-2/4 text-center rounded-md cursor-pointer p-3">
              <FontAwesomeIcon icon={faFilter} className="mr-3" />
              <span>Filter</span>
            </div>
          </div>
          <div className="col-span-1"></div>
          <div
            onClick={() => {
              dispatch({ type: "setEditEmployee", payload: "" });
              dispatch({ type: "setStateNewEmployee", payload: "1" });
            }}
            className="hover:bg-green-500 cursor-pointer leading-10 text-white rounded-lg  text-xs text-center h-10 bg-main-text-color"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-3 " />
            <span>เพิ่มพนักงานใหม่</span>
          </div>
        </div>

        <div className="rounded overflow-hidden w-full shadow-lg ">
          <div className="bg-gray-100 grid grid-cols-9 h-14">
            <div className="text-center pt-3">
              <span className="text-xs font-bold">ลำดับ</span>
            </div>
            <div className="col-span-2 text-center pt-3">
              <span className="text-xs font-bold">ชื่อ-นามสกุล (ภาษาไทย)</span>
            </div>
            <div className="col-span-2 text-center pt-3">
              <span className="text-xs font-bold">ชื่อ-นามสกุล (ภาษาอังกฤษ)</span>
            </div>
            <div className="col-span-1 text-center pt-3">
              <span className="text-xs font-bold">รหัสพนักงาน</span>
            </div>
            <div className="text-center pt-3">
              <span className="text-xs font-bold">แผนก</span>
            </div>
            <div className="text-center pt-3">
              <span className="text-xs font-bold">สถานะ</span>
            </div>
            <div className="text-center pt-3"></div>
          </div>
          <div className="h-80 overflow-y-scroll">
          {jsonData && (
            <>
              {Object.values(jsonData).map((data: any, index: number) => (
                <>
                  {data["status"] != "delete" && ((search !="" &&  (data.full_name_th.includes(search) || data.employee_number.includes(search))) || (search === "")) && (
                    <>
                      <div className="bg-white grid grid-cols-9 h-14">
                        <div className="text-center pt-3">
                          <span className="text-xs">{index + 1}</span>
                        </div>
                        <div className="col-span-2 text-left pt-3">
                          <span className="text-xs">
                            {data.full_name_th}
                          </span>
                        </div>
                        <div className="col-span-2 text-left pt-3">
                          <span className="text-xs">
                            {data.full_name_en}
                          </span>
                        </div>
                        <div className="col-span-1 text-center pt-3">
                          <span className="text-xs">
                            {data.employee_number}
                          </span>
                        </div>
                        <div className="text-center pt-3">
                          <span className="text-xs">{data.department}</span>
                        </div>
                        <div className="text-center pt-3">
                          <span className="text-xs">
                            {data.status ? data.status : "คงอยู่"}
                          </span>
                        </div>
                        <div className="text-center pt-3 items-end">
                          <div className="float-right mr-10 mt-2 w-3/6 grid grid-cols-3 gap-0 text-center text-zinc-800">
                            <FontAwesomeIcon
                              icon={faRefresh}
                              className="cursor-pointer active:opacity-5"
                              onMouseDown={()=>{
                                setSwalProps({
                                  show: false,
                                })
                              }}
                              onClick={() => {
                                setSwalProps({
                                  show: true,
                                  title: "แจ้งเตือน",
                                  icon: "success",
                                  text: "คืนค่ารหัสผ่านสำเร็จ",
                                })
                                reset(data.employee_number);
                              }}
                            />
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="cursor-pointer active:opacity-5"
                              onClick={() => {
                                dispatch({
                                  type: "setEditEmployee",
                                  payload: data.employee_number,
                                });
                                dispatch({
                                  type: "setStateNewEmployee",
                                  payload: "1",
                                });
                              }}
                            />
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="cursor-pointer"
                              onClick={() => {
                                deleteItem(data.employee_number);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ))}
            </>
          )}
          </div>
        </div>

        <div className="mt-10 bg-gray-200 pl-5 pt-3 pb-3 w-1/6">
          <span className="text-xs font-bold mb-5">หมายเหตุ</span>
          <ul className="text-xs mt-2">
            <li>รหัสพนักงานขึ้นต้นด้วยตัวอักษร G</li>
            <li>รหัสสแกนนิ้วขึ้นต้นด้วยตัวเลข 0-9</li>
          </ul>
        </div>
        <SweetAlert2 {...swalProps} />
      </div>
    </>
  );
}
