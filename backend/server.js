const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routers/taskRoutes');
const reminderController = require('./routers/remainderrouter'); // Assuming you have this file



const app = express();
const port = 5000;


// Middleware
app.use(cors());
app.use(express.json());



// Routes
app.use('/auth/api', taskRoutes);
app.use('/auth/api', reminderController); // Add this line to use the reminder controller

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
