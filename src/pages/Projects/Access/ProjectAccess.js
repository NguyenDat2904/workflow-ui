import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from '~/component/tables/Tables';
import './ProjectAccess.scss';
import WorkService from '~/services/work/workServices';

export default function ProjectAccess() {
   const { projectKey } = useParams();
   const workServices = new WorkService();
   const [memberList, setMemberList] = useState([]);
   useEffect(() => {
      workServices
         .getMember(projectKey, {})
         .then((res) => {
            setMemberList(
               res.data.dataMember.map((member) => ({
                  Name: member.name,
                  Email: member.email,
                  Role: member.role ? member.role : 'Admin',
               })),
            );
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   const handleDeleteMember = async () => {
      // const response = await remove(`work/delete-existing-members/${user._id}`);
   };

   return (
      <div className="project-access">
         <h1>Access</h1>
         <Table
            actions={[{ label: 'Delete', method: handleDeleteMember }]}
            data={memberList}
            colWidthRatio={[30, 40, 20]}
            colType={['string', 'string', 'string']}
            labels={['Name', 'Email', 'Role']}
         />
      </div>
   );
}
