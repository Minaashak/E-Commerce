import React, { useContext } from 'react'
import { AuthContext } from './../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Login from './../login/Login';

function ProtectedRoute( {children}) {
    let navigate = useNavigate();
    let { isUserLoggedIn} = useContext(AuthContext);

    if( isUserLoggedIn ){
        return children;
    }else{
        return < Login />;
    }

}

export default ProtectedRoute