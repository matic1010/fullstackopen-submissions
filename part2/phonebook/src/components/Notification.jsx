const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return (
    <div
      className={`notification ${
        notification.type === "success" ? "success" : "error"
      }`}
    >
      {notification.msg}
    </div>
  );
};

export default Notification;
