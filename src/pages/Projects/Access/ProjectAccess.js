import React from 'react';
import { Table } from '~/component/tables/Tables';
import './ProjectAccess.scss';

export default function ProjectAccess() {
   const data = [
      { Name: 'John Doe', Email: 'john@example.com', Role: 'Admin' },
      { Name: 'Jane Smith', Email: 'jane@example.com', Role: 'User' },
      { Name: 'Mike Johnson', Email: 'mike@example.com', Role: 'User' },
      { Name: 'Sarah Thompson', Email: 'sarah@example.com', Role: 'Admin' },
      { Name: 'Alex Brown', Email: 'alex@example.com', Role: 'User' },
   ];

   const handleDeleteMember = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      // const response = await remove(`work/delete-existing-members/${user._id}`);
   };

   return (
      <div className="project-access">
         <h1>Access</h1>
         <Table
            actions={[{ label: 'Delete', method: handleDeleteMember }]}
            data={data}
            colWidthRatio={[30, 40, 20]}
            colType={['string', 'string', 'string']}
            labels={['Name', 'Email', 'Role']}
         />
      </div>
   );
}
