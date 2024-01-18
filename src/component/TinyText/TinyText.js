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
               plugins: [
                  'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
               ],
               menubar: 'file edit view insert format tools table tc help',
               quickbars_insert_toolbar: 'gallery quicktable | hr pagebreak',
               toolbar:
                  ' bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | insertfile image gallery media template link anchor codesample | ltr rtl | fullscreen  preview save print',
               toolbar_sticky: true,
               autosave_ask_before_unload: true,
               autosave_interval: '20s',
               autosave_prefix: '{path}{query}-{id}-',
               autosave_restore_when_empty: false,
               autosave_retention: '20m',
               image_advtab: true,
               height: 250,
               image_caption: true,
               fontsize_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px',
               quickbars_selection_toolbar: 'bold italic underline strikethrough | quicklink h1 h2 h3 blockquote',
               imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions gallery',
               toolbar_mode: 'sliding',
               contextmenu: 'link image imagetools table',
               save_onsavecallback: () => {},
               paste_data_images: true,
               content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
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
