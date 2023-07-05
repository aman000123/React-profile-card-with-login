
import { Modal, Button, Form, Card, Row } from "react-bootstrap"
import './signup.css'
import { ActiveStatecontext } from "../context/context"
import { useContext } from "react"
import { useForm } from "react-hook-form";
import { createUser } from '../../axious/api';
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {

    const { showSign, handleSignUpClose } = useContext(ActiveStatecontext)

    // usings property of useForm 
    const { register, formState: { isValid, errors }, handleSubmit } = useForm()
    const onSignupHandeler = async (data) => {


        try {
            const formData = new FormData();
            formData.append('file', data.file[0])
            formData.append('fname', data.fname);
            formData.append('lname', data.lname);
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            formData.append('password', data.password);
            formData.append('address', data.address);
            formData.append('country', data.country);
            formData.append('gender', data.gender);

            await axios.post('http://localhost:4000/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Form submitted successfully!')
            console.log('Form submitted successfully!');
        } catch (error) {
            toast.error(error)
            console.error('Error submitting form: ', error);
        }
    };


    return (
        <Modal show={showSign} onHide={handleSignUpClose}>
            <Card style={{ padding: "20px", width: "500px" }} className="signinn">
                <Card.Title><p className="details">Please Sign up here for move on</p></Card.Title>
                <Card.Body>
                    <Form className="custom" onSubmit={handleSubmit(onSignupHandeler)}>
                        <Row className="mb-3">
                            <Form.Group controlId="file" className="mb-3" >
                                <Form.Control type="file" placeholder="Upload file" name="file"
                                    {...register('file', { required: "Upload your file" })}


                                />
                                <Form.Text className="formError">
                                    {errors.file && <span>***Uploading file is required</span>}</Form.Text>
                            </Form.Group>


                            <Form.Group controlId="fname" className="mb-3" >
                                <Form.Control type="text" placeholder="First name" name="fname"
                                    {...register('fname', { required: "Enter your First address" })}

                                // ref={firstRef}
                                />
                                <Form.Text className="formError">
                                    {errors.fname && <span>***First Name  is required</span>}</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="lname" className="mb-3">

                                <Form.Control type="text" placeholder="Last name" name="lname"
                                    {...register('lname', { required: "Enter your Last name" })} />
                                <Form.Text className="formError">
                                    {errors.lname && <span>***Last Name is required</span>}</Form.Text>
                            </Form.Group>
                            <Form.Group controlId="email" className="mb-3">

                                <Form.Control type="email" placeholder="Enter email" name="email"
                                    {...register('email', { required: "Enter your email address" })} />
                                <Form.Text className="formError">
                                    {errors.email && <span>***Email is required</span>}
                                </Form.Text>

                            </Form.Group>
                            <Form.Group controlId="phone" className="mb-3">

                                <Form.Control type="phone" placeholder="Enter your Mobile Number" name="phone"

                                    {...register('phone', { required: "Enter your Mobile number" })} />
                                <Form.Text className="formError">
                                    {errors.phone && <span>***Mobile Number is required</span>}</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="password" className="mb-3">

                                <Form.Control type="password" placeholder="Enter your password" name="password"

                                    {...register('password', { required: "Enter your password" })} />
                                <Form.Text className="formError">
                                    {errors.password && <span>***Password is required</span>}</Form.Text>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="address" >

                            <Form.Control placeholder="Enter your full address" name="address"
                                {...register('address', { required: false })} />

                        </Form.Group>




                        <Form.Group className="mb-3 mt-3" >
                            <Form.Label className="mx-3">Choose yours Gender</Form.Label>
                            <Form.Check type="radio" name="gender" label="Male" inline value="male"
                                {...register('gender', { required: "Enter your gender" })} />

                            <Form.Check type="radio" name="gender" label="Female" inline value="female"
                                {...register('gender', { required: "Enter your gender" })} />
                            {/* inline ===>usein one lines both radio btn */}
                            <Form.Text className="formError">
                                {errors.gender && <span>***Gender is required</span>}</Form.Text>

                        </Form.Group>





                        <Form.Group controlId="formGridFname" className="mb-3" >
                            <Form.Control type="text" placeholder="Country" name="country"
                                {...register('country', { required: "Country name is required" })}


                            />
                            <Form.Text className="formError">
                                {errors.fname && <span>***First Name  is required</span>}</Form.Text>
                        </Form.Group>
                        <Modal.Footer>

                            <Button variant="primary" onClick={handleSignUpClose} className="sign-btn" type="submit" disabled={!isValid}>
                                Signup
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Card.Body>
            </Card>
        </Modal>
    )
}

export default Signup