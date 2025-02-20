// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Modal, Spin } from "antd";
// import DashboardLayout from "@/components/Dashboard/DashboardLayout";
// import Candidates from "@/components/Dashboard/Candidates";
// import JobPostForm from "@/components/Dashboard/JobPostForm";
// import JobsTable from "@/components/Dashboard/Jobs";
// import Category from "@/components/Dashboard/Category";

// const ClientPortal = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState<any>(null);
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");

//     if (!storedUser || !storedToken) {
//       Modal.error({
//         title: "Unauthorized Access",
//         content:
//           "You are not authorized to access this page. Redirecting to login...",
//         onOk: () => router.push("/admin"),
//       });
//     } else {
//       setUser(JSON.parse(storedUser));
//       setToken(storedToken);
//     }

//     setLoading(false);
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (!user || !token) {
//     return null;
//   }

//   const renderComponent = (activeComponent: string) => {
//     switch (activeComponent) {
//       case "candidates":
//         return <Candidates />;
//       case "jobPost":
//         return <JobPostForm />;
//       case "jobs":
//         return <JobsTable />;
//       case "category":
//         return <Category />;
//       default:
//         return <Candidates />;
//     }
//   };

//   return <DashboardLayout>{renderComponent}</DashboardLayout>;
// };

// export default ClientPortal;
