import React from "react";
import {
  AboutPage,
  CartPage,
  ContactPage,
  HomePage,
  MyOrder,
  MyProfile,
  NotFoundPage,
  WishListPage,
  CheckoutPage,
  TermsPage,
  PrivacyPage,
} from "../pages";


import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import LoginPage from "../components/auth/LoginPage";
import AuthLayout from "../layout/AuthLayout";
import Signup from "../components/auth/Signup";
import ForgotPassword from "../components/auth/ForgotPassword";
import ProductPage from "../components/products/ProductPage"
import ProductDetails from "../components/products/ProductDetails";


const Routering = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <AuthLayout>
          <HomePage />
        </AuthLayout>} />
        <Route path="/about" element={
          <AuthLayout>
          <AboutPage />
        </AuthLayout>} />
        <Route
          path="/productpage"
          element={
            <AuthLayout>
           <ProductPage/>
          </AuthLayout>
          }
        />
         <Route path="/login" element={
     
                 <LoginPage/>
          
         }/>

         <Route path="/signup" element={<Signup/>}/>
         <Route path="/forgotpassword" element={<ForgotPassword/>}/>
         
         <Route path="/term" element={
           <AuthLayout>
             <TermsPage />
           </AuthLayout>
         }/>
         <Route path="/privacy" element={
           <AuthLayout>
             <PrivacyPage />
           </AuthLayout>
         }/>

        <Route path="/contact" element={
          <AuthLayout>
          <ContactPage />
        </AuthLayout>} />
        <Route path="/profile" element={
          <ProtectedRoutes>
              <AuthLayout>
          <MyProfile />
        </AuthLayout>
          </ProtectedRoutes>
        } />
        <Route path="/order" element={
       <ProtectedRoutes>
           <AuthLayout>
          <MyOrder />
        </AuthLayout> 
       </ProtectedRoutes>  } />
        <Route path="/wishlist" element={
      <ProtectedRoutes>
            <AuthLayout>
          <WishListPage />
        </AuthLayout>
      </ProtectedRoutes>} />

      



        <Route path="/cart" element={
          <AuthLayout>
          <CartPage />
        </AuthLayout>} />

        <Route path="/checkout" element={
          <ProtectedRoutes>
            <AuthLayout>
              <CheckoutPage />
            </AuthLayout>
          </ProtectedRoutes>
        } />
    

    <Route path="/product/:id" element={
      <AuthLayout>    <ProductDetails /> </AuthLayout>
     
      
      } />

        <Route path="*" element={
          <AuthLayout>
          <NotFoundPage/>
        </AuthLayout>}/>
      </Routes>
    </div>
  );
};

export default Routering;
