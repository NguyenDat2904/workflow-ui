import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './RowProject.module.scss';
import Button from '../Buttton/Button';
import { MenuIcon } from '../icon/icon';
import { Link } from 'react-router-dom';
import MenuProject from './MenuProject/MenuProject';
const cx = classNames.bind(style);

function RowProject() {
    // 1. State
    const [toggle, setToggle] = useState(false);

    return (
        <tr className={cx('row')}>
            <td></td>
            <td>
                <Button viewAll noHover style={{ padding: '0px' }}>
                    <div className={cx('block')}>
                        <div className={cx('img')}>
                            <span style={{ borderRadius: '3px' }}>
                                <img
                                    src="https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10415?size=medium"
                                    alt=""
                                />
                            </span>
                        </div>
                        <div className={cx('name')}>
                            <div>
                                <Link>My Scrum Project</Link>
                            </div>
                        </div>
                    </div>
                </Button>
            </td>
            <td>SCRUM</td>
            <td>
                <div>Team-managed software</div>
            </td>
            <td>
                <Button viewAll noHover style={{ padding: '0px' }}>
                    <div className={cx('block')}>
                        <div className={cx('img')}>
                            <span>
                                <img
                                    src="https://secure.gravatar.com/avatar/96bd7f66bb5903b12b40d3696a36bd7a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-5.png"
                                    alt=""
                                />
                            </span>
                        </div>
                        <div className={cx('name')}>
                            <div>
                                <Link>Đạt Nguyễn Thành</Link>
                            </div>
                        </div>
                    </div>
                </Button>
            </td>
            <td></td>
            <td className={cx('menu-icon')}>
                <div onClick={() => setToggle(!toggle)}>
                    <Button noChildren backgroundNone leftIcon={<MenuIcon />} />
                </div>
                {toggle && <MenuProject />}
            </td>
        </tr>
    );
}

export default RowProject;
