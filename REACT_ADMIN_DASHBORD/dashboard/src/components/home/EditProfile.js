
import { Form, Button, Row, Card } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIndividualsProfile, updateProfiles } from "../../axious/api";


const EditProfile = () => {
    const { id } = useParams();
    const [detail, setDetails] = useState({ id: "", file: "", fname: "", lname: "", phone: "", email: "" })
    const navigate = useNavigate();

    const onUpdate = async (e, detail) => {
        e.preventDefault();
        // const { file, fname, lname, phone, email } = detail;
        const data = new FormData();
        data.append('id', detail.id)
        data.append('file', detail.file);
        data.append('fname', detail.fname);
        data.append('lname', detail.lname);
        data.append('phone', detail.phone);
        data.append('email', detail.email);


        console.log("profiles updated data", detail);
        console.log("data.id", detail.id)
        const result = await updateProfiles(data, {
            headers: {
                'Content-Type': 'multipart/detail',
            }
        });
        console.log("update product", result);
        navigate(`/profile/${id}`)

    }

    useEffect(() => {
        getIndividualsProfile(id).then(response => {
            const { id, fname, lname, phone, email } = response;
            setDetails({ id, fname, lname, phone, email })
            console.log("edit response", response)

        })
    }, [])

    const handleFileChange = (event) => {
        //in inout type fields event.target.files 
        //By accessing event.target.files[0], you are retrieving the first file from the selected files array. 
        setDetails((prevState) => ({ ...prevState, file: event.target.files[0] }))
        console.log("file", event.target.files[0])
    }
    const handleInputChange = (e, field) => {
        setDetails((prevState) => ({ ...prevState, [field]: e.target.value }))
    }




    return (
        <>

            <Card style={{ padding: "5px", width: "23rem" }} className="homeCards">
                <Card.Title><p className="details mt-5">Please Edit your profile</p></Card.Title>
                <Card.Body>
                    <Form onSubmit={(e) => onUpdate(e, detail)}>
                        <Row className="mb-3 ">

                            <Form.Group controlId="file" className="mb-3" >
                                <Form.Control name="file" type="file" onChange={handleFileChange}


                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Enter email" onChange={(e) => handleInputChange(e, 'fname')}
                                    value={detail.fname} /></Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Enter email" onChange={(e) => handleInputChange(e, 'lname')}
                                    value={detail.lname} />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">

                                <Form.Control type="text" placeholder="Enter email" onChange={(e) => handleInputChange(e, 'email')} value={detail.email} />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                {/* <Form.Label>Mobile Number</Form.Label> */}
                                <Form.Control type="text" placeholder="Enter Mobile number" onChange={(e) => handleInputChange(e, 'phone')} value={detail.phone} />
                            </Form.Group>
                            <Button type="submit" className="subb">
                                UPDATE
                            </Button>

                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default EditProfile;