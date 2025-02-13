import { config } from "dotenv";
config();
import mongoose from "mongoose";


const Schema = mongoose.Schema;


const MenuItemSchema = new Schema({
    restaurant: { type: String, required: true},
    name: { type: String, required: true },
    desc: { type: String, required: true },
    cost: { type: Number, required: true, min: [0, 'cost cannot be negative'] },
});
MenuItemSchema.index({ restaurant: 1, name: 1 }, { unique: true }) // composite key: (restaurant, name)
const MenuItem = mongoose.model('MenuItem', MenuItemSchema);


const OrderSchema = new Schema({
    isActive: { type: Boolean, required: true, default: false },
    connections: { type: Number, required: true, default: 0, min: [0, 'connections cannot be negative'] },
    items: { type: Object, required: true }, // MenuItem.Index: Qty
    cost: { type: Number, required: true, default: 0, min: [0, 'cost cannot be negative']},
    restaurant: { type: String, required: true}
}, { minimize: false });
const Order = mongoose.model('Order', OrderSchema);


const RestaurantSchema = new Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true, min: [1, 'restaurant must have positive capacity'] }, // zero-indexed
    menu: { type: Object, required: true, default: {} }, // Array<MenuItem>, 
    orders: { type: Object, required: true, default: {} }, // Array<Order._id>, reference
    transactions: { type: Array, required: true, default: [] }
});
RestaurantSchema.method('createOrder', async function createOrder(order_idx) {
    let items = {};
    for (let k of Object.keys(this.menu)) {
        items[k] = 0;
    }
    const order = new Order({restaurant: this.name, items: items});
    this.orders[order_idx] = order._id;
    await order.save();
});
RestaurantSchema.method('submitOrder', async function submitOrder(order_idx, order) {
    // deactivate current order

    // append current order to transaction history

    // create new order to fill old order space
    // add order to restaurant.transactions
    order.isActive = false;
    this.transactions.push(order);

    // create new order
    this.createOrder(order_idx);
    this.markModified('orders');
    await this.save();
});
const Restaurant = mongoose.model('Restaurant', RestaurantSchema);


export {
    MenuItem,
    Order,
    Restaurant
};