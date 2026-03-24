import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  NavLink, useNavigate,} from 'react-router-dom'
import {  loginFail, loginSuccess } from '../../features/authSlice';
import toast from 'react-hot-toast';

const LoginPage = () => {
   const dispatch = useDispatch ();
   const navigate = useNavigate()
 
const [withEmail, setWithEmail] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  console.log("🚀 ~ LoginPage ~ error:", error)

  const user = useSelector((state)=> state.auth)

  const submitHandler = (e)=>{
   e.preventDefault();

   if (!email || !password) {
    setError("all field are required");
    return
   }

  if(user?.user?.email === email && user?.user?.password === password){
    dispatch(loginSuccess(email, password));
    setError("")
    navigate("/")
    toast.success("Login successful!");

    
  }else{
    dispatch(loginFail(email, password));
    setError("invalid email password")
    toast.error("invalid Email And PAssword")
  }
  setEmail("")
  setPassword("")
  } 

  return (
    <div className="min-h-screen bg-[#111827] flex flex-col items-center justify-center px-4">

  <div className="flex items-center gap-2 mb-6">
    <h1 className="text-2xl font-bold bg-linear-to-r from-[#4F46E5] to-[#9333EA] px-4 py-2 rounded-2xl text-white">S</h1>
    <h1 className="text-2xl font-bold tracking-wide text-[#7C3AED]">ShopVerse</h1>
  </div>

  <div className="w-full max-w-md space-y-6 bg-[#1f2937] p-6 rounded-xl shadow-lg">

    <div className="text-center space-y-1">
      <h2 className="text-2xl font-semibold text-gray-100">Welcome Back</h2>
      <p className="text-sm text-gray-400">Sign in to your account to continue</p>
    </div>

    <div className="flex justify-between text-sm font-medium cursor-pointer text-gray-300">
      <h2
        className={`${withEmail ? "underline text-indigo-400" : ""}`}
        onClick={() => setWithEmail(true)}
      >
        Email Password
      </h2>
      <h2
        className={`${!withEmail ? "underline text-indigo-400" : ""}`}
        onClick={() => setWithEmail(false)}
      >
        Login With OTP
      </h2>
    </div>

    <div className="space-y-4">
      {withEmail ? (
        <form className="flex flex-col gap-5" onSubmit={submitHandler}>
          <label className="flex flex-col gap-1 text-sm text-gray-300">
            Email Address
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              placeholder="Enter your email"
              className="px-3 py-2 bg-[#111827] border border-gray-600 rounded-md outline-none text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-gray-300">
            Password
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              placeholder="Enter your password"
              className="px-3 py-2 bg-[#111827] border border-gray-600 rounded-md outline-none text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <input type="checkbox" className="accent-indigo-500" />
              <span>Remember me</span>
            </div>
            <NavLink to="/forgotpassword" className="hover:underline text-indigo-400">
              Forgot Password?
            </NavLink>
          </div>

          <input
            type="submit"
            value="Sign In"
            className="w-full bg-indigo-600 text-white py-2 rounded-md cursor-pointer font-medium hover:bg-indigo-700 active:scale-[0.98] transition"
          />
        </form>
      ) : (
        <>
          <label className="flex flex-col gap-1 text-sm text-gray-300">
            Phone
            <input
              type="text"
              placeholder="Enter Your Phone Number"
              className="px-3 py-2 bg-[#111827] border border-gray-600 rounded-md outline-none text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
            />
            <button className="mt-2 bg-indigo-600 text-white py-2 rounded-md text-sm hover:bg-indigo-700 transition">
              <NavLink to="/">Send OTP</NavLink>
            </button>
          </label>
          <p className="text-xs text-gray-400">
            We'll send a 6-digit OTP to your phone number
          </p>
        </>
      )}
    </div>

    <div className="space-y-3 text-center">
      <h2 className="text-sm font-medium text-gray-400">Or continue with</h2>
      <div className="flex gap-4 justify-center">
        <button className="border border-gray-600 px-4 py-2 rounded-md text-sm text-gray-200 hover:bg-gray-700 transition">
          Google
        </button>
        <button className="border border-gray-600 px-4 py-2 rounded-md text-sm text-gray-200 hover:bg-gray-700 transition">
          Facebook
        </button>
      </div>
    </div>

    <div className="text-center text-sm text-gray-400">
      Don't have an account?{" "}
      <NavLink to="/signup" className="font-medium text-indigo-400 hover:underline">
        Sign up
      </NavLink>
    </div>

  </div>
</div>

  )
}

export default LoginPage
