/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { userSaleKit } from '@/modules/sales/services/sale-kit.service';
import { css } from '@emotion/react';
import { Button, Row, Space, Upload, UploadFile } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Dragger } = Upload;

type AddSaleKitProps = {
  closeModal: () => void;
};

export const AddSaleKit = ({ closeModal }: AddSaleKitProps) => {
  const { addSaleKit } = userSaleKit();

  const [loading] = useWatchLoading(['add-sale-kit', false]);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleAddSaleKit = () => {
    if (fileList.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < fileList.length; i++) {
        formData.append('files', fileList[i] as any);
      }

      addSaleKit({ files: formData });
    }

    setFileList([]);
    closeModal();
  };

  const props = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file: UploadFile) => {
      setFileList((prev) => [...prev, file]);
      return false;
    },
    fileList,
    multiple: true,
  };

  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Thêm tài liệu</h3>
      <Dragger
        {...props}
        style={{
          marginBottom: '12px',
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or
          other banned files.
        </p>
      </Dragger>
      <Row
        justify="center"
        style={{
          marginTop: '12px',
        }}
      >
        <Space>
          <Button
            onClick={() => {
              closeModal();
            }}
          >
            Huỷ
          </Button>
          <Button loading={loading} type="primary" onClick={handleAddSaleKit}>
            Lưu
          </Button>
        </Space>
      </Row>
    </div>
  );
};

const rootStyle = css`
  margin-top: 2rem;
  padding: 0 2rem;
`;

const titleStyle = css`
  font-size: 1.8rem;
  line-height: 2rem;
  text-align: center;
  margin-bottom: 2.4rem;
  font-weight: 500;
`;
