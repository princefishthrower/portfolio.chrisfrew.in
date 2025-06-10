import React, { useEffect, useState } from 'react'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import Layout from '../components/Layout';
import { graphql, useStaticQuery } from 'gatsby';
import SEO from '../components/SEO';

const PRINTS_METADATA = [
  { id: 'coldSolitude', filename: 'cold-solitude.png', caption: 'Cold Solitude', description: 'A lone hut stands in the cold, nestled under a pine forest.', objectPosition: 'bottom' },
  { id: 'primaryExplorers', filename: 'primary-explorers.png', caption: 'Primary Explorers', description: '3 explorers made up of the primary colors prepare for the final push to a high alpine summit.', objectPosition: 'bottom' },
  { id: 'mannheimerFirstColor', filename: 'mannheimer-first-color.png', caption: 'Mannheimer Hütte - First Colorway', description: 'The first, and night-focused colorway print in the Mannheimer series.' },
  { id: 'mannheimerSecondColor', filename: 'mannheimer-second-color.png', caption: 'Mannheimer Hütte - Second Colorway', description: 'The second astral focused colorway print in the Mannheimer series.' },
  { id: 'mannheimerThirdColor', filename: 'mannheimer-third-color.png', caption: 'Mannheimer Hütte - Third Colorway', description: 'The third daytime colorway print in the Mannheimer series.' },
  { id: 'woodsBoy', filename: 'woods-boy.png', caption: 'Woods Boy', description: 'A wintery scene from upstate New York featuring the Neowise comet and international space station in the sky.', objectPosition: 'bottom' },
  { id: 'refugionVajolet', filename: 'refugio-vajolet.png', caption: 'Refugio Vajolet', description: 'An early morning neon print of Refugio Vajolet.' },
  { id: 'binarySystem', filename: 'binary-system.png', caption: 'Binary System', description: 'Säntis mountain station converted to a telecommunications tower in a binary star system sci-fi setting.' },
  { id: 'agetePlatteInGold', filename: 'ageteplatte-in-gold.png', caption: 'Ageteplatte In Gold', description: 'Rocks over Ageteplatte in Alpstein juxtaposed with a pine from the western United States.', objectPosition: 'bottom' },
  { id: 'alpineGlowsPurple', filename: 'alpine-glows-purple.png', caption: 'Alpine Glows Purple', description: 'Moon and sun trade light over snowy mountains and trees.', objectPosition: 'bottom' },
  { id: 'saentisSupergreen', filename: 'saentis-supergreen.png', caption: 'Säntis Supergreen', description: 'Original print with very subtle aurora.' },
  { id: 'saentisSupergreenAurora', filename: 'saentis-supergreen-aurora.png', caption: 'Säntis Supergreen - Aurora', description: 'Second print from the Säntis Super series with bright and feathered aurora.' },
  { id: 'saentisSupergray', filename: 'saentis-supergray.png', caption: 'Säntis Supergray', description: 'Third print in the Säntis Super series with rocky gray texture.' },
  { id: 'icebergsAndGalaxies', filename: 'icebergs-and-galaxies.png', caption: 'Icebergs and Galaxies', description: 'Original print of the Icebergs and Galaxies prints.' },
  { id: 'icebergsAndGalaxiesMoonRise', filename: 'icebergs-and-galaxies-moon-rise.png', caption: 'Icebergs and Galaxies - Galactic', description: 'A neon color re-think of the original "Icebergs and Galaxies" print.' },
  { id: 'icebergsAndGalaxiesMinimal', filename: 'icebergs-and-galaxies-minimal.png', caption: 'Icebergs and Galaxies - Minimal', description: 'Third and final print in the "Iceberg and Galaxies" series with reduced colors.' },
  { id: 'seekRefugeOnStundnerBerg', filename: 'when-they-arrive-seek-refuge-on-stundner-berg.png', thumbnail: 'when-they-arrive-seek-refuge-on-stundner-berg.png', caption: 'When They Arrive, Seek Refuge on Gampernei', description: 'View from Studner Berg - with a sci-fi twist.' },
  { id: 'wintersColdArrival', filename: 'winters-cold-the-arrival.png', thumbnail: 'winters-cold-the-arrival.png', caption: 'Winter\'s Cold - The Arrival', description: 'First print of the Winter\'s Cold Series.' },
  { id: 'wintersColdInvasion', filename: 'winters-cold-the-invasion.png', thumbnail: 'winters-cold-the-invasion.png', caption: 'Winter\'s Cold - The Invasion', description: 'Second print of the Winter\'s Cold Series.' },
  { id: 'codingInCastelmezzano', filename: 'coding-in-castelmezzano.png', thumbnail: 'coding-in-castelmezzano.png', caption: 'Coding in Castelmezzano', description: 'An Italian Village is lit up on a snowy night - but what is going on with the windows?' },
  { id: 'snowyValley', filename: 'snowy-valley.png', caption: 'Snowy Valley', description: 'A deep purple norther lights show above a rocky valley - but is that snow or stars?' },
  { id: 'coldApproachPokeoMoonshine', filename: 'cold-approach-to-poke-o-moonshine.png', caption: 'Cold Approach To Poke-O-Moonshine', description: 'An old fire tower from New York State is backdropped by a large neon aurora.' },
  { id: 'buffaloLight', filename: 'buffalo-light.png', caption: 'Buffalo Light', description: 'A lesser known view of Buffalo that trades blue and green hues.' },
  { id: 'greatObservation', filename: 'the-great-observation.png', caption: 'The Great Observation', description: 'A highly detailed print with galaxy formations represented with ASCII code characters.' },
  { id: 'austrianNightsSaulakopf', filename: 'austrian-nights-saulakopf.png', caption: 'Austrian Nights - Saulakopf', description: 'An aurora borealis and starry night fly over a hiker in a mountanious region based of Saulakopf and the Rätikon massif.' },
];

