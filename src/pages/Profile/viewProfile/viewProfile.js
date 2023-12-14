import React, { useContext } from 'react';
import classNames from 'classnames/bind';

import styles from './viewProfile.module.scss';
import { AppContext } from '~/hook/context/context';
import { Buiding, Location, BagIcon, TreeIcon, Email, Phone, AddIcon } from '~/component/icon/icon';
import Input from '~/component/Input/Input';
import RecentActivityOfUser from '../recentActivityOfUser/recentActivityOf';

const cx = classNames.bind(styles);
const ViewProfile = () => {
    const { formButton, valueInput, handleFormButton, handleSubmit, handleOnchange, dataUserProfile, dataListWork } =
        useContext(AppContext);
    return (
        <div className={cx('viewProfile')}>
            <div className={cx('viewInfoUser')}>
                <h2>{dataUserProfile.name}</h2>
                <button className={cx('moreInformationUser')}>Manage your account</button>
                <div className={cx('viewInfo')}>
                    <div className={cx('info')}>
                        <h3 className={cx('titleViewInfo')}>ABOUT</h3>
                        <div className={cx('fillView')}>
                            <div className={cx('fillViewInfo')}>
                                <span>
                                    <BagIcon />
                                </span>

                                <Input
                                    onSubmit={handleSubmit}
                                    onChange={handleOnchange}
                                    name="jopTitle"
                                    placeholder={'Your jop title'}
                                    onClick={handleFormButton}
                                    formButton={formButton}
                                    value={valueInput.jopTitle}
                                    type="text"
                                />
                            </div>
                            <div className={cx('fillViewInfo')}>
                                <span>
                                    <TreeIcon />
                                </span>
                                <Input
                                    onSubmit={handleSubmit}
                                    onChange={handleOnchange}
                                    name="department"
                                    placeholder={'Your department'}
                                    onClick={handleFormButton}
                                    formButton={formButton}
                                    value={valueInput.department}
                                    type="text"
                                />
                            </div>
                            <div className={cx('fillViewInfo')}>
                                <span>
                                    <Buiding />
                                </span>
                                <Input
                                    onSubmit={handleSubmit}
                                    onChange={handleOnchange}
                                    name="organization"
                                    placeholder={'Your organization'}
                                    onClick={handleFormButton}
                                    formButton={formButton}
                                    value={valueInput.organization}
                                    type="text"
                                />
                            </div>
                            <div className={cx('fillViewInfo')}>
                                <span>
                                    <Location />
                                </span>
                                <Input
                                    onSubmit={handleSubmit}
                                    onChange={handleOnchange}
                                    name="location"
                                    placeholder={'Your location'}
                                    onClick={handleFormButton}
                                    formButton={formButton}
                                    value={valueInput.location}
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('viewContact')}>
                        <h3 className={cx('titleViewInfo')}>CONTACT</h3>
                        <div className={cx('contact')}>
                            <div className={cx('methotContact')}>
                                <span>
                                    <Email />
                                </span>

                                <p className={cx('addressContact')}>{dataUserProfile.email}</p>
                            </div>
                            <div className={cx('methotContact')}>
                                <span>
                                    <Phone className="svgPhone" />
                                </span>
                                <p className={cx('addressContact')}>{dataUserProfile.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('team')}>
                        <h3 className={cx('titleViewInfo')}>TEAMS</h3>
                        <div className={cx('addTeam')}>
                            <div className={cx('newTeam')}>
                                <span>
                                    <AddIcon />
                                </span>
                                <p>Create a team</p>
                            </div>
                        </div>
                        <p className={cx('linkToLegal')}> View privacy policy</p>
                    </div>
                </div>
            </div>
            <div className={cx('recentActivityOfUser')}>
                <RecentActivityOfUser dataListWork={dataListWork} />
            </div>
        </div>
    );
};
export default ViewProfile;
