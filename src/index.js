import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import StyleGlobal from './component/StyleGlobal/StyleGlobal';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SkeletonTheme } from 'react-loading-skeleton';
import GlobalProvider from './contexts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <GoogleOAuthProvider clientId="927156751612-1uvnfve8d0oo0l9ekmoeenf09ji6llub.apps.googleusercontent.com">
      <SkeletonTheme highlightColor="#444">
         <StyleGlobal>
            <GlobalProvider>
               <App />
            </GlobalProvider>
         </StyleGlobal>
      </SkeletonTheme>
   </GoogleOAuthProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