const SINGLE_STONES_METADATA = [
  { id: 'singleStone', filename: 'single-stone.png', caption: 'Single Stone', description: 'A highly detailed vector print with lots of stippling - and only 4 colors.' },
  { id: 'singleStoneII', filename: 'single-stone-ii.png', caption: 'Single Stone II', description: 'A three color galactic single stone print.' },
  { id: 'singleStoneIIIDay', filename: 'single-stone-iii-day.png', caption: 'Single Stone IV - Day Colorway', description: 'The day colorway of the Single Stone IV print.' },
  { id: 'singleStoneIIINight', filename: 'single-stone-iii-night.png', caption: 'Single Stone IV - Night Colorway', description: 'The night colorway of the Single Stone IV print.' },
  { id: 'singleStoneIV', filename: 'single-stone-iv.png', caption: 'Single Stone IV', description: 'A bright pastel vector print of stone and pine trees.' },
  { id: 'singleStoneV', filename: 'single-stone-v.png', caption: 'Single Stone V', description: 'A highly detailed vector print of a stone with pine boughs in pastel hues.' },
];

const PANORAMAS_METADATA = [
  { id: 'dreiSchwesternGold', filename: 'drei-schwestern-gold.jpg', caption: '1. Drei Schwestern - Gold', description: 'A 2:1 panorama of the Drei Schwestern at golden hour.' },
  { id: 'werdenbergOrange', filename: 'werdenberg-orange.jpg', caption: '2. Werdenberg - Orange', description: 'A massive 6:1 panorama of the Werdenberg group over Buchs, St. Gallen as late afternoon golden light streams down.' },
  { id: 'grossesSeehornTungsten', filename: 'grosses-seehorn-und-co-tungsten.jpg', caption: '3. Großes Seehorn und Co - Tungsten', description: 'A 3:1 panorama of the mountains at the end of Vermunstausee, dominated by Großlitzner and Großes Seehorn on the right.' },
  { id: 'schrottenkopfLime', filename: 'schrottenkopf-und-co-lime.jpg', caption: '4. Schrottenkopf und Co - Lime', description: 'A 2:1 panorama of Schrottenkopf in the Verwall group as viewed from the west, near Heilbronner Hütte.' },
  { id: 'schaftaelispitzMagenta', filename: 'schrottenkopf-und-co-magenta.jpg', caption: '5. Schaftälispitz und Co - Magenta', description: 'A 2:1 panorama of Schaftälispitz in the Verwall group as viewed from the north.' },
];

