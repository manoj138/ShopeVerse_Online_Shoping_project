import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, updateProfile } from "../features/authSlice";
import { useNavigate, NavLink } from "react-router-dom";

const MyProfile = () => {

const { user } = useSelector((state) => state.auth);
const dispatch = useDispatch();
const navigate = useNavigate();

const [edit,setEdit] = useState(false);

const [form,setForm] = useState({
 fname:user?.fname,
 email:user?.email,
 phone:user?.phone
});

const logout = () => {
 dispatch(removeUser());
 navigate("/login");
};

const saveProfile = ()=>{
 dispatch(updateProfile(form));
 setEdit(false);
};

return (
<div className="min-h-screen pb-20 bg-gradient-to-b from-[#0b1220] to-[#050814] text-white flex flex-col lg:flex-row px-6 md:px-12 lg:px-24 gap-8">

{/* LEFT SIDEBAR */}
<div className="w-full lg:w-80 bg-gradient-to-b from-[#141a26] to-[#0f172a] rounded-3xl p-8 flex flex-col items-center shadow-2xl border border-gray-800 h-fit">

<div className="w-28 h-28 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-4xl font-bold shadow-xl ring-4 ring-purple-500/20 mb-4">
{user?.fname?.charAt(0) || "U"}
</div>

<h2 className="text-2xl font-bold text-center">{user?.fname || "User"}</h2>
<p className="text-gray-400 text-sm mb-8 text-center">{user?.email || "user@example.com"}</p>

<div className="w-full space-y-3">
  <NavLink 
    to="/profile" 
    className={({ isActive }) => `block w-full py-3 rounded-xl text-left px-5 transition-all font-medium ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
  >
    Profile
  </NavLink>
  
  <NavLink 
    to="/order" 
    className={({ isActive }) => `block w-full py-3 rounded-xl text-left px-5 transition-all font-medium ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
  >
    Orders
  </NavLink>
  
  <NavLink 
    to="/wishlist" 
    className={({ isActive }) => `block w-full py-3 rounded-xl text-left px-5 transition-all font-medium ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
  >
    Wishlist
  </NavLink>

<button onClick={logout} className="w-full py-3 text-left px-5 text-red-400 font-medium hover:bg-red-500/10 rounded-xl transition-colors mt-4">
Logout
</button>

</div>
</div>

{/* RIGHT CONTENT */}
<div className="flex-1 bg-[#141a26] rounded-3xl p-8 lg:p-12 relative shadow-2xl border border-gray-800">

<div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-6">
  <h1 className="text-3xl font-bold">Personal Information</h1>
  
  {!edit ? (
  <button onClick={()=>setEdit(true)}
  className="border border-indigo-500 px-6 py-2 rounded-xl text-indigo-400 hover:bg-indigo-500 hover:text-white transition-colors font-medium">
  Edit Profile
  </button>
  ):(
  <button onClick={saveProfile}
  className="bg-green-500 px-8 py-2 rounded-xl text-white font-medium hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20">
  Save
  </button>
  )}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

{/* NAME */}
<div className="bg-[#1b2435] p-6 rounded-2xl border border-gray-800/50">
<p className="text-gray-400 mb-2 text-sm font-medium">Full Name</p>
{edit ?
<input value={form.fname}
onChange={(e)=>setForm({...form,fname:e.target.value})}
className="bg-[#0b1220] border border-gray-700 p-3 rounded-xl w-full outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
:
<p className="text-xl font-semibold">{user?.fname}</p>}
</div>

{/* EMAIL */}
<div className="bg-[#1b2435] p-6 rounded-2xl border border-gray-800/50">
<p className="text-gray-400 mb-2 text-sm font-medium">Email Address</p>
{edit ?
<input value={form.email}
onChange={(e)=>setForm({...form,email:e.target.value})}
className="bg-[#0b1220] border border-gray-700 p-3 rounded-xl w-full outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
:
<p className="text-xl font-semibold">{user?.email}</p>}
</div>

{/* PHONE */}
<div className="bg-[#1b2435] p-6 rounded-2xl border border-gray-800/50 md:col-span-2 lg:col-span-1">
<p className="text-gray-400 mb-2 text-sm font-medium">Phone Number</p>
{edit ?
<input value={form.phone}
onChange={(e)=>setForm({...form,phone:e.target.value})}
className="bg-[#0b1220] border border-gray-700 p-3 rounded-xl w-full outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
:
<p className="text-xl font-semibold">{user?.phone || "+91 9876543210"}</p>}
</div>

</div>

</div>

</div>
);
};

export default MyProfile;
