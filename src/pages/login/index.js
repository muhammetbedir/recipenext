import { GetCookie, SetCookie } from '@/helpers/cookieHelper'
import React from 'react'

const Login = () => {
    return (
        <div onClick={() => SetCookie("role", "admin")}>Login</div>
    )
}
Login.acl = {
    action: "read",
    subject: "login",
}
export default Login