const ImageFrame = ({ children, aspectRatio = "3/4" }: any) => {
  return (
    <div
      className={`aspect-[${aspectRatio}] overflow-hidden p-4`}
      style={{
        backgroundColor: '#ffffff', // Very light off-white
        boxShadow: `
          inset 0 0 20px rgba(0,0,0,0.1),
          0 4px 6px -1px rgba(0,0,0,0.1),
          0 2px 4px -1px rgba(0,0,0,0.1)
        `,
        border: '1px solid rgba(0,0,0,0.08)', // Very light border
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
};

const ImageModal = ({ isOpen, onClose, image, gatsbyImage }: any) => {

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) {
    return <></>
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-0 right-2 text-white text-3xl focus:outline-none"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={e => e.stopPropagation()}
      >

        <GatsbyImage
          image={gatsbyImage}
          alt={image?.caption}
          className="max-h-[85vh] w-auto"
        />
        <div className="mt-2 text-center text-white">
          <h3 className="text-lg font-medium">{image?.caption}</h3>
          <p className="mt-1 text-gray-300">{image?.description}</p>
        </div>
      </div>
    </div>
  );
};


export default function HomeIndex() {
  const [selectedImage, setSelectedImage] = useState<{ item: any, gatsbyImage: IGatsbyImageData }>();

  // GraphQL query to get all images
  const data = useStaticQuery(graphql`
    query {
      posterProofs: allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
        }
      ) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(
              width: 1200
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
      panoProofs: allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
        }
      ) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(
              width: 1200
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  `);

  // Helper function to find image data
  const findImageData = (filename: any, collection: any) => {
    const imageData = collection === 'pano'
      ? data.panoProofs.nodes.find((node: any) => node.relativePath.endsWith(filename))
      : data.posterProofs.nodes.find((node: any) => node.relativePath.endsWith(filename));

    return imageData ? getImage(imageData.childImageSharp) : null;
  };

  const renderImage = (item: any, aspectRatio: any, collection = 'poster') => {
    const gatsbyImage = findImageData(item.filename, collection);
    if (!gatsbyImage) return null;

    return (
      <div
        key={item.id}
        className="group flex flex-col w-full max-w-md mx-auto cursor-pointer"
        onClick={() => setSelectedImage({ item, gatsbyImage })}
        onContextMenu={(e) => e.preventDefault()}
      >
        <ImageFrame aspectRatio={aspectRatio}>
          <GatsbyImage
            image={gatsbyImage}
            alt={item.caption}
            className="h-full w-full object-cover select-none"
            imgStyle={{
              width: '100%',
              height: '100%',
              objectPosition: item.objectPosition ? item.objectPosition : undefined
            }}
            style={{
              pointerEvents: 'none',
            }}
          />
        </ImageFrame>
        <div className="mt-2">
          <h3 className="text-lg text-center font-medium text-gray-900">
            {item.caption}
          </h3>
          <p className="mt-1 text-sm text-center text-gray-500">
            {item.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="mb-20">
            <h2 className="text-center mb-4 text-2xl font-semibold text-gray-900">
              Prints
            </h2>
            <p className="font-display text-center mb-8 text-gray-600">
              Inspired by the Alps, Adirondacks, science fiction, and everything in between.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {PRINTS_METADATA.map(print => renderImage(print, "3/4"))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-center mb-4 text-2xl font-semibold text-gray-900">
              Single Stone Series
            </h2>
            <p className="font-display text-center mb-8 text-gray-600">
              A collection focusing on the elemental forms of stone, pine, grass, and snow in the Alps.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
              {SINGLE_STONES_METADATA.map(photo => renderImage(photo, "2/1"))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-center mb-4 text-2xl font-semibold text-gray-900">
              <span className="font-mono mb-4 text-xl font-medium italic text-gray-900 text-center">
                „s t o n e  x  s n o w"
              </span> Photography Series
            </h2>
            <p className="font-display text-center mb-8 text-gray-600">
              A collection of high resolution colorized panoramas from the Alps
              focusing on color, form, and texture of stone and snow.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
              {PANORAMAS_METADATA.map(photo => renderImage(photo, "2/1", 'pano'))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-center mt-20 mb-4 text-2xl font-semibold text-gray-900">
              Blue Hour Photography
            </h2>
            <p className="text-center mb-8 text-gray-600">
              View my complete collection of my blue hour focused photography at{' '}
              <a
                href="https://photography.chrisfrew.in"
                className="text-blue-600 hover:text-blue-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                photography.chrisfrew.in
              </a>
            </p>
          </section>
        </div>

        {selectedImage && (
          <ImageModal
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(undefined)}
            image={selectedImage.item}
            gatsbyImage={selectedImage.gatsbyImage}
          />
        )}
      </div>
    </Layout>
  );
}

export const Head = ({
  title,
  description,
  image,
  pathname
}: any) => (
  <SEO
    title={title}
    description={description}
    image={image}
    pathname={pathname}
  />
);