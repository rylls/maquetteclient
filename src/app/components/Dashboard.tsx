import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Clock, Package2, Calendar, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salesData = [
  { day: '1 Avr', revenue: 2850 },
  { day: '5 Avr', revenue: 3200 },
  { day: '10 Avr', revenue: 2950 },
  { day: '15 Avr', revenue: 3800 },
  { day: '20 Avr', revenue: 4200 },
  { day: '25 Avr', revenue: 3950 },
  { day: '30 Avr', revenue: 4500 },
];

const topParts = [
  { id: 1, name: 'Plaquettes de frein premium', sku: 'BRK-045', sold: 156, stock: 67 },
  { id: 2, name: 'Filtre à huile premium', sku: 'FIL-001', sold: 142, stock: 145 },
  { id: 3, name: 'Kit de distribution', sku: 'ENG-089', sold: 128, stock: 28 },
  { id: 4, name: 'Amortisseur', sku: 'SUS-112', sold: 98, stock: 34 },
  { id: 5, name: 'Filtre d\'habitacle', sku: 'FIL-019', sold: 87, stock: 189 },
];

export function Dashboard() {
  const [dateRange, setDateRange] = useState('30 derniers jours');
  const navigate = useNavigate();

  // Mise à jour : 10 produits non importés
  const notImportedProducts = 10;
  const potentialRevenue = 18750;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-slate-900 mb-1">Bienvenue !</h1>
          <p className="text-slate-600">Voici votre aperçu des performances</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-slate-300 transition-colors">
          <Calendar className="w-4 h-4 text-slate-600" />
          <span className="text-sm text-slate-700">{dateRange}</span>
        </div>
      </div>

      {/* Alert Banner - Modifié pour "Produits non importés" */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg text-slate-900 mb-1">Opportunité de revenus</h3>
            <p className="text-slate-700 mb-3">
              Vous avez <span className="font-semibold text-orange-600">{notImportedProducts} produits</span> non importés sur Vroomly.
              Cela représente <span className="font-semibold text-orange-600">{potentialRevenue.toLocaleString('fr-FR')} € de revenus potentiels</span>.
            </p>
            <button 
              onClick={() => navigate('/inventaire?status=not_imported')}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
            >
              Voir les produits non importés
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Ventes totales"
          value="84 250 €"
          change="+12.5%"
          trend="up"
          icon={<DollarSign className="w-5 h-5" />}
          bgColor="bg-gradient-to-br from-red-500 to-pink-600"
        />
        <MetricCard
          title="Annonces actives"
          value="3 245"
          change="+8.3%"
          trend="up"
          icon={<Package2 className="w-5 h-5" />}
          bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <MetricCard
          title="Délai d'expédition moyen"
          value="2.4 jours"
          change="-5.2%"
          trend="up"
          icon={<Clock className="w-5 h-5" />}
          bgColor="bg-gradient-to-br from-green-500 to-green-600"
        />
        <MetricCard
          title="Commandes totales"
          value="1 587"
          change="+18.7%"
          trend="up"
          icon={<ShoppingCart className="w-5 h-5" />}
          bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg text-slate-900 mb-1">Chiffre d'affaires</h3>
          <p className="text-sm text-slate-600">Évolution des ventes sur les 30 derniers jours</p>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="day"
              tick={{ fill: '#64748b', fontSize: 12 }}
              stroke="#cbd5e1"
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 12 }}
              stroke="#cbd5e1"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ fill: '#ef4444', r: 4 }}
              activeDot={{ r: 6 }}
              name="Chiffre d'affaires"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Performing Parts */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg text-slate-900 mb-1">Meilleures ventes</h3>
          <p className="text-sm text-slate-600">Top 5 des pièces les plus vendues ce mois-ci</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-slate-600">Nom de la pièce</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-slate-600">SKU</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-slate-600">Unités vendues</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-slate-600">Niveau de stock</th>
              </tr>
            </thead>
            <tbody>
              {topParts.map((part, index) => (
                <tr key={part.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-red-600 font-semibold">#{index + 1}</span>
                      </div>
                      <span className="text-slate-900">{part.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{part.sku}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium">
                      {part.sold} unités
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full max-w-[100px]">
                        <div
                          className={`h-full rounded-full ${
                            part.stock > 100 ? 'bg-green-500' :
                            part.stock > 50 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min((part.stock / 200) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-700">{part.stock}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  bgColor: string;
}

function MetricCard({ title, value, change, trend, icon, bgColor }: MetricCardProps) {
  const isPositive = trend === 'up';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${bgColor} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
          isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{change}</span>
        </div>
      </div>
      <div className="text-2xl text-slate-900 mb-1 font-semibold">{value}</div>
      <div className="text-sm text-slate-600">{title}</div>
    </div>
  );
}
