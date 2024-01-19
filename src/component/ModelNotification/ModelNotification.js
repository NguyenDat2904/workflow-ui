import React, { useEffect, useState } from 'react';
import style from './ModelNotification.module.scss';
import classNames from 'classnames/bind';
import Modal from '../Modal/Modal';
import NotificationCard from '../NotificationCard/NotificationCard';
import Notification from '../../services/notification/notification';
import Skeleton from 'react-loading-skeleton';

const cx = classNames.bind(style);
const notificationServices = new Notification();

function ModelNotification({ handleToggle, position, isOpen }) {
   const [loading, setLoading] = useState(true);
   const [notificationData, setNotificationData] = useState([]);

   const getNotification = async () => {
      setLoading(true);
      const notification = await notificationServices.getNotification();
      if (notification.status === 200) {
         setNotificationData(notification.data);
         setLoading(false);
      }
      setLoading(false);
   };
   useEffect(() => {
      if (isOpen) {
         getNotification();
      }
   }, [isOpen]);

   const handleGetNotification = async (e) => {
      setLoading(true);
      const isChecked = e.target.checked;
      const notification = await notificationServices.getNotification(isChecked ? false : '');
      if (notification.status === 200) {
         setNotificationData(notification.data);
         setLoading(false);
      }
      setLoading(false);
   };

   const handleUpdateNotification = async (id, link, read) => {
      if (!read) await notificationServices.updateNotification(id);
      window.open(link);
   };

   return (
      <Modal width="540px" locationTransform={`${position - 549}px`} isOpen={isOpen} onClose={handleToggle}>
         <div className={cx('top', 'notification-top')}>
            <div className={cx('notification-title')}>Notification</div>
            <div className={cx('show group')}>
               <label htmlFor="mark-as-read-toggle" className={cx('')}>
                  Only show unread
               </label>
               <label className={cx('switch')}>
                  <input type="checkbox" onClick={handleGetNotification} />
                  <span className={cx('slider', 'round')}></span>
               </label>
            </div>
         </div>
         <div className={cx('notification-body')}>
            <div style={{ position: 'relative' }}>
               <div className={cx('div-direct')}>
                  <span className={cx('direct')} style={{ color: 'inherit' }}>
                     Direct
                  </span>
               </div>
            </div>
            {loading ? (
               <>
                  <Skeleton width="100%" height="78px" style={{ margin: '5px 0 12px 0' }} />
                  <Skeleton width="100%" height="78px" style={{ margin: '5px 0 12px 0' }} />
                  <Skeleton width="100%" height="78px" style={{ margin: '5px 0 12px 0' }} />
                  <Skeleton width="100%" height="78px" style={{ margin: '5px 0 12px 0' }} />
               </>
            ) : (
               <>
                  {notificationData?.length <= 0 ? (
                     <div className={cx('no-more-notifications')}>
                        <svg
                           width={172}
                           height={202}
                           viewBox="0 0 172 202"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <g clipPath="url(#clip0)">
                              <path
                                 d="M46.2891 10.4251C47.6371 10.7165 48.8141 11.5315 49.5612 12.6907C50.3082 13.85 50.5642 15.2585 50.2728 16.6065L10.2901 201.534L0.125001 199.336L40.1077 14.4087C40.3991 13.0608 41.2141 11.8838 42.3733 11.1367C43.5326 10.3896 44.9411 10.1336 46.2891 10.4251Z"
                                 fill="#FFC400"
                              />
                              <path
                                 d="M147.1 52.4996L128.3 139.4C128.919 135.813 128.117 132.125 126.064 129.12C124.01 126.114 120.867 124.027 117.3 123.3L21.1001 102.5L39.9001 15.5996L136.1 36.3996C139.667 37.1266 142.81 39.2142 144.864 42.2197C146.917 45.2253 147.719 48.9126 147.1 52.4996Z"
                                 fill="url(#paint0_linear)"
                              />
                              <path
                                 d="M171.1 98.3988L152.4 185.099L77.5001 168.999C74.1703 168.267 71.2613 166.255 69.4001 163.399C68.463 161.986 67.8206 160.399 67.5113 158.732C67.202 157.066 67.2322 155.354 67.6001 153.699C69.1001 146.599 76.3001 142.399 83.4001 143.899L112 150.099C113.774 150.479 115.605 150.502 117.388 150.169C119.171 149.835 120.87 149.151 122.386 148.155C123.903 147.16 125.206 145.873 126.221 144.37C127.237 142.867 127.943 141.177 128.3 139.399L138.7 91.3988C138.7 91.3723 138.711 91.3469 138.729 91.3281C138.748 91.3094 138.774 91.2988 138.8 91.2988L171.1 98.3988Z"
                                 fill="url(#paint1_linear)"
                              />
                              <path
                                 d="M128.3 139.4C127.943 141.179 127.236 142.869 126.221 144.372C125.206 145.875 123.903 147.161 122.386 148.157C120.87 149.152 119.171 149.837 117.388 150.17C115.605 150.504 113.774 150.48 112 150.1L82.9001 143.8C79.5587 143.088 76.0712 143.73 73.2029 145.586C70.3345 147.442 68.3196 150.361 67.6001 153.7L76.1001 114.4L117.3 123.3C120.867 124.027 124.01 126.115 126.064 129.121C128.117 132.126 128.919 135.813 128.3 139.4Z"
                                 fill="#0049B0"
                              />
                              <path
                                 d="M47.4001 10.6C50.3272 10.6 52.7001 8.22711 52.7001 5.3C52.7001 2.37289 50.3272 0 47.4001 0C44.473 0 42.1001 2.37289 42.1001 5.3C42.1001 8.22711 44.473 10.6 47.4001 10.6Z"
                                 fill="#FF991F"
                              />
                              <path
                                 d="M88 95.7C87.8568 95.702 87.7175 95.6527 87.6075 95.561C87.4975 95.4693 87.4239 95.3412 87.4 95.2L82.4 75.5C79.4 63.7 82.9 51.4 91.7 42.4C91.7639 42.2767 91.8686 42.1794 91.9963 42.1247C92.1239 42.07 92.2666 42.0612 92.4 42.1C92.4525 42.1 92.5045 42.1103 92.5531 42.1304C92.6016 42.1505 92.6457 42.18 92.6828 42.2171C92.72 42.2543 92.7494 42.2984 92.7695 42.3469C92.7896 42.3954 92.8 42.4475 92.8 42.5C93.2 43.9 107.1 98.3 107.2 98.9C107.221 98.9188 107.238 98.9418 107.25 98.9677C107.262 98.9936 107.268 99.0216 107.268 99.05C107.268 99.0784 107.262 99.1064 107.25 99.1323C107.238 99.1581 107.221 99.1812 107.2 99.2C107.19 99.2903 107.16 99.3772 107.112 99.4542C107.064 99.5312 106.999 99.5962 106.921 99.6443C106.844 99.6925 106.757 99.7225 106.667 99.7322C106.577 99.7418 106.485 99.7308 106.4 99.7L88 95.7ZM55.6 88.7H55.3C55.2265 88.6417 55.1655 88.5694 55.1206 88.4871C55.0757 88.4049 55.0477 88.3144 55.0384 88.2211C55.0291 88.1279 55.0386 88.0337 55.0663 87.9442C55.0941 87.8546 55.1395 87.7716 55.2 87.7L74.1 64C74.1876 63.9018 74.2957 63.8241 74.4167 63.7723C74.5376 63.7205 74.6685 63.6958 74.8 63.7C74.9161 63.7394 75.0215 63.805 75.1082 63.8917C75.1949 63.9784 75.2605 64.0839 75.3 64.2C80.4 72.8 80.2 85.4 74.7 92.4C74.5 92.7 74.3 92.8 74 92.7L55.6 88.7Z"
                                 fill="#B2D4FF"
                              />
                           </g>
                           <defs>
                              <linearGradient
                                 id="paint0_linear"
                                 x1="28.2014"
                                 y1="113.474"
                                 x2="143.095"
                                 y2="39.4219"
                                 gradientUnits="userSpaceOnUse"
                              >
                                 <stop stopColor="#0065FF" />
                                 <stop offset={1} stopColor="#2684FF" />
                              </linearGradient>
                              <linearGradient
                                 id="paint1_linear"
                                 x1="67.2901"
                                 y1="138.209"
                                 x2="171.14"
                                 y2="138.209"
                                 gradientUnits="userSpaceOnUse"
                              >
                                 <stop stopColor="#0052CC" />
                                 <stop offset={1} stopColor="#0065FF" />
                              </linearGradient>
                              <clipPath id="clip0">
                                 <path d="M0.100098 0H171.1V201.5H0.100098V0Z" fill="white" />
                              </clipPath>
                           </defs>
                        </svg>
                        <div className={cx('text')}>
                           <p className={cx('p')}>
                              You've <strong>read</strong> all your notifications from the last 30 days.
                           </p>
                        </div>
                     </div>
                  ) : (
                     notificationData?.map((data, index) => {
                        return <NotificationCard data={data} index={index} onClickButton={handleUpdateNotification} />;
                     })
                  )}
               </>
            )}
         </div>
      </Modal>
   );
}

export default ModelNotification;
