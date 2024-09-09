import { NotificationType } from './../types';

const Notification = ({ notification } : { notification: NotificationType }) => {
    if (notification === null) {
      return null
    }
  
    return (
      <div className={notification.classname}>
        {notification.message}
      </div>
    )
  }
  
  export default Notification