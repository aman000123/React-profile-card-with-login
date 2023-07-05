

import { Button, Form, Card, Row } from "react-bootstrap"
import './Forget.css'
import { ActiveStatecontext } from "../context/context"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";




const EmailFoReset = () => {

    const Navigate = useNavigate()

    const { emaill, setEmail, setOTP } = useContext(ActiveStatecontext)
    const { register, formState: { isValid, errors }, handleSubmit } = useForm()

    const handelShowOnForgetPassword = async (data) => {
        setEmail(emaill)
        console.log("set email", emaill);

        const OTP = Math.floor(Math.random() * 9000 + 1000);
        console.log("otp", OTP);
        setOTP(OTP);


        const response = await fetch('http://localhost:4000/sendEmails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ OTP, recipient_email: emaill })
        });

        if (response.ok) {
            console.log("Email id is valid")
            toast.success(" Your Email id is valid")

            Navigate('/enter-otp')
        } else {
            console.log("Unvalid Email id ")
            toast.error("Please enter valid email id")
            //toast.error(response.errorMessage)
            //Navigate('/sent-email')
        }
    }


    return (
        <>

            <Card style={{ padding: "20px", width: "500px" }} className="signinn">
                <Card.Title><p className="details mt-3">Enter Your Valids Emails For Reset</p></Card.Title>
                <Card.Body>

                    <Form className="custom" onSubmit={handleSubmit(handelShowOnForgetPassword)}>
                        <Row className="mb-3">
                            <Form.Group controlId="formGridEmail" className="mb-3">

                                <Form.Control type="email" placeholder="Enter email" name="email"
                                    {...register('email', { required: "Enter your First address" })}
                                    onChange={(e) => setEmail(e.target.value)} />
                                <Form.Text className="formError">
                                    {errors.email && <span>***email is required</span>}</Form.Text>
                            </Form.Group>
                        </Row>

                        <div className="otp-footer">
                            <Button size="lg" disabled={!isValid} type="submit"

                                className="sent-otp">   Sent Otp  </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

        </>
    )
}
export default EmailFoReset