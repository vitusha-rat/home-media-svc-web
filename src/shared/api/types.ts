export interface ApiResponse<TData> {
  success: boolean;
  data?: TData;
  error?: string;
}

export interface PaginatedResponse<TData> {
  success: boolean;
  count: number;
  results: TData[];
}
