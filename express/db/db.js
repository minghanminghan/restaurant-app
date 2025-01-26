import { config } from "dotenv";
config();
import mongoose from "mongoose";

const db = process.env.db
await mongoose.connect(process.env.DB).then(() => console.log('connected to mongoose:', db));

const Schema = mongoose.Schema;


const MenuItemSchema = new Schema({
    name: { type: String, required: true, index: { unique: true }},
    desc: { type: String, required: true },
    cost: { type: Number, required: true },
});
const MenuItem = mongoose.model('MenuItem', MenuItemSchema);


const OrderSchema = new Schema({
    items: { type: Array, required: true }, // Array<MenuItem>
    cost: { type: Number, required: true},
});
OrderSchema.methods.getCount = function() {
    OrderSchema.items.length;
};
const Order = mongoose.model('Order', OrderSchema);

const RestaurantSchema = new Schema({
    menu: { type: Array, required: true }, // Array<MenuItem>
    orders: { type: Array, required: true }, // Array<Order>
});
const Restaurant = mongoose.model('Restaurant', RestaurantSchema);


export {
    MenuItem,
    Order,
    Restaurant
};