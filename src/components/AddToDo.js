import React, { Component } from 'react';

class AddToDo extends Component {
    state = {
        item: ''     
    }
    onSubmit(e) {
        e.preventDefault();        
        this.props.addItem(this.state.item)
    }
    render() {
        return(
            <form onSubmit={this.onSubmit.bind(this)}>
              <input 
                type="text" 
                placeholder="할일을 입력해주세요." 
                value={this.state.item}
                onChange={event => this.setState({ item : event.target.value }) }
                />
            </form>    
        )
    }
}

export default AddToDo;