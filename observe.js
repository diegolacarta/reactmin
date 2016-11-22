const observe = (target, listener) => {
  return new Proxy(target, {
    set: (target, name, value) => {
      target[name] = value
      listener()
      return true
    },
    get: (target, name) => {
      return target[name]
    }
  })
}

export default observe