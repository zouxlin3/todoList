import React from 'react';
import ReactDOM from 'react-dom';
import { Input, Button, Row, Col} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../index.css';

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
        this.props.add(this.state.content)
    }

    render(){
        const div_style = {
            height:'60px', 
            padding: '10px 10px', 
            background:'#f4f4f4', 
            boxShadow:'0px 2px 4px rgba(44, 62, 80, 0.15)'
        }

        const input_style = {
            width: '100%',
            height: '100%',
            fontSize: '16px',
            textIUndent: '18px',
            background: '#ffffff',
            borderRadius: '25px 25px 25px 25px',
            border: '0px',
            boxShadow: 'none',
            outline: 'none',
        }

        const button_style = {
            width: '40px',
            height: '40px',
          
            position:'absolute',
            top:'66px',
            right:'10px',
            zIndex:'2',
          
            borderRadius: '25px',
            background: '#fff',
            color:'#007bff',
            border: '0px',
            boxShadow: 'none',
            outline: 'none',
        }

        return (
            <div style={div_style}>
                <Input placeholder="添加任务" 
                allowClear 
                maxLength="60" 
                onChange={this.get_value.bind(this)}
                bordered='false'
                onPressEnter={this.add.bind(this)}
                style={input_style}/>
                <Button type="primary" 
                shape="circle" 
                icon={<PlusOutlined />} 
                onClick={this.add.bind(this)}
                style={button_style}/>
            </div>
        )
    }
}

export default Add;
