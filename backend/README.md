# Camping App Backend

This is the backend for the Camping App, built using FastAPI and SQLAlchemy. The backend provides API endpoints for managing camping items, groups, and users, as well as superadmin functionalities.

## Setup Instructions

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Installation
1. Navigate to the backend directory:
   ```
   cd camping-app/backend
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

### Running the Application
To start the FastAPI server, run the following command:
```
uvicorn app.main:app --reload
```
The server will be running at `http://127.0.0.1:8000`.

### API Endpoints
- **Items**
  - Add items
  - Claim items
  - Mark items as bought

- **Groups**
  - Create and manage groups

- **Users**
  - Add new users to groups

- **Superadmin**
  - Access superadmin functionalities

## Directory Structure
- `app/main.py`: Entry point of the application.
- `app/models.py`: Database models for items, users, and groups.
- `app/schemas.py`: Pydantic schemas for data validation.
- `app/crud.py`: CRUD operations for items, users, and groups.
- `app/api/`: Contains API route definitions.
- `app/database.py`: Database connection and session management.

## Testing
You can test the API endpoints using tools like Postman or curl.

## License
This project is licensed under the MIT License.