import { useEffect, useState } from "react";
import { walletService } from "../services/walletService";
import type { Wallet } from "../types/wallet";
import WalletList from "../components/WalletList";
import WalletForm from "../components/WalletForm";
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Carteiras</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <WalletForm onCreated={handleCreated} />
        </div>

        <div className="md:col-span-2">
          <WalletList wallets={wallets} loading={loading} error={error} onDelete={handleDeleteWallet} deletingIds={deletingIds} />
        </div>
      </div>
    </div>
  );
}

export default WalletsPage;
