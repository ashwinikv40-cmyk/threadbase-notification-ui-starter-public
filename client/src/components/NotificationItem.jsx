
import { useMutation } from "@tanstack/react-query";
import { useNotifications } from "../context/NotificationContext.jsx";
import apiClient from "../services/apiClient.js";

export default function NotificationItem({ notification }) {
  const { dispatch } = useNotifications();

  const mutation = useMutation({
    mutationFn: async (id) => {
      const response = await apiClient.patch(
        `/api/notifications/${id}/read`
      );
      return response.data;
    },

    onMutate: async (id) => {
      dispatch({
        type: "MARK_READ",
        payload: id,
      });
    },

    onError: async (_error, id) => {
      try {
        const response = await apiClient.get("/api/notifications");

        dispatch({
          type: "LOAD_NOTIFICATIONS",
          payload: response.data,
        });
      } catch (error) {
        console.error("Failed to restore notifications:", error);
      }
    },
  });

  const {
    id,
    title,
    message,
    body,
    isRead,
    createdAt,
  } = notification;

  function handleClick() {
    if (!isRead && !mutation.isPending) {
      mutation.mutate(id);
    }
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleClick();
        }
      }}
      style={{
        padding: "14px 16px",
        borderBottom: "1px solid #e5e7eb",
        backgroundColor: isRead ? "#fff" : "#eef2ff",
        cursor: isRead ? "default" : "pointer",
        display: "flex",
        gap: "10px",
        alignItems: "flex-start",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: "8px",
          height: "8px",
          flexShrink: 0,
          marginTop: "6px",
          borderRadius: "50%",
          backgroundColor: isRead ? "#d1d5db" : "#4f46e5",
        }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <strong style={{ fontSize: "14px" }}>
          {title || notification.type || "Notification"}
        </strong>

        <p
          style={{
            fontSize: "13px",
            margin: "5px 0",
            color: "#4b5563",
            overflowWrap: "anywhere",
          }}
        >
          {message || body || notification.content || ""}
        </p>

        {createdAt && (
          <small style={{ color: "#6b7280" }}>
            {new Date(createdAt).toLocaleString()}
          </small>
        )}

        <div
          style={{
            marginTop: "5px",
            fontSize: "11px",
            color: isRead ? "#6b7280" : "#4f46e5",
          }}
        >
          {isRead ? "Read" : "Unread"}
        </div>
      </div>
    </div>
  );
}