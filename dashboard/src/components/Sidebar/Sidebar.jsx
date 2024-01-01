import React from 'react'
import Logo from '../../assets/images/GitFitlogo.png'
import { Link } from 'react-router-dom';
import styles from './styles.css'

function Sidebar() {
    return (
        <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion container-sidebar" id="accordionSidebar">

            {/* <!-- Sidebar - Brand --> */}
            <Link className="sidebar-brand d-flex align-items-center justify-content-center logo" to="/">
                <div className="sidebar-brand-icon">
                    <img className="w-100" src={Logo} alt="Digital House" />
                </div>
            </Link>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/* <!-- Nav Item - Dashboard --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard - GitFit</span></Link>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider" />

            {/* <!-- Heading --> */}
            <div className="sidebar-heading">Actions</div>

            {/* <!-- Nav Item - Pages --> */}
            <li className="nav-item">
                <Link className="nav-link collapsed" to="/buscador">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Buscador</span>
                </Link>
            </li>
            {/* <!-- Nav Item - Pages --> */}
            <li className="nav-item">
                <Link className="nav-link collapsed" to="/rowmovies">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Row Movies</span>
                </Link>
            </li>

            {/* <!-- Nav Item - Charts --> */}
            <li className="nav-item">
                <Link className="nav-link" to="/contentrow">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Content Row</span></Link>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider d-none d-md-block" />
        </ul>
    )
}

export default Sidebar;