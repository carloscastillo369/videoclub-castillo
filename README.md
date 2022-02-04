<p align="center">
  <p align="center">
    <img src="/images/logo.JPG" alt="" height="92">
  </p>
  <h1 align="center">
    HomeMovie
  </h1>
</p>

## Descripción

_Es un app para alquilar películas, se puede ingresar como cliente o administrador (con atorización). El cliente una vez registrado y logueado, podrá alquilar películas, ver su perfil y sus pedidos de compra. El administrador una vez logueado tendrá el control de las películas (ver, modificar, crear, eliminar) y ver los pedidos de alquiler de los clientes._

## Demo

**Como Cliente**

![client](https://user-images.githubusercontent.com/69721075/152480786-a232eb39-d1d9-4ab1-b3a8-0c09487566ca.gif)

**Como Administrador**

![admin](https://user-images.githubusercontent.com/69721075/152481041-3f1ff8cb-094a-4816-af2f-52f07a7db95a.gif)

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

_Una vez culminada la instalacón, en el directorio /server puedes correr el proyecto ejecutando el siguiente comando._

```
npm start
```

_La consola mostrará el puerto donde está corriendo el proyecto._

```
http://localhost:8080
```

_Cualquier cambio realizado en el frontend y ver reflejado dichos cambios en el puerto donde corre el proyecto, deberá ejecutarse en el directorio /client el siguiente comando._

```
ng build
```

## Funcionamiento ⚙️

**COMO CLIENTE**

<p align="center">
  <p align="center">
    <img src="/images/homepage.JPG" alt="" height="372">
  </p>
  <p align="center">
    Página de inicio
  </p>
</p>

_Al iniciar la app, se mostrará la pagína de inicio, donde hay un botón para iniciar sesión <img src="/images/buttonsignin.JPG" alt="" height="20"> y otro para registrarse <img src="/images/buttonsignup.JPG" alt="" height="20">._

<p align="center">
  <p align="center">
    <img src="/images/signinpage.JPG" alt="" height="372">
  </p>
  <p align="center">
    Página iniciar sesión
  </p>
</p>

_Si cuenta con un registro entonces podrá logearse._

<p align="center">
  <p align="center">
    <img src="/images/signuppage.JPG" alt="" height="372">
  </p>
  <p align="center">
    Página de registrarse
  </p>
</p>

_Sino deberá registrarse._

<p align="center">
  <p align="center">
    <img src="/images/listmoviespage.JPG" alt="" height="372">
  </p>
  <p align="center">
    Página lista de películas
  </p>
</p>

_Una vez logeado el cliente podrá observar una lista de cards de péliculas disponibles._  

<p align="center">
  <p align="center">
      <img src="/images/cardmovie.JPG" alt="" height="272">
  </p>
  <p align="center">
    Card de una película
  </p>
</p>

_En la parte superior de cada card se mostrará la cantidad de disponibilidad._ 

<p align="center">
  <p align="center">
      <img src="/images/detailmoviepage.JPG" alt="" height="372">
  </p>
  <p align="center">
    Página detalle de película
  </p>
</p>

<p align="center">
  <p align="center">
      <img src="/images/buttonsfunction.JPG" alt="" height="272">
  </p>
  <p align="center">
    Lista de botones
  </p>
</p>

_Al presionar sobre un card de película, este le llevará a otra ruta donde verá más detalles de dicha película, además de una lista de botones como: ver trailer, alquilar, seguir comprando e ir al carrito de compras._ 

* _Ver trailer: Abrirá un modal donde se reproducirá el trailer de la película._

<p align="center">
  <p align="center">
      <img src="/images/addmoviemodal.JPG" alt="" height="372">
  </p>
  <p align="center">
    Modal para agregar película
  </p>
</p>

* _Alquilar: Abrirá un modal donde el cliente podrá aumentar o disminuir la cantidad de días de alquiler. Esto lo puede realizar mediante los botones +/- o ingresando por teclado la cantidad deseada (el número mínimo de días es 01 y el máximo es 30). Una vez presione el botón 'Agregar', se agregará esta película a la lista del Cart. Estó se verá reflejado inmediatamente en la barra de navegación sobre el icono de carrito de compras <img src="/images/cartwidget.JPG" alt="" height="30">, además el botón de alquiler cambiará a un mensaje 'Ya has agregado esta película' <img src="/images/addedmovie.JPG" alt="" height="30">_
* _Seguir comprando: Llevará al cliente a la lista de películas para seguir alquilando._
* _Ir al carrito: Llevará al cliente a la ruta del carrito de compras, donde podrá observar la lista de películas agregadas._

_Una vez el cliente termine la selección de películas que desea alquilar, para continuar con su compra deberá dirigirse al icono de carrito de compras que se encuentra en la barra de navegación <img src="/images/cartwidget.JPG" alt="" height="30">._

<p align="center">
  <p align="center">
      <img src="/images/cartpage.JPG" alt="" height="372">
  </p>
  <p align="center">
    Página del carrito de compras
  </p>
</p>

_Ya en el carrito podrá ver una tabla con la lista de películas agregadas, y un card con el resumen de su compra mostrando el monto total a pagar por la compra y dos botones: Realizar Pedido y Seguir comprando._

_La tabla del cart está formado por 6 columnas: N°, Descripción, Acción, Días, Precio y Subtotal._

* _N°: Posición en la lista del Cart._
* _Descripción: Breve descripción de la película agregada con imagen. Clickeando sobre la descripción de la película le llevará hacia el detalle de película._
* _Acción: Un botón para eliminar la película de lista del Cart <img src="/images/buttondelete.JPG" alt="" height="30">._
* _Días: Para aumentar la cantidad de días de alquiler. Se puede utilizar los botones +/- o digitar dentro de la casilla la cantidad. El número mínimo de días es 01 y el máximo es 30 <img src="/images/changedays.JPG" alt="" height="30">._
* _Precio: Valor unitario de alquiler por un día._
* _Subtotal: Valor de la multiplicación del precio unitario por la cantidad de días de alquiler._
* _Vaciar Carrito: Este botón removerá todo el carrito <img src="/images/buttonremove.JPG" alt="" height="30">._

_Una vez conforme el cliente con las películas que desea alquilar y el tiempo, podrá realizar su pedido de compra presionando sobre el botón 'Realizar pedido' <img src="/images/buttongocheckout.JPG" alt="" height="30">, esto lo llevará a la ruta del checkout._ 

<p align="center">
  <p align="center">
      <img src="/images/checkoutpage.JPG" alt="" height="372">
  </p>
  <p align="center">
    Página del checkout
  </p>
</p>

_En el checkout se muestra un card con la información personal del cliente (nombre, email, dirección, teléfono) y la lista de películas agregadas, que apartir de aquí será la orden del cliente y con el total a pagar. Además de dos botones: Seguir comprando y Pagar. En esta instancia el cliente tiene la oportunidad de hacer cambios en su compra regresando al carrito o la lista de películas para agregar otras._

<p align="center">
  <p align="center">
      <img src="/images/procesandocompra.JPG" alt="" height="372">
  </p>
  <p align="center">
    Notificación procesando compra
  </p>
</p>

<p align="center">
  <p align="center">
      <img src="/images/successbuy.JPG" alt="" height="372">
  </p>
  <p align="center">
    Notificación compra exitosa
  </p>
</p>

_Si el cliente presiona sobre el botón 'Pagar' <img src="/images/buttonpay.JPG" alt="" height="30">, al cabo de unos segundos se mostrará una notificación que verificará el éxito de su compra._

<p align="center">
  <p align="center">
      <img src="/images/myorderspage.JPG" alt="" height="372">
  </p>
  <p align="center">
    Mis pedidos
  </p>
</p>

_Luego, podrá ir a su perfil <img src="/images/perfil.JPG" alt="" height="30"> y ver sus pedidos. Aquí aparecerá todos los pedidos que haya realizado._

_Finalmente para salir de la aplicación el cliente podrá deslogearse desde su perfil, o en todo caso la sesión se cerrará automatícamente al cabo de 8 horas. Esto debido a que cada cuenta registrada se le otorgará un Token que expira en este tiempo._

_Como dato adicional: Si dos o más usuarios adquieren una misma película al mismo tiempo y la disponibilidad es de solo 01, al app está diseñada para evitar que se agregue o se compre, si el stock de una película ya no está disponible._

**COMO ADMINISTRADOR**

_**Se necesita un email y password de administrador**._

<p align="center">
  <p align="center">
      <img src="/images/adminmoviespage.JPG" alt="" height="372">
  </p>
  <p align="center">
    Lista de películas
  </p>
</p>

<p align="center">
  <p align="center">
      <img src="/images/adminaddmovie.JPG" alt="" height="372">
  </p>
  <p align="center">
    Agregar nueva película
  </p>
</p>

<p align="center">
  <p align="center">
      <img src="/images/adminupdatemovie.JPG" alt="" height="372">
  </p>
  <p align="center">
    Actualizar película
  </p>
</p>

_Una vez logeado el administrador podrá ver una tabla con las películas pre-agregadas en la base de datos. Aquí podrá crear otras nuevas, modificar las ya existentes o eliminarlas._

<p align="center">
  <p align="center">
      <img src="/images/adminorderspage.JPG" alt="" height="372">
  </p>
  <p align="center">
    Lista de pedidos
  </p>
</p>

<p align="center">
  <p align="center">
      <img src="/images/adminorderdetail.JPG" alt="" height="372">
  </p>
  <p align="center">
    Detalle del pedido
  </p>
</p>

_En la pestaña pedidos, verá otra tabla con el nombre y correo del cliente que ha realizado el pedido y un botón 'Pedidos', que le llevará a otra ruta donde se muestra un card con mayor información del cliente y una tabla con toda la información del pedido: descripción, días de alquiler, precio, subtotal y Total._

_De la misma manera que el cliente, el administrador podrá deslogearse presionando sobre cerrar sesión que se encuentra en la barra de navegación o por otro lado se cerrará su sesión automáticamente en 8 horas, tiempo en que expira el Token._

## Construido con 🛠️

_En este proyecto se utilizó lo siguiente:_

* Framework: [Angular](https://angular.io/)
* Base de Datos: [MongoDB-Atlas](https://www.mongodb.com/es/atlas)
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

## Autor ✒️

* **Carlos Castillo** - *Desarrollador del Proyecto* - [carloscastillo369](https://github.com/carloscastillo369)