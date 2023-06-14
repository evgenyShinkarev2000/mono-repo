import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classes from '../css/Header.module.css';
import { reset } from '../redux/authApi';
import { logOut } from '../redux/authSlice';
import Navigation from './Navigation';

function Header() {

    const [open, setOpen] = useState(false);
    const {user} = useSelector(state => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    if(!user){
        return (            
        <header className={classes["main-header"]}>        
        <img className={classes['small-logo']} 
            src={require("../images/logo_small.svg").default}
            width="48" height="48.18"
            alt="Логотип"
        />
    </header>);
    }

    const out = () =>{
        dispatch(reset());
        dispatch(logOut());
    }

    console.log("lol");
    return (
        <div>
            <header className={classes["main-header"]}>
            <img className={classes['nav-icon']}
                onClick={() => setOpen(!open)}
                src={require("../images/nav-icon.svg").default}
                width="24" height="24"
                alt="Иконка навигации"
            />
            
            <img className={classes['small-logo']} 
                src={require("../images/logo_small.svg").default}
                width="48" height="48.18"
                alt="Логотип"
            />
            <div className={classes["profile"]} onClick={() => navigate(`/user/${user.user_id}`)}>
                <img 
                    src={require("../images/profile.svg").default}
                    width="24" height="24" alt="Мой профиль"
                 />
                <p>Мой Профиль</p>
            </div>

            <img className={classes['settings-icon']}
                onClick={() => navigate("/change-info")}
                src={require("../images/settings-icon.svg").default}
                width="32" height="32"
                alt="Логотип"
            />
            
            <div className={classes["exit"]} onClick={() =>out()}>
                <img src={require("../images/exit.svg").default} width="24" height="24" alt="Выйти"/>
                <p>Выйти</p>
            </div>
        </header>
        <Navigation open={open} onClose={() => setOpen(false)}/>
    </div>
    );
}

export default Header;