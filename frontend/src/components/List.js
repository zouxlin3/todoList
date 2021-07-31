import React from 'react';
import ListSort from './ListSort.jsx';
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
        this.state={
            todos:[]
        }
    }

    componentDidMount(){
        const _this=this;
        axios
        .get(api+'get_todos')
        .then(response => (
            _this.setState({
                todos:response.data['todos']
            })
        ))
    }

    render() {
      const Todo = this.state.todos.map((todo, i) => {
        const { content, is_completed } = todo;
        return (
          <div key={i} className={`${this.props.className}-card`}>
            <div className={`${this.props.className}-content`}>
              <p>{content}</p>
            </div>
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
  