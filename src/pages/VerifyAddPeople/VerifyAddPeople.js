import React, { useEffect } from 'react';
import Wrapper from '~/component/WrapperForm/Wrapper';
import { JiraIcon, LogoIcon } from '~/component/icon/icon';
import classNames from 'classnames/bind';
import style from './VerifyAddPeople.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import WorkService from '~/services/work/workServices';
const cx = classNames.bind(style);
function VerifyAddPeople() {
   const params = useParams();
   const projectService = new WorkService();
   const navigate = new useNavigate();
   const addPeople = async () => {
      if (params.token) {
         const people = await projectService.acceptMember(params.codeProject, params.token);
         if (people.status === 200) navigate(`/login`);
      }
   };

   useEffect(() => {
      addPeople();
   }, []);

   return (
      <Wrapper>
         <div className={cx('wrapper')}>
            <section>
               <div className={cx('header')}>
                  <span>
                     <JiraIcon />
                  </span>
                  <div className={cx('header-title')}>
                     <h2>Kiểm tra hộp thư đến để hoàn tất đăng ký</h2>
                  </div>
               </div>
               <div className={cx('notification')}>
                  <div className={cx('background')}></div>
                  <div className={cx('desc')}>
                     Để hoàn thành quá trình thiết lập và đăng nhập, hãy nhấp vào liên kết xác minh trong email mà chúng
                     tôi đã gửi
                  </div>
               </div>
               <div className={cx('refund')}>
                  <Link to="/register">
                     <span>Gửi lại xác minh</span>
                  </Link>
               </div>
               <div className={cx('footer')}>
                  <footer className={cx('footer-logo')}>
                     <span className={cx('logo')}>
                        <LogoIcon />
                     </span>
                  </footer>
               </div>
            </section>
         </div>
      </Wrapper>
   );
}

export default VerifyAddPeople;
