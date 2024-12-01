console.log("Service worker loaded...");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      data: {
        url: data.url,
      },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data.url;

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", async (event) => {
  console.log("Service Worker activated");

  event.waitUntil(self.clients.claim());
});
