import { ImageGallery } from "@/components/ImageGallery";

import { notFound } from "next/navigation";

interface Image {
  url: string;
}

interface Goat {
  title: string;
  description: string;
  images: Image[];
  location: string;
  slug: string;
}

interface GoatPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: GoatPageProps) {
  const resolvedParams = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/goats?populate=*`,
  );
  const data = await response.json();
  const selectedGoat = data.data.find(
    (v: Goat) => v.slug === resolvedParams.slug,
  );

  return (
    selectedGoat && {
      title: `Book ${selectedGoat.title} For Your Wedding in Nigeria with JoyRibbons | Book Wedding Photographers in ${selectedGoat.location}, Nigeria with JoyRibbons | Cost, Reviews & Photos`,
      description: `Explore ${selectedGoat.title} through big, beautiful photos of their work. Get details you'll only find on JoyRibbons, like full wedding and package pricing.`,
    }
  );
}

const Goats = async ({ params }: GoatPageProps) => {
  const resolvedParams = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/goats?populate=*`,
  );
  const data = await response.json();
  const selectedGoat = data.data.find(
    (v: Goat) => v.slug === resolvedParams.slug,
  );

  if (!selectedGoat) {
    notFound();
  }

  const imageUrls = selectedGoat.images.map((image: Image) => ({
    src: `${process.env.NEXT_PUBLIC_API_URL}${image.url}`,
  }));

  // console.log(imageUrls);

  return (
    <section className="py-10 md:py-20">
      <div className="container">
        <ImageGallery images={imageUrls} title={selectedGoat.title} />

        <div className="grid grid-cols-1 gap-8 pt-5 lg:grid-cols-6">
          <div className="lg:col-span-4">
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-4">
                <h1 className="text-3xl font-bold">{selectedGoat.title}</h1>
              </div>

              <p className="mb-6 text-gray-600">{selectedGoat.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Goats;
