import React, { Component } from 'react';
import ToDoItem from './ToDoItem';

class ToDoList extends Component {

    renderItems() {
        return this.props.items.map( item => {
            return <ToDoItem {...item} key={item[0].toNumber()} />
        });
    }
    
    render() {
        this.renderItems();
        return (
            <div className="task-list">
                {
                    this.renderItems()
                }
            </div>
        )
    }
}

export default ToDoList;