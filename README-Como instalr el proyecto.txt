paso 1: instalar el node modules
Luego de descargar el proyecto en GitHub, abrimos el folder en visual studio, luego abrir un nuevo terminal y usar el command prompt, luego ingresar a la ruta del proyecto la cual debe ser "\JS_FINAL\JS_FINAL\JS_CASIFINAL\Proyecto_JS2_remastered\grupo1"
luego colocar el comando "npm install json-server" y se enpezara a instalar el node modules

paso 2: arrancar el json server
en otra terminal con command prompt colocar "npm run server" para abrir los endpoints de todas las clases

paso 3: arrancar el servidor 
en otra terminal con command prompt colocar "npm run dev" para que arranque el proyecto en cualquier navegador de la pc

paso 4: verificar la pagina del proyecto
en cualquier navegador ingresar al local host que nos deje el comando "npm run dev", nos aparecera la ventana del login, ingresar los datos de usuario que se encuentran en "db.json" del proyecto, los cuales son
"usuarios": [
    {
      "id": "1",
      "usuario": "admin",
      "contraseña": "123",
      "nombre": "Administrador",
      "rol": "admin"
    },
    {
      "id": "2",
      "usuario": "vendedor",
      "contraseña": "abc",
      "nombre": "Juan Perez",
      "rol": "user"
    }
  ]

leugo se visualizara el proyecto con json y las demás funcionalidades