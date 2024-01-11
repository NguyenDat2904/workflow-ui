import { Editor } from '@tinymce/tinymce-react';
import React from 'react';
import Button from '../Buttton/Button';
import classNames from 'classnames/bind';
import style from './TinyText.module.scss';
const cx = classNames.bind(style);
function TinyText({ setEditorValue, onClose, handleSubmit, value }) {
   const handleEditorChange = (content) => {
      setEditorValue(content);
   };

   return (
      <div>
         <Editor
            onEditorChange={handleEditorChange}
            apiKey="p6wojfsgyrzmjmc3q4c94pr257dhh5i8yn2v0osay8kqtq7g"
            init={{
               menubar: '',
               toolbar:
                  ' styles  | ' +
                  'bold italic text  | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ',
               height: '200',
            }}
            initialValue={value}
         />
         <div>
            <div className={cx('btn-group')}>
               <Button
                  blue
                  type="submit"
                  style={{ height: '32px' }}
                  onClick={() => {
                     handleSubmit();
                     onClose();
                  }}
               >
                  Save
               </Button>
               <Button onClick={onClose} style={{ height: '32px' }} backgroundNone>
                  Cancel
               </Button>
            </div>
         </div>
      </div>
   );
}

export default TinyText;
