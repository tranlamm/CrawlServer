import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

// Setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
app.use(cors());

// Routes
router(app);

// Listening
const port = process.env.PORT || 80;
app.listen(port, function () {
    console.log(`Server is running on port http://localhost:${port}`);
});
