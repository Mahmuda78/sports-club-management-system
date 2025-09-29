import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthContext/AuthContext';

const useAuth = () => {
  
    const AuthInfo = use(AuthContext);
    return AuthInfo;
};


export default useAuth;