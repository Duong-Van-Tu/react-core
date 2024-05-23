import { LocaleFormatter } from '@/components/locale-formatter';
import { usePermission } from '@/hooks/permission.hook';
import { useIncome } from '@/modules/users/services/income.service';
import { Link } from 'react-router-dom';
import { Pagination } from '@/constants/pagination';
import { useRootSelector } from '@/hooks/selector.hook';

type Props = {
  recordAdmin?: DataIncomTypeWithRoleAdminType;
  recordUser?: DataIncomTypeWithRoleUserType;
};

const ViewDetail = ({ recordAdmin, recordUser }: Props) => {
  const { getListIncomeDetail } = useIncome();
  const { isAdmin } = usePermission();
  const user = useRootSelector((state) => state.auth.user);

  const handleViewDetail = () => {
    if (isAdmin && recordAdmin) {
      getListIncomeDetail({
        userId: recordAdmin.applicationUser.id,
        pageIndex: Pagination.PAGEINDEX,
        pageSize: Pagination.PAGESIZE,
      });
    } else {
      getListIncomeDetail({
        userId: user?.id,
        month: recordUser?.month.toString(),
        year: recordUser?.year.toString(),
        pageIndex: Pagination.PAGEINDEX,
        pageSize: Pagination.PAGESIZE,
      });
    }
  };

  return (
    <Link
      style={{
        textAlign: 'center',
        display: 'block',
      }}
      onClick={handleViewDetail}
      to="/personnel/infor-income/details-view"
    >
      <LocaleFormatter id="title.document.detailsView" />
    </Link>
  );
};

export default ViewDetail;
