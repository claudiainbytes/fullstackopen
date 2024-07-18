const initialState = {
    message: '', 
    classname: '' 
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_ERR":
          return { message: 'Wrong username or password..', classname: 'error' } 
      case "BLOG_MESSAGE":
          return { message: action.payload.message, classname: action.payload.classname }    
      case "EMPTY":
          return { message: '', classname: '' }
      default:
          return state
    }
}

export default notificationReducer