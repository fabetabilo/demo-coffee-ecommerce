import { useMemo } from 'react'

// normaliza las imagenes de un producto en un arreglo listo para usar en carruseles
// Respeta el orden: productImages -> galleryImages -> image
export default function useGalleryImages(product) {
	return useMemo(() => {
		if (!product) return []

		const fromProduct = Array.isArray(product.productImages)
			? product.productImages.filter(Boolean)
			: []
		if (fromProduct.length > 0) return fromProduct

		const legacy = Array.isArray(product.galleryImages)
			? product.galleryImages.filter(Boolean)
			: []
		if (legacy.length > 0) return legacy

		return product.image ? [product.image] : []
	}, [product])
}

