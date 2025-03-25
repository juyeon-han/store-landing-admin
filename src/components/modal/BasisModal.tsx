import { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, ModalProps } from 'antd';
import classNames from 'classnames/bind';
import styles from './BasisModal.module.scss';

export interface BasisModalHandle {
  open: () => void;
  close: () => void;
}
export interface BasisModalProps extends ModalProps {
  size?: 'small' | 'medium' | 'large';
  onOk?: () => void;
  onCancel?: () => void;
}

const sizeOption = {
  small: '400px',
  medium: '600px',
  large: '800px',
};

const BasisModal = forwardRef<BasisModalHandle, BasisModalProps>(
  (props, ref) => {
    const cx = classNames.bind(styles);
    const { size = 'small', onOk, onCancel, children, ...otherProps } = props;
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    const handleOk = () => {
      onOk?.();
      setIsOpen(false);
    };

    const handleCancel = () => {
      onCancel?.();
      setIsOpen(false);
    };

    return (
      <Modal
        width={sizeOption[size]}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        {...otherProps}
      >
        <div className={cx('modal_inner')}>{children}</div>
      </Modal>
    );
  }
);

export default BasisModal;
