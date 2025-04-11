const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from public/

const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
