/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Select } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';

export type SearchParams = {
  textSearch?: string;
  time?: string;
};

type SearchProps = {
  onSearch: (values: SearchParams) => void;
};

export const Search = ({ onSearch }: SearchProps) => {
  const [textSearch, setSearchers] = useState<string>();
  const [time, setTime] = useState<string>();
  const handleSearch = (values?: SearchParams) => {
    onSearch({ textSearch, time, ...values });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const startYear = 2015;
  const currentYear = dayjs().year();
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

  return (
    <Row justify="space-between" align="middle" gutter={[20, 0]} css={searchStyle}>
      <Col span={16}>
        <Input
          css={searchInputStyle}
          size="large"
          prefix={
            <Button css={searchBtnStyle} icon={<SearchOutlined onClick={() => handleSearch()} />} />
          }
          onChange={(e) => setSearchers(e.target.value)}
          onKeyPress={handleKeyPress}
          allowClear
        />
      </Col>
      <Col span={4}>
        <Select
          css={selectStyle}
          size="large"
          defaultValue={currentYear.toString()}
          onChange={(value) => setTime(value)}
          onSelect={(value) => handleSearch({ time: value })}
        >
          {years.map((year) => (
            <Select.Option key={year} value={year.toString()}>
              Năm {year}
            </Select.Option>
          ))}
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
