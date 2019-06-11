const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const app = express();
var db = firebase.firestore();
var itemsRef = db.collection('items');

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
    try{
        let querySnapshot = await itemsRef.get();
        res.send(querySnapshot.docs.map(doc => doc.data()));
    }catch(err){
        res.sendStatus(500);
    }
});
app.post('/api/items', async (req, res) => {
    try {
        let querySnapshot = await itemsRef.get();
        let numRecords = querySnapshot.docs.length;
        let item = {
            id: numRecords + 1,
            title: req.body.title,
            path: req.body.path,
            description: req.body.description
        };
        itemsRef.doc(item.id.toString()).set(item);
        res.send(item);
      } catch (error) {
        console.log(error);
        res.sendStatus(600);
      }
});
app.put('/api/items/:id', async (req,res) => {
    try {
        let thisId = req.params.id.toString();
        let item = {
            id: thisId,
            title: req.body.title,
            path: req.body.path, 
            description: req.body.description
        };
        itemsRef.doc(item.id.toString()).set(item);
        res.send(item);
      } catch (error) {
        console.log(error);
        res.sendStatus(600);
      }
});
app.delete('/api/items/:id', async (req,res) => {
    let id = req.params.id.toString();
    var documentToDelete = itemsRef.doc(id);
    try{
        var doc = await documentToDelete.get();
        if(!doc.exists){
            res.status(404).send("was already deleted, something went wrong");
            return;
        }
        else{
            documentToDelete.delete();
            res.sendStatus(200);
            return;
        }
    }catch(err){
        res.status(500).send(err);
    }
});
exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//curl -d '{"title":"Daniel","path":"images/car.jpg"}' -H "Content-Type: application/json" -X POST localhost:5000/api/items
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
