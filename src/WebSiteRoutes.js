import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/WebSite/HomePage";
import Header from "./Components/WebSite/Header";
import EducationRsources from "./Pages/WebSite/EducationResources";
import EvaluateArticle from "./Pages/WebSite/EvaluateArticle";
import HomeParent from "./Pages/WebSite/HomeParent";
import Footer from "./Components/WebSite/Footer";

export default function WebSiteRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/homeparent" element={<HomeParent />} />
        <Route path="/evaluate" element={<EducationRsources />} />
        <Route path="/evaluate/article" element={<EvaluateArticle />} />
      </Routes>
      <Footer />
    </>
  );
}
