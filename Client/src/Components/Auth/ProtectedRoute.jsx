import React from 'react'
import {useDispatch } from 'react-redux'
import { setLoginData } from '../../Features/Counter/LoginSlice';

const ProtectedRoute = () => {

    const dispatcher = useDispatch();
    const id = localStorage.getItem("user_Id_BlogMangement")
    const token = localStorage.getItem("user_Token_BlogMangement")

    dispatcher(setLoginData({ token: token, userId: id }));

    return (
        <></>
    )
}

export default ProtectedRoute