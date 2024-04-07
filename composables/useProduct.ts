import type { Size, Color, Category } from "@prisma/client";

export const useProduct = () => {
    const params = useRoute().params;

    const { data: colors } = useFetch<Color[]>(
        `/api/store/${params.storeId}/colors`
    );
    const { data: sizes } = useFetch<Size[]>(`/api/store/${params.storeId}/sizes`);
    const { data: categories } = useFetch<Category[]>(
        `/api/store/${params.storeId}/categories`
    );

    return {
        colors,
        sizes,
        categories
    }

}