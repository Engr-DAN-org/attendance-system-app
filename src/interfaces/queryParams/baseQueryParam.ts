export interface BaseQueryParam {
  paginate?: boolean;
  name?: string | null;
  page?: number | null;
  sort?: "asc" | "desc";
}
