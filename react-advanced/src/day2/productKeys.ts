export const productKeys = {
  all: ['products'] as const,
  list: (search: string) => ['products', { search }] as const,
  detail: (id: string) => ['products', id] as const,
}
