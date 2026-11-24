import { DependencyList } from "react";

export function useApi<T>(load: () => Promise<T>, deps: DependencyList): T | null;
