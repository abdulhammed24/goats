import Link from "next/link";
import goat from "@/data/goats.json";
import Image from "next/image";
import { shimmer, toBase64 } from "@/utils/imageUtils";

const Home = () => (
  <section className="py-10 md:py-20">
    <div className="container">
      <h1 className="mb-8 text-center text-4xl font-bold">Sports GOATs</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {goat.map((g, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-gray-200 shadow-md"
          >
            <div className="relative h-48 overflow-hidden pt-[60%]">
              <Image
                src={g.images[0]}
                alt={g.title}
                fill
                className="inset-0 h-full w-full object-cover"
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            <div className="p-4">
              <h2 className="mb-2 text-xl font-semibold">{g.title}</h2>
              <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                {g.description}
              </p>
              <p className="text-sm italic text-gray-500">
                Location: {g.location}
              </p>

              <div className="mt-4">
                <Link
                  href={`/goats/${g.slug}`}
                  className="inline-block rounded-md bg-primary px-4 py-2 text-white"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Home;
