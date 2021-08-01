import React from 'react';
import ListSort from './ListSort.jsx';
import { Button, Row, Col } from 'antd';
import { DeleteOutlined, CheckOutlined, PictureOutlined } from '@ant-design/icons';
import '../index.css';
import '../assets/List.css';

class List extends React.Component {
    static defaultProps = {
        className: 'List',
    };

    constructor(props){
        super(props);
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
      const Todo = this.props.todos.map((todo, i) => {
        const { id, content, is_completed } = todo;
        return (
          <div key={id} className={`${this.props.className}-card`}>
            <Row align="middle">
              <Col className={`${this.props.className}-content`} span={16}>
                <p>{this.todo_content(content, is_completed)}</p>
              </Col>
              <Col span={4}></Col>
              <Col span={4}>            
              <Button type="primary" 
              shape="circle" 
              icon={<PictureOutlined />} 
              onClick={this.props.show_pic.bind(this, id)} 
              style={{float:'right'}} />

              <Button type="primary" 
              shape="circle" 
              icon={<DeleteOutlined />} 
              onClick={this.props.delete.bind(this, id)} 
              style={{float:'right'}} />

              <Button type="primary" 
              shape="circle" 
              icon={<CheckOutlined />} 
              onClick={this.props.complete.bind(this, id)} 
              style={{float:'right'}} />
              </Col>
            </Row>
          </div>
        );
      });
      return (
        <div className={`${this.props.className}-wrapper`} style={{backgroundColor: '#f0f2f5'}}>
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
  