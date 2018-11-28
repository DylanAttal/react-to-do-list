import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      newItemText: '',
      editing: false,
      idBeingEdited: undefined
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
    if (this.state.editing) {
      axios
        .put(
          `https://one-list-api.herokuapp.com/items/${
            this.state.idBeingEdited
          }?access_token=listtoken`,
          {
            item: {
              complete: false,
              text: this.state.newItemText
            }
          }
        )
        .then(response => {
          this.loadList()
          this.setState({
            editing: false,
            idBeingEdited: undefined,
            newItemText: ''
          })
        })
    } else {
      axios
        .post(
          `https://one-list-api.herokuapp.com/items?access_token=listtoken`,
          {
            item: {
              text: this.state.newItemText
            }
          }
        )
        .then(response => {
          this.setState({
            newItemText: ''
          })
          this.loadList()
        })
    }
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

  editItem = event => {
    event.preventDefault()
    const id = parseInt(event.target.dataset.todoid)
    const todo = this.state.todos.find(todo => todo.id === id)
    this.setState({
      editing: true,
      idBeingEdited: id,
      newItemText: todo.text
    })
  }

  todoContent = (text, shouldShowInput) => {
    if (shouldShowInput) {
      return (
        <form onSubmit={this.addNewItem}>
          <input
            type="text"
            placeholder="Edit an item"
            value={this.state.newItemText}
            onChange={this.changeText}
          />
        </form>
      )
    } else {
      return text
    }
  }

  form = () => {
    if (!this.state.editing) {
      return (
        <form onSubmit={this.addNewItem}>
          <input
            type="text"
            placeholder="Add a new item"
            value={this.state.newItemText}
            onChange={this.changeText}
          />
        </form>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>To Do List</h1>
          <p>Type new item and press Enter to create it</p>
          <p>Click on item to cross it off</p>
          <p>Double click on item to delete it</p>
          <p>Right click on item to edit it</p>
        </header>
        <main>
          <ul className="one-list">
            {this.state.todos.map((todo, index) => {
              const todoClass = todo.complete ? 'completed' : ''
              const editingClass =
                todo.id === this.state.idBeingEdited ? 'editing' : ''
              return (
                <li
                  key={index}
                  id={todo.id}
                  data-todoid={todo.id}
                  onClick={this.crossOffItem}
                  onDoubleClick={this.deleteItem}
                  value={todo.text}
                  className={`${todoClass} ${editingClass}`}
                  onContextMenu={this.editItem}
                >
                  {this.todoContent(
                    todo.text,
                    todo.id === this.state.idBeingEdited
                  )}
                </li>
              )
            })}
          </ul>
          {this.form()}
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
