import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import SimpleImage from '@editorjs/image';
import InlineImage from 'editorjs-inline-image';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const DefaultData = {
    time : new Date().getTime(),
    blocks : [
        {
            "type" : "header",
            "data" : {
                "text" : "Title of the Blog.....",
                "level" : 1
            }
        },
        {
            "type" : "paragraph",
            "data" : {
                "text" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi vitae iure, recusandae nostrum sapiente iste nam repudiandae excepturi porro et culpa, quidem facere nihil fuga facilis officiis id reiciendis aspernatur!"
            }
        }
    ]
}

function customUploader(file){
    const res = axios.post('http://localhost:3700',file);
    console.log(res);
    return res
}

function RichTextEditor(){

    const ejsInstance = useRef(null);
    const [blog, setBlog] = useState(DefaultData);
    
    function initEditor(){
        const editor = new EditorJS({
            holder : 'editorjs_element',
            logLevel : "ERROR",
            inlineToolbar: ['link', 'marker', 'bold', 'italic'],
            data : blog,
            onReady: ()=>{
                ejsInstance.current = editor;
            },
            onChange: async ()=>{
                let content = await editor.save();
                setBlog(content);
            },
            tools: {
                header : {
                    class : Header,
                    inlineToolbar : true
                },
                // image : {
                //     // class : SimpleImage,
                //     // inlineToolbar : true,
                //     // config : {
                //     //     uploader : {
                //     //         uploadByFile(file){
                //     //             const res = customUploader(file)
                //     //             return res.then(()=>{
                //     //                 return {
                //     //                     res
                //     //                 }
                //     //             })
                //     //         }
                //     //     }
                //     // }
                //     class : InlineImage,
                //     inlineToolbar : true,
                //     config : {
                //         embed : {
                //             display : true
                //         }
                //     }
                // }
            }        
        })
    }

    useEffect(()=>{
        if(! ejsInstance.current){
            initEditor();
        }

        return () => {
            console.log("cleanup");
            ejsInstance.current= null
        }
    },[])


    return(
        <div>
            Rich Text Editor
            <div id = 'editorjs_element'></div>
        </div>
    )
}

export default RichTextEditor;