const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/uber-eats', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Реєстрація користувача
const User = require('./models/user');
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Користувач з таким іменем вже існує' });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ success: true, message: 'Користувач зареєстрований' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Помилка сервера' });
    }
});

// Огляд ресторанів і меню
const Restaurant = require('./models/restaurant');
app.get('/api/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json({ success: true, restaurants });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Помилка сервера' });
    }
});

// Роут для створення нового замовлення з обробкою платежу
app.post('/api/orders', async (req, res) => {
     const {restaurantId, items, paymentMethod} = req.body;
     try {
         const order = new Order ({restaurantId, items});
         await order.save();
         const payment = new Payment({
             orderId: order._id,
             paymentMethod,
             amount: calculateOrderTotal(items),
             status: 'Pending',
         });
         await payment.save();
         res.json({ success: true, message: 'Замовлення успішно створено, і платіж ініційований'});
     } catch (err) {
         console.error(err);
         res.status(500).json({error: 'Помилка сервера'});
     }
});
function calculateOrderTotal(items) {
    if (!Array.isArray(items) || items.length === 0) {
        return 0;
    }
    const total = items.reduce((accumulator, currentItem) => {
        if (currentItem && currentItem.price && currentItem.quantity) {
            accumulator += currentItem.price * currentItem.quantity;
        }
        return accumulator;
    }, 0);
    return total;
}

const Payment = require('./models/payment'); 
// Роут для ініціації платежу замовлення
app.post('/api/orders/:id/pay', async (req, res) => {
     const {id} = req.params;
     const {paymentMethod, amount} = req.body;
     try {         
const payment = new Payment({
             orderId: id,
             paymentMethod,
             amount,
             status: 'Pending',
         });
         await payment.save();
         res.json({ success: true, message: 'Ініційований платіж для замовлення'});
     } catch (err) {
         console.error(err);
         res.status(500).json({error: 'Помилка сервера'});
     }
});

// Роут для завершення оплати ресторану та кур'єра після успішної доставки
app.post('/api/orders/:id/complete-payment', async (req, res) => {
     const {id} = req.params;
     try {         const payment = await Payment.findOneAndUpdate(
             { orderId: id, status: 'Pending' },
             { status: 'Completed' },
             { new: true }
         );
         if (!payment) {
             return res.status(404).json({ error: 'Платіж не знайдено або вже завершено' });
         }
         res.json({ success: true, message: 'Оплата замовлення успішно завершена'});
     } catch (err) {
         console.error(err);
         res.status(500).json({error: 'Помилка сервера'});
     }
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});
