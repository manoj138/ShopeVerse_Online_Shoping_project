import { createSlice } from "@reduxjs/toolkit";
import { LogOut } from "lucide-react";

export const loadUserFromLocalStorage = ()=>{
    try{
        let user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;

    }catch(error) {
          console.log(error.meassage);
          
    }
}
const savedUser = loadUserFromLocalStorage();

let initialState = {
  user: savedUser,
  isAuthenticated: !!savedUser,
  isLoading : false,
  error: null
};


export const authSlice = createSlice({ 
    name: "auth",
    initialState,

    reducers: {
         loginStart :(state) =>{
          (state.isLoading =true),
          (state.error = null),
          (state.isAuthenticated= false);
        },

        loginSuccess :(state, action) =>{
         (state.user = action.payload),
         (state.isAuthenticated= true),
         (state.isLoading = false),
         (state.error = null);
        },

          loginFail :(state, action) =>{
      
         (state.isAuthenticated= false),
         (state.isLoading = false),
         (state.error = action.payload);
        },

          logOut:(state) =>{
    
         (state.isAuthenticated= false),
         (state.isLoading = false),
         (state.error = null);
        },
           registerSuccess :(state, action) =>{
         (state.user = action.payload),
         (state.isAuthenticated= true),
          (state.isLoading = false),
         (state.error = null),
         localStorage.setItem("user", JSON.stringify(action.payload))
        },
        
          registerFail:(state, action) =>{
      
         (state.isAuthenticated= false),
         (state.isLoading = false),
         (state.error = action.payload);
        },
        removeUser:(state)=>{
            (state.user=null),
            (state.error=null),
            (state.isAuthenticated = false),
            (state.isLoading = false)
            localStorage.removeItem("user")
        },
        updateProfile:(state, action)=>{
   state.user = {...state.user, ...action.payload}
   localStorage.setItem("user", JSON.stringify(state.user))
}


    }
})

export const {
     loginStart,
  loginFail,
  registerFail,
  loginSuccess,
  registerSuccess,
   logOut,
  removeUser,
updateProfile,
}  = authSlice.actions;

export default authSlice.reducer;