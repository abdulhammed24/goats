"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import HomeSkeleton from "./HomeSkeleton";

interface Photographer {
  id: number;
  title: string;
  description: string;
  location: string;
  slug: string;
}

type PhotographersByLocation = {
  [location: string]: Photographer[];
};

const Home = () => {
  const [photographersByLocation, setPhotographersByLocation] =
    useState<PhotographersByLocation>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: Photographer[] }>(
          // "${process.env.NEXT_PUBLIC_API_URL}/api/photographies",
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographies?populate=*`,
        );

        const photographers = response.data.data;

        console.log(photographers);

        const groupedPhotographers =
          photographers.reduce<PhotographersByLocation>((acc, photographer) => {
            const location = photographer.location;
            if (!acc[location]) {
              acc[location] = [];
            }
            acc[location].push(photographer);
            return acc;
          }, {});

        setPhotographersByLocation(groupedPhotographers);
      } catch {
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
          <>
            <HomeSkeleton />
          </>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            {Object.keys(photographersByLocation).map((location) => (
              <div key={location} className="mb-10">
                <h2 className="mb-4 text-xl font-semibold">{location}</h2>
                {photographersByLocation[location].map((photographer) => (
                  <div key={photographer.slug}>
                    <Link
                      className="underline"
                      href={`/vendors/${photographer.slug}`}
                    >
                      {photographer.title}
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
