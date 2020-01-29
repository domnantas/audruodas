import {
	isPushNotificationSupported,
	initializePushNotifications,
	registerServiceWorker,
	createNotificationSubscription,
	getUserSubscription
} from "./push-notifications.js";

const main = async () => {
	const status = document.querySelector("#status");
	const pushNotificationSuported = await isPushNotificationSupported();

	if (!pushNotificationSuported) {
		status.innerHTML = "Push notifications are not supported";
		throw Error("Push notifications are not supported");
	}

	registerServiceWorker();

	const subscription = await getUserSubscription();
	if (subscription) {
		status.innerHTML = "You are already subscribed!";
		return;
	}

	const consent = await initializePushNotifications();
	if (consent === "default" || consent === "denied") {
		status.innerHTML = "You have refused to receive notifications";
		return;
	}

	if (consent === "granted") {
		status.innerHTML = "Consent granted, creating subscription...";
		// Create subscription LOCALLY in service worker
		const subscription = await createNotificationSubscription();
		// Send the subscription to a REMOTE backend
		await fetch("/subscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(subscription)
		});

		status.innerHTML =
			"Subscribed for notifications successfully! Enjoy the spam!";
	}
};

main().catch(error => console.error(error));
