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
// import HomeSlide from "./Pages/WebSite/HomeSlide";
// import Swiperr from "./Pages/WebSite/Swiper";
import EducationRsources from "./Pages/WebSite/EducationResources";
import EvaluateArticle from "./Pages/WebSite/EvaluateArticle";
import WebSiteRoutes from "./WebSiteRoutes";
import Evaluate from "./Pages/WebSite/Evaluate";
import Autism from "./Pages/WebSite/Autism";
import AutismTest from "./Pages/WebSite/AutismTest";
import AutismLevel from "./Pages/WebSite/AutismLevel";
import AutismResult from "./Pages/WebSite/AutismTestResult";
import ChildProgress from "./Pages/WebSite/ChildProgress";
import Charity from "./Pages/WebSite/Charity";
import ChartiyId from "./Pages/WebSite/CharityId";
import Medican from "./Pages/WebSite/Medican";
import MedicanId from "./Pages/WebSite/MedicanId";
import ChatBot from "./Pages/WebSite/ChatBot";
import DoctorForParentView from "./Pages/WebSite/DoctorForParentView";
import DoctorProfileForParentView from "./Pages/WebSite/DoctorProfileForParentView";
import HomeDoctor from "./Pages/WebSite/DoctorPages/HomeDoctor";
import AllUpcomingSessions from "./Pages/WebSite/DoctorPages/AllUpcomingSessions";
import CommentsForSession from "./Pages/WebSite/DoctorPages/CommentsForSession";
import AllSessionsDone from "./Pages/WebSite/DoctorPages/AllSessionsDone";
import AllRegisteredChilds from "./Pages/WebSite/DoctorPages/AllRegisteredChilds";
import Childregistered from "./Pages/WebSite/DoctorPages/Childregistered";
import MyProfile from "./Components/WebSite/MyProfile";
import HeaderLoading from "./Components/SceletonsLoading/HeaderLoading";
import AutismLoading from "./Components/SceletonsLoading/AutismLoading";
import AutismTestloading from "./Components/SceletonsLoading/AutismTestLoading";
import DoctorIsProfile from "./Pages/WebSite/DoctorPages/DoctorIsProfile";
import PaymentCheck from "./Pages/WebSite/PaymentCheck";
import PaymentCheckOut from "./Pages/WebSite/PaymentCheckOut";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Auth Pages  */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account-type" element={<AccountType />} />
        <Route path="/signup/childauth" element={<ChildAuth />} />
        <Route path="/signup/doctor" element={<DoctorAuth />} />
        <Route path="/login" element={<WelcomeSlideshow />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/signup/opt" element={<OPT />} />
        <Route path="/createnewpass" element={<CreateNewPass />} />

        {/* Landing Page  */}
        <Route path="" element={<HomePage />} />

        <Route path="my-profile" element={<MyProfile />} />

        {/* Parent Pages  */}
        <Route path="/homeparent" element={<HomeParent />} />
        <Route path="/evaluate" element={<Evaluate />} />
        <Route path="/autism/:content" element={<Autism />} />
        <Route path="/evaluate/autism/checker" element={<AutismTest />} />
        <Route path="/evaluate/autism/level" element={<AutismLevel />} />
        <Route path="/autism/test/result" element={<AutismResult />} />

        <Route path="/educational-resources" element={<EducationRsources />} />
        <Route
          path="/educational-resources/:id"
          element={<EvaluateArticle />}
        />
        <Route path="/child-progress" element={<ChildProgress />} />
        <Route path="/charity" element={<Charity />} />
        <Route path="/charity/:id" element={<ChartiyId />} />
        <Route path="/medican" element={<Medican />} />
        <Route path="/medican/:id" element={<MedicanId />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/doctors" element={<DoctorForParentView />} />
        <Route path="/doctors/:id" element={<DoctorProfileForParentView />}>
          <Route path="" element={<PaymentCheck />} />
          <Route path="payment" element={<PaymentCheckOut />} />
        </Route>

        {/* Doctor Pages  */}

        <Route path="/doctor" element={<HomeDoctor />} />
        <Route path="/doctor-profile" element={<DoctorIsProfile />} />
        <Route
          path="/doctor/allupcomingsessions"
          element={<AllUpcomingSessions />}
        />
        <Route path="/doctor/allsessionsdone" element={<AllSessionsDone />} />
        <Route
          path="/doctor/allsessionsdone/:id"
          element={<CommentsForSession />}
        />
        <Route
          path="/doctor/registeredchilds"
          element={<AllRegisteredChilds />}
        />
        <Route
          path="/doctor/registeredchilds/:id"
          element={<Childregistered />}
        />

        {/* <Route path="/*" element={<WebSiteRoutes />} /> */}

        <Route path="/skele" element={<AutismTestloading />} />
      </Routes>
    </div>
  );
}

export default App;
