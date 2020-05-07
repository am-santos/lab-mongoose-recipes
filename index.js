const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'My first recipe'
    });
  })
  .then((recipe) => {
    console.log('Added recipe', recipe.title);

    return Recipe.insertMany(data);
  })
  .then((data) => {
    console.log('Added data.json recipes', data);

    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then((data) => {
    console.log('Changed durantion of Rigatoni alla Genovese', data);

    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then((data) => {
    console.log('Carrot Cake is deleted', data);

    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Disconnected from MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
