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
            <Row>
                <Col span={6} style={{color:"white"}}>Hello,{this.props.username}</Col>
                <Col span={12} ><Search search={this.props.search.bind(this)} /></Col>
            </Row>
        )
    }
}

export default Nav;
