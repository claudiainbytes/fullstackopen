import { NotificationProps } from './../types';

const Notification = ({ message }: { message: NotificationProps }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={message.classname}>
        {message.message}
      </div>
    )
  }
  
  export default Notification