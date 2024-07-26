import { color } from "framer-motion";
import mongoose from "mongoose";
import { features } from "process";

const productSchema = new mongoose.Schema({
    name: String,
    images: Array<string>,
    description: String,
    shortDescription: String,
    colors: Array<string>,
    sizes: Array<string>,
    products: Array<{ itemId: String, size: String, price: Number, color: String, quantity: Number }>,
    featured: Boolean,
    arrivedAt: Date,
});

const serviceSchema = new mongoose.Schema({
  name: String,
  description: String,
  shortDescription: String,
  images: Array<string>,
  price: Number,
  arrivedAt: Date,
});

const userSchema = new mongoose.Schema({
  clerkId: String,
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  isAdmin: Boolean,
  cart: Array<any>,
});  


export const Product = mongoose.models?.Product || mongoose.model('Product', productSchema)
export const Service = mongoose.models?.Service || mongoose.model('Service', serviceSchema)
export const User = mongoose.models?.User || mongoose.model('User', userSchema)
