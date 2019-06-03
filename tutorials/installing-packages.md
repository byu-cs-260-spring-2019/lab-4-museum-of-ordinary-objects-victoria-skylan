# Installing Packages

Let's first setup firebase and install needed packages:

```
firebase init
select options for "Firestore", "Functions" and "Hosting"
select the project you want it to be tied to
leaving everything default until it asks about ESLint - type N
Install dependencies with npm now? Y
overwrite index.html N
```
After the firebase init is done, run 
```
npm install express
```

We'll be using an Express app deployed to Firebase for the REST API. 

We should now be able to run the application. 
```
firebase serve
```

This will start on port 5000, and you can browse to localhost:5000.

You should see the a styled home page with "Museum of Ordinary Objects" with a link to the Admin page below.  If you click on the link, it will take you to an almost blank Admin page.  
