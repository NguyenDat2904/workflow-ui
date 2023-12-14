import React from 'react';
import classNames from 'classnames/bind';
import style from './ModalProject.module.scss';
import Modal from '~/component/Modal/Modal';
import { NavLink } from 'react-router-dom';
import Button from '~/component/Buttton/Button';
const cx = classNames.bind(style);
function ModalProject({ handleToggle }) {
    return (
        <Modal width="320px">
            <div className={cx('top')}>
                <img
                    style={{ '--_ve50id': '138px' }}
                    src="https://jira-frontend-bifrost.prod-east.frontend.public.atl-paas.net/assets/project-empty.0864e274.svg"
                    alt=""
                />
                <div className={cx('desc')}>
                    <div>
                        <p>You don't have any projects yet.</p>
                    </div>
                    <div>
                        <NavLink className={cx('desc-link')}>Create</NavLink>
                    </div>
                </div>
            </div>
            <div className={cx('bottom')}>
                <span>
                    <Button viewAll to="/project" onClick={handleToggle}>
                        View all projects
                    </Button>
                    <Button viewAll>Create project</Button>
                </span>
            </div>
        </Modal>
    );
}

export default ModalProject;
