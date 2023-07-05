
import axios from "axios";

import { Button, Form, Card, Row } from "react-bootstrap"
import './Forget.css'
import { ActiveStatecontext } from "../context/context"
import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";



const EnterOtp = () => {


    const { emaill, otp, OTPinput, setOTPinput } = useContext(ActiveStatecontext)
    const [timerCount, setTimer] = useState(60);

    const [disable, setDisable] = useState(true);

    const Navigate = useNavigate()

    function resendOTP() {
        if (disable) return;
        axios.post("http://localhost:4000/sendEmails", {
            OTP: otp,
            recipient_email: emaill,
        })
            .then(() => setDisable(true))
            .then(() => alert("A new OTP has succesfully been sent to your email."))
            .then(() => setTimer(60))
            .catch(console.log);
    }


    const verfiyOTP = () => {

        if (parseInt(OTPinput.join("")) === otp) {
            console.log("writeOtp")
            Navigate('/reset-password')
            //return;

        } else {
            alert(
                "The code you have entered is not correct, try again or re-send the link"
            );
            // console.log("wrong otp")
        }
        return;
    }


    useEffect(() => {
        let interval = setInterval(() => {
            setTimer((lastTimerCount) => {
                lastTimerCount <= 1 && clearInterval(interval);
                if (lastTimerCount <= 1) setDisable(false);
                if (lastTimerCount <= 0) return lastTimerCount;
                return lastTimerCount - 1;
            });
        }, 1000); //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval);
    }, [disable]);


    return (

        <Card style={{ padding: "10px", width: "500px" }} className="signinn">
            <Card.Title>
                {/* <p className="details mt-3">Email Verification</p> */}
                <p className="details mt-5">We have sent a code to your email:</p>
                <p className="verify">{emaill}</p>
            </Card.Title>
            <Card.Body>

                <Form className="custom my-3">

                    <Row className="mb-3">

                        <div className="otp-input">
                            <input type="text" maxLength="1" name="" id=""
                                onChange={(e) =>
                                    setOTPinput([
                                        e.target.value,
                                        OTPinput[1],
                                        OTPinput[2],
                                        OTPinput[3],
                                    ])
                                } />

                            <input type="text" name="" id=""
                                onChange={(e) =>
                                    setOTPinput([
                                        OTPinput[0],
                                        e.target.value,
                                        OTPinput[2],
                                        OTPinput[3],
                                    ])
                                } />
                            <input type="text" name="" id=""

                                onChange={(e) =>
                                    setOTPinput([
                                        OTPinput[0],
                                        OTPinput[1],
                                        e.target.value,
                                        OTPinput[3],
                                    ])
                                } />
                            <input type="text" name="" id=""

                                onChange={(e) =>
                                    setOTPinput([
                                        OTPinput[0],
                                        OTPinput[1],
                                        OTPinput[2],
                                        e.target.value,
                                    ])
                                } />


                        </div>


                    </Row>


                    <div className="sign-footer">
                        <div className="signin-btn">
                            <Button variant="primary"

                                onClick={() => verfiyOTP()}
                                className="sign-btn mt-3" > Verify Account </Button>
                        </div>
                        <div className="resend mt-3">
                            <p>Didn't recieve code?</p>{" "}
                            <p

                                style={{
                                    color: disable ? "gray" : "#0d6efd",
                                    cursor: disable ? "none" : "pointer",
                                    textDecorationLine: disable ? "none" : "underline",
                                }}
                                onClick={() => resendOTP()}
                            >
                                {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                            </p>
                        </div>
                    </div>

                </Form>
            </Card.Body>
        </Card>

    )
}

export default EnterOtp