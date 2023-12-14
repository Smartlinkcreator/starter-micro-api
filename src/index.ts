// const { addDoc } = require('firebase/firestore');
// const bodyParser = require('body-parser');
// const express = require("express");
// const cors = require("cors");
// const User = require("./config");
// import { express } from 'express'
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express from 'express';
import { linkDb, usersDB } from './utils/config';

let corsOptions = { 
    origin : ['http://localhost:4200','http://localhost:51759'], 
 } 

const app = express();
app.use(json());
app.use(
    urlencoded({
        extended: true,
    }),
);
app.use(cors(corsOptions));

app.post("/Create", async (req, res) => {
    try {
        const data = req.body;
        const docRef = usersDB.doc();
        const _data = {
            id: docRef.id,
        };
        docRef.set(_data);
        res.send({ userId: docRef.id });
    }
    catch (err) {
        res.status(404).send({ msg: "failed" });
    }

})
app.get("/Get/:id", async (req, res) => {
    try {
        const response = await linkDb.doc(req.params.id).get();
        console.log(response.data());
        res.send(response.data());
    }
    catch (err) {
        res.send({ msg: "failed" });
    }

})
app.post("/GetLink", async (req, res) => {
    try {
        const data = req.body;
        const docRef = linkDb.doc();
        const _data = {
            url: data.url,
            id: docRef.id,
            userId: data.userId
        };
        console.log(_data);
        await docRef.set(_data);
        res.send({ id: docRef.id });
    }
    catch (err) {
        console.log(err.message);
        res.send({ msg: "failed" });
    }

})
app.post("/MyUrls", async (req, res) => {
    try {
        const data = req.body;
        const retData = [];
        const urls = await linkDb.where('userId', '==', data.userId).get();
        urls.docs.forEach((doc) => {
            retData.push(doc.data());
            console.log(doc.id, ' => ', doc.data());
        });
        res.send({ url: retData });
    }
    catch (err) {
        res.send({ msg: "failed" });
    }

})

app.listen(9999, () => { console.log(" listen in 9999") });