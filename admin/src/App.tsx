import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './stores/authStore';

// Layout
import { Layout } from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute';

// Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ProductList } from './pages/Products/ProductList';
import { ProductForm } from './pages/Products/ProductForm';
import { PostList } from './pages/Blog/PostList';
import { PostForm } from './pages/Blog/PostForm';
import { PageList } from './pages/Pages/PageList';
import { PageBuilder } from './pages/Pages/PageBuilder';
import { LeadList } from './pages/Leads/LeadList';
import { Forms } from './pages/Forms';
import { SEO } from './pages/SEO';
import { Settings } from './pages/Settings';
import { Users } from './pages/Users';
import { NotFound } from './pages/NotFound';

function App() {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route
          element={
            <PrivateRoute>
              <Layout>
                <Routes>
                  {/* Dashboard */}
                  <Route path="/dashboard" element={<Dashboard />} />

                  {/* Products */}
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/products/new" element={<ProductForm />} />
                  <Route path="/products/:id" element={<ProductForm />} />

                  {/* Blog */}
                  <Route path="/blog" element={<PostList />} />
                  <Route path="/blog/new" element={<PostForm />} />
                  <Route path="/blog/:id" element={<PostForm />} />

                  {/* Pages */}
                  <Route path="/pages" element={<PageList />} />
                  <Route path="/pages/new" element={<PageBuilder />} />
                  <Route path="/pages/:id" element={<PageBuilder />} />

                  {/* Leads */}
                  <Route path="/leads" element={<LeadList />} />

                  {/* Forms */}
                  <Route path="/forms" element={<Forms />} />

                  {/* SEO */}
                  <Route path="/seo" element={<SEO />} />

                  {/* Settings */}
                  <Route path="/settings" element={<Settings />} />

                  {/* Users */}
                  <Route path="/users" element={<Users />} />

                  {/* Default redirect */}
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
