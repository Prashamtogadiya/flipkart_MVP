const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');

const connectMongoDB = require('./config/mongodb');
const app = express();

connectMongoDB()

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes); 
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
