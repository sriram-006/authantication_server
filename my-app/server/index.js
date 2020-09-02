const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/User');

async function connectDB() {
    await mongoose.connect('mongodb://localhost:27017/my-app', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('connected to mongodb');
}

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/test', (req, res) => {
    res.status(200).send('hello world');
});

app.post('/signup', async (req, res) => {
    const body = req.body;
    const user = new User(body);
    const email = body.email;
    if (await User.findOne({email}) === null) {
        await user.save();
    } else {
        // res.send('Error')
    }
    // await user.save();
    res.send(body);
});

app.post('/login', async (req, res) => {
    const body = req.body;
    const user = User.find({email: body.email});
    if (user.password === req.body.password) {
        res.send({
            
        });
    }
})

app.listen(4000, () => {
    console.log('listening on post 4000');
});
