import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './CreateProject.scss';
import { Button, Form, Input } from '~/component/Inputs/Inputs';
import { Card } from '~/component/cards/Cards';
import { toast } from 'react-toastify';
import { post } from '~/ultil/hpptRequest';
import { UserContext } from '~/contexts/user/userContext';

const cx = classNames.bind(style);

export default function CreateProject() {
   const { GetListProject } = useContext(UserContext);
   const [projectName, setProjectName] = useState('');
   const [projectKey, setProjectKey] = useState('');
   const navigate = useNavigate();
   const user = JSON.parse(localStorage.getItem('user'));
   const handleCreateProject = async (e) => {
      e.preventDefault();
      console.log(e);
      // if (projectName && projectKey) {
      //    const response = await post(
      //       `/work/add-new-project/${user?._id}`,
      //       {
      //          nameProject: projectName,
      //          codeProject: projectKey,
      //       },
      //       {
      //          headers: {
      //             authorization: `${user.accessToken}`,
      //             refresh_token: `${user.refreshToken}`,
      //          },
      //       },
      //    );
      //    switch (response.status) {
      //       case 200:
      //          console.log(response);
      //          GetListProject();
      //          navigate('/project');
      //          break;
      //       case 400:
      //          navigate('/login');
      //          break;
      //       case 401:
      //          toast.error('Either the project name or project key already exists.');
      //          break;
      //       default:
      //          toast.error('Something went wrong. Please try again later.');
      //          break;
      //    }
      //    return;
      // }
   };
   return (
      <Card className={cx('create-project-container')}>
         <div>
            <p className={cx('title')}>Create a New Project</p>
            <p className={cx('subtitle')}>
               Explore what's possible when you collaborate with your team. Edit project details anytime in project
               settings.
            </p>
         </div>
         <Form onSubmit={(e) => handleCreateProject(e)}>
            <Input
               id="project-name"
               label="Project Name"
               name="project-name"
               value={projectName}
               onChange={(e) => setProjectName(e.target.value)}
               placeholder="Project Name"
            />
            <Input
               id="project-key"
               label="Project Key"
               name="project-key"
               value={projectKey}
               onChange={(e) => setProjectKey(e.target.value)}
               placeholder="Project Key"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <Button onClick={() => navigate('/project')}>Back to Project</Button>
               <Button
                  buttonStyle={projectName && projectKey ? 'filled' : 'disabled'}
                  type="submit"
                  disabled={!projectName || !projectKey}
               >
                  Create a new project
               </Button>
            </div>
         </Form>
      </Card>
   );
}
