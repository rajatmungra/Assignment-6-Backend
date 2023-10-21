const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors  = require('cors');
const dotenv = require('dotenv')
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(cors());
const MongoURL = process.env.MONGO_URL;
mongoose.connect(MongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a schema for the form data
const formDataSchema = new mongoose.Schema({
  email: String
});

const FormData = mongoose.model('FormData', formDataSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Define a route for handling form submissions

app.post('/submit', async (req, res) => {
  try {
    const formData = new FormData({
      email: req.body.email
    });

    await formData.save();
    res.send('Data saved to MongoDB');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving data to MongoDB');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
