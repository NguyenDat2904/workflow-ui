import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Verify.module.scss';
import { EyeIcon, EyeIconPassword, EyeIconText, GreenTickIcon, LogoIcon } from '~/component/icon/icon';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

function Verify() {
    // 1. State
    const [values, setValue] = useState({
        password: '',
        cfmPassword: '',
    });
    const [errors, setErrors] = useState({
        password: '',
        cfmPassword: '',
    });
    const [eye, setEye] = useState({
        password: false,
        cfmPassword: false,
    });

    // 2. UseEffect
    useEffect(() => {
        const newErrors = {};
        if (values.password.length < 8 && values.password.length > 0) {
            newErrors.cfmPassword = 'Mật khẩu phải ít nhất 8 ký tự';
        } else {
            newErrors.cfmPassword = '';
        }
        setErrors(newErrors);
    }, [values]);

    // 3. Func
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const handleSeePassword = (name) => {
        console.log(eye.name);
        setEye((pre) => ({
            ...pre,
            [name]: !eye[name],
        }));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')}>
                <div className={cx('header')}>
                    <span className={cx('header-logo')}>
                        <LogoIcon nameCss={cx('logo')} />
                    </span>
                    <div className={cx('header-suffix')}>
                        <div className={cx('suffix')}>
                            <div className={cx('title')}>
                                <h5>Đã xác minh địa chỉ email</h5>
                                <span>
                                    <GreenTickIcon nameCss={cx('tick')} />
                                </span>
                            </div>
                            Finish setting up your account
                        </div>
                    </div>
                </div>
                <div>
                    <form action="" id="form-sign-up">
                        <div className={cx('input-wrapper')}>
                            <label htmlFor="">Địa chỉ Email</label>
                            <p>dat43563@nuce.edu.vn</p>
                        </div>
                        <div className={cx('input-wrapper')}>
                            <div className={cx('input')}>
                                <label htmlFor="">Mật khẩu</label>
                                <div className={cx('presentation')}>
                                    <input
                                        type={eye.password ? 'text' : 'password'}
                                        placeholder="Tạo mật khẩu"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <span className={cx('input-icon')} onClick={() => handleSeePassword('password')}>
                                {eye.password ? <EyeIconText /> : <EyeIconPassword />}
                            </span>
                        </div>
                        <div className={cx('input-wrapper')}>
                            <div className={cx('input')}>
                                <label htmlFor="">Nhập lại mật khẩu</label>
                                <div className={cx('presentation')}>
                                    <input
                                        type={eye.cfmPassword ? 'text' : 'password'}
                                        placeholder="Nhập lại mật khẩu"
                                        name="cfmPassword"
                                        value={values.cfmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <span className={cx('input-icon')} onClick={() => handleSeePassword('cfmPassword')}>
                                {eye.cfmPassword ? <EyeIconText /> : <EyeIconPassword />}
                            </span>
                            <p className={cx('error')}>{errors.cfmPassword}</p>
                        </div>
                        <div className={cx('legal-message')}>
                            <p>
                                Bằng việc đăng ký, tôi chấp nhận <Link>Điều khoản dịch vụ của Atlassian Cloud</Link> và
                                công nhận <Link>Chính sách quyền riêng tư</Link>
                            </p>
                        </div>
                        <div className={cx('button-submit')}>
                            <button type="submit">
                                <span>Tiếp tục</span>
                            </button>
                        </div>
                    </form>
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
                    <div className={cx('txt')}>
                        Trang này được bảo vệ bởi reCAPTCHA cũng như tuân theo <Link>Chính sách quyền riêng tư</Link> và{' '}
                        <Link>Điều khoản dịch vụ</Link> của Google.
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Verify;
