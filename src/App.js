import { Route, Routes } from "react-router-dom";
import "./App.css";

import SignUp from "./Pages/Auth/SignUp";
import WelcomeSlideshow from "./Pages/Auth/Login";
import AccountType from "./Pages/Auth/AccountType";
import ChildAuth from "./Pages/Auth/ChildAuth";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import OPT from "./Pages/Auth/OPT";
import CreateNewPass from "./Pages/Auth/CreateNewPass";
import HomePage from "./Pages/WebSite/HomePage";
import DoctorAuth from "./Pages/Auth/DoctorAuth";
import HomeParent from "./Pages/WebSite/HomeParent";
// import LoadingAnimation from "./Components/WebSite/LoadingAnimation";
import HomeSlide from "./Pages/WebSite/HomeSlide";
import Swiperr from "./Pages/WebSite/Swiper";
import EducationRsources from "./Pages/WebSite/EducationResources";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/homeparent" element={<HomeParent />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/continue" element={<AccountType />} />
        <Route path="/signup/childauth" element={<ChildAuth />} />
        <Route path="/signup/doctor" element={<DoctorAuth />} />
        <Route path="/login" element={<WelcomeSlideshow />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/signup/opt" element={<OPT />} />
        <Route path="/createnewpass" element={<CreateNewPass />} />
        <Route path="/evaluate" element={<EducationRsources />} />
      </Routes>
    </div>
  );
}

export default App;
