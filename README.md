# Scrape aruodas to get instant notifications

This example shows how to use [Photon.js](https://photonjs.prisma.io/) in a **simple Node.js script** to read and write data in a database

## How to use

### 1. Setup 

 - Install Node dependencies:
```
npm install
```
 - Generate Application server keys at (http://web-push-codelab.glitch.me/)
 - Copy the public key to (dist/push-notifiation.js)
 - Create a [.env] file and populate it with the key pair and aruodas query URL.
 - Create and setup ngrok on your local machine.
 - Setup your [ngrok] account. See: (https://ngrok.com/)

### 2. Run the application

Run the application
```
npm run start
```

Deploy the application using ngrok
```
ngrok http 3000
```