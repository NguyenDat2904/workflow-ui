import React, { useContext, useState } from 'react';
import style from './ModalChangeRole.module.scss';
import classNames from 'classnames/bind';
import Modal from '../Modal/Modal';
import { ProjectContext } from '~/contexts/project/projectContext';
import WorkService from '~/services/work/workServices';
import ModalIcon from '~/pages/DetailProject/ModalIcon/ModalIcon';
import Button from '../Buttton/Button';
import { DownIcon, LoadingIcon } from '../icon/icon';
import Input from '../Input/Input';
import ModalSelect from '../ModalSelect/ModalSelect';
import { toast } from 'react-toastify';

const cx = classNames.bind(style);
const projectService = new WorkService();

function ModalChangeRole({ isOpen, isClose, getMembers, member, setIsToggleChangeRole }) {
   const { detailProject } = useContext(ProjectContext);
   const [isToggle, setIsToggle] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmitChangeRole = async (key, option) => {
      const data = { email: option?.email, role: option?.role };
      setIsLoading(true);
      const changeRole = await projectService.changeRole(key, data);
      if (changeRole.status === 200) {
         getMembers();
         toast.success('Changed role successfully.');
         setIsToggleChangeRole(false);
      } else {
         toast.error('Role change failed.');
      }
      setIsLoading(false);
   };
   const data = [
      {
         email: member?.email,
         label: member?.role === 'member' ? 'Manager' : 'Member',
         role: member?.role === 'member' ? 'manager' : 'member',
      },
   ];
   return (
      <ModalIcon
         width="350px"
         height="auto"
         isOpen={isOpen}
         isClose={isClose}
         relative
         header={'Change Role'}
         style={{ position: 'relative' }}
      >
         <div className={cx('text-desc')}>
            <p>
               Select a permission for <strong>{member.name}</strong>.
            </p>
         </div>
         <div style={{ marginTop: '10px', position: 'relative' }} onClick={() => setIsToggle(!isToggle)}>
            <Input
               className={cx('input')}
               defaultValue={member?.role === 'member' ? 'Member' : 'Manager'}
               onKeyDown={(e) => e.preventDefault()}
               type="text"
               style={{
                  width: '100%',
                  height: '40px',
                  border: '2px solid var(--ds-border-input, #dfe1e6)',
                  margin: '10px 0',
                  cursor: 'pointer',
               }}
               rightIcon={<DownIcon nameCss={cx('iconDownBotton')} />}
               readonly="readonly"
            />
            <Modal maxHeight={'260px'} width={'auto'} relative isOpen={isToggle} onClose={() => setIsToggle(false)}>
               <ModalSelect
                  style={{ top: 'auto', position: 'fixed', transition: 'all 0.2s else' }}
                  width="303px"
                  widthImg="20px"
                  heightRow="29px"
                  onClose={() => setIsToggle(false)}
                  handleSubmit={(option) => handleSubmitChangeRole(detailProject?.codeProject, option)}
                  data={data}
               />
            </Modal>
         </div>
         <div className={cx('btn-group')} style={{ padding: '10px 0 15px 0' }}>
            <Button
               style={{
                  minWidth: '71px',
                  cursor: 'no-drop',
                  background: isLoading ? 'var(--ds-background-brand-bold-hovered, #0065ff)' : '',
               }}
               type={'button'}
            >
               {isLoading ? <LoadingIcon /> : <span style={{ paddingLeft: '4px' }}>Done</span>}
            </Button>
            <Button onClick={isClose}>Cancel</Button>
         </div>
      </ModalIcon>
   );
}

export default ModalChangeRole;
