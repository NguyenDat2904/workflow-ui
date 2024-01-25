import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment, useContext, useEffect } from 'react';
import { publicRoutes, privateRoutes } from '~/routes/routes';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import PrivateRouter from './routes/PrivateRouter/PrivateRouter';
import PublicRouter from './routes/PublicRouter/PublicRouter';
import { TitleContext } from './contexts/title/TitleProvider';

function App() {
   const { title, setTitle } = useContext(TitleContext);

   useEffect(() => {
      if (window.location.pathname === '/project') {
         setTitle('Project - WorkFlow');
      } else if (window.location.pathname === '/your-work') {
         setTitle('Your work - WorkFlow');
      } else if (window.location.pathname === '/project/:id/board') {
         setTitle('Agile Board - WorkFlow');
      } else {
         setTitle('WorkFlow');
      }
   }, [setTitle]);

   useEffect(() => {
      document.title = title;
   }, [title]);

   return (
      <BrowserRouter>
         <div className="App">
            <Routes>
               <Route element={<PrivateRouter />}>
                  {privateRoutes.map((route, index) => {
                     const Page = route.component;
                     let Layout = DefaultLayout;
                     if (route.layout) {
                        Layout = route.layout;
                     } else if (route.layout === null) {
                        Layout = Fragment;
                     }
                     return (
                        <Route
                           key={index}
                           element={
                              <Layout>
                                 <Page />
                              </Layout>
                           }
                           path={route.path}
                        />
                     );
                  })}
               </Route>
               <Route element={<PublicRouter />}>
                  {publicRoutes.map((route, index) => {
                     const Page = route.component;
                     let Layout = DefaultLayout;
                     if (route.layout) {
                        Layout = route.layout;
                     } else if (route.layout === null) {
                        Layout = Fragment;
                     }
                     return (
                        <Route
                           key={index}
                           element={
                              <Layout>
                                 <Page />
                              </Layout>
                           }
                           path={route.path}
                        />
                     );
                  })}
               </Route>
            </Routes>
         </div>
         <ToastContainer />
      </BrowserRouter>
   );
}

export default App;
