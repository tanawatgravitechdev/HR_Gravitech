"use client";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import db from "@/firebase/index";
import SweetAlert2 from "react-sweetalert2";
import { useEffect, useState } from "react";

export default function Edit() {
  const stateStore = useSelector((state: any) => state.storage);
  const dispatch = useDispatch();

  const [employeeNumber, setEmployeeNumber] = useState("");
  const [fullNameEN, setFullNameEn] = useState("");
  const [fullNameTH, setFullNameTH] = useState("");
  const [department, setDepartment] = useState("");
  const [primaryKey, setPrimaryKey] = useState("");
  const [password, setPassword] = useState("");
  const [dateCreate, setDateCreate] = useState("");

  const [swalProps, setSwalProps] = useState({});

  function writeDataToFirebase() {
    let jsonTemp: any = {};
    let key: string = employeeNumber;
    jsonTemp[key] = {
      employee_number: employeeNumber,
      full_name_en: fullNameEN,
      full_name_th: fullNameTH,
      department: department,
      date_update: new Date().toISOString(),
      date_create: dateCreate,
      password: password,
    };
    db.write(jsonTemp);
  }

  function writeNewDataToFirebase() {
    let jsonTemp: any = {};
    let key: string = employeeNumber;
    jsonTemp[key] = {
      employee_number: employeeNumber,
      full_name_en: fullNameEN,
      full_name_th: fullNameTH,
      department: department,
      date_create: new Date().toISOString(),
      password: fullNameEN.split(' ').length > 1 ? (fullNameEN.split(' ')[0] + "_" + fullNameEN.split(' ')[1].substring(0,1)).toLowerCase() : 'password'
    };
    db.write(jsonTemp);
  }

  function clearDataToFirebase(key: string) {
    let jsonTemp: any = {};
    jsonTemp[key] = {};
    db.write(jsonTemp);
  }

  useEffect(() => {
    if (stateStore.editEmployee) {
      console.log(`member\\${stateStore.editEmployee}`);
      db.get(`member/${stateStore.editEmployee}`).then((snapshot) => {
        let json: any = snapshot.val();
        setPrimaryKey(json.employee_number);
        setEmployeeNumber(json.employee_number);
        setFullNameEn(json.full_name_en);
        setFullNameTH(json.full_name_th);
        setDepartment(json.department);
        setPassword(json.password);
        setDateCreate(json.date_create)
      });
    }
  }, [stateStore.editEmployee]);

  return (
    <>
      <div>
        <div className="text-gray-500 p-10 text-xs">
          <span className="mr-3">รายชื่อพนักงาน</span>
          <FontAwesomeIcon icon={faAngleRight} className="mr-3" />
          <span className="mr-3">แก้ไข</span>
        </div>
        <div className="w-full">
          <div className="w-4/6 shadow-lg p-10 m-auto rounded-lg pr-20">
            <div className="grid grid-cols-4 gap-5">
              <span className="leading-10 text-right text-xs">
                *กรุณากรอกรหัสเข้าสู่ระบบ
              </span>
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="รหัสที่สร้างจากเครื่องสแกนหน้า"
                  className="text-xs rounded w-full border-gray-300 border-2 p-2"
                  value={employeeNumber}
                  onChange={(e) => {
                    setEmployeeNumber(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-5 mt-5">
              <span className="leading-10 text-right text-xs">
                *ชื่อ-นามสกุล <a className="text-gray-400">(ภาษาอังกฤษ)</a>
              </span>
              <div className="col-span-3">
                <input
                  type="text"
                  placeholder="รหัสที่สร้างจากเครื่องสแกนหน้า"
                  className="text-xs rounded w-full border-gray-300 border-2 p-2"
                  value={fullNameEN}
                  onChange={(e) => {
                    setFullNameEn(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-5 mt-5">
              <span className="leading-10 text-right text-xs">
                *ชื่อ-นามสกุล <a className="text-gray-400">(ภาษาไทย)</a>
              </span>
              <div className="col-span-3">
                <input
                  type="text"
                  placeholder="รหัสที่สร้างจากเครื่องสแกนหน้า"
                  className="text-xs rounded w-full border-gray-300 border-2 p-2"
                  value={fullNameTH}
                  onChange={(e) => {
                    setFullNameTH(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-5 mt-5 mb-16">
              <span className="leading-10 text-right text-xs">แผนก</span>
              <div className="col-span-3 grid grid-cols-3">
                <input
                  type="text"
                  placeholder="แผนก"
                  className="text-xs rounded w-full border-gray-300 border-2 p-2"
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-4/6 m-auto pt-10">
          <div className="float-right text-xs">
            {/* <button className="w-30 p-3 text-main-text-color">
              ลบรายการนี้
            </button> */}
            <button
              className="w-40 p-3 bg-main-text-color text-white font-bold rounded-md mr-5 ml-5"
              onMouseDown={() => {
                setSwalProps({
                  show: false,
                });
              }}
              onClick={() => {
                if (
                  [employeeNumber, fullNameEN, fullNameTH, department].includes(
                    ""
                  )
                ) {
                  setSwalProps({
                    show: true,
                    title: "แจ้งเตือน",
                    icon: "warning",
                    text: "กรุณากรอกข้อมูลให้ครบ",
                  });
                } else {
                  if (primaryKey != "") {
                    if(primaryKey != employeeNumber){

                      clearDataToFirebase(primaryKey);
                    }
                    setSwalProps({
                      show: true,
                      title: "แจ้งเตือน",
                      icon: "success",
                      text: "แก้ไขสำเร็จ",
                    });
                    writeDataToFirebase();
                  }else{
                    setSwalProps({
                      show: true,
                      title: "แจ้งเตือน",
                      icon: "success",
                      text: "บันทึกสำเร็จ",
                    });
                    writeNewDataToFirebase();
                  }
                }
              }}
            >
              บันทึก
            </button>
            <button
              onClick={() => {
                dispatch({ type: "setStateNewEmployee", payload: "0" });
              }}
              className="bg-main-color text-white p-3 w-40 rounded-lg transition delay-300 duration-300 ease-in-out"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
      <SweetAlert2 {...swalProps} />
    </>
  );
}
