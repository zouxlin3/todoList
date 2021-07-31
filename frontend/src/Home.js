import React from 'react';
import { Layout, Row, Col } from 'antd';
import List from './List';
import './index.css';
import axios from 'axios'

const api = 'http://localhost:5000/'

const { Header, Content } = Layout;

class Home extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="Home">
                <Layout>
                    <Header style={{backgroundColor:"#007bff"}}>
                        <Nav />
                    </Header>
                    <Content>
                        <List />
                    </Content>
                </Layout>
            </div>
        )
    }
}

export default Home;

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
