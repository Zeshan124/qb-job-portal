// "use client";

// import { useEffect, useState } from "react";
// import { message } from "antd";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// const Profile = () => {
//   const router = useRouter();
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     userName: "",
//     email: "",
//     role: "",
//   });

//   useEffect(() => {
//     // Fetch user data from localStorage
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//       setFormData({
//         userName: parsedUser.userName,
//         email: parsedUser.email,
//         role: parsedUser.role,
//       });
//     }
//     setLoading(false);
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSaveChanges = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         message.error("Authentication failed! Please log in again.");
//         return;
//       }

//       await axios.patch(
//         `${process.env.NEXT_PUBLIC_URL_API}/apis/user/updateProfile`,
//         formData,
//         {
//           headers: {
//             "x-access-token": token,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       message.success("Profile updated successfully!");
//       setUser(formData);
//       setEditing(false);

//       // Update localStorage
//       localStorage.setItem("user", JSON.stringify({ ...user, ...formData }));
//     } catch (error) {
//       message.error("Failed to update profile!");
//       console.error("Update error:", error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     message.success("Logged out successfully!");
//     router.push("/admin");
//   };

//   if (loading) return <p>Loading profile...</p>;

//   return (
//     <div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//       <h2 className="text-2xl font-bold text-center text-gray-700">Profile</h2>

//       {/* Profile Picture Placeholder */}
//       <div className="flex justify-center mt-4">
//         <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-lg">
//           {formData.userName?.charAt(0).toUpperCase()}
//         </div>
//       </div>

//       <div className="mt-6">
//         <label className="block text-sm font-medium text-gray-600">
//           Username
//         </label>
//         <input
//           type="text"
//           name="userName"
//           value={formData.userName}
//           onChange={handleInputChange}
//           disabled={!editing}
//           className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-indigo-200"
//         />
//       </div>

//       <div className="mt-4">
//         <label className="block text-sm font-medium text-gray-600">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//           disabled
//           className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100"
//         />
//       </div>

//       <div className="mt-4">
//         <label className="block text-sm font-medium text-gray-600">Role</label>
//         <input
//           type="text"
//           name="role"
//           value={formData.role}
//           disabled
//           className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100"
//         />
//       </div>

//       <div className="flex justify-between mt-6">
//         {editing ? (
//           <>
//             <button
//               onClick={handleSaveChanges}
//               className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//             >
//               Save Changes
//             </button>
//             <button
//               onClick={() => setEditing(false)}
//               className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
//             >
//               Cancel
//             </button>
//           </>
//         ) : (
//           <button
//             onClick={() => setEditing(true)}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             Edit Profile
//           </button>
//         )}
//         <button
//           onClick={handleLogout}
//           className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;
