import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Verify.module.scss';
import { EyeIconPassword, EyeIconText, LoadingIcon, LogoIcon } from '~/component/icon/icon';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderSuffix from '~/component/HeaderSuffix/HeaderSuffix';
import { post } from '~/ultil/hpptRequest';
import { UserContext } from '~/contexts/user/userContext';
const cx = classNames.bind(style);

function Verify() {
    const { values, handleChange, errors, setErrors, setClassError, classError } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const Url = new URLSearchParams(location.search);

    const params = Object.fromEntries(Url.entries());
    const { token, fullName, email, username } = params;
    // 1. State
    const [hashError, setHashError] = useState(null);

    const [eye, setEye] = useState({
        password: false,
        cfmPassword: false,
    });

    // 2. UseEffect
    useEffect(() => {
        const newErrors = {};
        if (values.password.length < 8 && values.password.length > 0) {
            newErrors.cfmPassword = 'Mật khẩu phải ít nhất 8 ký tự';
            setHashError(true);
        } else {
            newErrors.cfmPassword = '';
            setHashError(false);
        }
        setErrors(newErrors);
    }, [values]);

    // 3. Func
    const handleSeePassword = (name) => {
        setEye((pre) => ({
            ...pre,
            [name]: !eye[name],
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (classError.loadingRegister) {
            return;
        }

        if (values.password !== values.cfmPassword) {
            setErrors((prev) => ({
                ...prev,
                cfmPassword: 'Mật khẩu không trùng khớp',
            }));
            setHashError(true);
            return;
        }
        if (!hashError) {
            setClassError((pre) => ({
                ...pre,
                loadingRegister: true,
            }));
            const register = await post(
                '/auth/register',
                {
                    email: email,
                    fullName: fullName,
                    userName: username,
                    password: values.password,
                },
                {
                    headers: { 'verify-token': `${token}` },
                },
            );
            setClassError((pre) => ({
                ...pre,
                loadingRegister: false,
            }));
            switch (register.status) {
                case 200:
                    navigate('/profile');
                    break;
                case 400:
                    navigate('/profile');
                    break;
                case 404:
                    if (register.data.message === 'Token is incorrect') {
                    }
                    break;
                default:
                    break;
            }
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')}>
                <HeaderSuffix title="Đã xác minh địa chỉ email" icon />
                <div>
                    <form action="" id="form-sign-up" onSubmit={handleSubmit}>
                        <div className={cx('input-wrapper')}>
                            <label htmlFor="">Địa chỉ Email</label>
                            <p>{email}</p>
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
                                {!classError.loadingRegister ? <span>Agree</span> : <LoadingIcon />}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Verify;
