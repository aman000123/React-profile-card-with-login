
import { Button, Form, Card } from "react-bootstrap"
import './Forget.css'
//import { ActiveStatecontext } from "../context/context"
import { useState } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';


const Reset = () => {

    // const { showReset, handleOnResetClose, setShowReset, emaill } = useContext(ActiveStatecontext)


    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const Navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        //using axious library

        // try {
        //     await axios.post('http://localhost:4000/reset', { email, newPassword });

        //     toast.success("Passward reset successfully");
        //     console.log("valid email");
        //     Navigate('/')
        //     // setShowReset(false)

        // }
        // catch (error) {

        //     console.log("errors", error.message)
        //     toast.error("Please enter valid email id")
        //     // setShowReset(true)

        // }


        //usinng js fetch

        const response = await fetch('http://localhost:4000/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, newPassword })
        });

        if (response.ok) {
            toast.success("Passward reset successfully");
            console.log("valid email");
            Navigate('/')
        } else {
            console.log("errors in reset")
            toast.error("Please enter valid email id")

        }
    }
    return (

        <>


            <Card style={{ padding: "1px", width: "350px", height: "380px", margin: "auto" }} className="reset-card">
                <Card.Title className="mt-5">
                    <p className="repassword" style={{ textAlign: "center" }}>
                        Enter Password for reset with your email id</p> </Card.Title>

                <Card.Body className="reset-body">
                    <Form onSubmit={handleSubmit} className="mt-3">
                        <Form.Group controlId="formGridEmail" className="mb-3 login-icons">
                            <Form.Label className="f-text"><AttachEmailOutlinedIcon /></Form.Label>
                            <Form.Control type="email" placeholder="Enter valid email id" value={email} name="email" className="input" onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3 login-icons" controlId="formBasicPassword">
                            <Form.Label className="f-text"><LockOpenOutlinedIcon /></Form.Label>
                            <Form.Control type="password" placeholder="Reset Password" value={newPassword} className="input" onChange={(e) => setNewPassword(e.target.value)} required
                            /></Form.Group>
                        <Button size="lg" className="reset-btn mt-5" type="submit" > Reset Password</Button>
                        {message && <p>{message}</p>}
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default Reset