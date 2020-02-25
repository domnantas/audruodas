const pushServerPublicKey =
  "BNexmQtOVl_N8RuZlQWU1gToMz4ZeMkZpK91-CNl_QX4BwzBCvBE2zAXAmXexLF1iFtnuhTQytSC8qWxcnAjtEI";

export const isPushNotificationSupported = () =>
	"serviceWorker" in navigator && "PushManager" in window;

export const initializePushNotifications = () =>
	Notification.requestPermission();

export const registerServiceWorker = () =>
	navigator.serviceWorker.register("/sw.js");

export const createNotificationSubscription = async () => {
	const serviceWorker = await navigator.serviceWorker.ready;
	const subscription = await serviceWorker.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: pushServerPublicKey
	});
	return subscription;
};

export const getUserSubscription = async () => {
	const serviceWorker = await navigator.serviceWorker.ready;
	return serviceWorker.pushManager.getSubscription();
};
