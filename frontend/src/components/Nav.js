import React from 'react';
import { Row, Col } from 'antd';
import '../index.css';

class Nav extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Row>
                <Col span={6} style={{color:"white"}}>Hello,{this.props.username}</Col>
            </Row>
        )
    }
}

export default Nav;
