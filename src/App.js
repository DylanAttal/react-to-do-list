import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      newItemText: ''
    }
  }

  componentDidMount = () => {
    axios
      .get('https://one-list-api.herokuapp.com/items?access_token=listtoken')
      .then(response => {
        this.setState({
          todos: response.data
        })
      })
  }

  changeText = event => {
    this.setState({
      newItemText: event.target.value
    })
  }

  loadList = () => {
    axios
      .get('https://one-list-api.herokuapp.com/items?access_token=listtoken')
      .then(response => {
        this.setState({
          todos: response.data
        })
      })
  }

  addNewItem = event => {
    event.preventDefault()
    axios
      .post(`https://one-list-api.herokuapp.com/items?access_token=listtoken`, {
        item: {
          text: this.state.newItemText
        }
      })
      .then(response => {
        this.loadList()
      })

    console.log(this.state.todos)
  }

  crossOffItem = event => {
    axios
      .put(
        `https://one-list-api.herokuapp.com/items/${
          event.target.id
        }?access_token=listtoken`,
        {
          item: {
            complete: true
          }
        }
      )
      .then(response => {
        this.loadList()
      })
  }

  deleteItem = event => {
    axios
      .delete(
        `https://one-list-api.herokuapp.com/items/${
          event.target.id
        }?access_token=listtoken`
      )
      .then(response => {
        this.loadList()
      })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>To Do List</h1>
          <h5>Type new item and press Enter to create it</h5>
          <h5>Click on item to cross it off</h5>
          <h5>Double click on item to delete it</h5>
        </header>
        <main>
          <ul className="one-list">
            {this.state.todos.map((todo, index) => {
              const todoClass = todo.complete ? 'completed' : ''
              return (
                <li
                  key={index}
                  id={todo.id}
                  onClick={this.crossOffItem}
                  onDoubleClick={this.deleteItem}
                  value={todo.text}
                  className={todoClass}
                >
                  {todo.text}
                </li>
              )
            })}
          </ul>
          <form onSubmit={this.addNewItem}>
            <input
              type="text"
              placeholder="Add item to list"
              value={this.state.newItemText}
              onChange={this.changeText}
            />
          </form>
        </main>
        <footer>
          <p>
            <img src={logo} height="42" alt="logo" />
          </p>
          <p>Created with React</p>
        </footer>
      </div>
    )
  }
}

export default App
