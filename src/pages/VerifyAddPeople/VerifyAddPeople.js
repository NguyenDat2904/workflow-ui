import React, { useEffect } from 'react';
import Wrapper from '~/component/WrapperForm/Wrapper';
import { JiraIcon, LogoIcon } from '~/component/icon/icon';
import classNames from 'classnames/bind';
import style from './VerifyAddPeople.module.scss';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import WorkService from '~/services/work/workServices';
const cx = classNames.bind(style);
function VerifyAddPeople() {
   const location = useLocation();
   const Url = new URLSearchParams(location.search);
   const params = Object.fromEntries(Url.entries());
   const projectService = new WorkService();
   const navigate = new useNavigate();
   const addPeople = async () => {
      console.log(params.token);
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
               </div>
               <div className={cx('notification')}>
                  <div className={cx('background')}></div>
                  <div className={cx('desc')}>Lời mời của bạn đã hết hạn. Hãy kiểm tra lại hộp thư của bạn</div>
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
