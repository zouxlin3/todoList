import React from 'react';
import { Layout, Modal, Button } from 'antd';
import List from './List';
import Nav from './Nav';
import Add from './Add';
import Pic from './Pic';
import '../index.css';
import axios from 'axios';

const api = 'http://localhost:5000/'

const { Header, Content } = Layout;

class Home extends React.Component{
    constructor(props){
        super(props);

        this.state={
            username: '',
            todos: [],
            keyword: '',
            todos2show: [],
            isModalVisible: false,
            pic_url: '',
            pic_id: ''
        }
    }

    componentDidMount(){
        //this.get_name()
        this.getTodos()
    }

    /*get_name(){
        axios
        .get(api+'get_name')
        .then(response => (
            this.setState({
                username:response.data['name']
            })
        ))
    }*/

    getTodos(){
        axios
        .get(api+'get_todos')
        .then(response => (
            this.setState({
                todos:response.data['todos'],
                todos2show:response.data['todos']
            })
        ))
    }

    delete(id){
        axios
        .get(api+'delete?id='+id)

        var todos = this.state.todos
        for (var i=0; i<todos.length; i++){
          if(todos[i]['id'] == id){
            todos.splice(i, 1)
            break
          }
        }

        this.setState({
            todos: todos,
        })

        this.search(this.state.keyword)
    }

    complete(id){
        axios
        .get(api+'complete?id='+id)
  
        var todos = this.state.todos
        for (var i=0; i<todos.length; i++){
          if(todos[i]['id'] == id){
            todos[i]['is_completed'] = !todos[i]['is_completed']
            this.setState({
              todos: todos,
            })
            break
          }
        }

        this.search(this.state.keyword)
    }

    add(content){
        axios
        .get(api+'add?content='+content)
        .then(response => (
            this.setState({
                todos: [...this.state.todos, response.data]
            }),
            this.search(this.state.keyword)
        ))
    }

    search(keyword){
        this.setState({
            keyword: keyword
        })

        if(keyword){
            var todos = this.state.todos
            var todos2show = []
            for (var i=0; i<todos.length; i++){
                if(todos[i]['content'].match(keyword)){
                    console.log(todos[i]['id'])
                    todos2show = [...todos2show, todos[i]]
                }
            }

            this.setState({
                todos2show: todos2show
            })
        }
        else{
            this.setState({
                todos2show: this.state.todos
            })
        }
    }

    show_pic(id){
        this.setState({
            isModalVisible: true
        })

        var todos = this.state.todos
        for (var i=0; i<todos.length; i++){
            if(todos[i]['id'] == id){
                this.setState({
                    pic_url: todos[i]['pic_url'],
                    pic_id: id
                })
            }
        }
    }

    modalCancel(){
        this.setState({
            isModalVisible: false
        })
    }

    render(){
        return (
            <div className="Home">
                <Modal title="" 
                visible={this.state.isModalVisible} 
                onCancel={this.modalCancel.bind(this)}
                footer={[]}>
                    <Pic pic_url={this.state.pic_url} pic_id={this.state.pic_id} />
                </Modal>
                <Layout>
                    <Header style={{backgroundColor:"#007bff", height:'56px'}}>
                        <Nav username={this.state.username} search={this.search.bind(this)} />
                    </Header>
                    <Content>
                        <Add add={this.add.bind(this)} />
                        <h4 className="apptitle">??????</h4>
                        <List todos={this.state.todos2show} 
                        delete={this.delete.bind(this)} 
                        complete={this.complete.bind(this)}
                        show_pic={this.show_pic.bind(this)} />
                    </Content>
                </Layout>
            </div>
        )
    }
}

export default Home;
