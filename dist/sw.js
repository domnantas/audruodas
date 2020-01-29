function receivePushNotification(event) {
	console.log("[Service Worker] Push Received.");

	console.log(event.data);

	const { title, text, image, tag, url } = event.data.json();

	const options = {
		data: url,
		body: text,
		icon: image,
		vibrate: [200, 100, 200],
		tag,
		image,
		badge: image,
		actions: [
			{
				action: "Open",
				title: "View",
				icon: "https://via.placeholder.com/128/ff0000"
			}
		]
	};

	event.waitUntil(self.registration.showNotification(title, options));
}

function openPushNotification(event) {
	console.log(
		"[Service Worker] Notification click Received.",
		event.notification.data
	);

	event.notification.close();
	event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener("push", receivePushNotification);
self.addEventListener("notificationclick", openPushNotification);
