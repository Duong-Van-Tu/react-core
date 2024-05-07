import { enUS_form } from './form';
import { enUS_language } from './language';
import { enUS_notice } from './notice';
import { enUS_title } from './title';
import { enUS_users } from './users';

const en_US = {
  ...enUS_title,
  ...enUS_users,
  ...enUS_language,
  ...enUS_notice,
  ...enUS_form,
};

export default en_US;
