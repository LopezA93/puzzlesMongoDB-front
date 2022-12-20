import { Navigate, useLocation } from 'react-router-dom'

import { authData } from './authJWT'

export const RequireAuth = ({ children }) => {
  const location = useLocation()
  const auth = authData()
  if (!auth) {
    return <Navigate to='/login' state={{ path: location.pathname }} />
  }
  return children
}