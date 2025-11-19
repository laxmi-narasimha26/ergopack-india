# ErgoAdmin - CMS Admin Panel

A comprehensive React-based admin dashboard for the Ergopack India Headless CMS. This application provides a complete interface for managing products, blog posts, pages, form submissions, and site settings.

## Features

### Core Features
- **User Authentication** - Secure login with JWT tokens
- **Dashboard** - Overview with stats and recent activities
- **Product Management** - Create, edit, and manage products with specifications
- **Blog System** - Create and publish blog posts
- **Page Builder** - Drag-and-drop page builder for creating landing pages
- **Form Submissions** - Manage and track form leads
- **SEO Management** - Configure site-wide SEO settings
- **User Management** - Manage admin users and roles (coming soon)

### Technical Features
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Real-time Updates** - Instant feedback for all actions
- **State Management** - Zustand for efficient state handling
- **Type Safety** - Full TypeScript support
- **API Integration** - Axios with auth interceptors
- **Form Validation** - react-hook-form for robust form handling
- **Charts & Analytics** - Recharts for data visualization
- **Toast Notifications** - react-hot-toast for user feedback

## Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **React Router** 6.21.2 - Client-side routing
- **TypeScript** 5.3.3 - Type-safe development
- **Tailwind CSS** 3.4.1 - Utility-first CSS framework
- **Vite** 5.0.11 - Fast build tool

### State Management & Forms
- **Zustand** 4.5.0 - Lightweight state management
- **react-hook-form** 7.49.3 - Performant form handling
- **react-beautiful-dnd** 13.1.1 - Drag and drop support

### UI & Visualization
- **Lucide React** 0.378.0 - Icon library
- **Recharts** 2.10.3 - Data visualization
- **react-hot-toast** 2.4.1 - Toast notifications

### API & Utilities
- **Axios** 1.6.5 - HTTP client
- **Editor.js** 2.29.0 - Rich text editor

## Installation

### Prerequisites
- Node.js 16+ and npm/yarn
- Backend CMS API running

### Setup Steps

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment variables**
```bash
cp .env.example .env
```

Update `.env` with your backend API URL:
```
VITE_API_URL=http://localhost:8000/api
```

3. **Start development server**
```bash
npm run dev
```

The admin panel will be available at `http://localhost:5173`

### Build for production
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Project Structure

