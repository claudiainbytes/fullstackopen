const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }
  return <div className={notification.classname}>{notification.message}</div>;
};

export default Notification;
