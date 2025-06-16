import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    function dismissAllToasts(e) {
      if (e.key !== "Escape") {
        return;
      }

      setToasts([]);
    }

    window.addEventListener("keyup", dismissAllToasts);

    return () => {
      window.removeEventListener("keyup", dismissAllToasts);
    };
  }, []);

  function addToastMessage({ message, variant }) {
    if (message === "" || variant === "") {
      throw new Error(
        "ToastProvider: `message` and `variant` are required to add a toast message."
      );
    }

    const nextToasts = [
      ...toasts,
      { id: crypto.randomUUID(), message, variant },
    ];

    setToasts(nextToasts);
  }

  function onDismiss(id) {
    const nextToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(nextToasts);
  }

  const value = {
    toasts,
    addToastMessage,
    onDismiss,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
