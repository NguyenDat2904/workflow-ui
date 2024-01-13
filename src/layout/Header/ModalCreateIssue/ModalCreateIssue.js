import React, { useState, useRef, useEffect } from 'react';
import ControllerForm from '~/component/ControllerForm/ControllerForm';
import Input from '~/component/Input/Input';
import WorkService from '~/services/work/workServices';
import classNames from 'classnames/bind';
import style from './ModalCreateIssue.module.scss';
import { useForm } from 'react-hook-form';
import ModalSelect from '~/component/ModalSelect/ModalSelect';
import UserService from '~/services/user/userServices';
import SprintService from '~/services/sprint/SprintService';
import TinyText from '~/component/TinyText/TinyText';
import IssueService from '~/services/issue/issueService';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(style);
const userService = new UserService();
const workService = new WorkService();
const sprintService = new SprintService();
const issueService = new IssueService();


function ModalCreateIssue({ data, onClose, detailProject, isOpen }) {
   const { id } = useParams();

   const popupRef = useRef(null);
   const [loading, setLoading] = useState(true);
   const [memberData, setMemberData] = useState([]);
   const [userProject, setUserProject] = useState({});
   const [sprint, setSprint] = useState([]);
   const [project, setProject] = useState({
      img: '',
      label: '',
      codeProject: '',
      imgNone: id ? '' : 'none',
   });
   const [issueTypeData, setIssuesTypeDate] = useState({
      label: 'USER_STORY',
      img: 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
   });
   const [assigneeData, setAssigneeData] = useState({
      img: 'https://avatar-management.services.atlassian.com/default/48',
      label: 'Automatic',
      backgroundProfile: '',
      textInBackgroundProfile: '',
      id: '',
   });
   const [reporterData, setReporterData] = useState({});
   const [sprintData, setSprintData] = useState({
      imgNone: 'none',
      label: 'Select sprint',
      id: '',
   });
   const [priorityData, setPriorityData] = useState({
      img: 'https://tcx19.atlassian.net/images/icons/priorities/medium.svg',
      label: 'Medium',
   });
   const [indexSelect, setIndexSelect] = useState({
      codeProject: true,
      issueType: true,
      assignee: true,
      reporter: true,
      priority: true,
      sprint: true,
      summary: true,
   });
   const form = useForm({
      mode: 'all',
      defaultValues: {
         codeProject: '',
         issueType: '',
         summary: '',
         assignee: '',
         reporter: '',
         priority: '',
         sprint: '',
         storyPointEstimate: '',
         startDate: '',
         dueDate: '',
         description: '',
      },
   });
   const dataTypeIssues = [
      {
         label: 'USER_STORY',
         img: 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
      },
      {
         label: 'TASK',
         img: 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
      },
      {
         label: 'BUG',
         img: 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
      },
      {
         label: 'EPIC',
         img: 'https://tcx19.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium',
      },
   ];
   const dataPriority = [
      {
         img: 'https://tcx19.atlassian.net/images/icons/priorities/highest.svg',
         label: 'Highest',
      },
      {
         img: 'https://tcx19.atlassian.net/images/icons/priorities/high.svg',
         label: 'High',
      },
      {
         img: 'https://tcx19.atlassian.net/images/icons/priorities/medium.svg',
         label: 'Medium',
      },
      {
         img: 'https://tcx19.atlassian.net/images/icons/priorities/low.svg',
         label: 'Low',
      },
      {
         img: 'https://tcx19.atlassian.net/images/icons/priorities/lowest.svg',
         label: 'Lowest',
      },
   ];

   const listMemberProject = async () => {
      const member = await workService.getMember({ codeProject: project.codeProject });
      const infoMember = member?.data.message
         ? []
         : member?.data?.map((product) => {
              return {
                 backgroundProfile: product?.backgroundProfile,
                 textInBackgroundProfile: product?.textInBackgroundProfile,
                 img: product?.img,
                 label: product.name,
                 id: product?._id,
              };
           });

      setMemberData(infoMember);
      const user = await userService.getUserProfile();
      const infoUserProject = {
         backgroundProfile: user?.data?.backgroundProfile,
         textInBackgroundProfile: user?.data?.textInBackgroundProfile,
         img: user?.data?.img,
         label: user?.data?.name,
         id: user?.data?._id,
      };
      form.setValue('reporter', `${infoUserProject.id}`, { shouldDirty: true });
      setReporterData(infoUserProject);
      setUserProject(infoUserProject);
      const listSprint = await sprintService.getSprint(project.codeProject);
      if (listSprint.status === 200) {
         const infoSprint = listSprint?.data?.sprint.map((product) => {
            return {
               imgNone: 'none',
               label: product?.name,
               id: product?._id,
            };
         });
         setSprint(infoSprint);
      } else {
         setSprint([]);
      }
   };
   useEffect(() => {
      listMemberProject();
   }, [project]);

   useEffect(() => {
      const handleOutsideClick = (event) => {
         if (popupRef.current && !popupRef.current.contains(event.target)) {
            onClose();
         }
      };

      const handleEscapeKey = (event) => {
         if (event.key === 'Escape') {
            onClose();
         }
      };

      if (isOpen) {
         data.forEach((element) => {
            if (element.codeProject === id) {
               console.log(element);
               setProject({
                  img: element.img,
                  label: element.label,
                  codeProject: element.codeProject,
                  imgNone: '',
               });
            }
         });
         document.addEventListener('mousedown', handleOutsideClick);
         document.addEventListener('keydown', handleEscapeKey);
      }

      return () => {
         document.removeEventListener('mousedown', handleOutsideClick);
         document.removeEventListener('keydown', handleEscapeKey);
      };
   }, [isOpen, onClose]);
   useEffect(() => {
      const reloadValue = () => {
         if (indexSelect.codeProject) {
            form.setValue('codeProject', `${project.codeProject}`, { shouldDirty: true });
         } else {
            form.setValue('codeProject', '', { shouldDirty: true });
         }
         if (indexSelect.issueType) {
            form.setValue('issueType', `${issueTypeData.label}`, { shouldDirty: true });
         } else {
            form.setValue('issueType', '', { shouldDirty: true });
         }
         if (indexSelect.priority) {
            form.setValue('priority', `${priorityData.label}`, { shouldDirty: true });
         } else {
            form.setValue('priority', '', { shouldDirty: true });
         }
         if (indexSelect.sprint) {
            form.setValue('sprint', `${sprintData.id}`, { shouldDirty: true });
         } else {
            form.setValue('sprint', '', { shouldDirty: true });
         }
         if (indexSelect.reporter) {
            form.setValue('reporter', `${reporterData.id}`, { shouldDirty: true });
         } else {
            form.setValue('reporter', '', { shouldDirty: true });
         }
         if (indexSelect.assignee) {
            form.setValue('assignee', `${assigneeData.id}`, { shouldDirty: true });
         } else {
            form.setValue('assignee', '', { shouldDirty: true });
         }
      };
      reloadValue();
   }, [indexSelect]);
   const handleBooleanSelect = (BooleanSelect) => {
      switch (BooleanSelect) {
         case 'codeProject':
            if (indexSelect.codeProject === true) {
               setIndexSelect((bool) => ({
                  ...bool,
                  codeProject: false,
               }));
            } else {
               setIndexSelect((bool) => ({
                  ...bool,
                  codeProject: true,
               }));
            }

            break;
         case 'issueType':
            if (indexSelect.issueType === true) {
               setIndexSelect((bool) => ({
                  ...bool,
                  issueType: false,
               }));
            } else {
               setIndexSelect((bool) => ({
                  ...bool,
                  issueType: true,
               }));
            }
            break;
         case 'assignee':
            if (indexSelect.assignee === true) {
               setIndexSelect((bool) => ({
                  ...bool,
                  assignee: false,
               }));
            } else {
               setIndexSelect((bool) => ({
                  ...bool,
                  assignee: true,
               }));
            }
            break;
         case 'reporter':
            if (indexSelect.reporter === true) {
               setIndexSelect((bool) => ({
                  ...bool,
                  reporter: false,
               }));
            } else {
               setIndexSelect((bool) => ({
                  ...bool,
                  reporter: true,
               }));
            }
            break;
         case 'priority':
            if (indexSelect.priority === true) {
               setIndexSelect((bool) => ({
                  ...bool,
                  priority: false,
               }));
            } else {
               setIndexSelect((bool) => ({
                  ...bool,
                  priority: true,
               }));
            }
            break;
         case 'sprint':
            if (indexSelect.sprint === true) {
               setIndexSelect((bool) => ({
                  ...bool,
                  sprint: false,
               }));
            } else {
               setIndexSelect((bool) => ({
                  ...bool,
                  sprint: true,
               }));
            }
            break;
         default:
            break;
      }
   };
   const filterDataproject = data.filter((product) => {
      if (indexSelect.codeProject === false && form.watch('codeProject') !== '') {
         return (
            form.watch('codeProject') &&
            product.codeProject &&
            product.codeProject.toLowerCase().includes(form.watch('codeProject'))
         );
      }
      return true;
   });
   const flterDataTypeIssues = dataTypeIssues.filter((product) => {
      if (indexSelect.issueType === false && form.watch('issueType') !== '') {
         return (
            form.watch('issueType') && product.label && product.label.toLowerCase().includes(form.watch('issueType'))
         );
      }
      return true;
   });
   const filterDataMemberData = memberData?.filter((product) => {
      if (indexSelect.assignee === false && form.watch('assignee') !== '') {
         return form.watch('assignee') && product.label && product.label.toLowerCase().includes(form.watch('assignee'));
      }
      if (indexSelect.reporter === false && form.watch('reporter') !== '') {
         return form.watch('reporter') && product.label && product.label.toLowerCase().includes(form.watch('reporter'));
      }
      return true;
   });
   const filterDataPriority = dataPriority.filter((product) => {
      if (indexSelect.priority === false && form.watch('priority') !== '') {
         return form.watch('priority') && product.label && product.label.toLowerCase().includes(form.watch('priority'));
      }
      return true;
   });
   const filterDataSprint = sprint.filter((product) => {
      if (indexSelect.sprint === false && form.watch('sprint') !== '') {
         return form.watch('sprint') && product.label && product.label.toLowerCase().includes(form.watch('sprint'));
      }
      return true;
   });
   const handleAssignToMe = () => {
      setAssigneeData(userProject);
   };
   const handleSubmit = async (dataForm) => {
      try {
         setLoading(false);
         if (form.getValues('summary') === '') {
            form.setError('summary', {
               type: 'manual',
               message: 'Summary is required',
            });
         }
         if (form.getValues('codeProject') === '') {
            form.setError('codeProject', {
               type: 'manual',
               message: 'CodeProject is required',
            });
         }
         if (
            form.getValues('summary') !== '' ||
            form.getValues('codeProject') !== '' ||
            form.getValues('issueType') !== ''
         ) {
            const createIssue = await issueService.createIssue(form.getValues('codeProject'), dataForm);
            if (createIssue.status === 200) {
               onClose();
            }
         }
      } catch (error) {
         console.log('can not create');
      } finally {
         setLoading(true);
      }
   };
   return (
      <div className={cx(isOpen ? 'wrapperTotal' : 'popup')}>
         <div className={cx('wrapper')} ref={popupRef}>
            <form action="" onSubmit={form.handleSubmit(handleSubmit)}>
               <div className={cx('titleCreate')}>
                  <h1 className={cx('title')}>Create issue</h1>
               </div>
               <div className={cx('height')}>
                  <div className={cx('formCreateIssue')}>
                     <div className={cx('form')}>
                        <p className={cx('text-title')}>
                           Required fields are marked with an asterisk <span style={{ color: 'red' }}> *</span>
                        </p>
                        <div className={cx('select-form')}>
                           <ControllerForm
                              indexSelect={indexSelect.codeProject}
                              data={project}
                              name="codeProject"
                              form={form}
                              label="Project"
                              required
                              onClick={() => handleBooleanSelect('codeProject')}
                           >
                              <Input
                                 name="inputProject"
                                 onBlur={() => handleBooleanSelect('codeProject')}
                                 className={cx(
                                    form.formState.dirtyFields?.codeProject ? 'transparentInput' : 'summaryInput',
                                 )}
                                 type="text"
                                 search="search"
                                 style={{ width: '50%' }}
                              />
                           </ControllerForm>
                           <div className={cx(indexSelect.codeProject ? 'none' : 'selectProject')}>
                              <ModalSelect
                                 onClose={() => handleBooleanSelect('codeProject')}
                                 setValue={setProject}
                                 data={filterDataproject}
                                 width="50%"
                                 widthImg="24px"
                              />
                           </div>
                        </div>
                        <div className={cx('select-form')}>
                           <ControllerForm
                              indexSelect={indexSelect.issueType}
                              data={issueTypeData}
                              name="issueType"
                              form={form}
                              label="Issue type"
                              required
                              onClick={() => handleBooleanSelect('issueType')}
                           >
                              <Input
                                 onBlur={() => handleBooleanSelect('issueType')}
                                 className={cx('transparentInput')}
                                 type="text"
                                 search="search"
                                 style={{ width: '50%' }}
                              />
                           </ControllerForm>
                           <div className={cx(indexSelect.issueType ? 'none' : 'selectProject')}>
                              <ModalSelect
                                 onClose={() => handleBooleanSelect('issueType')}
                                 data={flterDataTypeIssues}
                                 setValue={setIssuesTypeDate}
                                 width="50%"
                                 widthImg="24px"
                              />
                           </div>
                        </div>
                        <hr />
                        <div className={cx('select-form')}>
                           <ControllerForm required form={form} name="summary" label="Summary">
                              <Input
                                 className={cx(form.formState.dirtyFields?.summary ? '' : 'summaryInput')}
                                 type="text"
                                 search="search"
                                 style={{ width: '100%' }}
                              />
                           </ControllerForm>
                        </div>
                        <div className={cx('select-form')}>
                           <ControllerForm form={form} name="description" label="Description">
                              <TinyText
                                 none="none"
                                 setEditorValue={(value) => form.setValue('description', value, { shouldDirty: true })}
                              />
                           </ControllerForm>
                        </div>
                        <div className={cx('select-form')}>
                           <ControllerForm
                              widthImg="30px"
                              indexSelect={indexSelect.assignee}
                              data={assigneeData}
                              label="Assignee"
                              form={form}
                              name="assignee"
                              onClick={() => handleBooleanSelect('assignee')}
                           >
                              <Input
                                 onBlur={() => handleBooleanSelect('assignee')}
                                 type="text"
                                 search="search"
                                 style={{ width: '50%' }}
                              />
                           </ControllerForm>
                           <p className={cx(indexSelect.assignee ? 'AssignToMe' : 'none')} onClick={handleAssignToMe}>
                              Assign to me
                           </p>
                           <div className={cx(indexSelect.assignee ? 'none' : 'selectProject')}>
                              <ModalSelect
                                 onClose={() => handleBooleanSelect('assignee')}
                                 setValue={setAssigneeData}
                                 width="50%"
                                 widthImg="30px"
                                 data={filterDataMemberData}
                              />
                           </div>
                        </div>
                        <div className={cx('select-form')}>
                           <ControllerForm
                              widthImg="30px"
                              indexSelect={indexSelect.reporter}
                              data={reporterData}
                              label="Reporter"
                              form={form}
                              name="reporter"
                              onClick={() => handleBooleanSelect('reporter')}
                           >
                              <Input
                                 onBlur={() => handleBooleanSelect('reporter')}
                                 type="text"
                                 search="search"
                                 style={{ width: '50%' }}
                              />
                           </ControllerForm>

                           <div className={cx(indexSelect.reporter ? 'none' : 'selectProject')}>
                              <ModalSelect
                                 onClose={() => handleBooleanSelect('reporter')}
                                 setValue={setReporterData}
                                 width="50%"
                                 widthImg="30px"
                                 data={filterDataMemberData}
                              />
                           </div>
                        </div>
                        <div className={cx('select-form')}>
                           <ControllerForm
                              widthImg="30px"
                              indexSelect={indexSelect.priority}
                              data={priorityData}
                              label="Priority"
                              form={form}
                              name="priority"
                              onClick={() => handleBooleanSelect('priority')}
                           >
                              <Input
                                 onBlur={() => handleBooleanSelect('priority')}
                                 type="text"
                                 search="search"
                                 style={{ width: '50%' }}
                              />
                           </ControllerForm>

                           <div className={cx(indexSelect.priority ? 'none' : 'selectProject')}>
                              <ModalSelect
                                 onClose={() => handleBooleanSelect('priority')}
                                 setValue={setPriorityData}
                                 width="50%"
                                 widthImg="30px"
                                 data={filterDataPriority}
                              />
                           </div>
                        </div>
                        <div className={cx('select-form')}>
                           <ControllerForm
                              widthImg="30px"
                              indexSelect={indexSelect.sprint}
                              data={sprintData}
                              label="Sprint"
                              form={form}
                              name="sprint"
                              onClick={() => handleBooleanSelect('sprint')}
                           >
                              <Input
                                 onBlur={() => handleBooleanSelect('sprint')}
                                 type="text"
                                 search="search"
                                 style={{ width: '50%' }}
                              />
                           </ControllerForm>

                           <div className={cx(indexSelect.sprint ? 'none' : 'selectProject')}>
                              <ModalSelect
                                 setValue={setSprintData}
                                 data={filterDataSprint}
                                 onClose={() => handleBooleanSelect('sprint')}
                                 width="50%"
                                 widthImg="30px"
                              />
                           </div>
                        </div>
                        <div className={cx('select-form')}>
                           <ControllerForm
                              widthImg="30px"
                              label="Story point estimate"
                              form={form}
                              name="storyPointEstimate"
                           >
                              <Input type="number" search="search" style={{ width: '50%' }} />
                           </ControllerForm>
                        </div>
                        <div className={cx('select-form')}>
                           <ControllerForm widthImg="30px" label="Start date" form={form} name="startDate">
                              <Input placeholder="Select date" type="date" search="search" style={{ width: '50%' }} />
                           </ControllerForm>
                        </div>
                        <div className={cx('select-form')}>
                           <ControllerForm widthImg="30px" label="Due date" form={form} name="dueDate">
                              <Input type="date" search="search" style={{ width: '50%' }} />
                           </ControllerForm>
                        </div>
                     </div>
                  </div>
               </div>
               <div className={cx('footerModalCreate')}>
                  <button className={cx('buttonCancel')} type="button" onClick={onClose}>
                     Cancel
                  </button>
                  <button className={cx('buttonSubmit')} style={{cursor:loading?'pointer':'not-allowed'}} type={loading?"submit":'button'}>
                     {loading ? 'Create' : 'Creating...'}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default ModalCreateIssue;
