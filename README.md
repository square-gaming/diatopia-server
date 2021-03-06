# diatopia-server

diatopia-server is a WebSocket-based server and transmit data to diatopia application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Check you got proper version Node.js and npm already. 

```
node --version
npm --version
```

### Installing

Install node_modules all the project needs.

```
npm install
```

Wait a little time for installing and finally project is done.

## Before running

create a .env to provide environment variables

```
touch .env
```

type following variables

```
WSS_HOST=HOST_IP
WSS_PORT=PORT_NUMBER
WSS_PATH=URL_PATH
```

## Running the npm scripts

Here are some npm scripts that I had set for project.

### Using dev-server to develop

The nodemon and ts-node module provides you with a simple web server and the ability to use live reloading.

```
npm run dev
```

### Using ESLint to lint

ESLint statically analyzes code to quickly find problems and makes code follow the Google style convention.

```
npm run lint
```

### Using Babel to build

Babel is a JavaScript compiler. Using it to provides us a Javascript build to run in Node.js

```
npm run build
```
