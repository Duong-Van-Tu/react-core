import { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps, GetProp } from 'antd';
import { useLocale } from '@/hooks/locale.hook';
import { DownloadOutlined } from '@ant-design/icons';
import { FilterSaleKitType } from '../../services/sale.kit.service';

type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number];

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];

type Props = {
  data: DataSaleKitType[];
  downLoadDocument: (params: FilterSaleKitType) => Promise<string>;
};

const ListSaleKit = ({ data, downLoadDocument }: Props) => {
  const { formatMessage } = useLocale();

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [options, setOptions] = useState<
    {
      value: string;
      label: string;
      filePath: string;
    }[]
  >([]);

  useEffect(() => {
    const options = data?.map((it: DataSaleKitType) => ({
      value: it.id,
      label: it.name,
      filePath: it.filePath,
    }));

    setOptions(options);
  }, [data]);

  const checkAll = options.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < options.length;

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? options.map((option) => option.value) : []);
  };

  const base64DecToArr = (strBase64: string, nBlockSize: number) => {
    var sB64Enc = strBase64.replace(/[^A-Za-z0-9\+\/]/g, ''),
      nInLen = sB64Enc.length,
      nOutLen = nBlockSize
        ? Math.ceil(((nInLen * 3 + 1) >> 2) / nBlockSize) * nBlockSize
        : (nInLen * 3 + 1) >> 2,
      taBytes = new Uint8Array(nOutLen);

    for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
      nMod4 = nInIdx & 3;
      nUint24 |= parseInt(sB64Enc.charAt(nInIdx), 64) << (18 - 6 * nMod4);
      if (nMod4 === 3 || nInLen - nInIdx === 1) {
        for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nUint24 >>= 8) {
          taBytes[nOutIdx++] = nUint24 >>> 16;
        }
        nUint24 = 0;
      }
    }
    return taBytes;
  };

  const handleDownloadFile = async (id: string, name: string) => {
    const base64Data = await downLoadDocument({ id });
    const binaryData = base64DecToArr(base64Data.split(',')[1], 0);
    const blob = new Blob([binaryData], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = name; // Set the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        margin: '18px 0',
      }}
    >
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
        style={{
          marginBottom: '16px',
        }}
      >
        <p
          style={{
            fontSize: '16px',
            color: '#8993A4',
          }}
        >
          {formatMessage({ id: 'table.column.saleKit.selectAll' })}
        </p>
      </Checkbox>
      <CheckboxGroup
        style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        value={checkedList}
        onChange={onChange}
      >
        {options.map((option) => (
          <Checkbox key={option.value} value={option.value}>
            <a
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '18px',
                textDecoration: 'underline',
              }}
              href={'#'}
              onClick={() => handleDownloadFile(option.value, option.label)}
            >
              <DownloadOutlined />
              {option.label}
            </a>
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
};

export default ListSaleKit;
