import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p className="mb-4">Bem-vindo, {user?.name}!</p>

      <div className="flex items-center gap-3 mb-6">
        <Link to="/wallets" className="px-3 py-2 bg-blue-600 text-white rounded">Wallets</Link>
        <Link to="/transactions" className="px-3 py-2 bg-green-600 text-white rounded">Transações</Link>
      </div>

      <button onClick={logout} className="px-3 py-2 border rounded">
        Sair
      </button>
    </div>
  );
}
