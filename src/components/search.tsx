/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Select } from 'antd';

export const Search = () => {
  return (
    <Row justify="space-between" align="middle" gutter={[20, 0]} css={searchStyle}>
      <Col span={16}>
        <Input
          css={searchInputStyle}
          size="large"
          prefix={<Button css={searchBtnStyle} icon={<SearchOutlined />} />}
        />
      </Col>
      <Col span={4}>
        <Select css={selectStyle} size="large" defaultValue="0">
          <Select.Option value="0">Tất cả trạng thái</Select.Option>
          <Select.Option value="1">1</Select.Option>
          <Select.Option value="2">2</Select.Option>
          <Select.Option value="3">3</Select.Option>
          <Select.Option value="4">4</Select.Option>
        </Select>
      </Col>
      <Col span={4}>
        <Select css={selectStyle} size="large" defaultValue="0">
          <Select.Option value="0">Năm 2024</Select.Option>
          <Select.Option value="1">Năm 2025</Select.Option>
          <Select.Option value="2">Năm 2026</Select.Option>
          <Select.Option value="3">Năm 2027</Select.Option>
          <Select.Option value="4">Năm 2028</Select.Option>
        </Select>
      </Col>
    </Row>
  );
};

const searchBtnStyle = css`
  border: none;
  padding: none;
  background: none;
`;

const searchStyle = css`
  padding: 1rem 1.4rem;
  box-shadow: 0.04px 0.01px 6px #eff1f4;
  border-radius: 0.8rem;
`;

const searchInputStyle = css`
  border: none;
  outline: none;
`;

const selectStyle = css`
  width: 100%;
`;
