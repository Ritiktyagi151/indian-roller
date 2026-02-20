import { notFound } from 'next/navigation';
import axios from "axios";
import { Metadata } from 'next';
import BlogContent from '@/components/blog/BlogContent';
import Sidebar from '@/components/blog/Sidebar';
import ProductDetailClient from '../../../components/products/ProductDetailClient';
import ProductListingClient from '../../../components/products/ProductListingClient';
import "../../globals.css";

// 🔥 1. Metadata Generator with Canonical Support
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const fullPath = slug[0];
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    // BLOG SEO Logic
    if (fullPath.startsWith('blogs-')) {
      const actualSlug = fullPath.replace('blogs-', '');
      const res = await axios.get(`${API_URL}/blogs/slug/${actualSlug}`);
      const blog = res.data;

      return {
        title: blog.metaTitle || blog.title,
        description: blog.metaDescription,
        keywords: blog.metaKeywords,
        // 🔥 Canonical Fix: Admin se data fetch karke alternates mein bhejna
        alternates: {
          canonical: blog.canonicalUrl || `https://indianroller.com/${fullPath}`,
        },
      };
    }

    // PRODUCT SEO Logic
    const prodRes = await axios.get(`${API_URL}/products/slug/${fullPath}`);
    const product = prodRes.data;
    if (product) {
      return {
        title: product.metaTitle || product.name,
        description: product.metaDescription,
        alternates: {
          canonical: product.canonicalUrl || `https://indianroller.com/${fullPath}`,
        },
      };
    }
  } catch (error) {
    // Fail gracefully
  }

  return { title: 'Indian Roller | Premium Industrial Solutions' };
}

// 🚀 2. Main Dynamic Page Component
export default async function DynamicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  if (!slug || slug.length === 0) return notFound();

  const fullPath = slug[0];
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // --- 🔥 BLOG DETAIL LOGIC ---
  if (fullPath.startsWith('blogs-')) {
    const actualSlug = fullPath.replace('blogs-', '');
    
    try {
      const res = await axios.get(`${API_URL}/blogs/slug/${actualSlug}`);
      const blogData = res.data;

      if (!blogData) return notFound();

      return (
        <div className="bg-black min-h-screen pt-28 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 mt-10">
              <div className="w-full lg:w-[68%]">
                <BlogContent data={blogData} />
              </div>
              <aside className="w-full lg:w-[32%] sticky top-28 h-fit">
                <Sidebar currentBlog={blogData} />
              </aside>
            </div>
          </div>
        </div>
      );
    } catch (err) {
      console.error("Blog Fetch Error:", err);
      return notFound();
    }
  }

  // --- PRODUCT DETAIL LOGIC (Keeping original as requested) ---
  try {
    const productRes = await axios.get(`${API_URL}/products/slug/${fullPath}`);
    if (productRes.data) {
      return <ProductDetailClient product={productRes.data} />;
    }
  } catch (error) { /* continue check */ }

  // --- CATEGORY LISTING LOGIC ---
  if (fullPath.startsWith('products-')) {
    const identifier = fullPath.replace('products-', '');
    try {
      const productsRes = await axios.get(`${API_URL}/products/category/${identifier}`);
      return <ProductListingClient categorySlug={identifier} initialProducts={productsRes.data} />;
    } catch { return notFound(); }
  }

  return notFound();
}