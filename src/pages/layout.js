import CustomAppBar from '@/components/page/CustomAppBar'
import React from 'react'

const Layout = ({ children }) => {
    return (
        <div>
            <CustomAppBar />
            <main> {children}</main>
        </div>
    )
}

export default Layout