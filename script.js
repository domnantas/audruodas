const { Photon } = require("@prisma/photon");
const webpush = require("web-push");
require("dotenv").config();
const Koa = require("koa");
const logger = require("koa-logger");
const serve = require("koa-static");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");

const photon = new Photon();
const app = new Koa();
const router = new Router();

webpush.setVapidDetails(
	"mailto:example@yourdomain.org",
	process.env.VAPID_PUBLIC_KEY,
	process.env.VAPID_PRIVATE_KEY
);

app.use(logger());
app.use(serve("dist"));
app.use(bodyParser());
app.listen(3000);
console.log("Listening on port 3000");

router.post("/subscribe", async (ctx, next) => {
	const subscription = ctx.request.body;
	try {
		await photon.subscriptions.create({
			data: {
				endpoint: subscription.endpoint,
				p256dh: subscription.keys.p256dh,
				auth: subscription.keys.auth
			}
		});
	} catch (error) {
		console.error(error);
	}

	webpush.sendNotification(
		subscription,
		JSON.stringify({
			title: "Audruodas",
			text: "Congrats, u have subscribed",
			image:
				"https://i2.sndcdn.com/avatars-dRxpju9UqVfFn6aX-MSFAdA-t500x500.jpg",
			url: "https://i2.sndcdn.com/avatars-dRxpju9UqVfFn6aX-MSFAdA-t500x500.jpg"
		})
	);

	ctx.status = 201;
});

setInterval(async () => {
	try {
		const subscriptions = await photon.subscriptions.findMany();
		subscriptions.forEach(subscription => {
			webpush.sendNotification(
				{
					endpoint: subscription.endpoint,
					keys: { p256dh: subscription.p256dh, auth: subscription.auth }
				},
				JSON.stringify({
					title: "Audruodas",
					text: "Bybis",
					image:
						"https://i2.sndcdn.com/avatars-dRxpju9UqVfFn6aX-MSFAdA-t500x500.jpg",
					url:
						"https://i2.sndcdn.com/avatars-dRxpju9UqVfFn6aX-MSFAdA-t500x500.jpg"
				})
			);
		});
		console.log(`Sent notifications to ${subscriptions.length} subscribers`);
	} catch (error) {
		console.error(error);
	}
}, 20000);

app.use(router.routes()).use(router.allowedMethods());
