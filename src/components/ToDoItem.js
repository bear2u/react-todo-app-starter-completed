import React, { Component } from 'react';

class ToDoItem extends Component {    

    deleteProc(e, idx) {
        e.preventDefault();
        console.log('idx: ', idx);
    }

    render() {                        
        var idx = this.props[0].toNumber();
        var content = this.props[1];
        var isDone = this.props[2];

        return (            
            <div className={!isDone ? "task" : "task completed"}>                
                <label>
                    <span>{ content }</span>
                    <input type="text" />
                </label>
                <button type="button" onClick={e => this.deleteProc(e, idx)}>Delete</button>
            </div>
        )
    }
}

export default ToDoItem;