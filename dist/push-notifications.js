const pushServerPublicKey =
	"BGLsY827vVl6CL2yaUymHBAJgu5kJT8cYsgIYgBbu5z7c1jiz59ZabcXrcZpogTi_7A9vi4mPqnJPwaISxWrAxs";

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
