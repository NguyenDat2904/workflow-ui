import { useContext } from 'react';
import style from './NotificationCard.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function NotificationCard({ data, index, onClickButton }) {
   const { link, content, title, read, createdAt, reporter='', _id } = data;
   const { imgCover='' } = reporter;

   const compareDateTime = (targetDateTime) => {
      const targetDate = new Date(targetDateTime);
      const currentDate = new Date();

      const timeDifference = currentDate.getTime() - targetDate.getTime();

      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(timeDifference / 1000 / 60);
      const hours = Math.floor(timeDifference / 1000 / 60 / 60);
      const days = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

      if (days > 0) {
         return days + `${days > 1 ? ' days' : ' day'} ago`;
      } else if (hours > 0) {
         return hours + `${hours > 1 ? ' hours' : ' hour'} ago`;
      } else if (minutes > 0) {
         return minutes + `${minutes > 1 ? ' minutes' : ' minute'} ago`;
      } else {
         return seconds + `${seconds > 1 ? ' seconds' : ' second'} ago`;
      }
   };
   return (
      <div key={index}>
         <div className={cx('item')}>
            <article className={cx('article')}>
               <Link to={link} style={{ display: 'flex' }}>
                  <div className={cx('css-e05c0p')}>
                     <div data-testid="avatar-wrapper" className={cx('css-rrrufw')}>
                        <span
                           aria-expanded="false"
                           aria-haspopup="true"
                           data-testid="profile-card-trigger"
                           role="dialog"
                           tabIndex={0}
                        >
                           <div style={{ display: 'inline-block', position: 'relative', outline: 0, margin: '6px 8px' }}>
                              <span className="css-11dcpko">
                                 <img
                                    src={imgCover}
                                    alt="image reporter"
                                    className={cx('css-13ep12v')}
                                    style={{ borderRadius: '50%' }}
                                 />
                              </span>
                           </div>
                        </span>
                     </div>
                  </div>
                  <div className={cx('link-group')}>
                     <div className={cx('css-ov1ktg')}>
                        <div className={cx('css-1rfq2pv')}>
                           <h3 id="1703649252092-8KR5iC7YwL2BR3Pv_summary" className={cx('css-18qu88g')}>
                              {title} <span className={cx('css-v5oldl')}>{compareDateTime(createdAt)}</span>
                           </h3>
                           <Link className={cx('css-4cej1w')} to={link} onClick={() => onClickButton(_id)}>
                              <div
                                 style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    WebkitBoxOrient: 'vertical',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                 }}
                              >
                                 <p className={cx('css-r0zsdv')}>{content}</p>
                              </div>
                           </Link>
                        </div>
                        <div data-testid="read-state-tooltip--container" role="presentation">
                           <button className={cx('notification-list__unread-indicator-wrapper', 'css-1rn87kn')}>
                              <svg
                                 data-testid="unread-indicator"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 width="24px"
                                 fill="none"
                                 height="24px"
                              >
                                 {read ? '' : <circle cx="50%" cy="50%" r={4} fill="var(--ds-icon-brand, #0052CC)" />}
                              </svg>
                           </button>
                        </div>
                     </div>
                  </div>
               </Link>
            </article>
         </div>
      </div>
   );
}

export default NotificationCard;
