import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Search, ChevronDown, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export interface Part {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  status: 'online' | 'offline' | 'not_imported'; // Nouveau statut ajouté
  image: string;
}

const mockParts: Part[] = [
  { id: '1', name: 'Plaquettes de frein premium', category: 'Système de freinage', sku: 'BRK-045', price: 89.99, stock: 67, status: 'online', image: '🔧' },
  { id: '2', name: 'Filtre à huile premium', category: 'Filtres', sku: 'FIL-001', price: 12.99, stock: 145, status: 'online', image: '🛢️' },
  { id: '3', name: 'Alternateur', category: 'Électrique', sku: 'ELE-056', price: 245.00, stock: 12, status: 'offline', image: '⚡' },
  { id: '4', name: 'Amortisseur', category: 'Suspension', sku: 'SUS-112', price: 125.00, stock: 34, status: 'online', image: '🔩' },
  { id: '5', name: 'Kit de distribution', category: 'Pièces moteur', sku: 'ENG-089', price: 156.50, stock: 28, status: 'online', image: '⚙️' },
  // Ajout de 10 produits non importés
  { id: 'NI-1', name: 'Radiateur de refroidissement', category: 'Moteur', sku: 'RAD-012', price: 110.00, stock: 5, status: 'not_imported', image: '🌡️' },
  { id: 'NI-2', name: 'Pompe à eau', category: 'Moteur', sku: 'PMP-088', price: 45.00, stock: 12, status: 'not_imported', image: '💧' },
  { id: 'NI-3', name: 'Cardan avant droit', category: 'Transmission', sku: 'TRM-451', price: 135.00, stock: 3, status: 'not_imported', image: '⛓️' },
  { id: 'NI-4', name: 'Batterie 70Ah', category: 'Électrique', sku: 'BAT-70A', price: 95.00, stock: 20, status: 'not_imported', image: '🔋' },
  { id: 'NI-5', name: 'Bougies d\'allumage x4', category: 'Moteur', sku: 'IG-009', price: 28.00, stock: 50, status: 'not_imported', image: '🔌' },
  { id: 'NI-6', name: 'Condenseur de clim', category: 'Climatisation', sku: 'AC-102', price: 160.00, stock: 8, status: 'not_imported', image: '❄️' },
  { id: 'NI-7', name: 'Embrayage kit complet', category: 'Transmission', sku: 'CLU-990', price: 290.00, stock: 2, status: 'not_imported', image: '⚙️' },
  { id: 'NI-8', name: 'Bobine d\'allumage', category: 'Électrique', sku: 'COIL-44', price: 55.00, stock: 15, status: 'not_imported', image: '⚡' },
  { id: 'NI-9', name: 'Vase d\'expansion', category: 'Moteur', sku: 'EXP-11', price: 22.00, stock: 10, status: 'not_imported', image: '🏺' },
  { id: 'NI-10', name: 'Support moteur', category: 'Moteur', sku: 'MNT-05', price: 48.00, stock: 6, status: 'not_imported', image: '🔩' },
];

export function PartsInventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();
  const initialStatus = (searchParams.get('status') as 'all' | 'online' | 'offline' | 'not_imported') || 'all';
  
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'offline' | 'not_imported'>(initialStatus);
  const [parts, setParts] = useState(mockParts);

  const toggleStatus = (id: string) => {
    setParts(parts.map(part => {
      if (part.id === id && part.status !== 'not_imported') {
        return { ...part, status: part.status === 'online' ? 'offline' : 'online' };
      }
      return part;
    }));
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
    notImported: parts.filter(p => p.status === 'not_imported').length,
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
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="appearance-none pl-4 pr-10 py-3 border border-slate-200 rounded-lg bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">Tous les statuts ({stats.total})</option>
            <option value="online">En ligne ({stats.online})</option>
            <option value="offline">Hors ligne ({stats.offline})</option>
            <option value="not_imported">Non importés ({stats.notImported})</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
        </div>
      </div>

      <TooltipProvider>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-600">Produit</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-600">SKU</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-600">Prix</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-600">Stock</th>
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
                    <td className="px-6 py-4 font-mono text-sm text-slate-600">{part.sku}</td>
                    <td className="px-6 py-4 text-slate-900 font-medium">{part.price.toFixed(2)} €</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full max-w-[80px]">
                          <div
                            className={`h-full rounded-full transition-all ${
                              part.stock === 0 ? 'bg-red-500' :
                              part.stock < 20 ? 'bg-orange-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min((part.stock / 200) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">{part.stock}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* Affichage du badge selon le statut */}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          part.status === 'online' ? 'bg-green-50 text-green-700' :
                          part.status === 'offline' ? 'bg-slate-100 text-slate-600' :
                          'bg-blue-50 text-blue-600'
                        }`}>
                          {part.status === 'online' ? 'En ligne' : 
                           part.status === 'offline' ? 'Hors ligne' : 'Non importé'}
                        </span>

                        {/* Toggle ou Bouton Info selon le statut */}
                        {part.status === 'not_imported' ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                                <Info className="w-5 h-5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <a href="#" className="text-red-600 underline font-medium" onClick={(e) => e.preventDefault()}>
                                Voir comment importer mon produit
                              </a>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <button
                            onClick={() => toggleStatus(part.id)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              part.status === 'online' ? 'bg-green-500' : 'bg-slate-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              part.status === 'online' ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TooltipProvider>

      {filteredParts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500">
          Aucune pièce trouvée
        </div>
      )}
    </div>
  );
}
