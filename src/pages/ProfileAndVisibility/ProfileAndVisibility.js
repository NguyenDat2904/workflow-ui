import React, { useContext } from 'react';
import { SuccessIcon } from '~/component/icon/icon';
import { AppContext } from '~/hook/context/context';
import AnyOne from '~/component/anyone/anyone';
import classNames from 'classnames/bind';
import EditField from '~/component/EditField/EditField';
import styles from './ProfileAndVisibility.module.scss';
import ProfileHeaderImg from '~/component/ProfileHeaderImg/ProfileHeaderImg';
const cx = classNames.bind(styles);

const ProfileAndVisibility = () => {
    const { valueInput } = useContext(AppContext);
    return (
        <div className={cx('ProfileAndVisibility')}>
            <h1 className={cx('titleProfileAndVisibility')}>Profile and visibility</h1>
            <p className={cx('usesProfileAndVisibility')}>
                Manage your personal information, and control which information other people see and apps may access.
            </p>
            <p className={cx('SeeDetails')}>
                Learn more about your profile and visibility <span>or</span> view our privacy policy.
            </p>
            <h3 className={cx('ProfilePhotoAndHeaderImage')}>Profile photo and header image</h3>
            <div className={cx('ProfileHeaderImg')}>
                <div className={cx('headerImg')}>
                    <ProfileHeaderImg heightt="112px" widthbagrAvatar="96px" heightbagrAvatar={'96px'} />
                </div>

                <div className={cx('anyone')}>
                    <div className={cx('anyoneYourProfile')}>
                        <p className={cx('seeYourProfile')}>
                            Who can see your profile photo? <SuccessIcon />
                        </p>
                        <AnyOne />
                    </div>
                </div>
            </div>
            <h3 className={cx('ProfilePhotoAndHeaderImage')}>About you</h3>
            <div className={cx('aboutYou')}>
                <p style={{ marginLeft: '60%' }} className={cx('seeYourProfile')}>
                    Who can see this?
                </p>
                <div className={cx('whoSee')}>
                    <EditField placeholder="Your name" label="Full name" name="name" valueInput={valueInput.name} />
                    <EditField placeholder="Your gender" label="Gender" name="gender" valueInput={valueInput.gender} />
                    <EditField
                        placeholder="Your birthDay"
                        label="BirthDay"
                        name="birthDay"
                        valueInput={valueInput.birthDay?.slice(0, 10)}
                    />
                    <EditField placeholder="Your desc" label="Desc" name="desc" valueInput={valueInput.desc} />
                </div>
            </div>
            <h3 className={cx('ProfilePhotoAndHeaderImage')}>Contact</h3>
            <div className={cx('aboutYou')}>
                <p style={{ marginLeft: '60%' }} className={cx('seeYourProfile')}>
                    Who can see this?
                </p>
                <div className={cx('whoSee')}>
                    <EditField
                        placeholder="Your email"
                        label="Email address"
                        name="email"
                        valueInput={valueInput.email}
                    />
                    <EditField
                        placeholder="Your phone"
                        label="Phone address"
                        name="phone"
                        valueInput={valueInput.phone}
                    />
                </div>
            </div>
        </div>
    );
};
export default ProfileAndVisibility;
