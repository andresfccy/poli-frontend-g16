import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen bg-hero-glow">
      <Header />
      <main id="main-content" className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
