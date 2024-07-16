# README
Mini sistema de creditos

- APP creada en Julio de  2024 
- Autor: Giselle Quiceno

## DEPENDENCIES

* Node version
```bash
    v20.14.0
```
* npm version
```bash
    10.7.0
```
* express
```bash
    4.19.2
```
* typescript
```bash
    5.5.3
```
#  DATABASE
* pg postgreSQL 
```bash
    8.12.0
```
* mongodb mongoDB
```bash
    5.9.2
```
* ORM typeORM
```bash
    0.3.20
```

## RUNNING API
* Development environment: /credit-system/backend

- Instalación
```bash
    npm install
```
- Ejecución
```bash
    npm run start

    Server: 3000 
```
* Se debe actualizar los datos del archivo .env con las ubicaciones de las bases de datos, puertos e ingresos de PowerBI, revisar el package.json para mas detalles. 

## ACERCA DE LA APP
* Aplicacion bajo patrón MVC (se refiere a modelo-vista-controlador en este caso se representa como: 
modelo = src/entities, vista = public/views, /src/controllers = controller).
* Base de datos relacional:
- User: registro y autenticacion de usuarios (tipos user y admin).
- Credit: Informacion para aplicar a creditos. 
- CreditUser: relacion muchos a muchos de usuarios y creditos. 
* Base de datos no relacional:
- colleccion llamada plan en donde se guarda la amortizacion en el momento de solicitar un credito en caso de resultar aprobado. 
* Uso de ORM para para interactuar con ambas bases de datos. 
* la Aplicacion permite el registro y la autenticacion de usuarios usando JWT y encriptacion SHA256 para la contraseñas. 
* Para los usuarios la aplicacion permite crear y ver los creditos aplicados por usuario logueado. 
* Para los administradores la aplicacion permite ver y cambiar el estado de todos los creditos solicitados. 

# Rutas
* Backend
```bash
    post /auth/login
    post /auth/register

    post /credit/assessment
    get /credit/credits
    put /credits/cancel/:credit_id
    get /credit/credituser

    get /dashboard
``` 
* Interfaces
```bash
    get /login
    get /register
    get /home

    get /login-admin
    get /register-admin
    get /home-admin

    get /dashboard
``` 