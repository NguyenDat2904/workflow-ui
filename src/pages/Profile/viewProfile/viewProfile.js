import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './viewProfile.module.scss';
import { AppContext } from '~/hook/context/context';
import { Buiding, Location, BagIcon, TreeIcon, Email, Phone, AddIcon } from '~/component/icon/icon';
import Input from '~/component/Input/Input';
import RecentActivityOfUser from '../recentActivityOfUser/recentActivityOf';

const cx = classNames.bind(styles);
const ViewProfile = () => {
    const { formButton, valueInput, handleFormButton, handleSubmit, handleOnchange } = useContext(AppContext);

    return (
        <div className={cx('viewProfile')}>
            <div className={cx('viewInfoUser')}>
                <h2>Nguyễn Văn Hùng</h2>
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
                                    name="bagIcon"
                                    placeholder={'Your jop title'}
                                    onClick={handleFormButton}
                                    formButton={formButton}
                                    value={valueInput.bagIcon}
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
                                    name="treeIcon"
                                    placeholder={'Your department'}
                                    onClick={handleFormButton}
                                    formButton={formButton}
                                    value={valueInput.treeIcon}
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
                                    name="buiding"
                                    placeholder={'Your organization'}
                                    onClick={handleFormButton}
                                    formButton={formButton}
                                    value={valueInput.buiding}
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

                                <p className={cx('addressContact')}> vanhungnvh1712004@gmail.com</p>
                            </div>
                            <div className={cx('methotContact')}>
                                <span>
                                    <Phone className="svgPhone" />
                                </span>
                                <p className={cx('addressContact')}> 0862625207</p>
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
                <RecentActivityOfUser />
            </div>
        </div>
    );
};
export default ViewProfile;
