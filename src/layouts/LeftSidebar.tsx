import { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// helpers
import { getMenuItems } from '../helpers/menu';

// components
import Scrollbar from '../components/Scrollbar';

import AppMenu from './Menu';

// images
import profileImg from '../assets/images/users/user-1.jpg';
import { useSelector } from 'react-redux';
import { usersBusinesses } from '../redux/actions';
import { useRedux } from '../hooks';
import { useNavigate } from 'react-router-dom';
import BusinessSelector from '../pages/BusinessSelector';

/* user box */
const UserBox = () => {
    const [showBusinessSelector, setShowBusinessSelector] = useState(false);
    const { dispatch } = useRedux();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    useEffect(() => {
        dispatch(usersBusinesses());
    }, [dispatch]);
    const selected_business = JSON.parse(localStorage.getItem('selected_business') || '{}');

    const business_name = selected_business?.business_name;
    const business_logo = selected_business?.business_logo;

    const businesses = useSelector((state: any) => state.Businesses.businesses);
    console.log(businesses);

    const handleClickChange = () => {
        setShowBusinessSelector(true);
    };

    if (showBusinessSelector) {
        navigate('/auth/business-selector');
    }

    // const selectedBusinessObj = businessList.find((biz: any) => String(biz.business_id) === String(selected_business));

    // const selectedBusinessName = selectedBusinessObj?.name || 'No Business Selected';

    // console.log(selectedBusinessObj);
    // console.log(selectedBusinessName);

    // get the profilemenu
    const ProfileMenus = [
        {
            label: 'My Account',
            icon: 'fe-user',
            redirectTo: '/apps/contacts/profile',
        },
        {
            label: 'Settings',
            icon: 'fe-settings',
            redirectTo: '#',
        },
        {
            label: 'Lock Screen',
            icon: 'fe-lock',
            redirectTo: '/auth/lock-screen',
        },
        {
            label: 'Logout',
            icon: 'fe-log-out',
            redirectTo: '/auth/logout',
        },
    ];

    /*
     * toggle dropdown
     */
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="user-box text-center">
            <img src={business_logo} alt="" title="Mat Helme" className="rounded-circle img-thumbnail avatar-xl" />
            <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
                <Dropdown.Toggle
                    id="dropdown-notification"
                    to="#"
                    as={Link}
                    onClick={toggleDropdown}
                    className="user-name h5 mt-2 mb-1 d-block">
                    {business_name}
                </Dropdown.Toggle>
                <Dropdown.Menu className="user-pro-dropdown">
                    <div onClick={toggleDropdown}>
                        {(ProfileMenus || []).map((item, index) => {
                            return (
                                <Link
                                    to={item.redirectTo}
                                    className="dropdown-item notify-item"
                                    key={index + '-profile-menu'}>
                                    <i className={classNames(item.icon, 'me-1')}></i>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
            {/* <p className="text-muted left-user-info">Business Owner</p> */}
            {businesses?.count > 1 && (
                <div style={{ cursor: 'pointer' }} onClick={handleClickChange}>
                    Change
                </div>
            )}

            {/* <ul className="list-inline">
                <li className="list-inline-item">
                    <Link to="#" className="text-muted left-user-info">
                        <i className="mdi mdi-cog"></i>
                    </Link>
                </li>

                <li className="list-inline-item">
                    <Link to="#">
                        <i className="mdi mdi-power"></i>
                    </Link>
                </li>
            </ul> */}
        </div>
    );
};

/* sidebar content */
const SideBarContent = () => {
    return (
        <>
            <UserBox />

            <div id="sidebar-menu">
                <AppMenu menuItems={getMenuItems()} />
            </div>

            <div className="clearfix" />
        </>
    );
};

type LeftSidebarProps = {
    isCondensed: boolean;
};

const LeftSidebar = ({ isCondensed }: LeftSidebarProps) => {
    const menuNodeRef: any = useRef(null);

    /**
     * Handle the click anywhere in doc
     */
    const handleOtherClick = (e: any) => {
        if (menuNodeRef && menuNodeRef.current && menuNodeRef.current.contains(e.target)) return;
        // else hide the menubar
        if (document.body) {
            document.body.classList.remove('sidebar-enable');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOtherClick, false);

        return () => {
            document.removeEventListener('mousedown', handleOtherClick, false);
        };
    }, []);

    return (
        <div className="left-side-menu" ref={menuNodeRef}>
            {!isCondensed && (
                <Scrollbar style={{ maxHeight: '100%' }}>
                    <SideBarContent />
                </Scrollbar>
            )}
            {isCondensed && <SideBarContent />}
        </div>
    );
};

LeftSidebar.defaultProps = {
    isCondensed: false,
};

export default LeftSidebar;
