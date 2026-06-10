import { apiClient } from "../lib/apiClient";
import type { DashboardSummary } from "../types/dashboard";

const BASE = "/dashboard";

export const dashboardService = {
  async getDashboardSummary(): Promise<DashboardSummary> {
    const response = await apiClient.get<DashboardSummary>(`${BASE}/summary`);
    return response.data;
  },
};
