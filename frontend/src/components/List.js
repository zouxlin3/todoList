import React from 'react';
import ListSort from './ListSort.jsx';
import { Button} from 'antd';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import '../index.css';
import '../assets/List.css';
import axios from 'axios'

const api = 'http://localhost:5000/'

class List extends React.Component {
    static defaultProps = {
        className: 'List',
    };

    constructor(props){
        super(props);
        props.onRef(this)

        this.state={
            todos:[]
        }
    }

    componentDidMount(){
        axios
        .get(api+'get_todos')
        .then(response => (
            this.setState({
                todos:response.data['todos']
            })
        ))
    }

    add(newTodo){
      this.setState({
        todos: [...this.state.todos, newTodo]
      })
    }

    delete(id){
      axios
      .get(api+'delete?id='+id)

      var todos = this.state.todos
      for (var i=0; i<todos.length; i++){
        if(todos[i]['id'] == id){
          todos.splice(i, 1)
          this.setState({
            todos: todos
          })
          break
        }
      }
    }

    complete(id){
      axios
      .get(api+'complete?id='+id)

      var todos = this.state.todos
      for (var i=0; i<todos.length; i++){
        if(todos[i]['id'] == id){
          todos[i]['is_completed'] = !todos[i]['is_completed']
          this.setState({
            todos: todos
          })
          break
        }
      }
    }

    todo_content(content, is_completed){
      if(is_completed){
        return <p><s>{content}</s></p>
      }
      else {
        return <p>{content}</p>
      }
    }

    render() {
      const Todo = this.state.todos.map((todo, i) => {
        const { id, content, is_completed } = todo;
        return (
          <div key={id+''+i} className={`${this.props.className}-card`}>
            <div className={`${this.props.className}-content`}>
              {this.todo_content(content, is_completed)}
            </div>
            <Button type="primary" shape="circle" icon={<DeleteOutlined />} onClick={this.delete.bind(this, id)} />
            <Button type="primary" shape="circle" icon={<CheckOutlined />} onClick={this.complete.bind(this, id)} />
          </div>
        );
      });
      return (
        <div className={`${this.props.className}-wrapper`}>
          <div className={this.props.className}>
            <ListSort
              dragClassName="card-drag-selected"
              appearAnim={{ animConfig: { marginTop: [5, 30], opacity: [1, 0] } }}
            >
              {Todo}
            </ListSort>
          </div>
        </div>
      );
    }
  }

export default List;
  