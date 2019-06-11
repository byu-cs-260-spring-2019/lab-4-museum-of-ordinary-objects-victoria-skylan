var app = new Vue({
  el: '#admin',
  data: {
    title: "",
    selected:  "",
    selectedDescription: "",
    addItem: null,
    findTitle: "",
    findItem: null,
    items: [],
    photos: [
      {name: 'baseball', id: 1, path: 'images/baseball.jpg'},
      {name: 'car', id: 2, path: 'images/car.jpg'},
      {name: 'glasses', id: 3, path: 'images/glasses.jpg'},
      {name: 'paintbrush', id: 4, path: 'images/paintbrush.jpg'},
      {name: 'pen', id: 5, path: 'images/pen.jpg'},
      {name: 'scissors', id: 6, path: 'images/scissors.jpg'},
      {name: 'shovel', id: 7, path: 'images/shovel.jpg'},
      {name: 'slinky', id: 8, path: 'images/slinky.jpg'},
    ],
  },
  created() {
    this.getItems();
  },
  computed: {
    suggestions() {
      return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    }
  },
  methods: {
    async addNewItem(){
      try {
        var selectedPath = "";
        for (var i = 0 ; i < this.photos.length; i++) {
          if (this.selected == this.photos[i].name) {
            selectedPath = this.photos[i].path;
            break;
          }
        }
        console.log(selectedPath);
        let result = await axios.post('/api/items', {
          title: this.title,
          path: selectedPath, 
          description: this.selectedDescription
        });
        this.addItem = result.data;
        console.log(addItem);
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        let response = await axios.delete("/api/items/" + item.id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        let response = await axios.put("/api/items/" + item.id, {
          title: this.findItem.title,
          path: this.findItem.path,
          description: this.findItem.description
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
});
