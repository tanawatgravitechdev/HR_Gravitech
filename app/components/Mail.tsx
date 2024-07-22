"use client"
import {
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
  faClock,
  faFilter,
  faSearch,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import db from "@/firebase/index";

export default function Mail() {
  const [jsonData, setJsonData] = useState([]);
  const [search, setSearch] = useState("");

  function compareDateTimes(a: any, b: any) {
    // แปลงวันที่จากรูปแบบ DD/MM/YYYY เป็นวัตถุ Date
    const partsA = a.date_stamp.split('/');
    const partsB = b.date_stamp.split('/');
  
    const dateA = new Date(partsA[2], partsA[1] - 1, partsA[0]);
    const dateB = new Date(partsB[2], partsB[1] - 1, partsB[0]);
  
    // เปรียบเทียบวันที่
    return dateB - dateA;
  }

  useEffect(() => {
    db.get(`registed`).then((snapshot) => {
      let jsonTmp = {...snapshot.val()}
      Object.keys(snapshot.val()).forEach((key)=>{
        jsonTmp[key]['key'] = key;
      })
      
      setJsonData(Object.values(jsonTmp).sort(compareDateTimes));
    });
  }, []);

  useEffect(() => {
    console.log(jsonData);
  }, [jsonData]);
  return (
    <>
      <div className="pl-10 pr-10 pt-10 ">
        <div className="grid grid-cols-12 gap-5">
          {/* <div className="bg-white shadow-md leading-10 rounded text-xs text-center col-span-1 cursor-pointer">
            <input type="checkbox" className="mr-2" />
            <span>เลือกทั้งหมด</span>
          </div>
          <div className="bg-white shadow-md leading-10 rounded text-xs text-center col-span-1 cursor-pointer">
            <FontAwesomeIcon icon={faTrash} className="w-3 mr-3 inline-block" />
            <span>ลบ</span>
          </div> */}
          <div className="bg-white shadow-md leading-10 rounded text-xs text-center col-span-1 cursor-pointer">
            <FontAwesomeIcon icon={faClock} className="w-3 mr-3 inline-block" />
            <span className="text-xs">ล่าสุด</span>
          </div>
          <div className=" col-span-8">
            <div className="relative bg-white overflow-hidden border-2  rounded-md relative border-slate-100	">
              <FontAwesomeIcon
                icon={faSearch}
                className="w-4 absolute z-10 mt-3 ml-2 text-gray-400"
              />
              <input
                type="text"
                className="leading-10 w-full relative pl-10 outline-none font-light text-sm"
                placeholder="Search"
                value={search}
                onChange={(e)=>{
                  setSearch(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="bg-white shadow-md leading-10 rounded-xs text-md text-gray-500 text-center col-span-1">
            <FontAwesomeIcon
              icon={faFilter}
              className="w-3 mr-3 inline-block"
            />
            <span className="text-xs">Filter</span>
          </div>
        </div>
        <div className="text-md grid grid-cols-2 w-20 float-right mb-5">
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="text-md w-3 text-gray-400"
          />
          <FontAwesomeIcon
            icon={faAngleRight}
            className="text-md w-3 text-gray-400"
          />
        </div>

        <div className="mt-10">
          <div className="w-full bg-gray-200 grid grid-cols-10 p-5 text-xs">
            <div className="col-span-1"></div>
            <div className="col-span-2">ผู้ส่ง</div>
            <div className="col-span-5">ข้อความ</div>
            <div className="col-span-2">วันที่ส่ง</div>
            {/* <div className="col-span-1"></div> */}
          </div>
        </div>
        <div className="h-96 overflow-scroll shadow-xl">
          {jsonData
            .map((item: any, index: number) => (
              <>
                {
                  (search === "" || (item["name_th"] as string).includes(search) || (item["position"][0] as string).includes(search)) && (
                    <>
                      <div className="w-full bg-white grid grid-cols-10 p-5 text-xs shadow-xl border-b-2 border-gray-100">
                  <div className="col-span-1">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="w-4 ml-3 text-gray-200"
                    />
                  </div>
                  <div className="col-span-2">
                    <p>
                      {item["name_th"]
                        ? item["name_th"]
                        : "N/A"}
                    </p>
                    <p>
                      {item["email"]
                        ? item["email"]
                        : "N/A"}
                    </p>
                  </div>
                  <div className="col-span-5">
                    <p className="mb-2 font-light">📣 ได้สมัครงานในตำแหน่ง {item["position"][0]}</p>
                    <div className="grid grid-cols-2 w-60 gap-5">
                      <a
                        href={`https://register-gravitech-hr.vercel.app/reviewer/${item['key']}`}
                        target="blank"
                        className="border-red-400 bg-white border-2 rounded-md text-xs text-center leading-8"
                      >
                        🔸Super resume
                      </a>
                      <a
                        href={`https://register-gravitech-hr.vercel.app/reviewer_iso/${item['key']}`}
                        target="blank"
                        className="border-green-400 bg-white border-2 rounded-md text-xs text-center leading-8"
                      >
                        🔹Job form
                      </a>
                    </div>
                  </div>
                  <div className="col-span-2">
                    {item["date_stamp"]
                      ? item["date_stamp"]
                      : "N/A"}
                  </div>
                </div>
                    </>
                  )
                }
              </>
            ))}
        </div>
      </div>
    </>
  );
}
