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

    const menu = [
        new MenuItem({ restaurant: "test", name: "one", cost: 1, desc: "name='one', cost=1" }),
        new MenuItem({ restaurant: "test",  name: "one thousand", cost: 1000, desc: "name='one thousand', cost=1000" }),
        new MenuItem({ restaurant: "test",  name: "one million", cost: 1000000, desc: "name='one million', cost=1000000" })
    ];
    await MenuItem.bulkSave(menu).then(() => console.log('created MenuItems'));

    const restaurant = new Restaurant({ name: "test", capacity: 0, menu: menu, orders: [] });
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