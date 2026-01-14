# Bookworm Frontend

Bookworm is a comprehensive digital library platform that allows users to browse, search, and manage their personal book collections. Built with Next.js, it provides a responsive and intuitive interface for discovering and organizing books.

## Features

- **Book Discovery**: Browse and search through a vast collection of books
- **Personal Library**: Add books to your personal reading list
- **Advanced Filtering**: Filter books by genre, rating, and other criteria
- **User Authentication**: Secure login and registration system
- **Book Reviews**: Rate and review books you've read
- **Reading Progress Tracking**: Track your reading progress
- **Responsive Design**: Works seamlessly across all devices
- **Admin Dashboard**: Manage books, users, and content

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Runtime**: React 19.2.3
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **HTTP Client**: Axios
- **UI Components**: Custom components with Tailwind CSS
- **State Management**: React Context API
- **Toast Notifications**: React Hot Toast
- **Charts**: Recharts

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bookworm-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add the following environment variables:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: The base URL for the backend API (e.g., `http://localhost:5000`)

## Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Creates an optimized production build
- `npm run start`: Starts the production server
- `npm run lint`: Runs ESLint to check for code issues

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── admin/           # Admin dashboard pages
│   ├── auth/            # Authentication pages
│   ├── books/           # Book browsing pages
│   ├── my-library/      # Personal library pages
│   ├── tutorials/       # Tutorial pages
│   ├── layout.js        # Root layout
│   └── page.js          # Home page
├── components/          # Reusable UI components
├── context/             # React Context providers
├── lib/                 # Utility functions
└── services/            # API service functions
```

## API Integration

The frontend communicates with the Bookworm backend API. Make sure the backend server is running before starting the frontend.

## Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Set the build command to `npm run build`
3. Set the publish directory to `out`
4. Add environment variables in the Netlify dashboard

### Vercel

1. Import your project into Vercel
2. The build settings will be automatically detected
3. Add environment variables in the project settings

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the ISC License.