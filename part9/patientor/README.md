# Patientor

## [Patientor frontend](https://fullstackopen.com/en/part9/patientor/patientor-frontend)

### Getting started
  - To get the app running just install its dependencies with ```npm install``` and run it with ```npm run dev```.
  - The app should work without a backend, but make sure that the request made to ```/api/ping``` made on startup is successful before continuing.

## [Patientor backend](https://fullstackopen.com/en/part9/patientor/patientor-backend)

### Getting started
 - To get the app running just install its dependencies with ```npm install``` and run it with ```npm run dev```.


 Pasos para tipar una app Express

 - Crear la carpeta data
 -- Carpeta con los datos en formato json pasados a variables exportadas como data en TS.

 - Crear los tipos en types.ts
 -- Se crea un archivo llamado types.ts donde
 --- Se define el tipo de dato Enum
 --- Se define el tipo de dato como interfaz 
 ---- Se definen tambien nuevos tipos de datos con Omit para no mostrarlo o Pick para mostrar ciertos datos.
 ---- Para interfaces que requieran la adicion de un registro se evita el id por medio de Omit.
 ---- Enums, e interfaces se exportan siempre

 - Crear los utils en utils.ts
 -- Utils es la manera de asegurar que el dato ingresado corresponda con el tipo de dato de una interfaz.
 --- Utils depende de tipos, hay que importar los tipos
 --- Si un dato es primitivo, se realiza una funcion de validacion de tipo booleano. Ejm isString
 --- Luego se crea un parsing por cada entrada segun su tipo de dato definido. Ejm parseString
 --- Si un dato de tipo Enum, se realiza una funcion de validacion que mapea el Enum y retorna el valor a partir de la llave. Ej. isGender
 --- Luego se crea un parsing para el Enum.
 -- Finalmente se crea una funcion que toma todos los campos correspondientes al objeto y que van a ser parseados es decir, validar si son 
    correctos o no. Ej. toNewPatientEntry la cual vamos a usar en servicios y rutas

 -  Creacion de los servicios
 -- Se crea un directorio llamado services
 -- Se importa la data, Ejm. patientsData viene de patients.ts
 -- Se importan los tipos de interfaces que se requieren, types.ts
 -- Se importa utils para usar toNewPatientEntry y validar registros, utils.ts
 --- Se mapea los datos provenientes de patientsData y se asegura que los datos correspondan con su tipo con toNewPatientEntry
 --- Se obtienen las entradas a partir de lo mapeado en el array llamado patients
 --- Se define una funcionalidad getNonSensitiveEntries que a partir de la interfaz  NonSensitivePatientEntry excluye datos sensibles como   el SSN
 --- Con addPatient se agrega un nuevo registro, un objeto por medio de push en el array de patients
 --- Se exportan las funciones que se van a implementar en los controladores del directorio routes.

 - Creacion de las rutas routes
 -- Se crea un directorio llamado routes
 -- Se importa libreria express
 -- Se importa el archivo de servicios patientService.ts
 -- Se importa el archivo de utils para trabajar con la funcion que valida el objeto
 -- Se importa UUID, un helper que permite obtener IDs randoms y dinamicos
 -- En el metodo GET para obtener todos los registros de patients sin info sensible patientService.getNonSensitiveEntries()
 -- En el metodo POST creamos un registro a partir del servicio  const addedPatient = patientService.addPatient(newPatientEntry, uuid()); se gestiona con try catch en caso de errores.

 - Creacion del archivo index.ts
 -- Importar libreria express
 -- Importar libreria cors
 -- Importar request/response
 -- Importar routes, ej. import patientsRouter from './routes/patients';
 -- Crear app por medio de express
 -- Implementar middlewares CORS y express.json por medio de USE
 -- Definir un GET de prueba para hacer ping y comunicar el back con front
 -- Por medio de app.use traemos los endpoints correspondientes de cada ruta app.use('/api/patients', patientsRouter);
 -- Definir el puerto PORT=3000. Debe coincidir con el puerto del front
 -- Finalmente app.listen para escuchar el puerto.
 -- npm run dev o npm run start para ejecutar la app Express.

En Front tener presente que:
-- Hay un archivo constants.ts o env que contiene la base URL api apuntando a apiBaseUrl = 'http://localhost:3000/api';
-- La configuracion de vite se debe configurar el proxy, cuyo target es la url de la app express target: 'http://localhost:3000'

