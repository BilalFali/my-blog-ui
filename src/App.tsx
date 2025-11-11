import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GoogleAnalytics from './components/GoogleAnalytics';
import HomePage from './pages/HomePage';
import Loader from './components/Loader';
import './i18n/config';

// Lazy load pages for better performance
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const CategoryArticlesPage = lazy(() => import('./pages/CategoryArticlesPage'));
const TagArticlesPage = lazy(() => import('./pages/TagArticlesPage'));
const AllArticlesPage = lazy(() => import('./pages/AllArticlesPage'));

function App() {
  return (
    <ThemeProvider>
      <Router>
        <GoogleAnalytics />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Navbar />
          <main>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/article/:slug" element={<ArticlePage />} />
                <Route path="/articles" element={<AllArticlesPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/category/:slug" element={<CategoryArticlesPage />} />
                <Route path="/tag/:slug" element={<TagArticlesPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
