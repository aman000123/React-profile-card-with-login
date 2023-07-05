
import { Button, Form, Card } from "react-bootstrap"
import './login.css'
import { ActiveStatecontext, useAuth } from "../context/context"
import { useContext, } from "react"
import { loginid } from "../../axious/api"
import { useNavigate, NavLink } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';

const Login = () => {
    const authContext = useAuth();
    const Navigate = useNavigate();
    const { handleSignUpOpen, handleOpenOnVerifyEmails } = useContext(ActiveStatecontext)
    const { register, formState: { isValid, errors }, handleSubmit } = useForm()

    const onLoginHandeler = async (data) => {

        try {

            const { token, fname, lname, email, phone, country, id } = await loginid(data)

            if (token) {
                console.log("token fname in login page", token, fname)
                authContext.createSession(token, fname, lname, email, phone, country, id);
                toast.success(`Hello ${fname}! go ahead`);
                Navigate('/')
            }
        } catch (error) {
            console.log("errors in login page==>", error.response.data.errorMessage)

            toast.error(error.response.data.errorMessage);

        }
    }
    return (
        <Card style={{ padding: "1px", width: "350px", height: "380px", margin: "auto" }} className="login-card">
            <div className="toplink mt-5">
                <AccountCircleOutlinedIcon className="usericon" />  </div>
            <Card.Body className="login-body">
                <Form onSubmit={handleSubmit(onLoginHandeler)}>
                    <Form.Group className="mb-3 login-icons" controlId="formBasicEmail">
                        <Form.Label className="f-text"><AttachEmailOutlinedIcon /></Form.Label>
                        <Form.Control type="email" placeholder="Enter email" className="input"



                            {...register('email', { required: "Enter your email address" })}

                        // ref={firstRef}
                        />
                        <Form.Text className="formError">{errors.email && <span>***This field is required
                        </span>}</Form.Text> </Form.Group>

                    <Form.Group className="mb-3 login-icons" controlId="formBasicPassword">
                        <Form.Label className="f-text"><LockOpenOutlinedIcon /></Form.Label>
                        <Form.Control type="password" placeholder="Password" className="input"
                            {...register('password', { required: "Enter your password" })} />
                        <Form.Text className="formError">
                            {errors.password && <span>***This field is required</span>}</Form.Text> </Form.Group>

                    <Button variant="primary" className="forget" onClick={handleOpenOnVerifyEmails}>

                        <NavLink to="/sent-email"> Forget Password?  </NavLink>



                    </Button>
                    <Button type="submit" size="lg" disabled={!isValid} className="log"> Login</Button>
                    <Button variant="primary" className="signmodal" >
                        Don't have  an account?  <span onClick={handleSignUpOpen} className="signn"> Register here</span> </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default Login
