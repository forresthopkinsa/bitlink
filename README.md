![BitLink Logo](assets/logo.svg)

BitLink is an open source video conference chat program.

[https://bitlink.live](https://bitlink.live)

## Features

### No Download Needed

BitLink can operate completely in the browser on both mobile and desktop devices.

### Robust Chat System

BitLink has a robust integrated chat system. Participants can send messages individually or to the entire room. Participants can edit and delete messages. When a new participant joins, the entire chat history will be synced with their device.

### Background Replacement / Blur

BitLink has built in background replacement (virtual background) support and blur background functionality. Powered by Tensorflow's BodyPix library, we are able to achieve great accuracy while still achieving high performance. Many laptops can apply background replacement without fan spin.

### Waiting Room

BitLink has a waiting room feature. Once the host enables the waiting room, new members will be entered into a waiting room where the host can either accept them into the room or reject them from entering.

### Screen Sharing

User's can share their screen with other users in the room.

## Installation

```shell script
git clone https://github.com/oss-videochat/bitlink.git`
cd bitlink
npm install
lerna bootstrap
lerna link # may hang, see note below
cd server
MEDIASOUP_LISTEN_IP=<YOUR IP ADDRESS>; npm run run
```

`lerna run build` should work, but if it doesn't, manually build with

```shell script
cd common && npm run build
cd ../frontend && npm run build
cd ../server && npm run build
```

## Usage 

```shell script
cd server
MEDIASOUP_LISTEN_IP=<YOUR IP ADDRESS>; npm run run
```

## Docker

Mediasoup requires some special network configuration that wouldn't be needed for a typical web server.

You can hit the ground running using `docker-compose` for very quick setup:

```
docker-compose up
```

This configures some sensible defaults for running Bitlink locally for demo purposes.
Feel free to adjust `docker-compose.yml` to configure default ports, etc.

If you want to run Bitlink in production, you should instead run the Docker image directly and configure Mediasoup manually:

```
docker build -t bitlink .
docker run -e "PORT=80" -p 80:80 -e "MEDIASOUP_LISTEN_IP=x.x.x.x" -e "MEDIASOUP_ANNOUNCED_IP=x.x.x.x" \
    -e "MEDIASOUP_MIN_PORT=10000" -e "MEDIASOUP_MAX_PORT=20000" -p "10000-20000:10000-20000/tcp" -p "10000-20000:10000-20000/udp" bitlink
```

Please read the [Mediasoup documentation](https://github.com/versatica/mediasoup-demo/blob/v3/server/DOCKER.md)
for more information about these variables.

## Contributing

Thank you for helping BitLink grow! Please submit a PR request.
