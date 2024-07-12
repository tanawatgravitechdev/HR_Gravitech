"use client";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type typeList = {
    name: string,
    icon: any,
    active: boolean
}

export default function ListItemComponent({name, icon, active}: typeList) {
  return (
    <>
      <div className={`mt-2 font-bold grid grid-cols-10 gap-2 cursor-pointer ${active ? 'bg-green-500': ''}`}>
        <div className="col-span-1"></div>
        <div className="col-span-2 text-right leading-8">
          <FontAwesomeIcon
            icon={icon}
            className="text-white w-4 text-right mt-3 ml-5"
          />
        </div>
        <span className="text-white font-light col-span-7 leading-10">
          {name}
        </span>
      </div>
    </>
  );
}
