import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Search, ChevronDown } from 'lucide-react';

export interface Part {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  status: 'online' | 'offline';
  image: string;
}

const mockParts: Part[] = [
  { id: '1', name: 'Plaquettes de frein premium', category: 'Système de freinage', sku: 'BRK-045', price: 89.99, stock: 67, status: 'online', image: '🔧' },
  { id: '2', name: 'Filtre à huile premium', category: 'Filtres', sku: 'FIL-001', price: 12.99, stock: 145, status: 'online', image: '🛢️' },
  { id: '3', name: 'Alternateur', category: 'Électrique', sku: 'ELE-056', price: 245.00, stock: 12, status: 'offline', image: '⚡' },
  { id: '4', name: 'Amortisseur', category: 'Suspension', sku: 'SUS-112', price: 125.00, stock: 34, status: 'online', image: '🔩' },
  { id: '5', name: 'Kit de distribution', category: 'Pièces moteur', sku: 'ENG-089', price: 156.50, stock: 28, status: 'online', image: '⚙️' },
  { id: '6', name: 'Jeu de bougies', category: 'Pièces moteur', sku: 'ENG-023', price: 34.50, stock: 203, status: 'online', image: '🔌' },
  { id: '7', name: 'Filtre à air', category: 'Filtres', sku: 'FIL-008', price: 18.75, stock: 0, status: 'offline', image: '🌬️' },
  { id: '8', name: 'Disque de frein arrière', category: 'Système de freinage', sku: 'BRK-078', price: 67.99, stock: 45, status: 'online', image: '💿' },
  { id: '9', name: 'Filtre d\'habitacle', category: 'Filtres', sku: 'FIL-019', price: 15.99, stock: 189, status: 'online', image: '🌪️' },
  { id: '10', name: 'Jeu de balais d\'essuie-glace', category: 'Accessoires', sku: 'ACC-034', price: 22.50, stock: 78, status: 'offline', image: '🪟' },
  { id: '11', name: 'Pompe à carburant', category: 'Pièces moteur', sku: 'ENG-145', price: 189.99, stock: 18, status: 'online', image: '⛽' },
  { id: '12', name: 'Silent-bloc de bras de suspension', category: 'Suspension', sku: 'SUS-067', price: 42.75, stock: 56, status: 'online', image: '🔗' },
];

export function PartsInventory() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Lecture de l'URL pour initialiser le filtre
  const [searchParams] = useSearchParams();
  const initialStatus = (searchParams.get('status') as 'all' | 'online' | 'offline') || 'all';
  
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'offline'>(initialStatus);
  const [parts, setParts] = useState(mockParts);

  const toggleStatus = (id: string) => {
    setParts(parts.map(part =>
      part.id === id
        ? { ...part, status: part.status === 'online' ? 'offline' : 'online' }
        : part
    ));
  };

  const filteredParts = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' ? true : part.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: parts.length,
    online: parts.filter(p => p.status === 'online').length,
    offline: parts.filter(p => p.status === 'offline').length,
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher par SKU ou nom de produit..."
            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'online' | 'offline')}
            className="appearance-none pl-4 pr-10 py-3 border border-slate-200 rounded-lg bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">Tous les statuts ({stats.total})</option>
            <option value="online">En ligne ({stats.online})</option>
            <option value="offline">Hors ligne ({stats.offline})</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-600">Produit</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-600">SKU</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-600">Prix</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-600">Niveau de stock</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-600">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredParts.map((part) => (
                <tr key={part.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">
                        {part.image}
                      </div>
                      <div>
                        <div className="text-slate-900 font-medium">{part.name}</div>
                        <div className="text-sm text-slate-500">{part.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-slate-600">{part.sku}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-900 font-medium">{part.price.toFixed(2)} €</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full max-w-[80px]">
                        <div
                          className={`h-full rounded-full transition-all ${
                            part.stock === 0 ? 'bg-red-500' :
                            part.stock < 20 ? 'bg-orange-500' :
                            part.stock < 50 ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min((part.stock / 200) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${
                        part.stock === 0 ? 'text-red-600' :
                        part.stock < 20 ? 'text-orange-600' : 'text-slate-700'
                      }`}>
                        {part.stock}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        part.status === 'online'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {part.status === 'online' ? 'En ligne' : 'Hors ligne'}
                      </span>
                      <button
                        onClick={() => toggleStatus(part.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          part.status === 'online' ? 'bg-green-500' : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            part.status === 'online' ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredParts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500">Aucune pièce trouvée correspondant à vos critères</p>
        </div>
      )}
    </div>
  );
}
