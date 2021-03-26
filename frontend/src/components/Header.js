import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
// import { Redirect } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'
// import SearchParent from './SearchBar/SearchParent'
import { useHistory } from 'react-router-dom';
import { logout } from '../actions/userActions'

// import { AutoComplete } from 'antd';
function Header() {
    let history = useHistory();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    // const searchRef = useRef()


    const logoutHandler = () => {
        dispatch(logout())
    }

    // const [value, setValue] = useState("");

    // const onSearchSelect = (e) => {
    //     const fileteredMentor = mentorNames.filter( (i) => 
    //         (i.value) === e
    //     )
    //     searchRef.current.blur()
    //     const path = "/mentor/" + fileteredMentor[0].key.toString()
    //     history.push(path)
    //     setValue("")
    // }

    return (
        <header>
            <Navbar bg="light" variant="light">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Mighty Jaxx</Navbar.Brand>
                    </LinkContainer>
                    <Nav>
                    {/* <AutoComplete
                        ref = { searchRef }
                        options={ mentorNames }
                        style={{
                        width: 200,
                        }}
                        onSelect = { onSearchSelect }
                        onChange = { (e) => {
                            setValue(e)
                        }}
                        value = { value }
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }
                        placeholder="Search"
                    /> */}
                    {/* <LinkContainer to='/credits'>
                        <Nav.Link><i className="fas fa-shopping-cart pr-1"></i>Credits</Nav.Link>
                    </LinkContainer> */}

                    {userInfo ? (
                         <NavDropdown title={userInfo.name} id='email'>
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>

                    ): ( 
                        <LinkContainer to='/login'>
                            <Nav.Link><i className="fas fa-user pr-1"></i>Login</Nav.Link>
                        </LinkContainer>
                     )} 

                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header