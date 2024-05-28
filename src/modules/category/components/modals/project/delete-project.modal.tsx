/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';
import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';

import { useProject } from '@/modules/category/services/project.service';
type DeleteProjectProps = {
  closeModal: () => void;
  data?: DataCustomerType;
  projectIds: string[];
};
export const DeleteProject = ({ closeModal, projectIds, data }: DeleteProjectProps) => {
  const { deleteProject, getAllProject } = useProject();
  const pageIndex = useRootSelector((state) => state.category.project.pagination?.pageIndex) ?? 0;
  const [loading] = useWatchLoading(['delete-project', false]);
  const dataProject = useRootSelector((state) => state.category.project.data);

  const handleDeleteProject = async () => {
    const deleteclient = await deleteProject(!!data ? [data.id!] : projectIds);
    if (deleteclient) {
      closeModal();
    } else {
      console.error('Failed to delete project');
    }
  };
  useEffect(() => {
    if (dataProject.length === 0) {
      getAllProject({
        pageIndex: pageIndex === 1 ? 1 : pageIndex - 1,
        pageSize: Pagination.PAGESIZE,
      });
    }
  }, [dataProject]);
  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Đồng ý xoá các mục tiêu đã chọn?</h3>
      <Row justify="center">
        <Space>
          <Button onClick={() => closeModal()}>Huỷ</Button>
          <Button loading={loading} type="primary" danger onClick={handleDeleteProject}>
            Xoá
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
