import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProject.scss';
import { Button, Form, Input } from '~/component/Inputs/Inputs';
import { Card } from '~/component/cards/Cards';
import { post } from '~/ultil/hpptRequest';

export default function CreateProject() {
   const [projectName, setProjectName] = useState('');
   const [projectKey, setProjectKey] = useState('');
   const [error, setError] = useState('');
   const navigate = useNavigate();
   const user = JSON.parse(localStorage.getItem('user'));
   const handleCreateProject = async (e) => {
      e.preventDefault();
      setError('');
      if (projectName && projectKey) {
         const response = await post(
            `/work/add-new-project/${user._id}`,
            {
               nameProject: projectName,
               codeProject: projectKey,
            },
            {
               headers: {
                  authorization: `${user.accessToken}`,
                  refresh_token: `${user.refreshToken}`,
               },
            },
         );
         switch (response.status) {
            case 200:
               console.log(response);
               break;
            case 400:
               navigate('/login');
               break;
            case 401:
               setError('The key is already used.');
               break;
            default:
               setError('Something went wrong. Please try again later.');
               break;
         }
      }
   };
   return (
      <Card className={'create-project-container'}>
         <h3>Create a New Project</h3>
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
            {error && <p className="error">{error}</p>}
            <Button
               buttonStyle={projectName && projectKey ? 'filled' : 'disabled'}
               type="submit"
               disabled={!projectName || !projectKey}
            >
               Create a new project
            </Button>
         </Form>
      </Card>
   );
}
