import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../index.css';

class Search extends React.Component{
    constructor(props){
        super(props);
    }

    search(event){
        this.props.search(event.target.value)
    }

    render(){
        return (
            <div>
                <Input placeholder="搜索" 
                allowClear 
                maxLength="60" 
                onChange={this.search.bind(this)}
                prefix={<SearchOutlined />}/>
            </div>
        )
    }
}

export default Search;