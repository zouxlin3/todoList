import React from 'react';
import { Row, Col } from 'antd';
import Search from './Search';
import '../index.css';

class Nav extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Row align="middle" style={{height:'56px', padding:'0'}}>
                <Col span={6} style={{color:"white", height:'50px', fontSize:'24'}}>Hello,{this.props.username}</Col>
                <Col span={12} ><Search search={this.props.search.bind(this)} /></Col>
                <Col span={6}></Col>
            </Row>
        )
    }
}

export default Nav;
