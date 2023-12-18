import React from 'react';
import classNames from 'classnames/bind';
import Button from '../Buttton/Button';
import style from './Pagination.module.scss';
import { LeftIcon, RightIcon } from '../icon/icon';
const cx = classNames.bind(style);
function Pagination({ page }) {
    const renderButtons = () => {
        for (let i = 1; i <= page?.total; i++) {
            return (
                <Button
                    style={
                        (page.page !== i && { background: 'rgba(0, 0, 0, 0)', color: 'rgb(23, 43, 77)' },
                        page.page === i && { background: 'rgb(233, 242, 255)', color: 'rgb(12, 102, 228)' })
                    }
                >
                    {i}
                </Button>
            );
        }
    };
    return (
        <nav className={cx('pagination')}>
            <div className={cx('wrapper')}>
                <Button leftIcon={<LeftIcon />} noChildren backgroundNone disable></Button>
                {renderButtons()}
                <Button rightIcon={<RightIcon />} noChildren backgroundNone></Button>
            </div>
        </nav>
    );
}

export default Pagination;
