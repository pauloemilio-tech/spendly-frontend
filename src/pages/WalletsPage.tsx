import { useEffect, useState } from "react";
import { walletService } from "../services/walletService";
import type { Wallet } from "../types/wallet";
import WalletList from "../components/WalletList";
import WalletForm from "../components/WalletForm";
import { ThemeToggle } from "../components/ThemeToggle";
import { getFriendlyApiErrorMessage } from "../utils/apiError";

export function WalletsPage() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await walletService.getWallets();
        if (mounted) setWallets(data);
      } catch (err) {
        setError(getFriendlyApiErrorMessage(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  function handleCreated(newWallet: Wallet) {
    // Insere localmente para atualização imediata sem nova requisição
    setWallets((prev) => [newWallet, ...prev]);
  }

  async function handleDeleteWallet(id: number) {
    setError(null);
    setDeletingIds((prev) => [...prev, id]);
    try {
      await walletService.deleteWallet(id);
      setWallets((prev) => prev.filter((w) => w.id !== id));
    } catch (err) {
      setError(getFriendlyApiErrorMessage(err));
    } finally {
      setDeletingIds((prev) => prev.filter((x) => x !== id));
    }
  }

  return (
    <main className="app-page min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
              Organização financeira
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">Carteiras</h1>
            <p className="mt-2 text-[var(--color-muted)]">
              Cadastre e acompanhe suas fontes de saldo.
            </p>
          </div>
          <ThemeToggle />
        </header>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <WalletForm onCreated={handleCreated} />
          </div>

          <section className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Suas carteiras</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                {wallets.length}{" "}
                {wallets.length === 1
                  ? "carteira cadastrada"
                  : "carteiras cadastradas"}
              </p>
            </div>
            <WalletList
              wallets={wallets}
              loading={loading}
              error={error}
              onDelete={handleDeleteWallet}
              deletingIds={deletingIds}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

export default WalletsPage;
