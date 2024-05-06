import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import viVN from 'antd/es/locale/vi_VN';
import { reduxStore } from '@/redux/store';
import Router from '@/routers/index.router';
import { useRootSelector } from './hooks/selector.hook';
import { localeConfig } from './locales';

function App() {
  const language = useRootSelector((state) => state.locale.language);
  const getAntdLocale = () => {
    if (language === 'en_US') {
      return enUS;
    } else if (language === 'vi_VN') {
      return viVN;
    }
  };
  return (
    <ConfigProvider locale={getAntdLocale()}>
      <IntlProvider locale={language.split('_')[0]} messages={localeConfig[language]}>
        <Provider store={reduxStore}>
          <Router />
        </Provider>
      </IntlProvider>
    </ConfigProvider>
  );
}

export default App;
