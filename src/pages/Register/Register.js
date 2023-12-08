import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Register.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Tab from './Tab/Tab';
import { Button } from '~/component/Inputs/Inputs';
import { post } from '~/ultil/hpptRequest';
import { LoadingIcon } from '~/component/icon/icon';
import { AppContext } from '~/hook/context/context';
const cx = classNames.bind(style);

function Register() {
    const navigate = useNavigate();
    // 0. Context
    const { values, handleChange, errors, setErrors, classError, setClassError } = useContext(AppContext);
    // 1. State
    const [toggleForm, setToggleForm] = useState(true);

    // 2. UseEffect
    useEffect(() => {
        const emailRegex = /^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const userRegex = /^$|(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
        const isValidUser = userRegex.test(values.username);
        const isValidEmail = emailRegex.test(values.email);
        let hashErrorEmail;
        let hashErrorUser;
        const newErrors = {};

        // Validate Email
        if (!isValidEmail) {
            newErrors.email = 'Please enter a valid email address.';
            setClassError((pre) => ({
                ...pre,
                email: false,
            }));
            hashErrorEmail = true;
        } else {
            if (values.email === '') {
                hashErrorEmail = null;
            } else {
                hashErrorEmail = false;
            }
        }
        if (hashErrorEmail === false) {
            setClassError((pre) => ({
                ...pre,
                email: true,
            }));
        }

        if (hashErrorEmail === null) {
            setClassError((pre) => ({
                ...pre,
                email: null,
            }));
        }

        // Validate full name
        if (values.full_name !== '') {
            setClassError((pre) => ({
                ...pre,
                full_name: true,
            }));
        } else {
            setClassError((pre) => ({
                ...pre,
                full_name: null,
            }));
        }

        // Validate username
        if (!isValidUser) {
            newErrors.username = 'Username must be at 6 - 20 characters: letters and numbers.';
            setClassError((pre) => ({
                ...pre,
                username: false,
            }));
            hashErrorUser = true;
        } else {
            if (values.username === '') {
                hashErrorUser = null;
            } else {
                hashErrorUser = false;
            }
        }

        if (hashErrorUser === false) {
            setClassError((pre) => ({
                ...pre,
                username: true,
            }));
        }

        if (hashErrorUser === null) {
            setClassError((pre) => ({
                ...pre,
                username: null,
            }));
        }

        setErrors(newErrors);
    }, [values]);

    // 3. Func
    const shouldDisable =
        classError.email === null ||
        classError.email === false ||
        classError.username === null ||
        classError.username === false ||
        classError.full_name === null ||
        classError.full_name === false ||
        classError.loading === true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (shouldDisable) {
            return;
        }
        if (classError.email && classError.full_name && classError.username) {
            setClassError((pre) => ({
                ...pre,
                loading: true,
            }));
            const verifyEmail = await post('/auth/verify', {
                email: values.email,
                userName: values.username,
                fullName: values.full_name,
            });
            if (verifyEmail.status === 200) {
                navigate(`/register/verify?email=${values.email}`);
            }
            if (verifyEmail.status === 400) {
                if (verifyEmail.data.errEmail) {
                    setErrors((prev) => ({
                        ...prev,
                        email: 'The Email was registered',
                    }));
                    setClassError((pre) => ({
                        ...pre,
                        email: false,
                        loading: false,
                    }));
                }

                if (verifyEmail.data.errUserName) {
                    setErrors((prev) => ({
                        ...prev,
                        username: 'The Username was registered',
                    }));
                    setClassError((pre) => ({
                        ...pre,
                        username: false,
                        loading: false,
                    }));
                }
            }
        }
    };

    // 4. Render
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
                                        <Button buttonStyle={'light'}></Button>
                                        <div className={cx('or')}>
                                            <div className={cx('left')}></div>
                                            <span>OR</span>
                                            <div className={cx('right')}></div>
                                        </div>
                                        {toggleForm ? (
                                            <div className={cx('signup-email')} onClick={() => setToggleForm(false)}>
                                                <span>Sign up with email</span>
                                            </div>
                                        ) : (
                                            <form action="" className={cx('form-submit')} onSubmit={handleSubmit}>
                                                <div className={cx('email-field')}>
                                                    <label htmlFor="email-field-input" className={cx('label-email')}>
                                                        <span>Work email</span>
                                                    </label>
                                                    <div className={cx('input-wrapper')}>
                                                        <div
                                                            className={cx(
                                                                'input-container',
                                                                classError.email && 'success',
                                                                classError.email === false && 'error',
                                                            )}
                                                        >
                                                            <input
                                                                type="text"
                                                                name="email"
                                                                id="email-field-input"
                                                                value={values.email}
                                                                onChange={handleChange}
                                                            />
                                                            {classError.email && (
                                                                <div className={cx('input-icon')}>
                                                                    <span>
                                                                        <svg
                                                                            width="24"
                                                                            height="24"
                                                                            viewBox="0 0 24 24"
                                                                            role="presentation"
                                                                        >
                                                                            <g fill="currentColor" fillRule="evenodd">
                                                                                <path
                                                                                    d="M12 20a8 8 0 100-16 8 8 0 000 16zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
                                                                                    fillRule="nonzero"
                                                                                ></path>
                                                                                <path d="M9.707 11.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L11 12.586l-1.293-1.293z"></path>
                                                                            </g>
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {errors.email && (
                                                            <div className={cx('errorMessage')}>
                                                                <span>{errors.email}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={cx('email-field')}>
                                                    <label htmlFor="full-name-field" className={cx('label-email')}>
                                                        <span>Full name</span>
                                                    </label>
                                                    <div className={cx('input-wrapper')}>
                                                        <div
                                                            className={cx(
                                                                'input-container',
                                                                classError.full_name && 'success',
                                                            )}
                                                        >
                                                            <input
                                                                type="text"
                                                                name="full_name"
                                                                id="full-name-field"
                                                                value={values.full_name}
                                                                onChange={handleChange}
                                                            />
                                                            {classError.full_name && (
                                                                <div className={cx('input-icon')}>
                                                                    <span>
                                                                        <svg
                                                                            width="24"
                                                                            height="24"
                                                                            viewBox="0 0 24 24"
                                                                            role="presentation"
                                                                        >
                                                                            <g fill="currentColor" fillRule="evenodd">
                                                                                <path
                                                                                    d="M12 20a8 8 0 100-16 8 8 0 000 16zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
                                                                                    fillRule="nonzero"
                                                                                ></path>
                                                                                <path d="M9.707 11.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L11 12.586l-1.293-1.293z"></path>
                                                                            </g>
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {errors.full_name && (
                                                            <div className={cx('errorMessage')}>
                                                                <span>{errors.full_name}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={cx('email-field')}>
                                                    <label htmlFor="username-field" className={cx('label-email')}>
                                                        <span>User name</span>
                                                    </label>
                                                    <div className={cx('input-wrapper')}>
                                                        <div
                                                            className={cx(
                                                                'input-container',
                                                                classError.username && 'success',
                                                                classError.username === false && 'error',
                                                            )}
                                                        >
                                                            <input
                                                                type="text"
                                                                name="username"
                                                                id="username-field"
                                                                value={values.username}
                                                                onChange={handleChange}
                                                            />
                                                            {classError.username && (
                                                                <div className={cx('input-icon')}>
                                                                    <span>
                                                                        <svg
                                                                            width="24"
                                                                            height="24"
                                                                            viewBox="0 0 24 24"
                                                                            role="presentation"
                                                                        >
                                                                            <g fill="currentColor" fillRule="evenodd">
                                                                                <path
                                                                                    d="M12 20a8 8 0 100-16 8 8 0 000 16zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
                                                                                    fillRule="nonzero"
                                                                                ></path>
                                                                                <path d="M9.707 11.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L11 12.586l-1.293-1.293z"></path>
                                                                            </g>
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {errors.username && (
                                                            <div className={cx('errorMessage')}>
                                                                <span>{errors.username}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={cx('rules')}>
                                                    <span>
                                                        <p>
                                                            By clicking below, you agree to the Atlassian
                                                            <Link target="blank">Cloud Terms of Service </Link>
                                                            and
                                                            <Link target="blank"> Privacy Policy</Link>
                                                        </p>
                                                    </span>
                                                </div>
                                                <button
                                                    className={cx('submit', shouldDisable && 'disable')}
                                                    type="submit"
                                                >
                                                    {!classError.loading ? <span>Agree</span> : <LoadingIcon />}
                                                </button>
                                                <div className={cx('card')}>NO CREDIT CARD REQUIRED</div>
                                                <div>
                                                    <div className={cx('capcha')}>
                                                        <span>
                                                            This site is protected by reCAPTCHA and the Google{' '}
                                                            <Link>Privacy Policy</Link> and{' '}
                                                            <Link>Terms of Service</Link> apply.
                                                        </span>
                                                    </div>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('container-fluid', 'title')}>
                <div className={cx('row')}>
                    <div className={cx('column')}>
                        <h2>Discover the features that make Jira so easy to use</h2>
                    </div>
                </div>
            </div>
            <div className={cx('container-fluid', 'tab-container')}>
                <Tab />
            </div>
            <div className={cx('container-fluid', 'banner')}>
                <div className={cx('row')}>
                    <div className={cx('column')}>
                        <div className={cx('heading')}>
                            <h2>Move fast, stay aligned, and build better - together</h2>
                        </div>
                        <div className={cx('link')}>
                            <Link to="/register?tab=board"> Get it free </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('container-fluid', 'trusted')}>
                <div className={cx('row')}>
                    <div className={cx('column', 'header')}>
                        <div className={cx('heading')}>
                            <h2>Trusted by over 100,000 customers world-wide</h2>
                        </div>
                    </div>
                    <div className={cx('column', 'brand')}>
                        <div className={cx('component-img')}>
                            <img
                                src="https://wac-cdn.atlassian.com/dam/jcr:4cba45db-e328-4abd-88ea-bfe276355cb5/Square%20Logo.svg?cdnVersion=1339"
                                alt="square"
                            />
                        </div>
                        <div className={cx('component-img')}>
                            <img
                                className={cx('img')}
                                src="https://wac-cdn.atlassian.com/dam/jcr:db51d228-2145-498b-ab73-064aa651770d/ebay%20logo.svg?cdnVersion=1339"
                                alt="ebay"
                            />
                        </div>
                        <div className={cx('component-img')}>
                            <img
                                className={cx('img')}
                                src="https://wac-cdn.atlassian.com/dam/jcr:7db3e103-186c-4413-950d-dea2f2a5755c/Spotify%20logo.svg?cdnVersion=1339"
                                alt="spotify"
                            />
                        </div>
                        <div className={cx('component-img')}>
                            <img
                                className={cx('img')}
                                src="https://wac-cdn.atlassian.com/dam/jcr:4d6ede5b-a9ea-410b-baab-6cb7166c080d/Cisco%20Logo.svg?cdnVersion=1339"
                                alt="cisco"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div className={cx('container-fluid', 'footer-link')}>
                    <div className={cx('row')}>
                        <div className={cx('column')}>
                            <div className={cx('component-img')}>
                                <Link>
                                    <img
                                        src="https://wac-cdn.atlassian.com/dam/jcr:bec8148d-b7dc-493f-bbba-7519b0637581/logos-atlassian-logo-gradient-horizontal-neutral.svg?cdnVersion=1339"
                                        alt="logo"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className={cx('column', 'mf')}>
                            <div className={cx('heading')}>
                                <h3>PRODUCTS</h3>
                            </div>
                            <div className={cx('list-block')}>
                                <ul>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Jira Software</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Jira Align</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Jira Service Management</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Jira Work Management</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Jira Product Discovery</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Confluence</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Trello</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Bitbucket</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan', 'view-all')}>
                                        <p>
                                            <Link>View all products</Link>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('column', 'mf')}>
                            <div className={cx('heading')}>
                                <h3>RESOURCES</h3>
                            </div>
                            <div className={cx('list-block')}>
                                <ul>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Technical Support</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Purchasing & licensing</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Atlassian Community</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Knowledge base</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Marketplace</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Bitbucket</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan', 'view-all')}>
                                        <p>
                                            <Link>Create support ticket</Link>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('column', 'mf')}>
                            <div className={cx('heading')}>
                                <h3>EXPAND & LEARN</h3>
                            </div>
                            <div className={cx('list-block')}>
                                <ul>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Partners</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Training & Certification</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Documentation</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Developer Resources</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Enterprise services</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan', 'view-all')}>
                                        <p>
                                            <Link>View all resources</Link>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('column', 'mf')}>
                            <div className={cx('heading')}>
                                <h3>ABOUT ATLASSIAN</h3>
                            </div>
                            <div className={cx('list-block')}>
                                <ul>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Company</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Careers</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Events</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Blogs</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Atlassian Foundation</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Investor Relations</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan')}>
                                        <p>
                                            <Link>Trust & Security</Link>
                                        </p>
                                    </li>
                                    <li className={cx('plan', 'view-all')}>
                                        <p>
                                            <Link>Contact us</Link>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('container-fluid', 'copyright')}>
                    <div className={cx('row')}>
                        <div className={cx('column')}></div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Register;
