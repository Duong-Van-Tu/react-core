import { LocaleFormatter } from '@/components/locale-formatter';
import { Link } from 'react-router-dom';
import { useRootSelector } from '@/hooks/selector.hook';

type Props = {
  recordAdmin?: DataIncomTypeWithRoleAdminType;
  recordUser?: DataIncomTypeWithRoleUserType;
};

const ViewDetail = ({ recordAdmin, recordUser }: Props) => {
  const user = useRootSelector((state) => state.auth.user);

  return (
    <Link
      style={{
        textAlign: 'center',
        display: 'block',
      }}
      to={
        recordAdmin
          ? `/personnel/infor-income/details-view?userId=${recordAdmin.applicationUser.id}`
          : `/personnel/infor-income/details-view?userId=${user?.id}&month=${recordUser?.month}&year=${recordUser?.year}`
      }
    >
      <LocaleFormatter id="title.document.detailsView" />
    </Link>
  );
};

export default ViewDetail;
