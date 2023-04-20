import express from 'express';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import exphbs from 'express-handlebars';

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

app.engine('.handlebars', exphbs({ extname: '.handlebars' }));
app.set('view engine', '.handlebars');

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

io.on('connection', (socket) => {io.on('connection', (socket) => {
    console.log('cliente conectado');
  
    socket.emit('productos', products);
  
    socket.on('desconectado', () => {
      console.log('cliente desconectado');
    });
  
    socket.on('nuevoProducto', (product) => {
      products.push(product);
      socket.emit('productos', products);
    });
  
    socket.on('eliminarProducto', (product) => {
      const index = products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        products.splice(index, 1);
        socket.emit('productos', products);
      }
    });
  });
});


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`el server funciona en el puerto  ${PORT}`));
