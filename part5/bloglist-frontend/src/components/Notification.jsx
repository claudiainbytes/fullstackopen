const Notification = ({ message }) => {
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