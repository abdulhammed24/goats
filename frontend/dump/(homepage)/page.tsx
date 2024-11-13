// import Link from "next/link";
// import vendor from "@/data/vendors.json";

// // Define types for the photographer and location grouping
// interface Photographer {
//   title: string;
//   description: string;
//   images: { src: string }[];
//   location: string;
//   slug: string;
// }

// type PhotographersByLocation = {
//   [location: string]: Photographer[];
// };

// const Home = () => {
//   // Group photographers by location
//   const photographersByLocation = vendor.reduce<PhotographersByLocation>(
//     (acc, photographer: Photographer) => {
//       const location = photographer.location;
//       if (!acc[location]) {
//         acc[location] = [];
//       }
//       acc[location].push(photographer);
//       return acc;
//     },
//     {},
//   );

//   return (
//     <section className="py-10 md:py-20">
//       <div className="container">
//         {Object.keys(photographersByLocation).map((location) => (
//           <div key={location} className="mb-10">
//             <h2 className="mb-4 text-xl font-semibold">{location}</h2>
//             {photographersByLocation[location].map((photographer) => (
//               <div key={photographer.slug}>
//                 <Link
//                   className="underline"
//                   href={`/vendors/${photographer.slug}`}
//                 >
//                   {photographer.title}
//                 </Link>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Home;

import Link from "next/link";
import vendor from "@/data/vendors.json";

const Home = () => {
  // Group photographers by location
  const groupedVendors = vendor.reduce(
    (acc: { [key: string]: typeof vendor }, photographer) => {
      const location = photographer.location || "Unknown";
      if (!acc[location]) {
        acc[location] = [];
      }
      acc[location].push(photographer);
      return acc;
    },
    {},
  );

  return (
    <section className="py-10 md:py-20">
      <div className="container">
        {Object.entries(groupedVendors).map(([location, photographers]) => (
          <div key={location}>
            <h2 className="text-xl font-bold">{location}</h2>{" "}
            {/* Location as heading */}
            {photographers.map((photographer, index) => (
              <div key={index}>
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
      </div>
    </section>
  );
};

export default Home;
