const ErrorNotification = ({ message }) => {
    const notificationStyle = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 16
    }

    if (message === null) {
      return null
    }
  
    return (
      <div style={notificationStyle} className='error'>
        {message}
      </div>
    )
}

export default ErrorNotification