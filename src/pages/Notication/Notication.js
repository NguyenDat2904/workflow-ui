import React from 'react';
import classNames from 'classnames/bind';
import style from './Notification.module.scss';
import Wrapper from '~/component/WrapperForm/Wrapper';
import { JiraIcon, LogoIcon } from '~/component/icon/icon';
import { Link, useLocation } from 'react-router-dom';
const cx = classNames.bind(style);

function Notification() {
   const location = useLocation();
   const Url = new URLSearchParams(location.search);
   const params = Object.fromEntries(Url.entries());
   const { email } = params;
   return (
      <Wrapper>
         <div className={cx('wrapper')}>
            <section>
               <div className={cx('header')}>
                  <span>
                     <JiraIcon />
                  </span>
                  <div className={cx('header-title')}>
                     <h2>Kiểm tra hộp thư đến để hoàn tất đăng ký</h2>
                  </div>
               </div>
               <div className={cx('notification')}>
                  <div className={cx('background')}></div>
                  <div className={cx('desc')}>
                     Để hoàn thành quá trình thiết lập và đăng nhập, hãy nhấp vào liên kết xác minh trong email mà chúng
                     tôi đã gửi
                  </div>
                  <p>{email}</p>
               </div>
               <div className={cx('refund')}>
                  <Link to="/register">
                     <span>Gửi lại xác minh</span>
                  </Link>
               </div>
               <div className={cx('footer')}>
                  <footer className={cx('footer-logo')}>
                     <span className={cx('logo')}>
                        <LogoIcon />
                     </span>
                  </footer>
               </div>
            </section>
         </div>
      </Wrapper>
   );
}

export default Notification;
