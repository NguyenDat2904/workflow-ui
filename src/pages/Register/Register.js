import React from 'react';
import classNames from 'classnames/bind';
import style from './Register.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

function Register() {
    return (
        <div className={cx('main')}>
            <header className={cx('sticky')}>
                <nav className={cx('stuck')}>
                    <div className={cx('container')}>
                        <div className={cx('row')}>
                            <div className={cx('column')}>
                                <Link to="/" className={cx('logo')}>
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Jira_%28Software%29_logo.svg/2560px-Jira_%28Software%29_logo.svg.png"
                                        alt="logo_jira"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div className={cx('container-fluid', 'background')}>
                <div className={cx('row')}>
                    <div className={cx('column', 'column-left')}>
                        <div className={cx('component', 'component-header')}>
                            <h1>Jira Software is the #1 software development tool used by agile teams</h1>
                        </div>
                        <div className={cx('component', 'component-header')}>
                            <div className={cx('color-head', 'text-nonet')}>
                                <h3>
                                    Trusted by 100K+ teams that plan, track, release, and manage world-class software.
                                </h3>
                            </div>
                        </div>
                        <div className={cx('component', 'component-image')}>
                            <img
                                src="https://wac-cdn.atlassian.com/dam/jcr:6d23e95c-53a3-4fec-916b-8ecdd4589c27/JSW_Backlog_x2%202.png?cdnVersion=1333"
                                alt=""
                                className={cx('component__image')}
                            />
                        </div>
                        <div className={cx('component', 'component-header')}>
                            <div className={cx('color-head', 'text-nonet')}>
                                <h4>INCLUDED IN YOUR FREE PLAN: Forever free for up to 10 users</h4>
                            </div>
                        </div>
                    </div>
                    <div className={cx('column', 'column-right')}>
                        <div className={cx('layout-standalone')}>
                            <div className={cx('css-form')}>
                                <div className={cx('css-header')}>
                                    <p className={cx('css-title')}>
                                        <span>Get started</span>
                                    </p>
                                    <p className={cx('css-text')}>
                                        <span>Free for up to 10 users</span>
                                    </p>
                                </div>
                                <div className={cx('css-option')}>
                                    <div className={cx('option-button')}>
                                        <Link className={cx('button-gg')}>
                                            <img
                                                src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.51/static/media/google-logo.c21ca9d1.svg"
                                                alt="button-gg"
                                            />
                                            <span>Continue with Google</span>
                                        </Link>
                                        <div className={cx('or')}>
                                            <div className={cx('left')}></div>
                                            <span>OR</span>
                                            <div className={cx('right')}></div>
                                        </div>
                                        <div className={cx('signup-email')}>
                                            <span>Sign up with email</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
