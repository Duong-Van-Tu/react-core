import { viVN_language } from './language';
import { viVN_notice } from './notice';
import { viVN_documentTitle } from './titles/document-title';
import { viVN_avatarDropMenu } from './users/avatar-dropMenu';

const vi_VN = {
  ...viVN_documentTitle,
  ...viVN_avatarDropMenu,
  ...viVN_language,
  ...viVN_notice,
};

export default vi_VN;
