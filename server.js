const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from public/

const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use('/api/cart', cartRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
