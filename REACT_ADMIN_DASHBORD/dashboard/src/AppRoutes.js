

import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/home/Home";
import Signup from "./components/signup/signup";
import EnterOtp from "./components/ForgotPassword/EnterOtp";
import { useAuth } from "./components/context/context";
import Reset from "./components/ForgotPassword/resetPassword";
import EmailForReset from "./components/ForgotPassword/EnterEmailsForget";
import EditProfile from "./components/home/EditProfile";
import Profile from "./components/home/Profiles";


const AppRouters = () => {
    const authContext = useAuth();
    // console.log("auth context", authContext);

    return (
        <>
            {/* signup componenet is modal  */}
            <Signup />



            {authContext.token ? (
                <div className="mains">
                    {/* <Sidebar /> */}
                    <div className="mainscontainer ">
                        {/* <Navbar /> */}
                        <div className='toppp'>
                            <div className="App">
                                <Routes>
                                    <Route path='' element={<Home />} />
                                    <Route path='/profile/:id' element={<Profile />} />
                                    <Route path='/editprofile/:id' element={<EditProfile />} />
                                    <Route path="*" element={<h1>Sorry! Page Not Found</h1>} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>

            ) : (
                <div className="login-component">
                    <Routes>
                        <Route path="/" element={<Login />}></Route>
                        <Route path="/sent-email" element={<EmailForReset />}></Route>
                        <Route path="/enter-otp" element={<EnterOtp />}></Route>
                        <Route path="/reset-password" element={<Reset />}></Route>
                    </Routes></div>
            )
            }
        </>
    )
}
export default AppRouters;