import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './YourWork.module.scss';
import { Link } from 'react-router-dom';
import YourWorkCard from '~/component/YourWorkCard/YourWorkCard';
import WorkService from '~/services/work/workServices';
import ItemIssue from '~/component/ItemIssue/ItemIssue';
import Skeleton from 'react-loading-skeleton';
import LoadingBox from '~/component/LoadingBox/LoadingBox';

const cx = classNames.bind(styles);
const projectService = new WorkService();

const YourWork = () => {
   const [projects, setProjects] = useState([]);
   const [loading, setLoading] = useState();
   const [issuesTodo, setIssuesTodo] = useState([]);
   const [issuesInProgress, setIssuesInProgress] = useState([]);
   const [issuesReview, setIssuesReview] = useState([]);
   const [issuesDone, setIssuesDone] = useState([]);
   const [issuesCount, setIssuesCount] = useState(0);
   const getProject = async () => {
      const projects = await projectService.getListProject({ deleteProject: false });
      if (projects.status === 200) {
         setProjects(projects.data.data);
      }
   };
   const getIssues = async () => {
      const getIssue = await projectService.getIssuesYourWork();
      if (getIssue.status === 200) {
         const filterIssueTodo = getIssue.data?.filter((issue) => issue.status === 'TODO');
         const filterIssueInProgress = getIssue.data?.filter((issue) => issue.status === 'INPROGRESS');
         const filterIssueReview = getIssue.data?.filter((issue) => issue.status === 'REVIEW');
         const filterIssueDone = getIssue.data?.filter((issue) => issue.status === 'DONE');
         setIssuesTodo(filterIssueTodo);
         setIssuesInProgress(filterIssueInProgress);
         setIssuesReview(filterIssueReview);
         setIssuesDone(filterIssueDone);
         setIssuesCount(getIssue.data.length);
      }
   };
   const get = async () => {
      setLoading(true);
      await getProject();
      await getIssues();
      setLoading(false);
   };
   useEffect(() => {
      get();
   }, []);

   if (loading) {
      return <LoadingBox />;
   }

   return (
      <div className={cx('wrapper')}>
         <div className={cx('header')}>
            <h1>Your work</h1>
         </div>
         <section className={cx('body')}>
            <div className={cx('recent')}>
               <h2 className={cx('text')}>Recent projects</h2>
               <Link to="/project" className={cx('link')} target="_self">
                  View all projects
               </Link>
            </div>
            <div className={cx('group-card')}>
               {loading ? (
                  <Skeleton width="220px" height="75px" style={{ margin: '15px 20px 0 0' }} />
               ) : (
                  <>
                     {projects?.length <= 0 ? (
                        <div className={cx('no-more-notifications')}>
                           <img width={172} height={202} src="./imgs/Screenshot 2024-01-15 162545.png" alt="" />
                           <div className={cx('text')}>
                              <p className={cx('p')}>You have no projects for 30 days</p>
                           </div>
                        </div>
                     ) : (
                        projects?.map((data) => <YourWorkCard data={data} />)
                     )}
                  </>
               )}
            </div>
         </section>
         <div className={cx('footer')}>
            <div className={cx('assignee')}>
               <div className={cx('css-k5cxwk')}>
                  <span className={cx('css-1yrqasy')} style={{ color: 'inherit' }}>
                     Assigned to me
                     <span className={cx('_18u01i43')}>
                        <span className={cx('css-6jr8tc')}>
                           <span className={cx('css-1lt331k')}>{issuesCount}</span>
                        </span>
                     </span>
                  </span>
               </div>
            </div>
            {loading ? (
               <Skeleton width="100%" height="50px" style={{ marginTop: '20px' }} />
            ) : (
               <>
                  {issuesCount === 0 ? (
                     <div className={cx('no-more-notifications')}>
                        <img width={172} height={202} src="./imgs/Screenshot 2024-01-15 162545.png" alt="" />
                        <div className={cx('text')}>
                           <p className={cx('p')}>You have no issues for 30 days.</p>
                        </div>
                     </div>
                  ) : (
                     <>
                        {issuesTodo?.length > 0 ? (
                           <div className={cx('todo')}>
                              <h3 className={cx('boGiHC')}>To do</h3>
                              {issuesTodo?.map((data) => (
                                 <ItemIssue data={data} />
                              ))}
                           </div>
                        ) : (
                           ''
                        )}
                        {issuesInProgress?.length > 0 ? (
                           <div className={cx('in-progress')}>
                              <h3 className={cx('boGiHC')}>In progress</h3>
                              {issuesInProgress?.map((data) => (
                                 <ItemIssue data={data} />
                              ))}
                           </div>
                        ) : (
                           ''
                        )}
                        {issuesReview?.length > 0 ? (
                           <div className={cx('review')}>
                              <h3 className={cx('boGiHC')}>Review</h3>
                              {issuesReview?.map((data) => (
                                 <ItemIssue data={data} />
                              ))}
                           </div>
                        ) : (
                           ''
                        )}
                        {issuesDone?.length > 0 ? (
                           <div className={cx('done')}>
                              <h3 className={cx('boGiHC')}>Done</h3>
                              {issuesDone?.map((data) => (
                                 <ItemIssue data={data} />
                              ))}
                           </div>
                        ) : (
                           ''
                        )}
                     </>
                  )}
               </>
            )}
         </div>
      </div>
   );
};
export default YourWork;
