import './Navbar.css'
import profile from '../../assests/profile.png'
import {Container, Navbar} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'

const NavbarContainer = () => {
    return ( 
        <div className="navbar-component">
            <Navbar variant="dark">
                <Container>
                <Navbar.Brand className='title' href="#home">
                    Edvora
                </Navbar.Brand>
                <Navbar.Toggle />

                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className='user-name'>
                        Dhruv Singh
                    </Navbar.Text>
                    <Image className='profilePic'
                        src={profile} 
                        roundedCircle
                        height={40}
                        width={40}
                    />
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
     );
}
 
export default NavbarContainer;