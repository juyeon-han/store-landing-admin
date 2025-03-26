import { useRef, useState } from 'react';
import {
  Button,
  Flex,
  GetProp,
  Image as AntdImage,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import TextArea, { TextAreaRef } from 'antd/es/input/TextArea';
import ImgCrop from 'antd-img-crop';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

const left_data = [
  {
    title: '지점 명',
    content: '약손명가 건대점',
  },
  {
    title: '지점 주소',
    content: '경기도 안산시 상록구 건대로 123',
  },
  {
    title: '지점 전화번호',
    content: '010-1234-5678',
  },
  {
    title: '지점 영업시간',
    content: '월~금 09:00-18:00',
  },
];

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const StorePage = () => {
  const cx = classNames.bind(styles);
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image1.png',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1739989934321-fadbccc56265?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      uid: '-2',
      name: 'image2.png',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1742268351424-e845eb0c99a2?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [inputValue, setInputValue] = useState(
    '안녕하세요, 약손명가 건대점 원장 정진연입니다.😊 저희 매장은 10년 이상 한자리에서 변함없이 운영되며, 더욱 발전된 효과, 친절, 서비스를 제공하기 위해 최선을 다하고 있습니다. 소중한 시간을 내어 방문해 주시는 모든 고객님께 깊이 감사드리며, 늘 기대에 부응하는 매장이 되겠습니다. 관리 중 궁금한 점이나 필요한 사항이 있으시면, 언제든 편하게 연락 주세요. 건강한 아름다움을 전해드릴 수 있도록 언제나 최선을 다하겠습니다. 감사합니다.💖'
  );

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleEdit = () => {
    // console.log('🚀 ~ handleEdit ~ inputRef.current:', inputRef.current);
  };

  return (
    <Flex gap="middle" vertical align="end">
      <Flex gap="middle" className={cx('container')}>
        <Flex className={cx('content_wrapper')} vertical gap={40}>
          {left_data.map((item, index) => (
            <Flex key={index}>
              <div className={cx('title')}>{item.title}</div>
              <div className={cx('content')}>{item.content}</div>
            </Flex>
          ))}
          <Flex>
            <div className={cx('title')}>지점 이미지</div>
            <div className={cx('content')}>
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleChange}
                  onPreview={handlePreview}
                >
                  {fileList.length < 5 && '+ Upload'}
                </Upload>
              </ImgCrop>
              {previewImage && (
                <AntdImage
                  wrapperStyle={{ display: 'none' }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(''),
                  }}
                  src={previewImage}
                />
              )}
            </div>
          </Flex>
        </Flex>
        <Flex className={cx('content_wrapper')} vertical gap={40}>
          <Flex>
            <div className={cx('title')}>원장 명</div>
            <div className={cx('content')}>정진영</div>
          </Flex>
          <Flex>
            <div className={cx('title')}>원장 사진</div>
            <div className={cx('content')}>
              <AntdImage
                className={cx('image')}
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </div>
          </Flex>
          <Flex>
            <div className={cx('title')}>인사말</div>
            <TextArea
              showCount
              maxLength={300}
              onChange={handleInputChange}
              placeholder="disable resize"
              style={{ height: 200, resize: 'none' }}
              className={cx('content')}
              value={inputValue}
            />
          </Flex>
        </Flex>
      </Flex>
      <Button type="primary" onClick={handleEdit}>
        수정
      </Button>
    </Flex>
  );
};

export default StorePage;
