import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './profile.module.scss';
import Header from '~/layout/Header/Header';
const cx = classNames.bind(styles);
const Profile = () => {
    const [imgCover, setImgCover] = useState(true);
    const clickIconOpenFile = () => {
        if (imgCover === true) {
            setImgCover(false);
        } else {
            setImgCover(true);
        }
    };
    console.log(imgCover);
    return (
        <div className={cx('mainProfile')}>
            <Header />
            <div className={cx('profileUser')}>
                <div className={cx('backgroundImgUser')}>
                    <div className={cx('bgrimg')}>
                        <img
                            className={cx('imgCover')}
                            src="https://ptc-directory-sited-static.us-east-1.prod.public.atl-paas.net/gradients/2.svg"
                            alt=""
                        />
                        <div className={cx('addImg')}>
                            <form action="">
                                <input type="file" name="img_cover" id="img_cover" />
                                <span onClick={clickIconOpenFile}>
                                    <svg viewBox="0 0 24 24" role="presentation">
                                        <path
                                            d="M3 4.995C3 3.893 3.893 3 4.995 3h14.01C20.107 3 21 3.893 21 4.995v14.01A1.995 1.995 0 0119.005 21H4.995A1.995 1.995 0 013 19.005V4.995zM10.5 16.5L9 15l-3 3h12v-2.7L15 12l-4.5 4.5zM8 10a2 2 0 100-4 2 2 0 000 4z"
                                            fill="currentColor"
                                            fillRule="evenodd"
                                        />
                                    </svg>
                                </span>

                                <h4>Add your header image</h4>
                                <div className={cx(imgCover ? 'notShownUploadImg' : 'labelUploadImg')}>
                                    <label htmlFor="img_cover">
                                        <h4>Upload an image</h4>
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className={cx('avatarUser')}>
                        <div className={cx('bagrAvatar')}>
                            <img
                                className={cx('avatarImg')}
                                src="https://thespiritofsaigon.net/wp-content/uploads/2022/10/avatar-vo-danh-15.jpg"
                                alt=""
                            />
                            <input type="file" id="uploadAvatarImg" />
                            <label htmlFor="uploadAvatarImg" className={cx('uploadAvatar')}>
                                <svg viewBox="0 0 24 24" role="presentation">
                                    <g fill="currentColor" fillRule="evenodd">
                                        <path d="M2 6.994C2 5.893 2.898 5 3.99 5h16.02C21.108 5 22 5.895 22 6.994v12.012A1.997 1.997 0 0120.01 21H3.99A1.994 1.994 0 012 19.006V6.994zM12 17a4 4 0 100-8 4 4 0 000 8zm5-8c0 .556.448 1 1 1 .556 0 1-.448 1-1 0-.556-.448-1-1-1-.556 0-1 .448-1 1zM8 4c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1v1H8V4z" />
                                        <circle cx="12" cy="13" r="2" />
                                    </g>
                                </svg>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
