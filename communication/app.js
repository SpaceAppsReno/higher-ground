import Koa from 'koa';
import { Server as WebSocket } from 'ws';
import engine from './engine/engine';

const app = new Koa();
const server = app.listen(process.env.PORT || 3000);

const websocket = new WebSocket({ server });
websocket.on('connection', (ws) => engine(ws));
