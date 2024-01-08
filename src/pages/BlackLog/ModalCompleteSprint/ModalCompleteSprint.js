import React from 'react';
import ModalIcon from '~/pages/DetailProject/ModalIcon/ModalIcon';
import classNames from 'classnames/bind';
import style from './ModalCompleteSprint.module.scss';
import Button from '~/component/Buttton/Button';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import { useForm } from 'react-hook-form';
import { DownIcon } from '~/component/icon/icon';
import Input from '~/component/Input/Input';
const cx = classNames.bind(style);
function ModalCompleteSprint({ isOpen, isClose }) {
   const form = useForm();
   return (
      <div>
         <ModalIcon
            width="600px"
            className={cx('modal')}
            maxWidth="600px"
            isOpen={isOpen}
            isClose={isClose}
            header="Complete : WF12 Sprint 1"
            imgBanner
         >
            <form>
               <div className={cx('equal-issue')}>
                  <p>This sprint contains:</p>
                  <ul className={cx('list-issue')}>
                     <li className={cx('item-issue')}>
                        <span>1</span> completed issue
                     </li>
                     <li className={cx('item-issue')}>
                        <span>17</span> open issues
                     </li>
                  </ul>
               </div>
               <div style={{ marginTop: 'var(--ds-space-100, 8px)' }}>
                  <ControllerForm form={form} name="move-issues" label="Move open issues to" id="move-issues">
                     <Input
                        type="text"
                        rightIcon={<DownIcon />}
                        id="move-issues"
                        search="search"
                        style={{ width: '100%' }}
                     />
                  </ControllerForm>
               </div>

               <div className={cx('btn-group')}>
                  <Button onClick={isClose}>Cancel</Button>
                  <Button blue type="submit">
                     Complete sprint
                  </Button>
               </div>
            </form>
         </ModalIcon>
      </div>
   );
}

export default ModalCompleteSprint;
