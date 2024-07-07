import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { AppProps } from 'next/app'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { Refine } from '@refinedev/core'
import routerProvider from '@refinedev/nextjs-router'
import { DataProvider } from '@refinedev/strapi-v4'
import { ColorModeContext, ColorModeContextProvider } from '@contexts'
import { Header } from '@components/header'
import CustomSlider from '@components/customSlider'
import '@refinedev/antd/dist/reset.css'
import { authProvider, axiosInstance } from 'src/authProvider'
import { API_URL } from 'src/constants'
import { NextPage } from 'next'
import { BackTop, Layout } from 'antd'
import AuthProvider from '@components/providers/authProviders'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store, { RootState } from '@components/redux/store'
import Head from 'next/head'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  const { mode } = useContext(ColorModeContext)
  const router = useRouter()
  const { pathname } = router
  const pathSegments = pathname.split('/')
  const lastSegment = pathSegments[pathSegments.length - 1]
  const [selectedKey, setSelectedKey] = useState('1')

  useEffect(() => {
    setSelectedKey(lastSegment)
  }, [])

  const setSelectedKeyHandler = (key: string) => {
    setSelectedKey(key)
  }

  const renderHead = () => {
    switch (pathname) {
      case '/login':
        return (
          <Head>
            <title>Login</title>
          </Head>
        )
      case '/register':
        return (
          <Head>
            <title>Register</title>
          </Head>
        )
      case '/users':
        return (
          <Head>
            <title>Manage User</title>
          </Head>
        )
      case '/category':
        return (
          <Head>
            <title>Manage Category</title>
          </Head>
        )
      case '/cuisines':
        return (
          <Head>
            <title>Manage Cuisine</title>
          </Head>
        )
      case '/reviews':
        return (
          <Head>
            <title>Manage Review</title>
          </Head>
        )
      case '/feedbacks':
        return (
          <Head>
            <title>Manage Feedback</title>
          </Head>
        )

      default:
        return (
          <Head>
            <title>Manage User</title>
          </Head>
        )
    }
  }

  // Determine background color based on mode
  const backgroundColor = mode === 'dark' ? 'black' : 'white'
  // Check if current route is "/login" or "/register"
  const shouldUseSidebar = pathname === '/login' || pathname === '/register'
  if (shouldUseSidebar) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {renderHead()}
        <Layout>
          <Layout.Content
            style={{
              padding: '20px',
              backgroundColor: backgroundColor,
              minHeight: 280,
            }}
          >
            {children}
            <BackTop />
          </Layout.Content>
        </Layout>
      </Layout>
    )
  } else {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {renderHead()}
        <CustomSlider
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKeyHandler}
        />
        <Layout>
          <Layout.Content
            style={{
              padding: '20px',
              backgroundColor: backgroundColor,
              minHeight: 280,
            }}
          >
            {children}
            <BackTop />
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />
    }

    return (
      <AuthProvider>
        <CustomLayout>
          <Component {...pageProps} />
        </CustomLayout>
      </AuthProvider>
    )
  }

  return (
    <Provider store={store}>
      <ColorModeContextProvider>
        <Refine
          routerProvider={routerProvider}
          authProvider={authProvider}
          dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
          resources={[]}
        >
          {renderComponent()}
        </Refine>
      </ColorModeContextProvider>
    </Provider>
  )
}

export default appWithTranslation(MyApp)

