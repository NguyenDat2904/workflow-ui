import { Editor } from '@tinymce/tinymce-react';
import React, { useState } from 'react';
import Button from '../Buttton/Button';
import classNames from 'classnames/bind';
import style from './TinyText.module.scss';
const cx = classNames.bind(style);
function TinyText({ none, setEditorValue, onClose, handleSubmit, value }) {
   const [editorText, setEditorText] = useState(value);
   const handleEditorChange = (content) => {
      setEditorText(content);
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
            value={editorText}
         />
         <div>
            <div className={cx(none !== 'none' ? 'btn-group' : 'btn-group-none')}>
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
