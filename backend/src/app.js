import express from 'express';
import path from 'path';
import cors from 'cors';

import socketio from 'socket.io';
import http from 'http';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.websocket();
    this.middlewares();
  }

  websocket() {
    this.serverSocket = http.Server(this.server);
    this.io = socketio(this.serverSocket);

    const connectedUsers = {};

    this.io.on('connection', socket => {
      const { user_id } = socket.handshake.query;

      connectedUsers[user_id] = socket.id;
    });

    this.server.use((req, res, next) => {
      req.io = this.io;
      req.connectedUsers = connectedUsers;

      return next();
    });
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
    this.server.use(routes);
  }
}

export default new App().serverSocket;
