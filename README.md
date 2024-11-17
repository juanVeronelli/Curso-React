# E-commerce

# summary
This app is an e-commerce clothing store, which has 3 categories: men, women and jewelry. Each one has its respective products and filters, except for jewelry, which does not contain filters due to its low variation in elements. The database used was Google's Firebase to make requests and load product orders.

I used Link, BrowseRouter, Routes, Route and created one more file called routes.jsx to redirect all the links in my application

For the filters I used a hook called useLocation since it allowed me to pass queries that are not parameters through the URL and another important hook was the useContext for the cart logic

In the purchase form I included inputs for the name, email and city adding a logic to detect if the cart is empty or if not all the data was entered

Also, I added the logic of the sizes for the elements directly to the database and I did not create the logic in the code because it seemed much more efficient to add the sizes directly to the products and not assign them randomly, in the same way to add the sizes I had to create a script that added them, I share the code I used for it:

```javascript
onst admin = require('firebase-admin');
const serviceAccount = require('./e-commerce-34350-firebase-adminsdk-et9ok-09a7a6fae5.json'); // Ruta al archivo de clave de servicio de Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://e-commerce-34350.firestore.com' 
});

const firestore = admin.firestore();

const collectionRef = firestore.collection('PRODUCTS');

collectionRef
  .get()
  .then((snapshot) => {
    const updates = [];
    
    snapshot.forEach((doc) => {
      // Genero los números aleatorios entre 0 y 10
      const s = Math.floor(Math.random() * 11);
      const m = Math.floor(Math.random() * 11);
      const l = Math.floor(Math.random() * 11);
      const xl = Math.floor(Math.random() * 11);
      const xxl = Math.floor(Math.random() * 11);

      // Actualizo el documento con el campo adicional de tipo mapa
      updates.push(doc.ref.update({ tallas: { S: s, M: m, L: l, XL: xl, XXL: xxl } }));
    });

    // Ejecuto todas las actualizaciones en paralelo
    return Promise.all(updates);
  })
  .then(() => {
    console.log('Los documentos se han actualizado correctamente.');
    process.exit();
  })
  .catch((error) => {
    console.error('Error al actualizar los documentos:', error);
    process.exit(1);
  });

```

asi de esta forma logre añadir a todos los productos los talles.

# Para ejecutar

```javascript
npm install --save
npm run dev
```
