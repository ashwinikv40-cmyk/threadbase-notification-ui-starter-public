
import { useNotifications } from "../context/NotificationContext.jsx";
import NotificationItem from "./NotificationItem.jsx";

export default function NotificationDropdown({ onClose }) {
  const { state, dispatch } = useNotifications();
  const { notifications, unreadCount } = state;

  function handleMarkAllRead() {
    dispatch({ type: "MARK_ALL_READ" });
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 12px)",
        right: 0,
        width: "340px",
        maxWidth: "90vw",
        backgroundColor: "#fff",
        color: "#1f2937",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <strong>Notifications</strong>

        <button
          type="button"
          onClick={handleMarkAllRead}
          disabled={unreadCount === 0}
          style={{
            border: "none",
            background: "none",
            color: unreadCount > 0 ? "#4f46e5" : "#9ca3af",
            cursor: unreadCount > 0 ? "pointer" : "default",
            fontSize: "12px",
          }}
        >
          Mark all as read
        </button>
      </div>

      <div style={{ maxHeight: "360px", overflowY: "auto" }}>
        {notifications.length === 0 ? (
          <p
            style={{
              padding: "24px 16px",
              textAlign: "center",
              color: "#6b7280",
              margin: 0,
            }}
          >
            No notifications yet.
          </p>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClose={onClose}
            />
          ))
        )}
      </div>
    </div>
  );
}