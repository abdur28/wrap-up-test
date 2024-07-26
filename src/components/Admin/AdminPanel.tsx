'use client'

import { useEffect, useState } from "react";
import AdminProducts from "./AdminProducts";
import AdminServices from "./AdminServices";
import AdminInfo from "./AdminInfo";
import AdminOrders from "./AdminOrders";
import AdminReviews from "./AdminReviews";

const AdminPanel = ({info}: any) => {
    const sections = ["infomation", "products", "services", "orders", "reviews"];
    const [selectedSection, setSelectedSection] = useState("infomation");

    return (
    <div className="w-full h-[100vh] flex justify-center items-center px-10">
        <div className=" bg-secondary rounded-2xl flex-row flex w-full h-full ">
            <div className="flex flex-col rounded-s-2xl shadow-gray-400 shadow-md w-1/5 m-3 ">
                <div className="text-xl font-semibold border-b border-black p-5 mb-5">
                    Admin Panel
                </div>
                <div className="flex flex-col gap-2">
                    {sections.map((section) => (
                    <div className={`${selectedSection === section ? "bg-fourth" : "hover:bg-fourth/25"} flex h-12 px-5 items-center  cursor-pointer `}
                    onClick={() => setSelectedSection(section)}
                    key={section}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col  w-4/5">
                {selectedSection === "products" ? <AdminProducts /> 
                : selectedSection === "services" ? <AdminServices /> 
                : selectedSection === "infomation" ? <AdminInfo infoAsString={info}/>
                : selectedSection === "orders" ? <AdminOrders /> 
                : selectedSection === "reviews" ? <AdminReviews/>
                : null}
            </div>
        </div>
    </div>
    );
};

export default AdminPanel;