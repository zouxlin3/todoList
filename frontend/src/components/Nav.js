import React from 'react';
import { Row, Col } from 'antd';
import '../index.css';
import axios from 'axios'

const api = 'http://localhost:5000/'

class Nav extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:''
        }
    }

    componentDidMount(){
        const _this=this;
        axios
        .get(api+'get_name')
        .then(response => (
            _this.setState({
                username:response.data['name']
            })
        ))
    }

    render(){
        return (
            <Row>
                <Col span={6} style={{color:"white"}}>Hello,{this.state.username}</Col>
            </Row>
        )
    }
}

export default Nav;
