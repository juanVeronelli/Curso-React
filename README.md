# E-commerce con CoderHouse

# resumen
Esta app es un e-commerce de ropa, que cuenta con 3 categorias, hombre, mujer y joyeria. Cada una tiene sus respectivos productos y sus filtros exepto jewlery que no conteine filtrado debido a su poca variacion de elementos, la base de datos utilizada fue firebase de google para hacer las peticiones y cargar las ordenes de los productos.

utilize Link, BrowseRouter, Routes, Route y cree un archivo mas que es routes.jsx para redireccionar todos los links de mi aplicacion

para los filtros use un hook useLocation ya que me permitia pasarle querys que no sean parametros a traves de las url y otro hook importante fue el useContext para la logica del carrtio

en el formulario de la compra incluí inputs para el nombre, email y ciudad agregando una logica para detectar si el carrito esta vacio o si no se ingresaron todos los datos 

ademas la logica de los talles para los elementos lo agregue directamente a la base de datos y no cree la logica en el codigo debido a que me parecio mucho mas eficiente agregar los talles directamente a los productos y no asignarlos aleatoriamente, de igual forma para agregar los talles tuve que crear un script que añadiera los mismos, comparto el codigo que utilice para ello:

```javascript
onst admin = require('firebase-admin');
const serviceAccount = require('./e-commerce-34350-firebase-adminsdk-et9ok-09a7a6fae5.json'); // Ruta al archivo de clave de servicio de Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://e-commerce-34350.firestore.com' // url proyecto de firebase 
});

const firestore = admin.firestore();

const collectionRef = firestore.collection('PRODUCTS');

collectionRef
  .get()
  .then((snapshot) => {
    const updates = [];
    
    snapshot.forEach((doc) => {
      // Genera los números aleatorios entre 0 y 10
      const s = Math.floor(Math.random() * 11);
      const m = Math.floor(Math.random() * 11);
      const l = Math.floor(Math.random() * 11);
      const xl = Math.floor(Math.random() * 11);
      const xxl = Math.floor(Math.random() * 11);

      // Actualiza el documento con el campo adicional de tipo mapa
      updates.push(doc.ref.update({ tallas: { S: s, M: m, L: l, XL: xl, XXL: xxl } }));
    });

    // Ejecuta todas las actualizaciones en paralelo
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
