import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { registerSuccess } from '../../features/authSlice';

const Signup = () => {

  const dispatch = useDispatch();
    const navigate = useNavigate();

   const [formData, setFormData]= useState({
    fname: "",
    email:"",
    phone:" ",
    password :"",
    confirmPassword:""
   })


   const inputHandler=(e)=>{
           const {name, value} = e.target;
           setFormData((prev)=>({
            ...prev,
            [name]:value
           }))
   }

const SubmitSignHandler = (e) => {
  e.preventDefault();

  const { fname, email, phone, password, confirmPassword } = formData;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  dispatch(registerSuccess({ fname, email, phone, password }));

  navigate("/login");
};

  return (
  <div className="min-h-screen bg-[#111827] py-6 flex flex-col items-center justify-center px-4">

  <div className="flex items-center gap-2 mb-6">
    <h1 className="text-2xl font-bold bg-linear-to-r from-[#4F46E5] to-[#9333EA] px-4 py-2 rounded-2xl text-white">S</h1>
    <h1 className="text-2xl font-bold tracking-wide text-[#7C3AED]">ShopVerse</h1>
  </div>

  <div className="w-full max-w-md bg-gray-800  rounded-xl shadow-lg p-6 space-y-6">

    <div className="space-y-1 text-center">
      <h2 className="text-2xl font-semibold text-white">Create Account</h2>
      <p className="text-sm text-gray-500">Join ShopVerse to start shopping</p>
    </div>

    <form
     onSubmit={SubmitSignHandler}
     className="flex flex-col  gap-4">

      <label className="flex flex-col gap-1 text-sm font-medium text-white">
        Full Name
        <input
        onChange={inputHandler}
        name='fname'
        value={formData.fname}
          type="text"
          placeholder="Enter your Full Name"
          required
          className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-white">
        Email Address
        <input
          type="email"
          onChange={inputHandler}
          name='email'
          value={formData.email}
          placeholder="Enter your email"
          required
          className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-white">
        Phone Number
        <input
          type="phone"
          onChange={inputHandler}
          name='phone'
          value={formData.phone}
          placeholder="Enter your Phone number"
          required
          className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-white">
        Password
        <input
          type="password"
          onChange={inputHandler}
          name='password'
          value={formData.password}
          placeholder="Enter your Password"
          required
          className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-white">
        Confirm Password
        <input
          type="password"
          onChange={inputHandler}
          name='confirmPassword'
          value={formData.confirmPassword}
          placeholder="Enter your confirm Password"
          required
          className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </label>

   <span className="flex items-start gap-2 text-sm text-white">
     <input type="checkbox" className="mt-1 accent-indigo-600" />
     <span>
       I agree to the{" "}
       <NavLink to="/term" className="font-medium text-indigo-600 hover:underline">
         Terms of Service
       </NavLink>{" "}
       and{" "}
       <NavLink to="/privacy" className="font-medium text-indigo-600 hover:underline">
         Privacy Policy
       </NavLink>
     </span>
   </span>

<input
  type='submit'
  value="Create Account"
  className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 active:scale-[0.98] transition"
/>
 
    </form>

    <div className="space-y-3 text-center">
      <h2 className="text-sm font-medium text-gray-500">Or continue with</h2>
      <div className="flex gap-4 justify-center">
        <button className="border px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition">
          Google
        </button>
        <button className="border px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition">
          Facebook
        </button>
      </div>
    </div>

    <div className="text-center text-sm text-gray-600">
      Already have an account?{" "}
      <NavLink to="/login" className="font-medium text-indigo-600 hover:underline">
        Sign in
      </NavLink>
    </div>

  </div>
</div>

  )
}

export default Signup
