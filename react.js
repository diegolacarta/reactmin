import { patch, create, diff, h } from 'virtual-dom'

class Renderer {
  constructor(component, element) {
    this.update = this.update.bind(this)
    this.component = component
    this.component.addListener(this.update)
    this.element = element
  }

  update() {
    const newTree = this.component.render()
    const patches = diff(this.tree, newTree)
    patch(this.root, patches)
    this.tree = newTree
  }

  renderToDom() {
    this.tree = this.component.render()
    this.root = create(this.tree)
    this.element.appendChild(this.root)
    this.component.componentDidMount()
  }
}

class Component {
  constructor() {
    this.update = this.update.bind(this)
    this.listeners = []
  }

  update() {
    this.listeners.forEach(listener => listener())
  }

  addListener(listener) {
    this.listeners.push(listener)
  }
}

export {
  Renderer, Component
}