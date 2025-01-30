# Administrative Web App for Transportation Service

This is a web app that allows users to add, edit, and delete vehicles from a list, where they can view the most important information:

- Brand
- Model
- Year of manufacture
- Current status (Available, In Service, or Under Maintenance)

## Installation

### Frontend

Install Quasar CLI with npm

```bash
npm i -g @quasar/cli
```

Install project dependencies

```bash
cd frontend
npm install
quasar dev
```

### Backend

Install project dependencies

```bash
cd backend
npm install
npm run start
```

## Environment Variables

### Frontend

To run the project, you need to add the following environment variables to the `.env` file:

`API_URL` = `http://localhost:4000/api/v1`

### Backend

To run the project, you need to add the following environment variables to the `.env` file:

`PORT`= `4000`  
`DB_URL` = `mongodb+srv://admin:7WiCvqZfMOqRMadK@cluster0.srnh6.mongodb.net/`  
`JWT_SECRET` = `secret`

## Considerations:

- Regarding the technical requirement for pagination in the vehicle list, pagination is handled on the frontend. This is because Quasar components, specifically tables, come with built-in pagination that works based on the total number of items passed as parameters. This approach was chosen to provide a smoother experience, given that the app does not handle large amounts of data. However, you can see in the code that the corresponding endpoint is configured to receive the necessary queries for backend pagination.

- Regarding the filtering requirement, similar to the previous point, filtering is also handled on the frontend due to the low data volume, ensuring a smoother filtering experience. However, if you check the code, you will see that the endpoint is configured to filter based on the received query.

- Regarding the authentication requirement, even though it was not part of the original specifications, the ability to create non-administrator users and log in with them was implemented. This allows verification that vehicles cannot be added or their status modified without being an administrator user.
