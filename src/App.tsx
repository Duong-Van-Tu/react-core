import { Provider } from 'react-redux';

import { reduxStore } from './redux/store';
import Router from './routers/index.router';

import { AgentProvider } from './components/agent.provider';

function App() {
  return (
    <div className="App">
      <Provider store={reduxStore}>
        <AgentProvider>
          <Router />
        </AgentProvider>
      </Provider>
    </div>
  );
}

export default App;
