const SuccessNotification = ({ message }) => {
    const notificationStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    if (message === null) {
      return null
    }
  
    return (
      <div style={notificationStyle} className='success'>
        {message}
      </div>
    )
}

export default SuccessNotification