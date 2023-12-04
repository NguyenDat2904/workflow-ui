import React, { useState } from 'react';
import Wrapper from '~/component/WrapperForm/Wrapper';
import classNames from 'classnames/bind';
import style from './Forgot.module.scss';
import { LogoIcon } from '~/component/icon/icon';
import HeaderSuffix from '~/component/HeaderSuffix/HeaderSuffix';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

function Forgot() {
    const [email, setEmail] = useState('');
    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <Wrapper>
            <section className={cx('main')}>
                <HeaderSuffix title="Bạn không đăng nhập được?" />
                <form action="">
                    <div className={cx('input-wrapper')}>
                        <div className={cx('input')}>
                            <label htmlFor="">Chúng tôi sẽ gửi liên kết khôi phục đến</label>
                            <div className={cx('presentation')}>
                                <input
                                    type={'text'}
                                    placeholder="Nhập địa chỉ Email"
                                    name="password"
                                    value={email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </form>
                <div className={cx('button-submit')}>
                    <button type="submit">
                        <span>Gửi đường liên kết khôi phục</span>
                    </button>
                </div>
                <div className={cx('back')}>
                    <Link>Quay lại đăng nhập</Link>
                </div>
                <footer>
                    <div className={cx('page-footer')}>
                        <span>
                            <LogoIcon />
                        </span>
                        <div className={cx('txt')}>
                            Một tài khoản cho Jira, Confluence, Trello và <Link>sản phẩm khác.</Link>
                        </div>
                    </div>
                    <ul className={cx('support')}>
                        <li>
                            <Link>Trợ giúp đăng nhập</Link>
                        </li>
                        <p>•</p>
                        <li>
                            <Link>Liên hệ với bộ phận hỗ trợ</Link>
                        </li>
                    </ul>
                </footer>
            </section>
        </Wrapper>
    );
}

export default Forgot;
