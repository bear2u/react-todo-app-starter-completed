import React, { Component } from 'react'
import ToDoListContract from '../build/contracts/ToDoListContract'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import AddToDo from './components/AddToDo';
import ToDoList from './components/ToDoList';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        })

        // Instantiate contract once web3 provided.
        this.instantiateContract()
      })
      .catch(() => {
        console.log('Error finding web3.')
      })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const toDoListContract = contract(ToDoListContract)
    toDoListContract.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.  

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      console.log(accounts);      
      this.accounts = accounts;
      toDoListContract.deployed().then(async (instance) => {        
        this.toDoListContractInstance = instance
              
        console.log('ok done');

        const items = await this.getItems();

        this.setState({
          items
        });

      }).then((result) => {
        // Get the value from the contract to prove it worked.
        // return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: 0 })
      })
    })
  }

  addToDo = async (content) => {    

    await this.toDoListContractInstance.addItem(content, {from: this.accounts[0]});
        
    const items = await this.getItems();

    console.log(items);
  }

  async getItems() {
    let length = await this.toDoListContractInstance.getLength();

    length = length.toNumber();

    let items = [];
    for(var i=0;i<length;i++) {
      const item = await this.toDoListContractInstance.getItem(i);      
      items.push(item);
    }

    return items;

  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box with React</a>
        </nav>

        <main className="container">
          <div className="todo-app">

            <h1>To Do List with DAPP</h1>

            <AddToDo addItem={this.addToDo} />

            <ToDoList items={this.state.items} />

          </div>
        </main>
      </div>
    );
  }
}

export default App
