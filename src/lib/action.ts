'use server';

import ShortUniqueId from "short-unique-id";
import { auth } from "@clerk/nextjs/server";
import client from "./mongodb";
import mongoose from "mongoose";
import { getUser } from "./data";
import nodemailer from 'nodemailer';

export const getCart = async (prevState: any, formData: any) => {
    try {
        const currentUser = await auth();
        const mongoClient = await client;
        const db = mongoClient.db("Mazamaza-shop");
        const user = await db.collection("users").findOne({ clerkId: currentUser.userId });
        if (!user) {
            throw new Error('User not found')
        } 
        return user.cart
        
    } catch (err) {
        console.log(err)
    }
    
}  

export const addItem = async (prevState: any, formData: any) => {
    const { type, name, price, shortDescription, description, featured, colors, sizes } = Object.fromEntries(formData);
    const arrivedAt = new Date();
    let item = {};
    if (type === "products") { 
        const uid = new ShortUniqueId({ length: 10 });
        let products: any[] = [];
        const colorArray = colors.length > 0 ? colors.split(',') : [];
        const sizeArray = sizes.length > 0 ? sizes.split(',') : [];
        colorArray.forEach((color: string, index: number) => {
            sizeArray.forEach((size: string) => {
                item = {
                    itemId: uid.rnd(),
                    color,
                    size,
                    price: 0,
                    quantity: 0
                }
                products.push(item)
            })
        })

        console.log(colorArray, sizeArray)
        item = {
            name,
            shortDescription,
            description,
            featured,
            colors: colorArray,
            sizes: sizeArray,
            images: [],
            products: products,
            arrivedAt
        }
    } else if (type === "services") {
        item = {
            name,
            price: Number(price),
            shortDescription,
            description,
            images: [],
            arrivedAt
        }
    }    
    try {
        const mongoClient = await client
        const db = mongoClient.db("Mazamaza-shop")
        if (type === "products") {
            const collection = db.collection("products")
            await collection.insertOne(item)
            return
        } else if (type === "services") {
            const collection = db.collection("services")
            await collection.insertOne(item)
            return
        }
        return
    } catch (err) {
        console.log(err)
    }
    
}

export const updateItem = async (prevState: any, formData: any) => {
    const { type, id, description, items, shortDescription, price } = Object.fromEntries(formData);
    // console.log(JSON.parse(items))

    try {
        const mongoClient = await client
        const db = mongoClient.db("Mazamaza-shop")
        if (type === "products") {
            const data = {
                description,
                products: JSON.parse(items)
            }
            const collection = db.collection("products")
            await collection.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { $set: data })
            return
        } else if (type === "services") {
            const data = {
                shortDescription,
                price: Number(price),
                description
            }
            const collection = db.collection("services")
            await collection.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { $set: data })
            return
        }
        return
    } catch (err) {
        console.log(err)
    }
    
}

export const updateInfo = async (prevState: any, formData: any) => {
    const data = Object.fromEntries(formData);
    const faqs = JSON.parse(data.faqs);
    const allData = {
        ...data,
        faqs
    }
    try {
        const mongoClient = await client
        const db = mongoClient.db("Mazamaza-shop")
        const collection = db.collection("information")
        await collection.updateOne({ _id: new mongoose.Types.ObjectId('66a459353354bfbdbe70cea4') }, { $set: allData })
        return
    } catch (error) {
        console.log(error)
    }   
}

export const createInfo = async (prevState: any, formData: any) => {
    const data = Object.fromEntries(formData);
    const faqs = JSON.parse(data.faqs);
    const allData = {
        ...data,
        faqs
    }
    try {
        const mongoClient = await client
        const db = mongoClient.db("Mazamaza-shop")
        const collection = db.collection("information")
        await collection.insertOne(allData)
        return
    } catch (error) {
        console.log(error)
    }   
}


export const addReview = async (prevState: any, formData: any) => {
    const {product, comment, rating} = Object.fromEntries(formData);
    
    try {
        const user = await getUser();
        if (!user) {
            return {
                status: "danger",
                message: "Please login to add a review"
            }
        }
        const data = {
            name: (user.firstName + " " + user.lastName),
            profilePicture: user.profilePicture,
            approved: false,
            product,
            comment,
            rating: Number(rating),
        }
        const mongoClient = await client
        const db = mongoClient.db("Mazamaza-shop")
        const collection = db.collection("reviews")
        await collection.insertOne(data)
        return {
            status: "success",
            message: "Review added successfully"
        }
    } catch (error) {
        console.log(error)
        return {
            status: "danger",
            message: "Something went wrong"
        }
    }   
}

export const sendEmail = async (prevState: any, formData: any) => {
  
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_KEY
        }
    });

    const { myEmail, name, email, message, brand } = Object.fromEntries(formData);
    // console.log(myEmail, name, email, message )
  
  
    try {
  
      const mailOptions = {
        from: `${brand} <abdurrahmanidris235@gmail.com>`,
        to: myEmail,
        subject: `New Message from Website`,
        html: `<html><p>You got a new message from ${name}.</p><p>Email: ${email}.</p><p>Message: ${message}</p></html>`
      };
      
      // Send the email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error('Error sending email:', error);
          return {
            status: 'error',
            message: 'Opps, there was an error'
          };
        } else {
          console.log('Email sent successfully');
          return {
            status: 'success',
            message: 'Email sent successfully'
          };
        }
      });
      return {
        status: 'success',
        message: 'Email sent successfully'
      };
  
    } catch (error) {
        console.error('Error sending email:', error);
        return {
          status: 'error',
          message: 'Failed, Error: 500'
        };
    }
  
  };