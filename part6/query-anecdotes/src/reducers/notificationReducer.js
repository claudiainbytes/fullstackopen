const notificationReducer = (state, action) => {
    switch (action.type) {
      case "CREATE":
          return `New anecdote "${action.payload}" was added.`
      case "VOTE":
          return `You voted "${action.payload}" `
      case "REJECTED":
            return `too short anecdote, must have length 5 or more`
      case "EMPTY":
            return ``
      default:
          return state
    }
}

export default notificationReducer