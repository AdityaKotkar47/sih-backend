const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const expressLayouts = require('express-ejs-layouts');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/docs');
const rateLimit = require('express-rate-limit');
const { limiter } = require('./config/rateLimiter');
const itineraryRoutes = require('./routes/itinerary');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Log incoming requests
app.use(morgan(':method :url', {
  immediate: true,
  stream: {
    write: (message) => {
      console.log(message.trim());
    }
  }
}));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS
app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  origin: '*',
  credentials: true
}));

// Request logging
app.use(morgan('dev'));

// Rate limiting
app.use('/api', limiter);

// Welcome page route
app.get('/', (req, res) => {
    res.render('index', {
      title: 'Welcome to API',
      description: 'Explore our API documentation to get started',
      layout: 'layouts/main'
    });
});

// to render the Reset Password page
app.get('/reset-password/:resetToken', (req, res) => {
    res.render('resetPassword', { 
        resetToken: req.params.resetToken,
        layout: false
    });
});

// API Documentation route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));    

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/stations', require('./routes/station'));
app.use('/api/itineraries', itineraryRoutes);
app.use('/api/complaints', require('./routes/complaint'));
app.use('/api/reports', require('./routes/report'));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
    if (req.accepts('html')) {
        res.status(404).render('error', {
            title: '404 Not Found',
            description: 'The page you are looking for does not exist',
            layout: 'layouts/main',
            status: 404,
            message: 'Page not found',
            error: {}
        });
    } else {
        res.status(404).json({
            success: false,
            error: 'Not Found'
        });
    }
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});