

import { createContext, useState, useContext } from "react";

export const ActiveStatecontext = createContext()

export const ActiveStateProvider = ({ children }) => {

    const [isActive, setIsActive] = useState(false)


    const [showSign, setShowSign] = useState(false);


    const [emaill, setEmail] = useState();
    const [otp, setOTP] = useState();
    const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);


    //for signup modals

    const handleSignUpClose = () => {
        setShowSign(false);
    }


    const handleSignUpOpen = () => {
        setShowSign(true)

    }





    ///for tokens

    const token1 = localStorage.getItem("token")

    const _username = localStorage.getItem("username");

    const _country = localStorage.getItem("country");

    const _lname = localStorage.getItem("lname");

    const _email = localStorage.getItem("email");

    const _phone = localStorage.getItem("phone");

    const _id = localStorage.getItem("id");


    const [token, setToken] = useState(token1);

    const [username, setUserName] = useState(_username)

    const [country, setCountry] = useState(_country);

    const [lname, setLname] = useState(_lname);

    const [email, setEmails] = useState(_email);

    const [phone, setPhone] = useState(_phone);

    const [id, setId] = useState(_id);

    const createSession = (token, fname, lname, email, phone, country, id) => {

        localStorage.setItem("token", token);
        localStorage.setItem("username", fname);
        localStorage.setItem("lname", lname);
        localStorage.setItem("email", email);
        localStorage.setItem("phone", phone);
        localStorage.setItem("country", country);
        localStorage.setItem("id", id);

        setToken(token)
        setUserName(fname);
        setCountry(country);
        setLname(lname)
        setEmails(email)
        setPhone(phone)
        setId(id)
    }


    const clearSession = () => {
        //jaise hi clear ho jaye to state bhi change ho jaye aur component rerender kar jaye
        localStorage.clear("token");
        localStorage.clear("username");
        localStorage.clear("lname");
        localStorage.clear("country");
        setToken("");
        setUserName("")
        setCountry("");
        setLname("")
    }







    return (
        <ActiveStatecontext.Provider
            value={{
                isActive,
                handleSignUpClose,
                handleSignUpOpen,
                showSign,

                token,
                username,
                createSession,
                clearSession,
                otp,
                setOTP,
                emaill,
                setEmail,
                OTPinput,
                setOTPinput,

                country,
                lname,
                email,
                phone,
                id
            }} >
            {children}
        </ActiveStatecontext.Provider>
    )
}

export const useAuth = () => {
    return useContext(ActiveStatecontext)
}