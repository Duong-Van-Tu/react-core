import { Route, Routes } from 'react-router-dom';
import SaleIndexPage from '../pages';

function SaleRouter() {
  return (
    <Routes>
      <Route
        index
        element={
          //   <Middleware mode="private">
          <SaleIndexPage />
          //   </Middleware>
        }
      ></Route>
    </Routes>
  );
}

export default SaleRouter;
