<p align="center">
  <p align="center">
      <img src="/src/bin/assets/images/logo/Logo-White.png" alt="" height="72">
  </p>
  <p align="center">
    HomeMovie
  </p>
</p>

## Descripción

_Es un app-demo para comprar y/o alquilar películas, se puede ingresar como cliente o administrador (con atorización). El cliente una vez registrado y logueado, podrá comprar, rentar, ver su perfil y sus pedidos de compra. El administrador una vez logueado tendrá el control de las películas (ver, modificar, crear, eliminar) y ver los pedidos de compra o renta de los clientes._

## Comenzando 🚀

_Para ver la navegabilidad de este proyecto puedes ingresar al siguiente enlace <https://homemovie.herokuapp.com>._

_Para ejecutar el app de manera local sigue las instrucciones de **Instalación**_

### Pre-requisitos 📋

_Se necesita un editor de código fuente como:_

```
VsCode o Sublime
```

### Instalación 🔧

_Clone or download este repositorio y abrelo en tu editor de código. En un terminal (mac/linux) o terminal de Windows, ejecuta el siguiente comando en el directorio /server y en el directorio /client._

```
npm install
```

_Una vez culminada la instalacón, en el directorio /server puedes correr el proyecto ejecutando este comando._

```
npm start
```

_La consola mostrará el puerto donde está corriendo el servidor._

```
http://localhost:8080
```

## Funcionamiento ⚙️

**Como cliente**

_El iniciar la app, el cliente deberá registrarse si ya está registrado entonces deberá logearse. Solo la primera vez que se registre el cliente no necesitará logearse._

_Una vez logeado el cliente podrá observar la lista de cards de péliculas disponibles. En la parte superior de cada card se mostrará la disponibilidad (compra y/o renta). Al presioinar en un card, este le llevará a otra ruta donde verá más detalles de dicho card además de una lista de botones como: ver trailer, comprar, alquilar, seguir comprando, ir al cart._ 

* _Ver trailer: Abrirá un modal donde se reproducirá el trailer de la película._
* _Compra y Renta: Agregará una unidad (01) de esta película a la lista del Cart. Estó se verá reflejado inmediatamente en la barra de navegación sobre el icono de carrito de compras._
* _Seguir comprando: Llevará al cliente a la lista de películas para seguir comprando/alquilando._
* _Ir al Cart:Llevará al cliente a la ruta del Cart. Donde mostrará la lista de películas agregadas._

_Una vez el cliente termine la selección de películas que desea comprar o alquilar, para continuar con su compra deberá dirigirse al icono de carrito de compras que se encuentra en la barra de navegación. En el carrito podrá ver una tabla con la lista de películas agregadas, y un card con el resumen de su compra mostrando el monto total a pagar por la compra y dos botones: Realizar Pedido y Seguir comprando._

_La tabla del cart está formado por 7 columnas: N°, Descripción, Acción, Tipo, Cantidad/Días, Precio y Subtotal._

* _N°: Posición en la lista del Cart._
* _Descripción: Breve descripción de la película agregada con imagen. Clickeando sobre la descripción de la película le llevará hacia el detalle de película, donde podrá cambiar su opción de compra (compra o renta)._
* _Acción: Un botón para eliminar la película de lista del Cart._
* _Tipo: Mostrará Compra si se seleccionó comprar o Renta si se seleccionó alquilar._
* _Cantidad/Días: Para aumentar la cantidad de unidades de compra, en caso sea una compra, o aumentar la cantidad de días de alquiler, en caso sea una renta. Se puede utilizar los botones +/- para variar el valor, pero también puede digitar dentro de la casilla la cantidad. Tener en cuenta que a la hora de digitar un valor el cliente no podrá comprar una cantidad mayor al stock disponible y tampoco podrá alquilar por más de 30 días._
* _Precio: Valor unitario de compra o valor de alquiler por un día._
* _Subtotal: Valor de la multiplicación del precio unitario por la cantidad a comprar o el número de días de alquiler._

_Una vez conforme el cliente con las películas que desea comprar y alquilar, la cantidad y el tiempo, podrá realizar su pedido de compra presionando sobre el botón 'Realizar pedido'. En esta nueva ruta se muestra se muestra un card con la información personal del cliente y la lista de películas agregadas que apartir de aquí será la orden del cliente y con el total a pagar. Además de dos botones: Seguir comprando y Pagar. En esta instancia el cliente tiene la oportunidad de hacer cambios en su compra regresando al Cart._

_Si el cliente presiona sobre Pagar, al cabo de unos segundos se mostrará un popup que verificará el éxito de su compra. Luego, podrá ir a su perfil y ver sus pedidos. Aquí aparecerá todos los pedidos que haya realizado._

_Finalmente para salir de la aplicación el cliente podrá deslogearse desde su perfil, o en todo caso la sesión se cerrará automatícamente al cabo de 5 minutos. Esto debido a que cada cuenta registrada se le otorgará un Token que expira en este tiempo._

**Como administrador**

_**Se necesita un email y password de administrador**._

_Una vez logeado el administrador podrá ver una tabla con las películas pre-agregadas. Aquí podrá crear otras nuevas, modificar las ya existentes o eliminarlas._

_En la pestaña pedidos, verá otra tabla con el nombre y correo del cliente que ha realizado el pedido y un boton Pedido, que le llevará a otra ruta donde se muestra un card con mayor información del cliente y una tabla con toda la información del pedido: descripción, cantidad/días, precio, subtotal y Total._

_De la misma manera que el cliente, el administrador podrá deslogearse presionando sobre cerrar sesión que se encuentra en la barra de navegación o por otro lado se cerrará su sesión automáticamente en 5 minutos._

## Construido con 🛠️

_En este proyecto se utilizó lo siguiente:_

* Framework: [Angular](https://angular.io/)
* Dependencias: 
    + Backend:
        * [bcryptjs](https://www.npmjs.com/package/bcryptjs/) - Para función de hash de contraseña.
        * [cors](https://www.npmjs.com/package/cors) - Proporciona un middleware para conectar a Express.
        * [express](https://www.npmjs.com/package/express) - Framework para node.
        * [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Para implementar JWT.
        * [mongoose](https://www.npmjs.com/package/mongoose) - Para modelar objetos de MongoDB.
        * [nodemon](https://www.npmjs.com/package/nodemon) - Para monitorear cambios de código.
    
    + Frontend:
        * [jwt-decode](https://www.npmjs.com/package/jwt-decode) - Para decodificar un JWT.
        * [bootstrap-icons](https://icons.getbootstrap.com/) - Para algunos iconos.
        * [rxjs](https://rxjs.dev/) - Librería para manejo de observables.
        * [Angular Material](https://material.angular.io/) - Para los estilos, animaciones y el responsive.
        * [SweetAlert2](https://sweetalert2.github.io/) - Para animaciones con popups.

* Base de Datos: [MongoDB-Atlas](https://www.mongodb.com/es/atlas) - Para la base de datos.

## Autor ✒️

* **Carlos Castillo** - *Desarrollador del Proyecto* - [carloscastillo369](https://github.com/carloscastillo369)