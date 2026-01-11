import { useEffect, useRef } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { downloadApi } from "../api/downloadApi";
import type { DownloadStatus } from "./types";

export const downloadKeys = {
  all: ["downloads"] as const,
  list: (status?: DownloadStatus) => [...downloadKeys.all, "list", status] as const,
  detail: (hash: string) => [...downloadKeys.all, "detail", hash] as const,
};

export function useDownloads(status?: DownloadStatus, autoProcessCompleted = true) {
  const lastProcessTime = useRef(0);

  const query = useQuery({
    queryKey: downloadKeys.list(status),
    queryFn: () => downloadApi.getAll(status),
    refetchInterval: 2000,
    staleTime: 1000,
  });

  useEffect(() => {
    if (!autoProcessCompleted || !query.data) return;

    const hasCompleted = query.data.downloads.some(
      (d) => d.status === "completed" || d.status === "seeding"
    );

    const now = Date.now();
    if (hasCompleted && now - lastProcessTime.current > 10000) {
      lastProcessTime.current = now;
      downloadApi.processCompleted().catch(() => {});
    }
  }, [query.data, autoProcessCompleted]);

  return query;
}

export function useDownload(hash: string) {
  return useQuery({
    queryKey: downloadKeys.detail(hash),
    queryFn: () => downloadApi.getOne(hash),
    enabled: !!hash,
    refetchInterval: 2000,
  });
}

export function useDeleteDownload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ hash, deleteFiles }: { hash: string; deleteFiles?: boolean }) =>
      downloadApi.delete(hash, deleteFiles),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: downloadKeys.all });
    },
  });
}

export function useProcessCompleted() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => downloadApi.processCompleted(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: downloadKeys.all });
    },
  });
}

export function useScanPlexLibrary() {
  return useMutation({
    mutationFn: () => downloadApi.scanPlexLibrary(),
  });
}
