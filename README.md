# ELTS School of English - Frontend

## Overview
This is the frontend application for the ELTS (English Language Teaching System) School of English. Built with React and Ant Design, it provides a modern and intuitive interface for managing an English language school's operations.

## Features
- 🎨 Modern, Responsive UI with Ant Design
- 📊 Interactive Dashboard
- 👥 User Management
- 📚 Course Management
- 📝 Enrollment System
- 💰 Revenue Tracking
- 🌓 Light/Dark Theme Support
- 📱 Mobile-Friendly Design

## Tech Stack
- **Framework**: React 18
- **UI Library**: Ant Design 5
- **State Management**: React Context
- **Routing**: React Router 6
- **HTTP Client**: Axios
- **Charts**: Ant Design Charts

## Prerequisites
- Node.js 16+
- Yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd elts-frontend
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:8000/api
```

## Running the Application

Start the development server:
```bash
yarn start
```

The application will be available at `http://localhost:3000`

## Building for Production

Create a production build:
```bash
yarn build
```

## Main Features

### Dashboard
- Overview of key metrics
- Quick action buttons
- Revenue statistics
- Active enrollments tracking

### Student Management
- View all students
- Add/Edit/Delete students
- Filter and search functionality
- Student details view

### Teacher Management
- Teacher directory
- Specialization tracking
- Performance metrics
- Schedule management

### Course Management
- Course catalog
- Course creation and editing
- Student enrollment
- Course statistics

### Enrollment System
- Easy enrollment process
- Payment status tracking
- Enrollment history
- Batch operations

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Main application pages
├── services/       # API and other services
├── context/        # React context providers
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── assets/         # Static assets
└── theme/          # Theme configuration
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.\
The build is minified and optimized for the best performance.

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Implement proper error handling
- Write meaningful component and function names
- Add comments for complex logic

### State Management
- Use React Context for global state
- Keep component state local when possible
- Implement proper loading and error states
- Handle API responses consistently

### Component Structure
- Keep components small and focused
- Implement proper prop validation
- Use TypeScript for better type safety
- Follow the container/presenter pattern

### Styling
- Use Ant Design components when possible
- Follow the design system guidelines
- Implement responsive design
- Keep custom CSS minimal

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
