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

export default function WebSiteRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/homeparent" element={<HomeParent />} />
        <Route path="/evaluate" element={<Evaluate />} />
        <Route path="/autism" element={<Autism />} />
        <Route path="/autism/test" element={<AutismTest />} />
        <Route path="/autism/test/result" element={<AutismResult />} />

        <Route path="/evaluate/res" element={<EducationRsources />} />
        <Route path="/evaluate/article" element={<EvaluateArticle />} />
        <Route path="/childprogress" element={<ChildProgress />} />
        <Route path="/charity" element={<Charity />} />
        <Route path="/charity/id" element={<ChartiyId />} />

        <Route path="/medican" element={<Medican />} />
        <Route path="/medican/:id" element={<MedicanId />} />

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
