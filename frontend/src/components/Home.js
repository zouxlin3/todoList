import React from 'react';
import { Layout } from 'antd';
import List from './List';
import Nav from './Nav';
import Add from './Add';
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
                        <Add add={this.add.bind(this)} />
                        <List onRef={this.list_ref.bind(this)}/>
                    </Content>
                </Layout>
            </div>
        )
    }

    list_ref(ref){
        this.list = ref
    }

    add(newTodo){
        this.list.add(newTodo)
    }
}

export default Home;
