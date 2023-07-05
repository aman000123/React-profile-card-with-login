

import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { useAuth } from "../context/context"
import './home.css'

const Home = () => {
    const authContext = useAuth();

    //   const { handleShow } = useContext(ActiveStatecontext)



    const id = authContext.id;


    const Navigate = useNavigate();

    const onLogouthandels = () => {
        alert("are u sure wants to log out")
        authContext.clearSession()
        Navigate('/')

    }

    const handleShowProfile = () => {
        Navigate(`/profile/${id}`)


    }
    return (

        <>

            <Card style={{ width: '22rem', margin: 'auto', padding: '20px 10px' }} className='homes'>
                <Card.Header as="h3" className='hello'>Hello! <span>{authContext.username} {authContext.lname}</span></Card.Header>

                <Card.Body className='cardbodys'>
                    <Card.Title className='mt-3'>Welcomes</Card.Title>
                    <Card.Text className='mt-3'>
                        Now you can visit to this websites after successfully creates all record and passwords reset
                        Go ahead!<br />
                        Thank you {authContext.username}
                    </Card.Text>
                    <div className='homeflex'>
                        <Button className='home-btn' onClick={handleShowProfile}>Visit your Profile</Button>
                        <Button className='home-btn' onClick={onLogouthandels}>Log Out</Button>
                    </div>
                </Card.Body>
            </Card>

        </>

    )
}


export default Home
