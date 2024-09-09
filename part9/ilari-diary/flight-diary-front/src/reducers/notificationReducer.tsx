import { NotificationActionReducer, notificationInitialState } from '../types';
  
export const notificationReducer = (state = notificationInitialState, action: NotificationActionReducer) => {
  switch (action.type) {
    case 'BLOG_MESSAGE':
      return {
        message: action.payload.message,
        classname: action.payload.classname,
      };
    case 'EMPTY':
      return notificationInitialState;
    default:
      return state;
  }
};

  