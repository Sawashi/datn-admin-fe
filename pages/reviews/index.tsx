import { AntdListInferencer } from '@refinedev/inferencer/antd';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { authProvider } from 'src/authProvider';
import {
  Button,
  Table,
  TableProps,
  Tabs,
  TabsProps,
  Tag,
  Typography,
  Rate,
} from 'antd';
import { Review } from './review.type';
import DateRow from 'components/DateRow';
import { formatDate } from 'utils';
import TableCustom from 'components/TableCustom';
import { ColumnsType } from 'antd/es/table';
import TooltipLineClamp from 'components/TooltipLineClamp';
const { Title } = Typography;

const columns: ColumnsType<Review> = [
  {
    title: 'Author',
    dataIndex: 'userId',
    key: 'userId',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Dish',
    dataIndex: 'dishId',
    key: 'dishId',
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
    render: (text) => <div>{text}</div>,
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    key: 'rating',
    render: (rating) => <Rate value={rating} disabled />,
  },
  {
    title: 'Created At',
    key: 'createdAt',
    dataIndex: 'createdAt',
    render: (text) => <DateRow date={text} />,
  },
  {
    title: 'Updated At',
    key: 'updatedAt',
    dataIndex: 'updatedAt',
    render: (text) => <DateRow date={text} />,
  },
];

async function getData() {
  try {
    const res = await fetch('http://localhost:3000/reviews');

    return res.json();
  } catch (e) {
    console.log(e);
  }
}

export default function Page({ data }: { data: Review[] }) {
  return (
    <>
      <Title level={2}>Manage reviews</Title>
      <TableCustom
        columns={columns}
        data={data}
        hasEdit
        hasDelete
        onSelectedRow={() => {}}
        onEdit={(value) => {
          // setOpenManageZoomModal(true);
          // setSelectedBooking(value);
        }}
      />
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
        destination: `${redirectTo}?to=${encodeURIComponent('/reviews')}`,
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

