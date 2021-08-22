/**
 * Alert renders an alert notification.
 */
 function Alert({ alert }) {
  return (
    <div className="Alert">
      <p className="alert-text">Try Again! {alert}</p>
    </div>
  );
}

export default Alert;