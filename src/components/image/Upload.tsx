import { useState } from 'react';
import {
  GetProp,
  Image,
  Upload as AntdUpload,
  UploadFile,
  UploadProps as AntdUploadProps,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';

type FileType = Parameters<GetProp<AntdUploadProps, 'beforeUpload'>>[0];

interface UploadProps extends AntdUploadProps {
  fileList?: UploadFile[];
  uploadLength?: number;
}

const Upload = (props: UploadProps) => {
  const cx = classNames.bind(styles);
  const {
    fileList: initialFileList = [],
    uploadLength = 5,
    ...otherProps
  } = props;

  const [fileList, setFileList] = useState<UploadFile[]>(initialFileList);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleChange: AntdUploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    // 각 파일에 대해 임시 URL 생성
    const updatedFileList = newFileList.map((file) => {
      if (file.originFileObj && !file.url) {
        file.url = URL.createObjectURL(file.originFileObj);
        file.status = 'done';
      }
      return file;
    });
    setFileList(updatedFileList);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <>
      <ImgCrop rotationSlider>
        <AntdUpload
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          onPreview={handlePreview}
          {...otherProps}
        >
          {fileList.length < uploadLength && '+ Upload'}
        </AntdUpload>
      </ImgCrop>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default Upload;
