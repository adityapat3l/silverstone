# Camping App

This project is a Camping App built with React for the frontend and FastAPI for the backend. It allows users to manage camping items, create groups, and facilitate item claiming and purchasing.

## Project Structure

```
camping-app
├── backend
│   ├── app
│   ├── requirements.txt
│   └── README.md
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   └── README.md
├── terraform
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── README.md
└── README.md
```

## Getting Started

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Start the FastAPI server:
   ```
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install the required dependencies:
   ```
   npm install
   ```

3. Start the React application:
   ```
   npm start
   ```

### Terraform

1. Navigate to the terraform directory:
   ```
   cd terraform
   ```

2. Initialize the Terraform configuration:
   ```
   terraform init
   ```

3. Create the infrastructure on AWS:
   ```
   terraform apply
   ```

## Features

- Add items needed for camping.
- Allow users to claim items and mark them as bought.
- Create and manage groups of users.
- Add new people to existing groups.
- Superadmin page for managing users and items.

...existing code...

## Contributing

We welcome contributions! To get started:

1. **Fork** this repository and clone it locally.
2. Create a new branch for your feature or bugfix:
   ```
   git checkout -b my-feature
   ```
3. **Backend**: Add or update Python code in `backend/app`. Run tests with:
   ```
   pytest
   ```
4. **Frontend**: Add or update React code in `frontend/src`. Run tests with:
   ```
   npm test
   ```
5. **Debugging**: Use VS Code's debugging tools or add breakpoints/logging as needed.
6. **Pull Requests**: Push your branch and open a pull request with a clear description of your changes.

### Building & Testing

- **Backend**: Use `uvicorn` for local dev, `pytest` for tests.
- **Frontend**: Use `npm start` for dev, `npm test` for tests, `npm run build` for production.
- **Terraform**: Use `terraform plan` and `terraform apply` to manage infrastructure.

...existing code...