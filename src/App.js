import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import routes from '~/routes/routes';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import { AppProvider } from './hook/context/context';

function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        {routes.map((route, index) => {
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
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;
