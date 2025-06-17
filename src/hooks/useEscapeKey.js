import React from "react";

function useEscapeKey(callback) {
  React.useEffect(() => {
    function onEscapeKey(e) {
      if (e.key !== "Escape") {
        return;
      }

      callback();
    }

    window.addEventListener("keydown", onEscapeKey);

    return () => {
      window.removeEventListener("keydown", onEscapeKey);
    };
  }, [callback]);
}

export default useEscapeKey;