```
admin/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Layout.tsx       # Main layout with header & sidebar
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   └── PrivateRoute.tsx # Route protection wrapper
│   ├── pages/               # Page components
│   │   ├── Login.tsx        # Login page
│   │   ├── Dashboard.tsx    # Dashboard with stats
│   │   ├── Products/        # Product management
│   │   ├── Blog/            # Blog post management
│   │   ├── Pages/           # Page builder
│   │   ├── Leads/           # Form submissions
│   │   └── ...              # Other pages
│   ├── services/            # API service layer
│   │   ├── api.ts           # Axios instance with interceptors
│   │   └── auth.ts          # Authentication methods
│   ├── stores/              # Zustand stores
│   │   └── authStore.ts     # Auth state management
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # All app types
│   ├── utils/               # Utility functions
│   │   └── auth.ts          # Token & user storage
│   ├── styles/              # Global styles
│   │   └── index.css        # Tailwind setup & globals
│   ├── App.tsx              # Root component with routing
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── index.html               # HTML entry point
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## Key Components

### Layout System
- **Layout** - Main layout wrapper with sidebar and header
- **Sidebar** - Navigation menu with collapsible submenus
- **PrivateRoute** - Protected route wrapper requiring authentication

### Authentication
- **Login Page** - Email/password authentication
- **Auth Store** - Zustand store managing user state and tokens
- **Auth Service** - API methods for login, logout, verification
- **Auth Interceptor** - Automatic token injection and 401 handling

### Features

#### Products
- List view with search and pagination
- Create/edit form with:
  - Basic info (name, slug, price)
  - Features array
  - JSONB specifications
  - Gallery IDs
  - Status management

#### Blog
- List view with date sorting
- Create/edit posts with:
  - Title, slug, content
  - Featured image support
  - SEO excerpt
  - Draft/published status

#### Page Builder
- Drag-and-drop component reordering
- Component types:
  - Hero Section
  - Text Block
  - Gallery
  - Form
  - Call to Action
  - Features
  - Testimonials

#### Leads Management
- Form submission tracking
- Status filtering (new, read, replied)
- Submission details modal
- Date and IP address logging

## API Integration

### Base Configuration
- Base URL from `VITE_API_URL` environment variable
- Automatic Bearer token injection
- 401 redirect on token expiration
- Error handling and logging

### Endpoints Used

#### Authentication
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user
- `POST /auth/logout` - User logout
- `GET /auth/verify` - Verify token

#### Products
- `GET /products` - List products
- `GET /products/:id` - Get single product
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

#### Blog
- `GET /blog/posts` - List posts
- `GET /blog/posts/:id` - Get single post
- `POST /blog/posts` - Create post
- `PUT /blog/posts/:id` - Update post
- `DELETE /blog/posts/:id` - Delete post

#### Pages
- `GET /pages` - List pages
- `GET /pages/:id` - Get single page
- `POST /pages` - Create page
- `PUT /pages/:id` - Update page
- `DELETE /pages/:id` - Delete page

#### Forms
- `GET /forms/submissions` - List submissions
- `GET /forms/submissions/:id` - Get submission
- `PATCH /forms/submissions/:id` - Update submission status
- `DELETE /forms/submissions/:id` - Delete submission

#### Dashboard
- `GET /dashboard/stats` - Get dashboard statistics

## Styling

### Tailwind CSS
- Utility-first approach for all styling
- Responsive design with mobile-first breakpoints
- Custom color scheme with blue, green, red, and amber
- Consistent spacing and typography

### Global Styles
- Smooth scrolling
- Custom scrollbar styling
- Global animations (fadeIn, slideUp)
- Form element consistency
- Code block styling

## Form Handling

### react-hook-form Integration
- Efficient form state management
- Built-in validation
- Minimal re-renders
- Field-level error handling

### Validation Examples
```typescript
register('email', {
  required: 'Email is required',
  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }
})
```

## State Management

### Zustand Auth Store
```typescript
const { user, token, login, logout, isLoading, error } = useAuthStore();

// Automatic persistence to localStorage
// Error handling and async operations
// Automatic token verification on init
```

### Local Component State
- React hooks for simple state
- Form state via react-hook-form
- Toast notifications for feedback

## Development Workflow

### Scripts
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

### Hot Module Replacement (HMR)
- Automatic page reload on file changes
- Preserves component state during development

### Type Checking
- TypeScript compilation on build
- Type-safe component props
- Full autocomplete support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading of routes
- Optimized re-renders with Zustand
- Efficient form handling with react-hook-form
- Debounced search queries
- Image optimization recommendations

## Security

### Authentication
- JWT token-based auth
- Secure token storage
- Automatic token refresh on 401
- Logout clears all auth data

### Data Protection
- HTTPS in production (enforced by .env)
- XSS prevention via React escaping
- CSRF protection via API design
- Input validation on forms

### Best Practices
- Never store sensitive data in localStorage
- Use environment variables for API URLs
- Validate all user inputs
- Implement proper error handling

## Troubleshooting

### Common Issues

**Build fails with "module not found"**
```bash
npm install
npm run build
```

**API connection errors**
- Check `VITE_API_URL` in .env
- Ensure backend server is running
- Check CORS settings on backend

**Authentication issues**
- Clear browser localStorage
- Check token expiration time
- Verify API endpoints are correct

**Styling not applied**
- Ensure Tailwind CSS is installed
- Check for CSS file imports
- Rebuild the project

## Contributing

### Code Style
- Use TypeScript for new code
- Follow existing component patterns
- Use Tailwind classes for styling
- Add proper TypeScript types

### Testing
- Add unit tests for utilities
- Test form validation
- Test API integration
- Test error scenarios

## License

Proprietary - Ergopack India

## Support

For issues and questions, contact the development team.

## Environment Variables

Create a `.env` file in the admin directory:

```
VITE_API_URL=http://localhost:8000/api
```

## Demo Credentials

For testing purposes, use:
- Email: `admin@example.com`
- Password: `password123`

Note: Replace with actual credentials in production.
