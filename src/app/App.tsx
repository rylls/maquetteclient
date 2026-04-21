import { Routes, Route, Link, useLocation } from 'react-router';
import { LayoutDashboard, Package, Settings, LogOut, Bell, User } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { PartsInventory } from './components/PartsInventory';
import { ChatBot } from './components/ChatBot';
import logoVroomly from '../imports/logo_vroomly_pink.b4ae72651b55-1.png';

export default function App() {
  // Permet de savoir sur quelle URL on se trouve pour surligner le menu
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <img src={logoVroomly} alt="Vroomly" className="h-10 w-auto" />
        </div>

        {/* Navigation avec des vrais liens */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === '/'
                ? 'bg-red-50 text-red-600'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Tableau de bord</span>
          </Link>
          <Link
            to="/inventaire"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname.startsWith('/inventaire')
                ? 'bg-red-50 text-red-600'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Package className="w-5 h-5" />
            <span>Inventaire</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
            <Settings className="w-5 h-5" />
            <span>Paramètres</span>
          </button>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-slate-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">Compte Partenaire</p>
              <p className="text-xs text-slate-500">ID: VRP-10245</p>
            </div>
            <LogOut className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div>
            <h2 className="text-xl text-slate-900">
              {location.pathname === '/' ? 'Tableau de bord' : 'Gestion de l\'inventaire'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* C'est ici que les pages changent */}
        <main className="flex-1 overflow-auto p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventaire" element={<PartsInventory />} />
          </Routes>
        </main>
      </div>

      <ChatBot />
    </div>
  );
}
