
// app/product/[id]/page.tsx
import ProductDetail from '@/component/marketplace/Product/ProductDetail';
import { FullCatalog } from '@/component/utils/data/data_details';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  // Find the specific product
  const product = FullCatalog.find((p) => p.id === id);

  // If no product is found, trigger the 404 page
  if (!product) {
    notFound();
  }

  // Pass the found product as a prop to your Client Component
  return <ProductDetail product={product} />;
}

