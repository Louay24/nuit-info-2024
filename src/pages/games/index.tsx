import React, { useState, useEffect } from "react";
import Xarrow from "react-xarrows";
import {
  RefreshCw,
  Brain,
  Waves,
  Fish,
  Droplet,
  Wind,
  Heart,
  Mountain,
  Zap,
} from "lucide-react";

const analogies = [
  {
    body: "Système circulatoire",
    ocean: "Courants océaniques",
    description: {
      body: "Les veines et artères transportent le sang, apportant l'oxygène et les nutriments aux cellules et évacuant les déchets.",
      ocean:
        "Les courants marins, comme le Gulf Stream, transportent la chaleur et les nutriments à travers le globe, influençant les écosystèmes marins et le climat.",
    },
    icons: { body: Heart, ocean: Wind },
  },
  {
    body: "Cerveau",
    ocean: "Récifs coralliens",
    description: {
      body: "Le cerveau est un centre complexe de connexions neurales, assurant la communication et le contrôle du corps.",
      ocean:
        "Les récifs coralliens sont des 'centres nerveux' de l'océan, riches en biodiversité, où différentes espèces interagissent pour maintenir un écosystème équilibré.",
    },
    icons: { body: Brain, ocean: Fish },
  },
  {
    body: "Système immunitaire",
    ocean: "Chaînes alimentaires",
    description: {
      body: "Le système immunitaire défend le corps contre les agents pathogènes et maintient l'équilibre interne.",
      ocean:
        "Les chaînes alimentaires maintiennent l'équilibre écologique, chaque niveau jouant un rôle dans la régulation des populations d'espèces.",
    },
    icons: { body: Droplet, ocean: Waves },
  },
  {
    body: "Peau",
    ocean: "Surface de l'océan",
    description: {
      body: "La peau agit comme une barrière protectrice, régulant la température et l'humidité.",
      ocean:
        "La surface de l'océan régule les échanges d'énergie avec l'atmosphère, absorbant la chaleur du soleil et influençant les cycles climatiques.",
    },
    icons: { body: Droplet, ocean: Wind },
  },
  {
    body: "Système respiratoire",
    ocean: "Phytoplancton",
    description: {
      body: "Les poumons permettent de capter l'oxygène et d'évacuer le dioxyde de carbone.",
      ocean:
        "Le phytoplancton, via la photosynthèse, produit une grande partie de l'oxygène de la planète et absorbe le dioxyde de carbone.",
    },
    icons: { body: Zap, ocean: Fish }, // Replaced with Zap as a placeholder
  },
  {
    body: "Squelette",
    ocean: "Fonds marins",
    description: {
      body: "Le squelette fournit une structure au corps et protège les organes vitaux.",
      ocean:
        "Les dorsales océaniques et les reliefs sous-marins structurent l'océan, influençant les courants et habitats.",
    },
    icons: { body: Mountain, ocean: Mountain },
  },
  {
    body: "Flux nerveux",
    ocean: "Ondes océaniques",
    description: {
      body: "Les signaux électriques dans le système nerveux transmettent des informations entre le cerveau et le reste du corps.",
      ocean:
        "Les vagues et les marées transmettent l'énergie à travers l'océan, influençant les côtes et les écosystèmes marins.",
    },
    icons: { body: Zap, ocean: Waves },
  },
  {
    body: "Métabolisme",
    ocean: "Cycle de l'eau",
    description: {
      body: "Le métabolisme assure la transformation de l'énergie et l'élimination des déchets.",
      ocean:
        "Le cycle de l'eau (évaporation, condensation, précipitation) redistribue l'énergie et régule la température terrestre.",
    },
    icons: { body: Wind, ocean: Droplet },
  },
];

