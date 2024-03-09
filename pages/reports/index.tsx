import { AntdListInferencer } from '@refinedev/inferencer/antd';
import {
  Button,
  Table,
  TableProps,
  Tabs,
  TabsProps,
  Typography,
  Image,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import TableCustom from 'components/TableCustom';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { authProvider } from 'src/authProvider';
const { Title } = Typography;
interface DataTypeUser {
  key: string;
  reporter: string;
  name: string;
  reason: string;
}
interface DataTypePost {
  key: string;
  reporter: string;
  author: string;
  title: string;
  date: string;
}
interface DataTypeRecipes {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string;
  ingredents: string;
  image: string;
  reporter: string;
}

const columnsUser: ColumnsType<DataTypeUser> = [
  {
    title: 'Reporter',
    dataIndex: 'reporter',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <text>{text}</text>,
  },
  {
    title: 'Reason',
    dataIndex: 'reason',
    key: 'reason',
    render: (text) => <text>{text}</text>,
  },
  {
    title: 'Action',
    key: 'action',
    render: () => {
      return (
        <>
          <Button type='primary' danger>
            Ban
          </Button>{' '}
          <Button type='primary'>Ignore</Button>
        </>
      );
    },
  },
];
const columnsPost: ColumnsType<DataTypePost> = [
  {
    title: 'Reporter',
    dataIndex: 'reporter',
    key: 'reporter',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
    render: (text) => <text>{text}</text>,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <text>{text}</text>,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (text) => <text>{text}</text>,
  },
  {
    title: 'Action',
    key: 'action',
    render: () => {
      return (
        <>
          <Button type='primary'>View</Button>{' '}
          <Button type='primary' danger>
            Delete
          </Button>{' '}
          <Button type='primary' style={{ backgroundColor: 'green' }}>
            Ignore
          </Button>
        </>
      );
    },
  },
];
const columnsRecipes: ColumnsType<DataTypeRecipes> = [
  {
    title: 'Image',
    key: 'image',
    dataIndex: 'image',
    render: (image) => <Image src={image} width={100} />,
  },
  {
    title: 'Author',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Title',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Ingredents',
    dataIndex: 'ingredents',
    key: 'Ingredents',
  },
  {
    title: 'Date',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <>
        <text>{tags}</text>
      </>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'address', // Change to "address" to check admin status
    key: 'address',
    render: () => {
      return (
        <>
          <Button type='primary'>View</Button>{' '}
          <Button type='primary' danger>
            Delete
          </Button>{' '}
          <Button type='primary' style={{ backgroundColor: 'green' }}>
            Ignore
          </Button>
        </>
      );
    },
  },
];
const dataUser: DataTypeUser[] = [
  {
    key: '1',
    name: 'John Brown',
    reporter: 'Parter A',
    reason: 'Some good reason',
  },
  {
    key: '2',
    name: 'Jim Green',
    reporter: 'Parter B',
    reason: 'Some good reason',
  },
  {
    key: '3',
    name: 'Joe Black',
    reporter: 'Parter C',
    reason: 'Some good reason',
  },
];
const dataPost: DataTypePost[] = [
  {
    key: '1',
    author: 'John Brown',
    reporter: 'Parter A',
    title: 'A good title',
    date: '01/01/2024',
  },
  {
    key: '2',
    author: 'Jim Green',
    reporter: 'Parter B',
    title: 'A good title',
    date: '02/01/2024',
  },
  {
    key: '3',
    author: 'Joe Black',
    reporter: 'Parter C',
    title: 'A good title',
    date: '03/01/2024',
  },
];
const dataRecipes: DataTypeRecipes[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'Post A',
    tags: '01/01/2024',
    ingredents: 'A, B, C',
    image:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    reporter: 'Parter A',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'Post B',
    tags: '02/01/2024',
    ingredents: 'A, B, C',
    image:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    reporter: 'Parter B',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Post C',
    tags: '03/01/2024',
    ingredents: 'A, B, C',
    image:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    reporter: 'Parter C',
  },
];
const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'User',
    children: (
      <TableCustom
        columns={columnsUser}
        data={dataUser}
        hasEdit
        hasDelete
        onSelectedRow={() => {}}
        onEdit={(value) => {}}
      />
    ),
  },
  {
    key: '2',
    label: 'Posts',
    children: (
      <TableCustom
        columns={columnsPost}
        data={dataPost}
        hasEdit
        hasDelete
        onSelectedRow={() => {}}
        onEdit={(value) => {}}
      />
    ),
  },
  {
    key: '3',
    label: 'Recipes',
    children: (
      <>
        <TableCustom
          columns={columnsRecipes}
          data={dataRecipes}
          hasEdit
          hasDelete
          onSelectedRow={() => {}}
          onEdit={(value) => {}}
        />
      </>
    ),
  },
];

async function getData() {
  try {
    const res = await fetch(`http://localhost:3000/reports`);

    return res.json();
  } catch (e) {
    console.log(e);
  }
}

export default function ReportList({ data }: { data: any }) {
  return (
    <>
      <Title level={2}>Manage reports</Title>
      <Tabs defaultActiveKey='1' items={items} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const data = await getData();

  const translateProps = await serverSideTranslations(context.locale ?? 'en', [
    'common',
  ]);

  if (!authenticated) {
    return {
      props: {
        ...translateProps,
      },
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent('/reports')}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
      data,
    },
  };
};

