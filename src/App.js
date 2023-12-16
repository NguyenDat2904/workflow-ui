import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Fragment, useContext, useEffect, useState } from 'react';
import { publicRoutes, privateRoutes } from '~/routes/routes';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import { AppContext, AppProvider } from './hook/context/context';
import { ToastContainer } from 'react-toastify';

function App() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
    // 1. State

    // 2. useEffect
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        setIsAuthenticated(!!accessToken);
    }, []);

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
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
                                path={route.path}
                                element={
                                    isAuthenticated ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Navigate to="/login" />
                                    )
                                }
                            />
                        );
                    })}
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
                                path={route.path}
                                element={
                                    isAuthenticated ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    )
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
