# DockFish - Simple Client Example

This simple example only provides a simple HTML page `client/index.html` using a Javascript file `client/index.js` to
communicate with DockFish using web sockets. DockFish is launched via Docker Compose in `docker-compose.yml` and the
client code is just served via a convenient Node.js library.

This is just an example, you obviously don't need to use Node.js in your own project.

Moves are sent using UCI commands which is how you can communicate socket events to DockFish. in case you're building a
chess application, there are a few libraries converting normal chess notation in multiple programming languges depending
on what you use (I won't list them here and rather let you find them by yourself).

You can find some documentation about how to use UCI commands directly by following these links:

- https://en.wikipedia.org/wiki/Universal_Chess_Interface
- https://backscattering.de/chess/uci/
- https://www.shredderchess.com/download.html ("Download UCI Chess Engine Protocol" section)

You'll notice that the `API_TOKEN` is declared in the `client/index.js` file, **DON'T DO THAT if you intend to use your
chess application publicly**. In a real application, it's your own backend/api that should communicate with DockFosh,
NOT your frontend. You can safely set and use your DockFish API_TOKEN in a backend/api so that your frontend can request
your backend/api which will in turn relay that to your DockFish instance.

To run this example locally, you'll first need to have [Docker (with Docker Compose)](https://docs.docker.com/desktop/)
and [Node.js](https://nodejs.org) installed.

You can then run:

```sh
git clone https://github.com/ivangabriele/dockfish.git
cd dockfish/examples/simple
npm install
npm start
```

You should now be able to see this example running at [http://localhost:3000](http://localhost:3000).

The important files are `docker-compose.yml` and `client/index.js`.
