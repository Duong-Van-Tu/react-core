import { enUS_language } from './language';
import { enUS_notice } from './notice';
import { enUS_documentTitle } from './titles/document-title';
import { enUS_avatarDropMenu } from './users/avatar-dropMenu';

const en_US = {
  ...enUS_documentTitle,
  ...enUS_avatarDropMenu,
  ...enUS_language,
  ...enUS_notice,
};

export default en_US;
