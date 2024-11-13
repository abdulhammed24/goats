import { ImageGallery } from "@/components/ImageGallery";
import { Lightbulb, MessageCircleReply, Star, Users } from "lucide-react";
import { notFound } from "next/navigation";

interface Image {
  url: string;
}

interface Vendor {
  title: string;
  description: string;
  images: Image[];
  location: string;
  slug: string;
}

interface VendorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: VendorPageProps) {
  const resolvedParams = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/photographies?populate=*`,
  );
  const data = await response.json();
  const selectedVendor = data.data.find(
    (v: Vendor) => v.slug === resolvedParams.slug,
  );

  return (
    selectedVendor && {
      title: `Book ${selectedVendor.title} For Your Wedding in Nigeria with JoyRibbons | Book Wedding Photographers in ${selectedVendor.location}, Nigeria with JoyRibbons | Cost, Reviews & Photos`,
      description: `Explore ${selectedVendor.title} through big, beautiful photos of their work. Get details you'll only find on JoyRibbons, like full wedding and package pricing.`,
    }
  );
}

const Vendors = async ({ params }: VendorPageProps) => {
  const resolvedParams = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/photographies?populate=*`,
  );
  const data = await response.json();
  const selectedVendor = data.data.find(
    (v: Vendor) => v.slug === resolvedParams.slug,
  );

  if (!selectedVendor) {
    notFound();
  }

  const imageUrls = selectedVendor.images.map((image: Image) => ({
    src: `${process.env.NEXT_PUBLIC_API_URL}${image.url}`,
  }));

  // console.log(imageUrls);

  return (
    <section className="py-10 md:py-20">
      <div className="container">
        <ImageGallery images={imageUrls} title={selectedVendor.title} />

        <div className="grid grid-cols-1 gap-8 pt-5 lg:grid-cols-6">
          <div className="lg:col-span-4">
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-4">
                <h1 className="text-3xl font-bold">{selectedVendor.title}</h1>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={14}
                      fill="#fbdf00"
                      color="#fbdf00"
                    />
                  ))}
                </div>
                <span className="text-sm">5.0</span>
              </div>
              <p className="mb-6 text-gray-600">{selectedVendor.description}</p>
              <div className="mb-6 flex flex-wrap gap-6 text-gray-600">
                <div className="flex items-center gap-2 text-sm">
                  <Lightbulb size={14} />
                  <span>Popular in your area</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users size={14} />
                  <span>Booked more than 65 times</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star size={14} />
                  <span>Highly recommended in your area</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-lg border border-[#b7b7b7] bg-white p-6 shadow-md lg:sticky lg:top-4">
              <div className="mb-6 flex items-center gap-2">
                <MessageCircleReply size={18} color="#f9508c" />
                <span>Responds within 24 hours</span>
              </div>
              <button className="w-full rounded-lg bg-primary py-3 text-white transition hover:bg-[#ff1493]">
                Request pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vendors;
