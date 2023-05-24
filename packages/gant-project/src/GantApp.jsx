import s from './App.module.css'
import Header from './Components/Header/Header'
import Main from './Components/Main/Main'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function GantApp() {


    return (
        <div className={s.container}>
            <Header/>
            <Main/>
            <ToastContainer/>
        </div>
    )
}