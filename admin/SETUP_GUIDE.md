# ErgoAdmin Setup Guide

This guide will walk you through setting up and running the ErgoAdmin CMS admin panel.

## Quick Start

### 1. Install Dependencies

```bash
cd /home/user/ergopack-india/admin
npm install
```

This installs all required packages including:
- React 18.2.0
- TypeScript 5.3.3
- Tailwind CSS 3.4.1
- Zustand for state management
- Axios for API calls
- React Hook Form for forms
- Recharts for charts
- react-hot-toast for notifications
- react-beautiful-dnd for drag-and-drop

### 2. Configure Environment

Create or update the `.env` file:

```bash
cp .env.example .env
```

Then edit `.env` to match your backend API:

```
VITE_API_URL=http://localhost:8000/api
VITE_PUBLIC_API_URL=http://localhost:8000/api/public
```

### 3. Start Development Server

```bash
npm run dev
```

The admin panel will be available at: **http://localhost:5173**

## Demo Login

For testing, use these credentials:
- **Email:** admin@example.com
- **Password:** password123

*Note: Replace with actual credentials from your backend*

## Project Structure

```
admin/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components (screens)
│   ├── services/         # API calls and auth
│   ├── stores/           # Zustand state management
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── styles/           # Global CSS
│   ├── App.tsx           # Main router
│   └── main.tsx          # Entry point
├── index.html            # HTML template
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
├── vite.config.ts        # Vite build configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Full documentation
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Production
npm run build            # Build for production
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
```

## Features & Modules

### Dashboard (/dashboard)
- Overview with statistics
- Recent activities chart
- Quick action buttons

### Products (/products)
- List all products
- Create/edit products
- Manage product specs (JSONB)
- Product features
- Product status (draft/published)

### Blog (/blog)
- Create and manage blog posts
- Rich text content support
- Featured image support
- SEO excerpt field
- Publish/draft status

### Pages (/pages)
- Drag-and-drop page builder
- Multiple component types:
  - Hero sections
  - Text blocks
  - Galleries
  - Forms
  - CTAs
  - Features
  - Testimonials
- SEO optimization

### Leads (/leads)
- View form submissions
- Filter by status
- Search submissions
- View submission details
- Mark as read/replied
- Delete submissions

### Forms (/forms)
- Create custom forms
- Form builder (coming soon)

### Settings (/settings)
- Site configuration
- Email settings
- General settings

### Users (/users)
- User management (coming soon)
- Role-based access control

### SEO (/seo)
- Site-wide SEO settings (coming soon)

## Authentication Flow

1. User navigates to `/login`
2. Enters email and password
3. Backend validates credentials
4. Receives JWT token
5. Token stored in localStorage
6. Automatic Bearer token injection on API calls
7. 401 response redirects to login

## API Integration

The admin panel communicates with a REST API. Key endpoints:

### Auth
- `POST /auth/login`
- `GET /auth/me`
- `POST /auth/logout`
- `GET /auth/verify`

### Products
- `GET /products` - List
- `POST /products` - Create
- `GET /products/:id` - Get
- `PUT /products/:id` - Update
- `DELETE /products/:id` - Delete

### Blog
- `GET /blog/posts`
- `POST /blog/posts`
- `GET /blog/posts/:id`
- `PUT /blog/posts/:id`
- `DELETE /blog/posts/:id`

### Pages
- `GET /pages`
- `POST /pages`
- `GET /pages/:id`
- `PUT /pages/:id`
- `DELETE /pages/:id`

### Forms
- `GET /forms/submissions`
- `PATCH /forms/submissions/:id` (status update)
- `DELETE /forms/submissions/:id`

### Dashboard
- `GET /dashboard/stats`

## Styling with Tailwind CSS

All styling uses Tailwind CSS utility classes. Key color palette:

- **Primary Blue:** `blue-600` for main actions
- **Success Green:** `green-100/800` for published status
- **Warning Yellow:** `yellow-100/800` for drafts
- **Danger Red:** `red-100/800` for deletions
- **Info Blue:** `blue-50/900` for information

## Form Validation

Forms use react-hook-form with built-in validation:

```typescript
// Example validation
register('email', {
  required: 'Email is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email'
  }
})
```

## State Management

Using Zustand for auth state:

```typescript
import { useAuthStore } from './stores/authStore';

const { user, token, login, logout, isLoading } = useAuthStore();
```

## Common Tasks

### Adding a New Page

1. Create a new file in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Sidebar.tsx`

### Adding a New API Service

Create a new service file in `src/services/` and use the base `api` instance:

```typescript
import api from './api';

export const myService = {
  getData: async () => {
    const response = await api.get('/endpoint');
    return response.data;
  }
};
```

### Adding Form Validation

Use react-hook-form with custom validators:

```typescript
const { register, formState: { errors } } = useForm();

<input {...register('field', { required: 'Required' })} />
{errors.field && <span>{errors.field.message}</span>}
```

## Troubleshooting

### Port Already in Use
If port 5173 is in use:
```bash
npm run dev -- --port 3000
```

### API Connection Issues
1. Check `VITE_API_URL` in `.env`
2. Ensure backend server is running
3. Check CORS settings on backend
4. Verify network tab in browser DevTools

### Styling Not Working
1. Check Tailwind CSS is installed: `npm list tailwindcss`
2. Verify `src/styles/index.css` is imported in `src/main.tsx`
3. Rebuild: `npm run dev`

### TypeScript Errors
1. Run type check: `npx tsc --noEmit`
2. Ensure all types are defined in `src/types/index.ts`
3. Check component prop types

## Performance Tips

1. **Lazy load routes** - Implemented with React Router
2. **Optimize images** - Add image optimization service
3. **Debounce search** - Prevent excessive API calls
4. **Memoize components** - Use `React.memo()` for expensive renders

## Security Checklist

- [ ] Remove demo credentials before production
- [ ] Enable HTTPS in production
- [ ] Set secure cookie flags
- [ ] Implement CSRF protection
- [ ] Validate all inputs on backend
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Add audit logging

## Next Steps

1. **Customize theme colors** in `tailwind.config.js`
2. **Add your logo** to sidebar
3. **Configure API endpoints** in `.env`
4. **Set up backend** authentication
5. **Test all flows** locally
6. **Deploy** to production

## Support & Debugging

### Enable Debug Mode
Add to `App.tsx`:
```typescript
console.log('API URL:', import.meta.env.VITE_API_URL);
```

### Browser DevTools
- Network tab: Monitor API calls
- Console: Check for JavaScript errors
- Application: View localStorage and tokens

### Terminal Output
Watch for TypeScript errors and warnings during development.

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Zustand Docs](https://zustand-demo.vercel.app/)

## Production Deployment

### Build
```bash
npm run build
```

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms
- **Netlify:** Drag and drop `dist/` folder
- **AWS S3 + CloudFront:** Upload to S3, configure CloudFront
- **GitHub Pages:** Configure vite build for `/` path
- **Docker:** Create Dockerfile with Node/build stage

## Environment Variables for Production

```
VITE_API_URL=https://api.youromain.com/api
VITE_PUBLIC_API_URL=https://api.yourdomain.com/api/public
```

---

**Last Updated:** November 2024
**Admin Panel Version:** 1.0.0
