import { useState } from "react";
import { Link } from "react-router-dom";
import { isAxiosError } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { ThemeToggle } from "../components/ThemeToggle";

export function LoginPage() {
  const { login } = useAuth();
  const [cpf, setCpf] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
      setError("O CPF digitado precisa ter 11 dígitos numéricos");
      return;
    }

    if (password.length !== 6 || !/^\d+$/.test(password)) {
      setError("A senha digitada precisa ter 6 dígitos numéricos");
      return;
    }

    setError(null);

    try {
      // Após login bem-sucedido, isAuthenticated torna-se true e o
      // PublicRoute redireciona automaticamente para /dashboard.
      await login(cpf, password);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Erro ao fazer login");
      } else {
        setError("Erro inesperado");
      }
    }
  }

  return (
    <main className="app-page relative flex min-h-screen items-center justify-center px-4 py-20 sm:px-6">
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <section className="app-card w-full max-w-md rounded-2xl border p-6 sm:p-8">
        <header className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            Spendly
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Bem-vindo ao Spendly
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
            Faça login para acessar sua conta.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="cpf"
              className="mb-2 block text-sm font-medium"
            >
              CPF
            </label>
            <input
              id="cpf"
              type="text"
              name="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="app-input w-full rounded-lg border px-3.5 py-3 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="app-input w-full rounded-lg border px-3.5 py-3 outline-none"
            />
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="app-link text-sm font-medium hover:underline"
            >
              Esqueci minha senha
            </Link>
          </div>

          {error && (
            <p
              className="app-error rounded-lg border px-4 py-3 text-sm"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="app-button-primary w-full rounded-lg px-4 py-3 font-semibold shadow-sm focus:outline-none focus:ring-4 focus:ring-[var(--color-focus)]"
          >
            Entrar
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[var(--color-muted)]">
          Não tem conta na Spendly?{" "}
          <Link
            to="/register"
            className="app-link font-semibold hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </section>
    </main>
  );
}
