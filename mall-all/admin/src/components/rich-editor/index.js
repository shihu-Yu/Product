import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'
class RichEditor extends Component {
    render() {
        const {data,uploadUrl,getData} = this.props
        return (
            <div className="App">
                <CKEditor
                    config={{
                        language:'zh-cn',
                        //指定上传地址
                        ckfinder:{
                            uploadUrl:uploadUrl
                        }
                    }}
                    editor={ ClassicEditor }
                    data={data}
                    
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        getData(data)
                    } }
                    
                />
            </div>
        );
    }
}

export default RichEditor;