/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row, Select, Space } from 'antd';

export const Search = () => {
  return (
    <Row justify="space-between" gutter={[20, 0]} css={searchStyle}>
      <Col span={16}>
        <Input css={searchInput} size="large" prefix={<SearchOutlined />} />
      </Col>
      <Col span={8} css={columnStyle}>
        <Space size={'large'}>
          <Select size="large" defaultValue="0">
            <Select.Option value="0">Tất cả trạng thái</Select.Option>
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
            <Select.Option value="4">4</Select.Option>
          </Select>

          <Select size="large" defaultValue="0">
            <Select.Option value="0">Năm 2024</Select.Option>
            <Select.Option value="1">Năm 2025</Select.Option>
            <Select.Option value="2">Năm 2026</Select.Option>
            <Select.Option value="3">Năm 2027</Select.Option>
            <Select.Option value="4">Năm 2028</Select.Option>
          </Select>
        </Space>
      </Col>
    </Row>
  );
};

const searchStyle = css`
  padding: 1rem 1.4rem;
  box-shadow: 0.04px 0.01px 6px #eff1f4;
  border-radius: 0.8rem;
`;

const columnStyle = css`
  display: flex;
  justify-content: flex-end;
`;

const searchInput = css`
  border: none;
  outline: none;
`;
