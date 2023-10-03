const Notification = (props) => {
  if (props.message.length === 0) {
    return null;
  }
  return <div className={props.className}>{props.message}</div>;
};

export default Notification;
