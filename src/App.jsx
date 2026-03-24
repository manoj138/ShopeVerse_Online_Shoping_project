import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Routering from "./routing/Routering";
import { Toaster } from 'react-hot-toast';
import ScrollToTop from "./common/ScrollToTop";



function App() {

  return (
   <>
 <div className='bg-gradient-to-b from-[#0b1220] to-[#060b16]'>
    <BrowserRouter>
      <ScrollToTop />
     <Routering/>
  <Toaster
        position="top-right"
        
      />

   
   </BrowserRouter>
 </div>
   </>
  )
}

export default App
