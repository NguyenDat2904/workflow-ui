import React, { useState } from 'react';
import Button from '~/component/Buttton/Button';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './HeaderSetting.module.scss';
import { DownIcon, HelpIcon, NotificationIcon, SettingIcon, ShuttleIcon, UserIcon } from '~/component/icon/icon';
import { useLocation } from 'react-router-dom';
import ModalProject from '~/pages/Projects/ModalProject/ModalProject';
const cx = classNames.bind(style);

function HeaderSetting() {
    const location = useLocation();
    // 1. State
    const [toggleMenu, setToggleMenu] = useState({
        yourWork: false,
        project: false,
        team: false,
    });

    // 3. Func
    const handleToggle = (toggle) => {
        switch (toggle) {
            case 'project':
                setToggleMenu((pre) => ({
                    ...pre,
                    project: !toggleMenu.project,
                }));
                break;
            case 'yourWork':
                setToggleMenu((pre) => ({
                    ...pre,
                    yourWork: !toggleMenu.yourWork,
                }));
                break;
            case 'team':
                setToggleMenu((pre) => ({
                    ...pre,
                    team: !toggleMenu.team,
                }));
                break;
            default:
                setToggleMenu({
                    yourWork: false,
                    project: false,
                    team: false,
                });
        }
    };
    return (
        <header className={cx('header-layout')}>
            <nav>
                <Button leftIcon={<ShuttleIcon />} backgroundNone noChildren to="/"></Button>
                <div className={cx('list-menu')}>
                    <div
                        className={cx('menu', location.pathname === '/project' && 'active')}
                        onClick={() => handleToggle('project')}
                    >
                        <Button
                            rightIcon={<DownIcon />}
                            backgroundNone
                            className={cx(toggleMenu.project && 'toggle', 'text-blue')}
                        >
                            Projects
                        </Button>
                    </div>

                    {toggleMenu.project && <ModalProject handleToggle={() => handleToggle('project')} />}
                    <Link to={'/profile/profile-and-visibility'}>
                        <div className={cx('menu')} onClick={() => handleToggle('team')}>
                            <Button backgroundNone  className={cx(toggleMenu.team && 'toggle', 'text-blue')}>Profile And visibility</Button>
                        </div>
                    </Link>
                    <Link to={'/profile/security'}>
                        <div className={cx('menu')} onClick={() => handleToggle('yourWork')}>
                            <Button backgroundNone className={cx(toggleMenu.yourWork && 'toggle', 'text-blue')}>Security</Button>
                        </div>
                    </Link>
                </div>
            </nav>
            <div className={cx('nav-right')}>
                <div className={cx('nav-icon')}>
                    <Button
                        className={cx('button-icon')}
                        noChildren
                        backgroundNone
                        borderRadius
                        leftIcon={<NotificationIcon />}
                    ></Button>
                </div>
                <div className={cx('nav-icon')}>
                    <Button
                        className={cx('button-icon', 'custom-button')}
                        noChildren
                        backgroundNone
                        borderRadius
                        leftIcon={<HelpIcon />}
                    ></Button>
                </div>
                <div className={cx('nav-icon')}>
                    <Button
                        className={cx('button-icon')}
                        noChildren
                        backgroundNone
                        borderRadius
                        leftIcon={<SettingIcon />}
                    ></Button>
                </div>
                <div className={cx('nav-icon')}>
                    <Button
                        className={cx('button-icon')}
                        noChildren
                        backgroundNone
                        borderRadius
                        leftIcon={<UserIcon />}
                    ></Button>
                </div>
            </div>
        </header>
    );
}

export default HeaderSetting;
