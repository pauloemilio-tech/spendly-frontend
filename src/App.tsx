import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { WalletsPage } from "./pages/WalletsPage";
import { TransactionsPage } from "./pages/TransactionsPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rotas públicas: redireciona para /dashboard se já autenticado */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rotas protegidas: redireciona para /login se não autenticado */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/wallets" element={<WalletsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Route>

        {/* Redireciona / e qualquer rota desconhecida para /dashboard;
            o ProtectedRoute cuida do redirect para /login se necessário */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
