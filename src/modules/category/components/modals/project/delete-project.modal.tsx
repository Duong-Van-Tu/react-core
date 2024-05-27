/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';
import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';
import { useLocation } from 'react-router-dom';
import { useProject } from '@/modules/category/services/project.service';
type DeleteProjectProps = {
  closeModal: () => void;
  data?: DataCustomerType;
  projectIds: string[];
};
export const DeleteProject = ({ closeModal, projectIds }: DeleteProjectProps) => {
  const { deleteProject, getAllProject } = useProject();
  const pageIndex = useRootSelector((state) => state.category.project.pagination?.pageIndex) ?? 0;
  const [loading] = useWatchLoading(['delete-project', false]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab');
  const handleDeleteProject = async () => {
    const deleteclient = await deleteProject(projectIds);
    if (deleteclient) {
      getAllProject({
        pageIndex: pageIndex || 1,
        pageSize: Pagination.PAGESIZE,
        roleType: tab!,
      });

      closeModal();
    } else {
      console.error('Failed to delete project');
    }
  };
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
