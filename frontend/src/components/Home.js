import React from 'react';
import { Layout, Row, Col } from 'antd';
import List from './List';
import Nav from './Nav';
import '../index.css';

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
