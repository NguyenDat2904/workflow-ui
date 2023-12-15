import React, { useState } from 'react';
import './CreateProject.scss';
import { Button, Form, Input } from '~/component/Inputs/Inputs';
import { Card } from '~/component/cards/Cards';

export default function CreateProject() {
    const [projectName, setProjectName] = useState('');
    const [projectKey, setProjectKey] = useState('');
    const handleCreateProject = (e) => {
        e.preventDefault();
        // Wait for api
    };
    return (
        <Card className={'create-project-container'}>
            <Form onSubmit={(e) => handleCreateProject(e)}>
                <Input
                    id="project-name"
                    label="Project Name"
                    name="project-name"
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Project Name"
                />
                <Input
                    id="project-key"
                    label="Project Key"
                    name="project-key"
                    onChange={(e) => setProjectKey(e.target.value)}
                    placeholder="Project Key"
                />
                <Button buttonStyle={projectName && projectKey ? 'filled' : 'disabled'} type="submit">
                    Create a new project
                </Button>
            </Form>
        </Card>
    );
}
