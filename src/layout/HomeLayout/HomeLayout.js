import React from 'react';
import classNames from 'classnames/bind';
import style from '../../pages/Register/Register.module.scss';
import { Link } from 'react-router-dom';
import Tab from '../../pages/Register/Tab/Tab';

const cx = classNames.bind(style);

function HomeLayout({ children }) {
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
                    {children}
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

export default HomeLayout;
