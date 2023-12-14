import React from 'react';
import classNames from 'classnames/bind';
import style from './Notification.module.scss';
import Wrapper from '~/component/WrapperForm/Wrapper';
import { JiraIcon, LogoIcon } from '~/component/icon/icon';
import { Link, useLocation } from 'react-router-dom';
const cx = classNames.bind(style);

function Reset() {
    const location = useLocation();
    const Url = new URLSearchParams(location.search);
    const params = Object.fromEntries(Url.entries());
    const { email } = params;
    return (
        <Wrapper>
            <div className={cx('wrapper')}>
                <section className={cx('main')}>
                    <div className={cx('header')}>
                        <span>
                            <JiraIcon />
                        </span>
                        <div className={cx('header-title')}>
                            <h2>Bạn không đăng nhập được?</h2>
                        </div>
                    </div>
                    <div className={cx('notification')}>
                        <div className={cx('background')}></div>
                        <div className={cx('desc')}>Chúng tôi đã gửi liên kết khôi phục cho bạn theo địa chỉ</div>
                        <p>{email}</p>
                    </div>
                    <div className={cx('refund')}>
                        <Link to="/login">
                            <span>Quay lại đăng nhập</span>
                        </Link>
                        <p className={cx('dot')}>•</p>
                        <Link to="/forgot">
                            <span>Gửi lại liên kết khôi phục</span>
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

export default Reset;
