import classNames from 'classnames/bind';
import style from './MenuProject.module.scss';
import Button from '~/component/Buttton/Button';
const cx = classNames.bind(style);
function MenuProject({ onClick, id, disable }) {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('menu')}>
            {disable && (
               <Button viewAll backgroundNone to={`/project/${id}/settings/details`}>
                  Project setting
               </Button>
            )}
            <Button viewAll backgroundNone onClick={onClick}>
               Move to trash
            </Button>
         </div>
      </div>
   );
}

export default MenuProject;
