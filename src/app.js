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
    console.log('client connected');
  
    socket.emit('products', products);
  
    socket.on('disconnect', () => {
      console.log('client disconnected');
    });
  
    socket.on('newProduct', (product) => {
      products.push(product);
      socket.emit('products', products);
    });
  
    socket.on('deleteProduct', (product) => {
      const index = products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        products.splice(index, 1);
        socket.emit('products', products);
      }
    });
  });
});


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
