export interface PaginatedReturnType<T> {
    page: number;
    total: number;
    success: boolean;
    message: string;
    data: T;
}