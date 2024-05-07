import { viVN_form } from './form';
import { viVN_language } from './language';
import { viVN_notice } from './notice';
import { viVN_title } from './title';
import { viVN_users } from './users';

const vi_VN = {
  ...viVN_title,
  ...viVN_users,
  ...viVN_language,
  ...viVN_notice,
  ...viVN_form,
};

export default vi_VN;
