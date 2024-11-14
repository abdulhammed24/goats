"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HomeSkeleton from "./HomeSkeleton";

interface Goat {
  id: number;
  title: string;
  description: string;
  location: string;
  slug: string;
}

const Home = () => {
  const [goats, setGoats] = useState<Goat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/goats?populate=*`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setGoats(data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-10 md:py-20">
      <div className="container">
        {loading ? (
          <HomeSkeleton />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            {goats.map((goat) => (
              <div key={goat.slug} className="mb-4">
                <h2 className="text-xl font-semibold">{goat.location}</h2>
                <Link className="underline" href={`/vendors/${goat.slug}`}>
                  {goat.title}
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
