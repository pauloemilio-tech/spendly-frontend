import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { login as loginService } from "../services/authService";
import { createCustomer, getMe } from "../services/customerService";
import type { AuthContextType, User } from "../types/auth";

// Chave única para o token no localStorage — centralizada aqui para evitar
// magic strings espalhadas pelo código.
const TOKEN_KEY = "token";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  // isLoading começa true para que as rotas aguardem a hidratação do token
  // antes de decidir redirecionar. Evita flash de redirect na inicialização.
  const [isLoading, setIsLoading] = useState(true);

  // Lê o token do localStorage e busca os dados do usuário autenticado.
  // Chamado uma vez na montagem do provider e exposto para uso externo
  // (ex.: após operações que alterem o perfil do usuário no futuro).
  const loadAuthenticatedUser = useCallback(async () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    try {
      const userData = await getMe();
      setToken(storedToken);
      setUser(userData);
    } catch {
      // Token inválido ou expirado: limpa o estado.
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAuthenticatedUser();
  }, [loadAuthenticatedUser]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const handleLogoutEvent = () => {
      logout();
    };

    window.addEventListener("app-logout", handleLogoutEvent);
    return () => {
      window.removeEventListener("app-logout", handleLogoutEvent);
    };
  }, [logout]);

  const login = useCallback(async (cpf: string, password: string) => {
    const data = await loginService({ cpf, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    // Busca os dados completos do usuário logo após o login para popular
    // o estado sem depender dos dados retornados pelo endpoint de auth.
    const userData = await getMe();
    setUser(userData);
  }, []);

  const register = useCallback(
    async (name: string, cpf: string, password: string, email: string) => {
      await createCustomer({ name, cpf, password, email });
      // Registro não retorna token — a página é responsável por redirecionar
      // para /login após esta promise resolver.
    },
    []
  );

  // useMemo evita recriar o objeto de contexto a cada render quando os
  // valores não mudaram, prevenindo re-renders desnecessários nos consumidores.
  const value = useMemo<AuthContextType>(
    () => ({
      user,
      token,
      isAuthenticated: user !== null && token !== null,
      isLoading,
      login,
      register,
      logout,
      loadAuthenticatedUser,
    }),
    [user, token, isLoading, login, register, logout, loadAuthenticatedUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook com guard: lança erro se usado fora do AuthProvider, tornando
// o erro imediato e descritivo em vez de um crash silencioso com null.
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}
