import React from 'react';
import { Input, Button} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../index.css';
import axios from 'axios'

const api = 'http://localhost:5000/'

class Add extends React.Component{
    constructor(props){
        super(props);
        this.state={
            content:''
        }
    }

    get_value(event){
        this.setState({
            content: event.target.value
        })
    }

    add(){
        axios
        .get(api+'add?content='+this.state.content)
        .then(response => (
            this.props.add(response.data)
        ))
    }

    render(){
        return (
            <div>
                <Input placeholder="添加任务" allowClear maxLength="60" onChange={this.get_value.bind(this)}/>
                <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={this.add.bind(this)} />
            </div>
        )
    }
}

export default Add;
