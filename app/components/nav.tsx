import Image from "next/image";

export default function Nav(){


    return (
        <>
        <div className="w-full bg-main-color block grid grid-cols-12 p-5 pl-10 shadow-xl fixed">
            <div className="col-span-2">
                <Image src={require('./../../public/logo.png')} alt={''} className="w-40"/>
            </div>
        </div>
        </>
    )
}