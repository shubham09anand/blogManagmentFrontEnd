import { useDispatch } from 'react-redux';
import { setLoginData } from '../../Features/Counter/LoginSlice';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
    const dispatcher = useDispatch();

    if (localStorage.getItem('user_Id_BlogMangement') && localStorage.getItem('user_Token_BlogMangement')) {
        const id = localStorage.getItem("user_Id_BlogMangement");
        const token = localStorage.getItem("user_Token_BlogMangement");

        const decoded = jwtDecode(token);

        if (decoded.plaintext === id) {
            dispatcher(setLoginData({ token: token, userId: id }));
            return children;
        } else {
            window.location.href = ("/insider/authFailed");
            return null;
        }
    } else {
        window.location.href = ("/insider/authFailed");
        return null;
    }
};

export default ProtectedRoute;
