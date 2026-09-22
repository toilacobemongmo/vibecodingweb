import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";

async function enableMocking() {
  // Start MSW in dev mode if no external backend URL is specified
  if (process.env.NODE_ENV === "development" || !import.meta.env.VITE_API_BASE_URL) {
    try {
      const { worker } = await import("./mocks/browser");
      return worker.start({
        onUnhandledRequest: "bypass",
        serviceWorker: {
          url: "/mockServiceWorker.js",
        },
      });
    } catch (e) {
      console.warn("MSW worker start bypassed:", e);
    }
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
