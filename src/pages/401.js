import React from 'react'

const NotAuthorized = () => {
    return (
        <div>Lütfen Giriş Yapın</div>
    )
}
NotAuthorized.getLayout = page => <>{page}</>
export default NotAuthorized