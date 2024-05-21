/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Select } from 'antd';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { OptionProps } from 'antd/es/select';
import { useLocale } from '@/hooks/locale.hook';

export type SearchParams = {
  textSearch?: string;
  statusId?: string;
  time?: string;
};

type SearchProps = {
  onSearch: (values: SearchParams) => void;
  loadingStatus?: boolean;
  status?: OptionProps[];
};

export const Search = ({ onSearch, status, loadingStatus }: SearchProps) => {
  const { formatMessage } = useLocale();

  const [textSearch, setSearchers] = useState<string>();
  const [statusId, SetStatusId] = useState<string>();
  const [time, setTime] = useState<string>();
  const handleSearch = (values?: SearchParams) => {
    onSearch({ textSearch, statusId, time, ...values });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const statusOptions =
    useMemo(
      () =>
        status?.map((status: OptionProps) => ({
          value: status.id,
          label: status.name,
        })),
      [status],
    ) ?? [];

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
          loading={loadingStatus}
          css={selectStyle}
          size="large"
          defaultValue={''}
          options={[{ value: '', label: 'Tất cả trạng thái' }, ...statusOptions]}
          onChange={(value) => SetStatusId(value)}
          onSelect={(value) => {
            handleSearch({ statusId: value });
          }}
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
              {formatMessage({ id: 'title.year' })} {year}
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
