"use strict";

self.addEventListener("push", async (event) => {
  const { title, body } = await event.data.json();
  self.registration.showNotification(title, {
    body,
    icon: "/images/icon-192x192.png",
  });
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        if (clientList.length > 0) {
          let client = clientList[0];
          for (let i = 0; i < clientList.length; i++) {
            if (clientList[i].focused) {
              client = clientList[i];
            }
          }
          return client.focus();
        }
        return clients.openWindow("/");
      })
  );
});

// self.addEventListener('pushsubscriptionchange', function(event) {
//   event.waitUntil(
//       Promise.all([
//           Promise.resolve(event.oldSubscription ? deleteSubscription(event.oldSubscription) : true),
//           Promise.resolve(event.newSubscription ? event.newSubscription : subscribePush(registration))
//               .then(function(sub) { return saveSubscription(sub) })
//       ])
//   )
// })

// self.addEventListener('pushsubscriptionchange', function(event) {
//   event.waitUntil(
//     fetch('https://pushpad.xyz/pushsubscriptionchange', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         old_endpoint: event.oldSubscription ? event.oldSubscription.endpoint : null,
//         new_endpoint: event.newSubscription ? event.newSubscription.endpoint : null,
//         new_p256dh: event.newSubscription ? event.newSubscription.toJSON().keys.p256dh : null,
//         new_auth: event.newSubscription ? event.newSubscription.toJSON().keys.auth : null
//       })
//     })
//   );
// });
