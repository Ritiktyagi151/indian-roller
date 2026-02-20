import { notFound } from 'next/navigation';
import BlogContent from '@/components/blog/BlogContent';
import Sidebar from '@/components/blog/Sidebar';
import axios from "axios"; //

// 🌐 Dynamic Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    // Backend se slug ke basis par data lana
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`); 
    const blog = res.data;

    return {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription,
      keywords: blog.metaKeywords,
      alternates: { canonical: blog.canonicalUrl },
      openGraph: {
        title: blog.title,
        description: blog.metaDescription,
        images: [blog.image]
      }
    };
  } catch { 
    return { title: "Blog Post | Indian Roller" }; 
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let blog;

  try {
    // Server-side fetching
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`); 
    blog = res.data;
  } catch { 
    return notFound(); 
  }

  return (
    <div className="bg-black min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 mt-10">
          
          {/* Main Blog Content Section */}
          <div className="w-full lg:w-[68%]">
            <BlogContent data={blog} />
          </div>

          {/* Sidebar Section */}
          <aside className="w-full lg:w-[32%] sticky top-28 h-fit">
            <Sidebar currentBlog={blog} />
          </aside>

        </div>
      </div>
    </div>
  );
}