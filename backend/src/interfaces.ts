export interface WithPagination<T> {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  data: T;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
