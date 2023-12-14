import React, { useState } from 'react';
import Wrapper from '~/component/WrapperForm/Wrapper';
import classNames from 'classnames/bind';
import style from './Forgot.module.scss';
import { LogoIcon } from '~/component/icon/icon';
import HeaderSuffix from '~/component/HeaderSuffix/HeaderSuffix';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '~/ultil/hpptRequest';
const cx = classNames.bind(style);

function Forgot() {
    const navigate = useNavigate();
    // 1. State
    const [email, setEmail] = useState('');

    // 2. Func
    const handleChange = (e) => {
        setEmail(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const verify = await post('/users/forgot', {
            email: email,
        });
        if (verify.status === 404) {
            if (verify.data.message === 'Email does not exist, please register') {
                navigate(`/register?email=${email}`);
            }
        }
        if (verify.status === 200) {
            navigate(`/reset-password?email=${email}`);
        }
    };

    return (
        <Wrapper>
            <section className={cx('main')}>
                <HeaderSuffix title="Bạn không đăng nhập được?" />
                <form action="" onSubmit={handleSubmit}>
                    <div className={cx('input-wrapper')}>
                        <div className={cx('input')}>
                            <label htmlFor="">Chúng tôi sẽ gửi liên kết khôi phục đến</label>
                            <div className={cx('presentation')}>
                                <input
                                    type="email"
                                    placeholder="Nhập địa chỉ Email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('button-submit')}>
                        <button type="submit">
                            <span>Gửi đường liên kết khôi phục</span>
                        </button>
                    </div>
                </form>
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
