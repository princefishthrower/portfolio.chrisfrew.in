import React from 'react';

const AboutPage: React.FC = () => {
  // Calculate age based on birth date (April 1, 1992)
  const calculateAge = () => {
    const birthDate = new Date(1992, 3, 1); // Month is 0-indexed, so 3 = April
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // If birthday hasn't occurred this year yet, subtract 1 from age
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const age = calculateAge();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <section className="mb-10">
          <h2 className="text-center mb-4 text-2xl font-semibold text-gray-900">
            About
          </h2>
          <p className="font-display text-center text-gray-600">
            About the artist.
          </p>
        </section>


        <section>
          <p className="font-display mb-8 text-gray-600">
            <a href="https://www.instagram.com/_chrisfrewin_/">Christopher Frewin</a>, {age}, is from the United States, lives in Austria, and works in Switzerland as a software engineer. As a part-time artist, he enjoys pen and ink illustration, vector graphics, pixel art, watercolor, acrylic, and photography. His current works combine his own illustrations or photographs blended into vector graphics that depict mountains, trees, stars, moons, suns, auroras, northern lights, mountain huts, industrial structures, and more. He frequently creates relatively dark prints carefully accented with pastels and/or neon colors, and likewise, favors photography at sunset or dusk (also known as "blue hour" photography).
          </p>

          <p className="font-display mb-8 text-gray-600">
            Some of his prints depict well-known alpine scenes and sometimes include additional science fiction elements to form the final product: poster prints with a low color count - prints which are ideal for clean silk screen or giclée prints, and can be scaled to any resolution without losing fidelity. His works sometimes include allegory, metaphors, and social commentary on environmental and climate change issues which stand as a contrast to the mountainous and natural areas his prints depict. He draws inspiration from the prints of the Japanese woodblock masters, the Hudson River School artists, Works Progress Administration (WPA) art prints from the United States, select American illustrators and digital artists, and Vaporwave art (1990s influenced neon colored art).
          </p>

          <p className="font-display mb-8 text-gray-600">
            While his posters are currently printed by external companies, Chris hopes one day to operate his own personal print studio.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
