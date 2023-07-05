
import { useState, useEffect } from 'react'
import './home.css'
import { useAuth } from "../context/context"
import { Card, Button } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { getIndividualsProfile } from '../../axious/api'
import { useParams, useNavigate } from 'react-router-dom'
import './home.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';


const Profile = () => {
    const authContext = useAuth();
    const { id } = useParams();
    const [profile, setProfile] = useState([])
    const [profiles, setProfiles] = useState([])
    const [profileToEdit, setProfileToEdit] = useState()

    const navigate = useNavigate();
    useEffect(() => {
        getIndividualsProfile(id).then(response => {
            setProfile(response)
            console.log("get profiles response", response)

        })
    }, [id])

    const handleforEdit = (id) => {
        alert(`${authContext.username} Are you wants to edits your records ?` + id)
        navigate(`/editprofile/${id}`)
        const Edits = profiles.find(item => item.id === id)
        setProfileToEdit(Edits);

    }
    return (
        <>
            <Card style={{ width: '21rem', margin: "auto", padding: "10px 0px" }} className='homeCard'>

                {profile.file && (
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Card.Img variant="top" className="cord-img mt-2"

                            src={`http://localhost:4000/uploads/${profile.file}`}
                            alt="Uploaded File" /></Link>)}


                <hr />


                <Card.Body className="home-body mt-2">
                    {/* <Card.Title as="h1">Accounts</Card.Title> */}
                    <Card.Text className='name' as="h2">{profile.fname} {profile.lname}</Card.Text>
                    <Card.Text className='m-0'><EmailIcon className='icons' />{profile.email} </Card.Text>
                    <Card.Text className='m-0'><PhoneIcon className='icons' />{profile.phone} </Card.Text>
                    <Card.Text className='m-0'><LocationOnIcon className='icons' />{profile.country} </Card.Text>
                    <Button className='edit-btn mt-4' onClick={() => handleforEdit(profile.id)}>Edit Your Profile
                    </Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default Profile