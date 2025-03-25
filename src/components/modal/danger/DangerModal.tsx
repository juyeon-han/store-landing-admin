import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import BasisModal, {
  BasisModalHandle,
  BasisModalProps,
} from '@/components/modal/BasisModal';
import styles from './DangerModal.module.scss';

interface DangerModalProps extends BasisModalProps {}

const DangerModal = forwardRef<BasisModalHandle, DangerModalProps>(
  (props, ref) => {
    const cx = classNames.bind(styles);
    const { children, onOk, onCancel, ...otherProps } = props;

    return (
      <BasisModal
        ref={ref}
        onOk={onOk}
        onCancel={onCancel}
        okText="확인"
        cancelText="취소"
        okButtonProps={{
          danger: true,
          type: 'default',
        }}
        cancelButtonProps={{
          danger: true,
          type: 'primary',
        }}
        {...otherProps}
      >
        {children}
      </BasisModal>
    );
  }
);

export default DangerModal;
