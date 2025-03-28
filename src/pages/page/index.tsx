import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Space, Table, TableProps } from 'antd';
import Column from 'antd/es/table/Column';
import classNames from 'classnames/bind';
import { BasisModalHandle } from '@/components/modal/BasisModal';
import DangerModal from '@/components/modal/danger/DangerModal';
import PageRegistrationModal from '@/components/modal/pageRegistration/PageRegistrationModal';
import { paths } from '@/routes';
import styles from './index.module.scss';

interface PageDataType {
  key: React.Key;
  date: string;
  store_id: number;
  store_name: string;
  store_owner: string;
  status: 'Y' | 'N';
}

const data: PageDataType[] = [
  {
    key: '1',
    date: '2025-04-24',
    store_id: 1,
    store_name: '약손명가 건대점',
    store_owner: '김건대',
    status: 'Y',
  },
  {
    key: '2',
    date: '2025-03-24',
    store_id: 2,
    store_name: '약손명가 강남점',
    store_owner: '이강남',
    status: 'Y',
  },
  {
    key: '3',
    date: '2025-02-24',
    store_id: 3,
    store_name: '약손명가 봉은사점',
    store_owner: '박봉은',
    status: 'N',
  },
  {
    key: '4',
    date: '2025-01-24',
    store_id: 4,
    store_name: '약손명가 등촌점',
    store_owner: '최등촌',
    status: 'N',
  },
];

const rowSelection: TableProps<PageDataType>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: PageDataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
};

const PagePage = () => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();

  const pageRegistrationModalRef = useRef<BasisModalHandle>(null);
  const pageDeleteModalRef = useRef<BasisModalHandle>(null);

  const handlePageRegistration = () => {
    pageRegistrationModalRef.current?.open();
  };

  const handlePageDelete = () => {
    pageDeleteModalRef.current?.open();
  };

  return (
    <Flex gap="middle" vertical align="flex-end">
      <Space>
        <Button onClick={handlePageRegistration}>페이지 등록</Button>
        <Button onClick={handlePageDelete}>삭제</Button>
      </Space>
      <Table<PageDataType>
        rowSelection={{ ...rowSelection }}
        dataSource={data}
        className={cx('table')}
        onRow={(record) => ({
          onClick: () => navigate(`${paths.store}?store_id=${record.store_id}`),
        })}
      >
        <Column title="등록일" dataIndex="date" key="date" align="center" />
        <Column title="지점 ID" dataIndex="store_id" key="store_id" />
        <Column title="지점명" dataIndex="store_name" key="store_name" />
        <Column
          title="원장"
          dataIndex="store_owner"
          key="store_owner"
          align="center"
        />
        <Column
          title="게시 상태"
          dataIndex="status"
          key="status"
          align="center"
          render={(text) => (
            <p style={{ color: text === 'Y' ? 'blue' : 'red' }}>{text}</p>
          )}
        />
      </Table>
      <PageRegistrationModal ref={pageRegistrationModalRef} />
      <DangerModal ref={pageDeleteModalRef} title="지점 페이지 삭제">
        <p>삭제하시겠습니까?</p>
      </DangerModal>
    </Flex>
  );
};

export default PagePage;
