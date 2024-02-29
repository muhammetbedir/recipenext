import CustomSpinner from '@/components/functional/CustomSpinner'
import AclGuard from '@/configs/AclGuard'
import { AuthProvider } from '@/contexts/authContext'
import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import NProgress from 'nprogress';
import { Router } from 'next/router'
import Layout from './layout'


export default function App({ Component, pageProps }) {
  const defaultAcl = {
    action: 'manage',
    subject: 'all'
  }

  const getLayout =
    Component.getLayout ?? (page => <Layout >{page}</Layout>)
  return (
    <AuthProvider>
      <NextUIProvider>
        <AclGuard acl={Component.acl ?? defaultAcl}>
          <div className="mytheme text-foreground bg-background">
            <><CustomSpinner /> {getLayout(<Component {...pageProps} />)}</>
          </div>
        </AclGuard>
      </NextUIProvider>
    </AuthProvider>
  )
}
