import { useState } from 'react'
import { Button, Image, Layout, Menu, Avatar, message, Space } from 'antd'
import {
  HomeOutlined,
  UserOutlined,
  SolutionOutlined,
  BookOutlined,
  AppstoreOutlined,
  EnvironmentOutlined,
  StarOutlined,
  LogoutOutlined,
  FormOutlined,
  GlobalOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@components/redux/store'
import { clear } from 'console'
import { clearUser } from '@components/redux/slices/userSlice'
import { Typography } from 'antd'
const { Title } = Typography
const { Sider } = Layout

interface SliderProps {
  selectedKey: string
  setSelectedKey: (key: string) => void
}

const CustomSlider: React.FC<SliderProps> = (props) => {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showLogout, setShowLogout] = useState(true)

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
    if (collapsed) {
      setShowName(false)
      setShowLogout(false)
    } else {
      setShowName(true)
      setShowLogout(true)
    }
    console.log('collapsed', collapsed)
    console.log('showName', showName)
    console.log('showLogout', showLogout)
  }

  const handleMenuSelect = ({ key }: { key: string }) => {
    props.setSelectedKey(key)
  }

  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '64px',
        }}
      >
        {/* <Image
          width={60}
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
        /> */}
        <Avatar
          size={50}
          style={{
            backgroundColor: '#87d068',
            margin: '10px auto',
            display: 'block',
          }}
          icon={<UserOutlined />}
        />
      </div>

      {/* <Title level={2} style={{ textAlign: "center", color: "white" }}>
				{user.username}
			</Title> */}
      {showName && (
        <Title level={2} style={{ textAlign: 'center', color: 'white' }}>
          {' '}
          {user.username}{' '}
        </Title>
      )}

      <Menu
        theme='dark'
        selectedKeys={[props.selectedKey]}
        onSelect={handleMenuSelect}
        mode='inline'
      >
        {/* <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link href="/home">Home</Link>
        </Menu.Item> */}
        <Menu.Item key='users' icon={<UserOutlined />}>
          <Link href='/users'>Users</Link>
        </Menu.Item>
        {/* <Menu.Item key="recipes" icon={<BookOutlined />}>
          <Link href="/recipes">Recipes</Link>
        </Menu.Item> */}
        <Menu.Item key='categories' icon={<AppstoreOutlined />}>
          <Link href='/categories'>Categories</Link>
        </Menu.Item>
        <Menu.Item key='cuisines' icon={<EnvironmentOutlined />}>
          <Link href='/cuisines'>Cuisines</Link>
        </Menu.Item>
        <Menu.Item key='report-dish' icon={<FormOutlined />}>
          <Link href='/report-dish'>Report Dish</Link>
        </Menu.Item>
        {/* <Menu.Item key="reports" icon={<SolutionOutlined />}>
          <Link href="/reports">Reports</Link>
        </Menu.Item> */}
        <Menu.Item key='reviews' icon={<StarOutlined />}>
          <Link href='/reviews'>Reviews</Link>
        </Menu.Item>
        <Menu.Item key='feedbacks' icon={<FormOutlined />}>
          <Link href='/feedbacks'>Feedbacks</Link>
        </Menu.Item>
        <Menu.Item key='events' icon={<GlobalOutlined />}>
          <Link href='/events'>Events</Link>
        </Menu.Item>
      </Menu>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!showLogout ? (
          <Button
            type='primary'
            danger
            icon={<LogoutOutlined />}
            onClick={() => {
              Cookies.set('accessToken', '')
              dispatch(clearUser())
              message.info('Logged out')
              router.push('/login')
            }}
            style={{
              margin: 4,
              height: 40,
              width: '100%',
            }}
          />
        ) : (
          <Button
            type='primary'
            danger
            onClick={() => {
              Cookies.set('accessToken', '')
              dispatch(clearUser())
              message.info('Logged out')
              router.push('/login')
            }}
            icon={<LogoutOutlined />}
            style={{
              margin: 4,
              height: 40,
              textAlign: 'left',
              padding: '0 24px',

              width: '100%',
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </Sider>
  )
}

export default CustomSlider

