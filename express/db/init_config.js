import { config } from "dotenv";
config();
import mongoose from "mongoose";
import { MenuItem, Order, Restaurant } from "./db.js";
import * as url from 'node:url';

async function db_init() {
    const db = process.env.DB ?? "mongodb://127.0.0.1/restaurant";
    await mongoose.connect(db).then(() => console.log('connected to mongoose:', db));
    
    MenuItem.deleteMany({}).then(() => console.log('cleared MenuItem'));
    Order.deleteMany({}).then(() => console.log('cleared Order'));
    Restaurant.deleteMany({}).then(() => console.log('cleared Restaurant'));

    let menu = {};
    for (let [idx, name, cost] of [[0, 'one', 1], [1, 'one thousand', 1000], [2, 'one million', 1000000]]){
      const item = new MenuItem({
        restaurant: "test",
        name: name,
        cost: cost,
        desc: "name='"+name+"', cost='"+cost+"'"
      });
      await item.save();
      menu[idx] = item;
    }

    const order = new Order({ 
      restaurant: "test",
      items: { 0: 0, 1: 0, 2: 0 }
    });
    const orders = {
      0: order._id // based on the restaurant capacity (below)
    };
    const restaurant = new Restaurant({ 
      name: "test",
      capacity: 1,
      menu: menu,
      orders: orders
    });
    
    await order.save();
    await restaurant.save().then(() => console.log('created Restaurant: test'));
    console.log(restaurant);
    await mongoose.disconnect().then(() => console.log('disconnected from mongoose'));
}

// exec if this file is run from Node.js
if (import.meta.url.startsWith('file:')) { // (A)
    const modulePath = url.fileURLToPath(import.meta.url);
    if (process.argv[1] === modulePath) { // (B)
      db_init();
    }
  }

export {
    db_init
}