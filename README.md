# React.js and Tailwind CSS Assignment

A comprehensive React application demonstrating modern React patterns, state management, API integration, and responsive design with Tailwind CSS.

## 🚀 Features

- **Component Architecture**: Reusable UI components with proper TypeScript interfaces
- **State Management**: React Context API with useReducer for complex state
- **Custom Hooks**: useLocalStorage, useApi for data fetching and persistence
- **API Integration**: JSONPlaceholder API with fallback mock data
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern React Patterns**: Functional components, hooks, and context providers

## 📁 Project Structure

\`\`\`
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Header.tsx
│   │   └── Loading.tsx
│   ├── features/           # Feature-specific components
│   │   ├── TaskList.tsx
│   │   ├── UserProfile.tsx
│   │   ├── WeatherWidget.tsx
│   │   └── StatsCards.tsx
│   └── pages/              # Page components
│       └── Dashboard.tsx
├── context/                # React context providers
│   ├── TaskContext.tsx
│   └── UserContext.tsx
├── hooks/                  # Custom React hooks
│   ├── useLocalStorage.ts
│   └── useApi.ts
├── api/                    # API integration functions
│   └── userApi.ts
├── utils/                  # Utility functions
│   ├── formatters.ts
│   └── validators.ts
└── App.tsx                 # Main application component
\`\`\`

## 🛠️ Technologies Used

- **React 18** with TypeScript
- **Next.js 15** (App Router)
- **Tailwind CSS** for styling
- **React Context API** for state management
- **Custom Hooks** for reusable logic
- **JSONPlaceholder API** for demo data

## 🎯 Key Concepts Demonstrated

### 1. Component Architecture
- Reusable UI components (Button, Card, Loading)
- Feature-specific components with clear separation of concerns
- Proper TypeScript interfaces and props validation

### 2. State Management
- React Context API for global state
- useReducer for complex state logic
- Local state with useState for component-specific data

### 3. Custom Hooks
- \`useLocalStorage\`: Persistent local storage with React state
- \`useApi\`: Data fetching with loading states and error handling

### 4. API Integration
- RESTful API calls with fetch
- Error handling and fallback data
- Loading states and user feedback

### 5. Responsive Design
- Mobile-first approach with Tailwind CSS
- Flexible grid layouts
- Responsive navigation and components

## 🚀 Getting Started

1. **Clone the repository**
   \`\`\`bash
   git clone [your-repo-url]
   cd react-tailwind-assignment
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to \`http://localhost:3000\`

## 📱 Features Overview

### Task Management
- Add, toggle, and delete tasks
- Filter tasks by status (all, completed, pending)
- Persistent storage using localStorage
- Real-time statistics

### User Profile
- Display user information from API
- Show user posts with error handling
- Responsive profile layout

### Weather Widget
- Search weather by city
- Mock weather data with realistic interface
- Error handling for API failures

### Statistics Dashboard
- Real-time task completion metrics
- Visual statistics cards
- Responsive grid layout

## 🎨 Design System

The application uses a consistent design system built with Tailwind CSS:

- **Colors**: Blue primary, gray neutrals, semantic colors for states
- **Typography**: Consistent font sizes and weights
- **Spacing**: 4px grid system
- **Components**: Reusable button variants, card layouts, form elements

## 🔧 Development Notes

- All components are fully typed with TypeScript
- Error boundaries and loading states are implemented
- Local storage is used for data persistence
- API calls include proper error handling
- Responsive design works on all screen sizes

## 📝 Assignment Requirements Checklist

- ✅ React project setup with Vite and Tailwind CSS
- ✅ Reusable UI components with proper architecture
- ✅ State management using React hooks and Context API
- ✅ Integration with external APIs (JSONPlaceholder)
- ✅ Responsive styling with Tailwind CSS
- ✅ Custom hooks for reusable logic
- ✅ Proper TypeScript implementation
- ✅ Error handling and loading states
- ✅ Local storage for data persistence

## 🚀 Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or GitHub Pages.

For Vercel deployment:
\`\`\`bash
npm run build
vercel --prod
\`\`\`

## 📚 Learning Outcomes

This project demonstrates:
- Modern React development patterns
- Component composition and reusability
- State management best practices
- API integration with error handling
- Responsive web design principles
- TypeScript in React applications
- Custom hooks development
- Performance optimization techniques

---

**Note**: This is a demonstration project for educational purposes. The weather API uses mock data, and the user data comes from JSONPlaceholder API.
\`\`\`
