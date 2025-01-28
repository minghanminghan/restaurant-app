import { config } from "dotenv";
config();
import mongoose from "mongoose";


const Schema = mongoose.Schema;


const MenuItemSchema = new Schema({
    restaurant: { type: String, required: true},
    name: { type: String, required: true },
    desc: { type: String, required: true },
    cost: { type: Number, required: true },
});
MenuItemSchema.index({ restaurant: 1, name: 1 }, { unique: true }) // composite key: (restaurant, name)
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
    name: { type: String, required: true },
    capacity: { type: Number, required: true }, // zero-indexed
    menu: { type: Array, required: true }, // Array<MenuItem>, embedded
    orders: { type: Array, required: true }, // Array<Order>, embedded
});
const Restaurant = mongoose.model('Restaurant', RestaurantSchema);


export {
    MenuItem,
    Order,
    Restaurant
};