import React from 'react';
import classNames from 'classnames/bind';
import style from './ProjectList.module.scss';
import { FilterIcon, StarIcon } from '~/component/icon/icon';
import Button from '~/component/Buttton/Button';
import RowProject from '~/component/RowProject/RowProject';
const cx = classNames.bind(style);
function ProjectList() {
    return (
        <table className={cx('table-list')}>
            <thead>
                <tr>
                    <td className={cx('star')} style={{ '--_1vcp0mh': '2.85%' }}>
                        <div className={cx('flex-center')}>
                            <span>
                                <StarIcon />
                            </span>
                        </div>
                    </td>
                    <td style={{ '--_1vcp0mh': '22%' }}>
                        <Button backgroundNone rightIcon={<FilterIcon />} tdIcon>
                            Name
                        </Button>
                    </td>
                    <td style={{ '--_1vcp0mh': '12%' }}>
                        <Button backgroundNone rightIcon={<FilterIcon />} tdIcon>
                            Key
                        </Button>
                    </td>
                    <td style={{ '--_1vcp0mh': '20%' }}>Type</td>
                    <td style={{ '--_1vcp0mh': '36%' }}>
                        <Button backgroundNone rightIcon={<FilterIcon />} tdIcon>
                            Lead
                        </Button>
                    </td>
                    <td style={{ '--_1vcp0mh': '3%' }}></td>
                    <td style={{ '--_1vcp0mh': '4.15%' }}></td>
                </tr>
            </thead>
            <tbody>
                <RowProject />
            </tbody>
        </table>
    );
}

export default ProjectList;
