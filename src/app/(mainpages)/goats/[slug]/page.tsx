import { ImageGallery } from "@/components/ImageGallery";
import { Star } from "lucide-react";
import goat from "@/data/goats.json";
import { notFound } from "next/navigation";
import GoBackButton from "@/components/GoBackButton";

interface Goat {
  title: string;
  description: string;
  images: string[];
  location: string;
  slug: string;
}

interface GoatPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: GoatPageProps) {
  const { slug } = params;

  const selectedGoat = goat.find((v: Goat) => v.slug === slug);

  if (!selectedGoat) {
    notFound();
  }

  return {
    title: `${selectedGoat.title} - A Legend of the Game | Celebrating Greatness in ${selectedGoat.location}`,
    description: `Explore the incredible journey and achievements of ${selectedGoat.title}, one of the greatest athletes of all time. Learn about their impact on the world of sports and their legacy in ${selectedGoat.location} and all over the globe.`,
  };
}

const Goats = async ({ params }: GoatPageProps) => {
  const { slug } = params;

  const selectedGoat = goat.find((v: Goat) => v.slug === slug);

  if (!selectedGoat) {
    notFound();
  }

  return (
    <section className="py-10 md:py-20">
      <div className="container">
        <GoBackButton />

        <ImageGallery images={selectedGoat.images} title={selectedGoat.title} />

        <div className="grid grid-cols-1 gap-8 pt-5 lg:grid-cols-6">
          <div className="lg:col-span-4">
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-4">
                <h1 className="text-3xl font-bold">{selectedGoat.title}</h1>
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

              <p className="mb-6 text-gray-600">{selectedGoat.description}</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-lg border border-[#b7b7b7] bg-white p-6 shadow-md lg:sticky lg:top-4">
              <button className="w-full rounded-lg bg-primary py-3 text-white transition hover:bg-[#ff1493]">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Goats;
