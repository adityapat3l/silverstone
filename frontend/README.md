# Camping App Frontend README

# Camping App Frontend

This is the frontend part of the Camping App, built with React and TypeScript. The application allows users to manage camping items, groups, and superadmin functionalities.

## Features

- Add items needed for camping
- Allow others to claim items and mark them as bought
- Add new people to groups
- Create and manage groups
- Superadmin page for managing the application

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the React application, run:
```
npm start
```

This will start the development server and open the application in your default web browser.

## Project Structure

```
frontend
├── public
│   └── index.html
├── src
│   ├── App.tsx
│   ├── index.tsx
│   ├── components
│   │   ├── ItemList.tsx
│   │   ├── GroupList.tsx
│   │   ├── AddItemForm.tsx
│   │   ├── AddPersonForm.tsx
│   │   ├── SuperAdminPage.tsx
│   │   └── ClaimItemButton.tsx
│   └── types
│       └── index.ts
├── package.json
└── tsconfig.json
```

## Contributing

If you would like to contribute to the project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.