import React from 'react'
import { Container, Row } from "reactstrap";
import useAuth from '../custom-hooks/useAuth';
import '../styles/admin-nav.css';
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const admin__nav = [
    {
        display: 'Dashboard',
        path: '/dashboard',
    },
    {
        display: 'All-Products',
        path: '/dashboard/all-products',
    },
    {
        display: 'Add-Products',
        path: '/dashboard/add-products',
    },
    {
        display: 'Users',
        path: '/dashboard/users',
    },
];


const AdminNav = () => {

    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const logout = () => {
        
        signOut(auth).then(() => {
            toast.success('Logged out');
            navigate('/home');
        }).catch(err => {
            toast.error(err.message);
        })
    }
    return (
        <>
            <header className="admin__header">
                <div className="admin__nav-top">
                    <Container>
                        <div className='admin__nav-wrapper-top'>
                            <div className="logo">
                                <h2>AdornSpace</h2>
                            </div>
                            <div className="search__box">
                                <input type="text" placeholder='Search..' />
                                <span><i class="ri-search-line"></i></span>
                            </div>
                            <div className="admin__nav-top-right">
                                <span><i class="ri-notification-3-line"></i></span>
                                <span><i class="ri-settings-2-line"></i></span>
                                <img src={currentUser && currentUser.photoURL} alt="" />
                                <button  className='btn btn-primary' onClick={logout}>Logout</button>
                            </div>
                        </div>
                    </Container>
                </div>
            </header>
            <section className='admin__menu p-0'>
                <Container>
                    <Row>
                        <div className="admin__navigation">
                            <ul className="admin__menu-list">
                                {
                                    admin__nav.map((item, index) => (
                                        <li className="admin__manu-item" key={index}>
                                            <NavLink
                                                to={item.path}
                                                className={navClass =>
                                                    navClass.isActive ? "active__admin-menu" : ""
                                                }
                                            >
                                                {item.display}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default AdminNav;