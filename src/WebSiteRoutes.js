import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/WebSite/HomePage";
import Header from "./Components/WebSite/Header";
import EducationRsources from "./Pages/WebSite/EducationResources";
import EvaluateArticle from "./Pages/WebSite/EvaluateArticle";
import HomeParent from "./Pages/WebSite/HomeParent";
import Footer from "./Components/WebSite/Footer";
import Medican from "./Pages/WebSite/Medican";
import MedicanId from "./Pages/WebSite/MedicanId";
import Evaluate from "./Pages/WebSite/Evaluate";
import Autism from "./Pages/WebSite/Autism";
import AutismTest from "./Pages/WebSite/AutismTest";
import ChildProgress from "./Pages/WebSite/ChildProgress";
import Charity from "./Pages/WebSite/Charity";
import ChartiyId from "./Pages/WebSite/CharityId";
import HomeDoctor from "./Pages/WebSite/DoctorPages/HomeDoctor";
import AllUpcomingSessions from "./Pages/WebSite/DoctorPages/AllUpcomingSessions";
import AllSessionsDone from "./Pages/WebSite/DoctorPages/AllSessionsDone";
import CommentsForSession from "./Pages/WebSite/DoctorPages/CommentsForSession";
import AllRegisteredChilds from "./Pages/WebSite/DoctorPages/AllRegisteredChilds";
import Childregistered from "./Pages/WebSite/DoctorPages/Childregistered";
import AutismResult from "./Pages/WebSite/AutismTestResult";
import AutismLevel from "./Pages/WebSite/AutismLevel";
import ChatBot from "./Pages/WebSite/ChatBot";
import MyProfile from "./Components/WebSite/MyProfile";
import DoctorForParentView from "./Pages/WebSite/DoctorForParentView";
import DoctorProfileForParentView from "./Pages/WebSite/DoctorProfileForParentView";

export default function WebSiteRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="/homeparent" element={<HomeParent />} />
        <Route path="/evaluate" element={<Evaluate />} />
        <Route path="/autism/:content" element={<Autism />} />
        <Route path="/autism/test" element={<AutismTest />} />
        <Route path="/test/level" element={<AutismLevel />} />
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
        <Route path="/doctors/:id" element={<DoctorProfileForParentView />} />

        <Route path="/doctor" element={<HomeDoctor />} />
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
      </Routes>
      <Footer />
    </>
  );
}
