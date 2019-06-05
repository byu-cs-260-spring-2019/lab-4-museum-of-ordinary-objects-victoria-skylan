# Adding Items

The museum will display items on the front page, but we'll use a separate administrative page to add items.

Let's start building the administrative page.

## Front End HTML

To add items on the front end, edit `admin.html` so it contains this:

```
  <h1>Museum of Ordinary Objects: The Admin Page!</h1>
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add an Item</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="title" placeholder="Title">
        <p></p>
        <select v-model="selected">
          <option disabled value="">Please select one to add</option>
          <option>fix me</option>
          <option>fix me</option>
        </select>
        <button @click="addNewItem">Add Item</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>{{addItem.title}}</h2>
        <img :src="addItem.path" />
      </div>
    </div>
```

Every item in the museum will have two properties -- a title and a photo. So we create one input for entering the title of the object and a dropdown option to select which image it will have associated with it.

We bind the title to a `title` model and the selected option to a `selected` model, for two-way data binding. 

Below this form we have a div that will show the title of the item and the photo of the item that we selected. This will display only after "Add Item" button is clicked.

The CSS to make this look nice is already included for you.

## Front End JavaScript

The HTML page in `admin.html` uses `admin.js` for the Vue code. Let's edit `admin.js` and add the following data:

```
  data: {
    title: "",
    selected:  "",
    addItem: null,
    photos: [
      {name: 'baseball', id: 1, path: 'baseball.jpg'},
      {name: 'car', id: 2, path: 'car.jpg'},
      {name: 'glasses', id: 3, path: 'glasses.jpg'},
      {name: 'paintbrush', id: 4, path: 'paintbrush.jpg'},
      {name: 'pen', id: 5, path: 'pen.jpg'},
      {name: 'scissors', id: 6, path: 'scissors.jpg'},
      {name: 'shovel', id: 7, path: 'shovel.jpg'},
      {name: 'slinky', id: 8, path: 'slinky.jpg'},
    ],
  },
```

and the following methods:

```
  methods: {
    async addNewItem(){
      try {
        let result = await axios.post('/api/items', {
          title: this.title,
          path: this.selected.path
        });
        this.addItem = result.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
```

Once this is done, we post to `/api/items` to create the item in our museum, which includes the title and the path to the photo. We again use `await` here.

Once this is done, we get back a response that contains the item we added, so we store it in `addItem` and use that to display the item on the admin page, showing the user that the addition was successful.


## Back End -- creating items

On the back end, we're going to modify our index.js file to add a POST call to add a new item to the database.
```
// Create a new item in the museum: takes a title and a path to an image.
var db = firebase.firestore();
var itemsRef = db.collection('items');

app.post('/api/items', async (req, res) => {
    try {
        let querySnapshot = await itemsRef.get();
        let numRecords = querySnapshot.docs.length;
        let item = {
            id: numRecords + 1,
            title: req.body.title,
            path: req.body.path
        };
        itemsRef.doc(item.id.toString()).set(item);
        res.send(item);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
});
```

## Testing

You will need to quit and restart the server:

```
node server.js
```

Browse to localhost:5000 and use the admin page to add some items. Turn on the Developer Tools and use the Network tab to monitor what is happening when the items get added. Then use the firebase console to visualize your database and see the data that is inserted.