export const Game = () => {
  const [selectedBody, setSelectedBody] = useState(null);
  const [selectedOcean, setSelectedOcean] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [shuffledBodies, setShuffledBodies] = useState([]);
  const [shuffledOceans, setShuffledOceans] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setShuffledBodies(shuffleArray(analogies.map((a) => a.body)));
    setShuffledOceans(shuffleArray(analogies.map((a) => a.ocean)));
    setMatchedPairs([]);
    setSelectedBody(null);
    setSelectedOcean(null);
    setGameWon(false);
  };

  const shuffleArray = (array) =>
    array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);

  const handleBodySelect = (body) =>
    setSelectedBody(body === selectedBody ? null : body);

  const handleOceanSelect = (ocean) =>
    setSelectedOcean(ocean === selectedOcean ? null : ocean);

  const checkMatch = () => {
    if (selectedBody && selectedOcean) {
      const match = analogies.find(
        (a) => a.body === selectedBody && a.ocean === selectedOcean
      );

      // Remove any previous incorrect matches for these items
      setMatchedPairs((prev) =>
        prev.filter(
          (pair) =>
            pair.isCorrect ||
            (pair.body !== selectedBody && pair.ocean !== selectedOcean)
        )
      );

      setMatchedPairs((prev) => [
        ...prev,
        { body: selectedBody, ocean: selectedOcean, isCorrect: !!match },
      ]);
      setSelectedBody(null);
      setSelectedOcean(null);

      if (
        matchedPairs.filter((pair) => pair.isCorrect).length + 1 ===
        analogies.length
      ) {
        setGameWon(true);
      }
    }
  };

  useEffect(() => {
    checkMatch();
  }, [selectedBody, selectedOcean]);

  const renderMatchItem = (item, type) => {
    const analogy = analogies.find((a) => a[type] === item);
    const IconComponent = analogy?.icons?.[type] || Brain;

    return (
      <div
        key={item}
        id={item}
        onClick={() =>
          type === "body" ? handleBodySelect(item) : handleOceanSelect(item)
        }
        className={`
          p-3 m-2 border-2 rounded-lg cursor-pointer 
          flex items-center space-x-3 
          transition-all duration-300 ease-in-out
          ${
            matchedPairs.some((pair) => pair[type] === item && pair.isCorrect)
              ? "bg-green-100 text-green-800 cursor-default scale-95"
              : selectedBody === item || selectedOcean === item
              ? "bg-blue-100 border-blue-300 shadow-md"
              : "hover:bg-gray-100 hover:shadow-sm"
          }
        `}
      >
        <IconComponent className="text-blue-500" size={24} />
        <span className="font-medium">{item}</span>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 border-4 border-blue-200">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-800 drop-shadow-md">
          🌊 Analogies Corps & Océan 🧬
        </h1>

        {gameWon && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6 text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              🎉 Félicitations ! 🏆
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {analogies.map((analogy, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md border border-green-100"
                >
                  <h3 className="font-bold text-lg text-green-800 mb-2">
                    {analogy.body} ↔ {analogy.ocean}
                  </h3>
                  <p className="text-sm">
                    <strong>Corps :</strong> {analogy.description.body}
                  </p>
                  <p className="text-sm">
                    <strong>Océan :</strong> {analogy.description.ocean}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-6 justify-between">
          <div
            style={{
              width: "48%",
            }}
          >
            <h2 className="font-semibold text-xl text-blue-700 mb-4">
              Corps Humain
            </h2>
            {shuffledBodies.map((body) => renderMatchItem(body, "body"))}
          </div>
          <div
            style={{
              width: "48%",
            }}
          >
            <h2 className="font-semibold text-xl text-blue-700 mb-4">Océan</h2>
            {shuffledOceans.map((ocean) => renderMatchItem(ocean, "ocean"))}
          </div>
        </div>

        {matchedPairs.map(({ body, ocean, isCorrect }, index) => (
          <Xarrow
            key={index}
            start={body}
            end={ocean}
            color={isCorrect ? "green" : "red"}
            strokeWidth={3}
            dashness={!isCorrect}
            showHead={false}
          />
        ))}

        <div className="mt-6 flex justify-center">
          <button
            onClick={resetGame}
            className="
              bg-blue-500 text-white 
              px-6 py-3 rounded-full 
              flex items-center 
              hover:bg-blue-600 
              transition-colors 
              shadow-md 
              hover:shadow-lg
            "
          >
            <RefreshCw className="mr-2" size={20} />
            Recommencer
          </button>
        </div>
      </div>
    </div>
  );
};
