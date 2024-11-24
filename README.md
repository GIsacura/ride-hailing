# Web administrativa para servicio de transporte

Esta es una app web que permite a usuarios poder agregar, editar y eliminar vehículos de una lista, en la cual se puede ver su información mas importante:

- Marca
- Modelo
- Año de fabricación
- Estado actual (Disponible, En servicio o En mantenimiento)

## Installation

### Front end

Instalar quasar cli con npm

```bash
  npm i -g @quasar/cli
```

Instalar dependencias de proyecto

```bash
  cd frontend
  npm install
  quasar dev
```

### Backend

Instalar dependencias de proyecto

```bash
  cd backend
  npm install
  npm run start
```

## Environment Variables

### Frontend

Para correr el proyecto, necesitaras agregar las siguientes variables de entorno al archivo .env

`API_URL` = `http://localhost:4000/api/v1`

### Backend

Para correr el proyecto, necesitaras agregar las siguientes variables de entorno al archivo .env

`PORT`= `4000`
`DB_URL` = `mongodb+srv://admin:7WiCvqZfMOqRMadK@cluster0.srnh6.mongodb.net/`
`JWT_SECRET` = `secret`

## Consideraciones:

- En relación con el requerimiento técnico de la paginación en la lista de vehículos, la paginacion se realiza del lado del frontend, ya que al utilizar los componentes de quasar, en especifico las tablas, las mismas tienen integrada una paginacion que se realiza a partir del total de elementos que se envían por parámetros al componente. Se procedió a utilizar esta paginación para dar una experiencia mas fluida, esto debido a, que en el contexto de la app no se manejan grandes cantidades de datos. De igual manera, pueden observar en el código, que el endpoint correspondiente esta configurado para recibir las query necesarias para realizar la paginación.

- En relación con el requerimiento de los filtros, al igual que en el apartado anterior, se realiza del lado del frontend por la misma razón de el bajo volumen de datos, y ofrecer una experiencia mas fluida al momento de filtrar. De igual manera, si observan el código podrán ver que el endpoint esta configurado para realizar filtrado según la query que se envía.

- En relación con el requerimiento de la autenticación, a pesar de que no es parte del requerimiento, se implemento la posibilidad de crear usuarios no administradores e iniciar sesión con los mismos, para que puedan verificar que no se puedan agregar vehículos ni modificar su estado sin ser un usuario administrador.
