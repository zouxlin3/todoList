import React from 'react';
import { Image } from 'antd';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Bmob from 'hydrogen-js-sdk'
import '../index.css';
import axios from 'axios';

const api = 'http://localhost:5000/'

const { Dragger } = Upload;

Bmob.initialize("4a0fe31d1a2e98db", "666666")

class Pic extends React.Component{
    constructor(props){
        super(props);
    }

    upload(pic){
        var result = Bmob.File(pic.name, pic)

        axios
        .get(api+'add_pic?id='+this.props.pic_id+'&pic_url='+result['url'])
    }

    render(){
        if(this.props.pic_url){
            return(
                <Image width={200} src={this.props.pic_url} />
            )
        }
        else{
            const props = {
                name: this.props.pic_id,
                multiple: false,
                cunstomRequest: this.upload.bind(this),
                onChange(info) {
                  const { status } = info.file;
                  if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                  }
                  if (status === 'done') {
                    message.success(`上传成功`);
                  } else if (status === 'error') {
                    message.error(`上传失败`);
                  }
                },
                onDrop(e) {
                  console.log('Dropped files', e.dataTransfer.files);
                },
            };


            return(
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">上传图片</p>
                </Dragger>
            )
        }
    }
}

export default Pic;
