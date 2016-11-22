import { h } from 'virtual-dom'
import { Renderer, Component } from './react'
import observe from './observe'

class TodoApp extends Component {
  constructor() {
    super()
    this.todos = observe(['Buy milk'], this.update)
  }

  componentDidMount() {
    document.querySelector('#input').addEventListener('keypress', this.onKeyPress.bind(this))
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.addTodo(event.target.value)
      event.target.value = ''
    }
  }

  addTodo(todo) {
    this.todos.push(todo)
  }

  render() {
    return (
      <div>
        {[
          <input type="text" id="input" placeholder="Add todo"/>,
          <ul>
            {this.todos.map(todo => <li>{todo}</li>)}
          </ul>
        ]}
      </div>
    )
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const todoApp = new TodoApp()
  const renderer = new Renderer(todoApp, document.querySelector('#app'))
  renderer.renderToDom()
  window.todoApp = todoApp
})