import React, { useContext } from 'react'
import {AuthContext} from '../context/AuthProvider'

// eslint-disable-next-line react-hooks/rules-of-hooks

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
}

export default useAuth;