import { forwardRef } from 'react';
import { Flex, Table, TableProps } from 'antd';
import Search from 'antd/es/input/Search';
import Column from 'antd/es/table/Column';
import classNames from 'classnames/bind';
import BasisModal, {
  BasisModalHandle,
  BasisModalProps,
} from '@/components/modal/BasisModal';
import styles from './PageRegistrationModal.module.scss';

interface PageRegistrationModalProps extends BasisModalProps {
  onOk?: () => void;
  onCancel?: () => void;
}

interface PageDataType {
  key: React.Key;
  brand: string;
  store_id: number;
  store_name: string;
}

const data: PageDataType[] = [
  {
    key: '1',
    brand: '약손명가',
    store_id: 1,
    store_name: '건대점',
  },
  {
    key: '2',
    brand: '약손명가',
    store_id: 2,
    store_name: '강남점',
  },
  {
    key: '3',
    brand: '약손명가',
    store_id: 3,
    store_name: '봉은사점',
  },
  {
    key: '4',
    brand: '약손명가',
    store_id: 4,
    store_name: '등촌점',
  },
];

const PageRegistrationModal = forwardRef<
  BasisModalHandle,
  PageRegistrationModalProps
>((props, ref) => {
  const cx = classNames.bind(styles);
  const { onOk, onCancel, ...otherProps } = props;

  const rowSelection: TableProps<PageDataType>['rowSelection'] = {
    type: 'radio',
    columnWidth: 70,
    onChange: (selectedRowKeys: React.Key[], selectedRows: PageDataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
  };
  return (
    <BasisModal
      title="페이지 등록"
      ref={ref}
      onOk={onOk}
      onCancel={onCancel}
      okText="등록"
      cancelText="취소"
      size="large"
      {...otherProps}
    >
      <Flex vertical gap="middle">
        <Flex justify="space-between" align="center">
          <p>지점 선택</p>
          <Search
            style={{ width: 300 }}
            placeholder="지점 명을 입력하세요"
            // onSearch={onSearch}
            enterButton
          />
        </Flex>
        <Table<PageDataType>
          rowSelection={{ ...rowSelection }}
          dataSource={data}
          size="small"
        >
          <Column
            title="지점 ID"
            dataIndex="store_id"
            key="store_id"
            // align="center"
            width={150}
          />
          <Column title="브랜드" dataIndex="brand" key="brand" width={200} />
          <Column title="지점명" dataIndex="store_name" key="store_name" />
        </Table>
      </Flex>
    </BasisModal>
  );
});

export default PageRegistrationModal;
