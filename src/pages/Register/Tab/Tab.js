import classNames from 'classnames/bind';
import style from './Tab.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ListBlog from '~/component/ListBlog/ListBlog';
const cx = classNames.bind(style);

function Tab() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const queryTab = searchParams.get('tab');
        setActiveTab(queryTab || '');
    }, [location]);
    return (
        <>
            <div className={cx('component')}>
                <ul className={cx('tab-list')}>
                    <li className={cx(activeTab === 'boards' ? 'active' : '')}>
                        <Link to="/register?tab=boards" className={cx('tab-item')}>
                            Boards
                        </Link>
                    </li>
                    <li className={cx('mf', activeTab === 'timeline' ? 'active' : '')}>
                        <Link to="/register?tab=timeline" className={cx('tab-item')}>
                            Timeline
                        </Link>
                    </li>
                    <li className={cx('mf', activeTab === 'reports' ? 'active' : '')}>
                        <Link to="/register?tab=reports" className={cx('tab-item')}>
                            Reports
                        </Link>
                    </li>
                    <li className={cx('mf', activeTab === 'automation' ? 'active' : '')}>
                        <Link to="/register?tab=automation" className={cx('tab-item')}>
                            Automation
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={cx('container-fluid', 'tab-img', activeTab === 'boards' && 'active')}>
                <ListBlog
                    data={{
                        title: 'Powerful agile boards',
                        list: [
                            {
                                strong: 'Scrum boards: ',
                                desc: 'Scrum boards help agile teams break large, complex projects into manageable pieces of work so focused teams ship faster.',
                            },
                            {
                                strong: 'Kanban boards: ',
                                desc: 'Agile and DevOps teams can use flexible kanban boards to visualize workflows, limit work-in-progress, and maximize efficiency as a team. Templates make it easy to get started quickly and customize as you go.',
                            },
                            {
                                strong: 'Choose your own adventure: ',
                                desc: 'Jira Software is flexible enough to mold to your team’s own unique way of working, whether it is Scrum, Kanban, or something in between.',
                            },
                        ],
                        img: 'https://wac-cdn.atlassian.com/dam/jcr:e966255e-69d5-400f-a45c-dec5442225b1/JSW_Boards.png',
                    }}
                />
            </div>
            <div className={cx('container-fluid', 'tab-img', activeTab === 'timeline' && 'active')}>
                <ListBlog
                    data={{
                        title: 'Timeline',
                        list: [
                            {
                                strong: 'Keep teams aligned: ',
                                desc: 'Give your team the visibility they need to make fast and informed decisions while staying aligned with the bigger goals.',
                            },
                            {
                                strong: 'Track the big picture: ',
                                desc: 'Plan and track how you’re making progress on the big picture for a single team. ',
                            },
                            {
                                strong: 'Get ahead of dependencies: ',
                                desc: 'Visualize dependencies within your team to account for them when making plans.',
                            },
                            {
                                strong: 'Plan with team capacity in mind (Advanced only): ',
                                desc: 'Ensure your teams have bandwidth to complete the work they’ve scoped. See multiple teams’ capacity on a sprint-by-sprint basis.',
                            },
                        ],
                        img: 'https://wac-cdn.atlassian.com/dam/jcr:2525690d-a1bb-49ca-9241-35fb59a2d7ad/timeline_view%20(1).png',
                    }}
                />
            </div>

            <div className={cx('container-fluid', 'tab-img', activeTab === 'reports' && 'active')}>
                {activeTab === 'reports' && (
                    <ListBlog
                        data={{
                            title: 'Reports and insights',
                            list: [
                                {
                                    strong: 'Ready to go reporting: ',
                                    desc: 'Out-of-the-box reports and dashboards in Jira Software offer critical insights within the context of your work to ensure your teams are always up to date and set up for success.',
                                },
                                {
                                    strong: 'Sprint reporting: ',
                                    desc: 'Determine where your team is overcommitted to reduce excessive scope creep and better understand completed work in each sprint.',
                                },
                                {
                                    strong: 'Burndown chart: ',
                                    desc: 'Track work towards sprint goals to manage progress and respond accordingly.',
                                },
                                {
                                    strong: 'Release Burndown: ',
                                    desc: 'Track and monitor the projected release date for versions and take action if work is falling behind  schedule.',
                                },
                            ],
                            img: 'https://wac-cdn.atlassian.com/dam/jcr:e966255e-69d5-400f-a45c-dec5442225b1/JSW_Boards.png',
                        }}
                    />
                )}
            </div>
            <div className={cx('container-fluid', 'tab-img', activeTab === 'automation' && 'active')}>
                <ListBlog
                    data={{
                        title: 'Automation',
                        list: [
                            {
                                strong: 'Drag and drop automation: ',
                                desc: 'Focus on the important things. Let automation do the rest. Powerful, yet simple - Jira automation is actually fun to use.',
                            },
                            {
                                strong: 'Auto-assign issues: ',
                                desc: 'When an issue is raised without an assignee, auto-assign to whoever created it so nothing falls through the cracks.',
                            },
                            {
                                strong: 'Sync work: ',
                                desc: 'When an epic is marked as ‘done’ move all of its stories to ‘done’ also.',
                            },
                            {
                                strong: 'Auto-close old support issues: ',
                                desc: 'If a customer has not responded to an issue in 5 days, close the issue and leave a comment.',
                            },
                        ],
                        img: 'https://wac-cdn.atlassian.com/dam/jcr:61848582-efe5-4b31-9ff0-de864d004900/JSW_Automation.png',
                    }}
                />
            </div>

            <div className={cx('block')}>
                <div className={cx('container-fluid', 'comfortable-top')}>
                    <div className={cx('row')}>
                        <div className={cx('column', 'left')}>
                            <div className={cx('component-img')}>
                                <img
                                    src="https://wac-cdn.atlassian.com/dam/jcr:e966255e-69d5-400f-a45c-dec5442225b1/JSW_Boards.png?cdnVersion=1339"
                                    alt="board"
                                />
                            </div>
                        </div>
                        <div className={cx('column', 'right')}>
                            <div className={cx('heading')}>
                                <h2>Customize how your team’s work flows</h2>
                            </div>
                            <div className={cx('rule')}>
                                <hr />
                            </div>
                            <div className={cx('text')}>
                                <p>Set up, clean up, and automate even the most complicated project workflows.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('container-fluid', 'comfortable')}>
                    <div className={cx('row')}>
                        <div className={cx('column', 'left')}>
                            <div className={cx('heading')}>
                                <h2>Stay on track – even when the track changes</h2>
                            </div>
                            <div className={cx('rule')}>
                                <hr />
                            </div>
                            <div className={cx('text')}>
                                <p>
                                    Use the timeline view to map out the big picture, communicate updates to
                                    stakeholders, and ensure your team stays on the same page.
                                </p>
                            </div>
                        </div>
                        <div className={cx('column', 'right')}>
                            <div className={cx('component-img')}>
                                <img
                                    src="https://wac-cdn.atlassian.com/dam/jcr:a02f3341-a4cc-4d40-92d0-e7d6eef5efe4/roadmaps_1462x860.png?cdnVersion=1339"
                                    alt="board"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('container-fluid', 'comfortable-bottom')}>
                    <div className={cx('row')}>
                        <div className={cx('column', 'left')}>
                            <div className={cx('component-img')}>
                                <img
                                    src="https://wac-cdn.atlassian.com/dam/jcr:ee041172-56ca-478b-aa45-f5cda74bc8f2/JSW_Bye%20Bye%20Spreadseets.png?cdnVersion=1339"
                                    alt="board"
                                />
                            </div>
                        </div>
                        <div className={cx('column', 'right')}>
                            <div className={cx('heading')}>
                                <h2>Bye-bye, spreadsheets</h2>
                            </div>
                            <div className={cx('rule')}>
                                <hr />
                            </div>
                            <div className={cx('text')}>
                                <p>
                                    Keep every detail of a project centralized in real time so up-to-date info can flow
                                    freely across people, teams, and tools.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('container-fluid', 'banner')}>
                <div className={cx('row')}>
                    <div className={cx('column')}>
                        <div className={cx('heading')}>
                            <h2>Move fast, stay aligned, and build better - together</h2>
                        </div>
                        <div className={cx('link')}>
                            <Link to="/register?tab=board"> Get it free </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tab;
