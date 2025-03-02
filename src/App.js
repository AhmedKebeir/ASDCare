import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./Pages/Auth/SignUp";
import WelcomeSlideshow from "./Pages/Auth/Login";
import AccountType from "./Pages/Auth/AccountType";
import ChildAuth from "./Pages/Auth/ChildAuth";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import OPT from "./Pages/Auth/OPT";
import CreateNewPass from "./Pages/Auth/CreateNewPass";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/continue" element={<AccountType />} />
        <Route path="/signup/childauth" element={<ChildAuth />} />
        <Route path="/login" element={<WelcomeSlideshow />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/opt" element={<OPT />} />
        <Route path="/createnewpass" element={<CreateNewPass />} />
      </Routes>
    </div>
  );
}

export default App;
