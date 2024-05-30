const Notification = ({ notification }) => {

   const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 16
  }

  if(notification.length > 0) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

export default Notification
