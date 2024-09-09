require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

// Настройка POST-запроса — JSON
app.use(express.json());
app.use(express.static('public'));
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

// Настройка CORS
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.options('*', cors());

// Настройка POST-запроса — JSON
app.use(express.json());

// Настройка БД
const mongoose = require('mongoose');
const mongo_Url = process.env.MONGODB_URL;

mongoose.connect(mongo_Url, {}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Схемы
const smartfoneSchema = new mongoose.Schema({
    title: String,
    price: Number,
    image: String,
    isFavorite: Boolean,
    isAdded: Boolean,
    category: String,
    model: String,
});
const Smartfone = mongoose.model('smartfones', smartfoneSchema);

const productsSchema = new mongoose.Schema({
    title: String,
    price: Number,
    image: String,
    isFavorite: Boolean,
    isAdded: Boolean,
    category: String,
    model: String,
    color: String,
});

// Роуты
app.get('/api/all', async (req, res) => {
    let model = req.query.model;
    let category = req.query.category;
    let search = {};

    if (model) {
        model = model.trim();
        search.model = { $regex: model, $options: 'i' };
    }
    if (category) {
        category = category.trim();
        search.category = category;
    }
    try {
        let data = await Smartfone.find(search).limit(15);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

const orderSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: String,
    telephone: { type: Number, required: true },
    email: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    house: { type: Number, required: true },
    room: Number,
    repairPeriod: { type: String, required: true },
    price: { type: Number, required: true },
    products: { type: Array, required: true }
}, {
    timestamps: true
});

const Order = mongoose.model('order', orderSchema);

app.post('/api/order', async (req, res) => {
    try {
        const order = new Order({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            telephone: req.body.telephone,
            email: req.body.email,
            area: req.body.area,
            city: req.body.city,
            street: req.body.street,
            house: req.body.house,
            room: req.body.room,
            repairPeriod: req.body.repairPeriod,
            price: req.body.price,
            products: req.body.products
        });

        await order.save();
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});