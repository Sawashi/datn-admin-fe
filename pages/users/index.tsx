import { AntdListInferencer } from '@refinedev/inferencer/antd'
import { Button, Space, Table, TableProps, Tag } from 'antd'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { authProvider } from 'src/authProvider'
import { Typography } from 'antd'
import { getAllUserData, User } from 'src/apis/users'
import { useEffect, useState } from 'react'
import TableCustom from 'components/TableCustom'
const { Title } = Typography
interface DataType {
  id: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  imgUrl: string
  gender: string
  description: string
  dateOfBirth: string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Image',
    dataIndex: 'imgUrl',
    key: 'imgUrl',
    render: (imgUrl) => <img src={imgUrl} width={100} />,
  },
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'name',
    render: (text, record) => <a>{`${record.lastName} ${record.firstName}`}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Action',
    dataIndex: 'role', // Change to "role" to check admin status
    key: 'role',
    render: (role, record) => {
      const isAdmin = role === 'admin' // Replace with your actual admin check logic
      return (
        <>
          {isMale ? (
            <Button type='primary' danger>
              Male
            </Button>
          ) : (
            <Button type='primary'>Female</Button>
          )}
        </>
      )
    },
  },
  {
    title: 'Date of birth',
    dataIndex: 'dateOfBirth',
    key: 'dateOfBirth',
  },
]

async function getData() {
  try {
    const res = await fetch(`http://localhost:3000/users`)

    return res.json()
  } catch (e) {
    console.log(e)
  }
}

export default function UserList({ data }: { data: any }) {
  return (
    <>
      <Title level={2}>Manage user</Title>
      {data?.length > 0 ? (
        <TableCustom
          columns={columns || []} // Fix: Add default value for columns
          data={data}
          hasEdit
          hasDelete
          onSelectedRow={() => {}}
          onEdit={(value) => {}}
        />
      ) : (
        <Table columns={columns || []} /> // Fix: Add default value for columns
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context)

  const translateProps = await serverSideTranslations(context.locale ?? 'en', [
    'common',
  ])

  if (!authenticated) {
    return {
      props: {
        ...translateProps,
      },
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent('/users')}`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      ...translateProps,
    },
  }
}

