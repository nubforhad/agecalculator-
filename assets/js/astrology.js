/**
 * Astrology & Cultural Profile Engine
 * Calculates Western Zodiac, Chinese Zodiac (animal + element), Generation, Birthstone, and Birth Flower.
 */
class AstrologyEngine {
    /**
     * Get Western Zodiac sign details
     * @param {Date} date
     */
    static getWesternZodiac(date) {
        const month = date.getMonth() + 1; // 1-12
        const day = date.getDate();

        const zodiacSigns = [
            {
                name: "Capricorn",
                symbol: "♑",
                element: "Earth",
                quality: "Cardinal",
                ruler: "Saturn",
                traits: "Ambitious, disciplined, patient, strategic",
                luckyStone: "Garnet / Onyx",
                color: "Brown & Charcoal",
                start: [12, 22], end: [1, 19]
            },
            {
                name: "Aquarius",
                symbol: "♒",
                element: "Air",
                quality: "Fixed",
                ruler: "Uranus",
                traits: "Innovative, independent, humanitarian, visionary",
                luckyStone: "Amethyst",
                color: "Electric Blue & Turquoise",
                start: [1, 20], end: [2, 18]
            },
            {
                name: "Pisces",
                symbol: "♓",
                element: "Water",
                quality: "Mutable",
                ruler: "Neptune",
                traits: "Empathetic, artistic, intuitive, imaginative",
                luckyStone: "Aquamarine",
                color: "Sea Green & Lavender",
                start: [2, 19], end: [3, 20]
            },
            {
                name: "Aries",
                symbol: "♈",
                element: "Fire",
                quality: "Cardinal",
                ruler: "Mars",
                traits: "Bold, energetic, trailblazing, competitive",
                luckyStone: "Diamond / Bloodstone",
                color: "Red & Crimson",
                start: [3, 21], end: [4, 19]
            },
            {
                name: "Taurus",
                symbol: "♉",
                element: "Earth",
                quality: "Fixed",
                ruler: "Venus",
                traits: "Patient, reliable, luxurious, grounded",
                luckyStone: "Emerald",
                color: "Emerald Green & Earth Tones",
                start: [4, 20], end: [5, 20]
            },
            {
                name: "Gemini",
                symbol: "♊",
                element: "Air",
                quality: "Mutable",
                ruler: "Mercury",
                traits: "Curious, versatile, witty, expressive",
                luckyStone: "Agate / Pearl",
                color: "Yellow & Light Green",
                start: [5, 21], end: [6, 20]
            },
            {
                name: "Cancer",
                symbol: "♋",
                element: "Water",
                quality: "Cardinal",
                ruler: "Moon",
                traits: "Nurturing, intuitive, protective, sentimental",
                luckyStone: "Ruby / Moonstone",
                color: "Silver & White",
                start: [6, 21], end: [7, 22]
            },
            {
                name: "Leo",
                symbol: "♌",
                element: "Fire",
                quality: "Fixed",
                ruler: "Sun",
                traits: "Charismatic, generous, warm-hearted, regal",
                luckyStone: "Peridot",
                color: "Gold & Orange",
                start: [7, 23], end: [8, 22]
            },
            {
                name: "Virgo",
                symbol: "♍",
                element: "Earth",
                quality: "Mutable",
                ruler: "Mercury",
                traits: "Meticulous, analytical, helpful, practical",
                luckyStone: "Sapphire",
                color: "Navy & Olive Green",
                start: [8, 23], end: [9, 22]
            },
            {
                name: "Libra",
                symbol: "♎",
                element: "Air",
                quality: "Cardinal",
                ruler: "Venus",
                traits: "Diplomatic, harmonious, charming, idealistic",
                luckyStone: "Opal",
                color: "Pastel Pink & Sky Blue",
                start: [9, 23], end: [10, 22]
            },
            {
                name: "Scorpio",
                symbol: "♏",
                element: "Water",
                quality: "Fixed",
                ruler: "Pluto & Mars",
                traits: "Passionate, magnetic, determined, deeply perceptive",
                luckyStone: "Topaz",
                color: "Deep Maroon & Black",
                start: [10, 23], end: [11, 21]
            },
            {
                name: "Sagittarius",
                symbol: "♐",
                element: "Fire",
                quality: "Mutable",
                ruler: "Jupiter",
                traits: "Philosophical, adventurous, optimistic, honest",
                luckyStone: "Turquoise",
                color: "Purple & Royal Blue",
                start: [11, 22], end: [12, 21]
            }
        ];

        for (const sign of zodiacSigns) {
            const [sm, sd] = sign.start;
            const [em, ed] = sign.end;

            if (sm > em) { // Spans across New Year (Capricorn: Dec 22 to Jan 19)
                if ((month === sm && day >= sd) || (month === em && day <= ed)) {
                    return sign;
                }
            } else {
                if ((month === sm && day >= sd) || (month === em && day <= ed) || (month > sm && month < em)) {
                    return sign;
                }
            }
        }

        return zodiacSigns[0]; // fallback
    }

    /**
     * Get Chinese Zodiac (Animal, Element, Polarity)
     * @param {Date} date
     */
    static getChineseZodiac(date) {
        const year = date.getFullYear();

        const animals = [
            { name: "Rat", emoji: "🐀", traits: "Resourceful, quick-witted, charming, versatile", luckyNumbers: [2, 3] },
            { name: "Ox", emoji: "🐂", traits: "Diligent, dependable, strong, determined", luckyNumbers: [1, 4] },
            { name: "Tiger", emoji: "🐅", traits: "Brave, competitive, unpredictable, confident", luckyNumbers: [1, 3, 4] },
            { name: "Rabbit", emoji: "🐇", traits: "Gentle, elegant, quiet, patient, responsible", luckyNumbers: [3, 4, 6] },
            { name: "Dragon", emoji: "🐉", traits: "Confident, charismatic, intelligent, ambitious", luckyNumbers: [1, 6, 7] },
            { name: "Snake", emoji: "🐍", traits: "Wise, enigmatic, intuitive, sophisticated", luckyNumbers: [2, 8, 9] },
            { name: "Horse", emoji: "🐎", traits: "Energetic, independent, adventurous, warm", luckyNumbers: [2, 3, 7] },
            { name: "Goat", emoji: "🐐", traits: "Creative, mild-mannered, sympathetic, calm", luckyNumbers: [2, 7] },
            { name: "Monkey", emoji: "🐒", traits: "Clever, innovative, playful, problem-solver", luckyNumbers: [4, 9] },
            { name: "Rooster", emoji: "🐓", traits: "Observant, hardworking, courageous, punctual", luckyNumbers: [5, 7, 8] },
            { name: "Dog", emoji: "🐕", traits: "Loyal, honest, cautious, warm-hearted", luckyNumbers: [3, 4, 9] },
            { name: "Pig", emoji: "🐖", traits: "Compassionate, generous, diligent, optimistic", luckyNumbers: [2, 5, 8] }
        ];

        const elements = ["Wood", "Fire", "Earth", "Metal", "Water"];
        const elementColors = {
            "Wood": "#10b981",
            "Fire": "#ef4444",
            "Earth": "#d97706",
            "Metal": "#94a3b8",
            "Water": "#3b82f6"
        };

        // Offset calculation based on 1900 (Metal Rat)
        const animalIndex = ((year - 4) % 12 + 12) % 12;
        const elementIndex = Math.floor((((year - 4) % 10 + 10) % 10) / 2);
        const polarity = year % 2 === 0 ? "Yang" : "Yin";

        const animal = animals[animalIndex];
        const element = elements[elementIndex];

        return {
            year,
            animal: animal.name,
            emoji: animal.emoji,
            element,
            elementColor: elementColors[element],
            polarity,
            title: `${polarity} ${element} ${animal.name}`,
            traits: animal.traits,
            luckyNumbers: animal.luckyNumbers
        };
    }

    /**
     * Get Generation classification based on birth year
     * @param {Date} date
     */
    static getGeneration(date) {
        const year = date.getFullYear();

        if (year >= 2025) {
            return {
                name: "Generation Beta",
                era: "2025 - 2039",
                description: "The AI-native generation growing up alongside ambient artificial intelligence and space commercialization."
            };
        } else if (year >= 2013) {
            return {
                name: "Generation Alpha",
                era: "2013 - 2024",
                description: "The first generation entirely born within the 21st century, deeply digital, innovative, and global."
            };
        } else if (year >= 1997) {
            return {
                name: "Generation Z (Zoomers)",
                era: "1997 - 2012",
                description: "Digital natives known for tech savviness, pragmatic ideals, creativity, and visual communication."
            };
        } else if (year >= 1981) {
            return {
                name: "Millennials (Gen Y)",
                era: "1981 - 1996",
                description: "Pioneered the transition from analog to digital, values work-life balance, diversity, and experiences."
            };
        } else if (year >= 1965) {
            return {
                name: "Generation X",
                era: "1965 - 1980",
                description: "Self-reliant, bridge generation between pre-internet and digital eras, known for adaptability."
            };
        } else if (year >= 1946) {
            return {
                name: "Baby Boomers",
                era: "1946 - 1964",
                description: "Post-WWII generation characterized by strong work ethic, optimism, and major cultural shifts."
            };
        } else if (year >= 1928) {
            return {
                name: "Silent Generation",
                era: "1928 - 1945",
                description: "Grew up through the Great Depression and WWII, known for resilience, civic responsibility, and modesty."
            };
        } else {
            return {
                name: "The Greatest Generation",
                era: "Before 1928",
                description: "Overcame tremendous historic challenges with teamwork, endurance, and quiet heroism."
            };
        }
    }

    /**
     * Get Birthstone and Birth Flower for the birth month
     * @param {Date} date
     */
    static getBirthGemsAndFlowers(date) {
        const month = date.getMonth(); // 0-11
        const monthData = [
            {
                month: "January",
                stone: "Garnet",
                stoneMeaning: "Protection, friendship, trust, and vitality",
                stoneHex: "#991b1b",
                flower: "Carnation & Snowdrop",
                flowerMeaning: "Devotion, fascination, and purity"
            },
            {
                month: "February",
                stone: "Amethyst",
                stoneMeaning: "Clarity, peace, royalty, and courage",
                stoneHex: "#7e22ce",
                flower: "Violet & Primrose",
                flowerMeaning: "Faithfulness, virtue, and young love"
            },
            {
                month: "March",
                stone: "Aquamarine",
                stoneMeaning: "Tranquility, harmony, and youthful hope",
                stoneHex: "#38bdf8",
                flower: "Daffodil",
                flowerMeaning: "Rebirth, new beginnings, and prosperity"
            },
            {
                month: "April",
                stone: "Diamond",
                stoneMeaning: "Eternal love, strength, and invincibility",
                stoneHex: "#e2e8f0",
                flower: "Daisy & Sweet Pea",
                flowerMeaning: "Innocence, blissful pleasure, and farewell"
            },
            {
                month: "May",
                stone: "Emerald",
                stoneMeaning: "Rebirth, love, wisdom, and intuition",
                stoneHex: "#059669",
                flower: "Lily of the Valley & Hawthorn",
                flowerMeaning: "Sweetness, humility, and hope"
            },
            {
                month: "June",
                stone: "Pearl & Alexandrite",
                stoneMeaning: "Purity, luck, good fortune, and balance",
                stoneHex: "#f8fafc",
                flower: "Rose & Honeysuckle",
                flowerMeaning: "Devotion, passion, beauty, and bonds of love"
            },
            {
                month: "July",
                stone: "Ruby",
                stoneMeaning: "Nobility, passion, life force, and prosperity",
                stoneHex: "#dc2626",
                flower: "Larkspur & Water Lily",
                flowerMeaning: "Dignity, positivity, and purity of heart"
            },
            {
                month: "August",
                stone: "Peridot",
                stoneMeaning: "Strength, protection from nightmares, and happiness",
                stoneHex: "#84cc16",
                flower: "Gladiolus & Poppy",
                flowerMeaning: "Integrity, infatuation, and fond remembrance"
            },
            {
                month: "September",
                stone: "Sapphire",
                stoneMeaning: "Wisdom, loyalty, nobility, and truth",
                stoneHex: "#1d4ed8",
                flower: "Aster & Morning Glory",
                flowerMeaning: "Powerful love, wisdom, and patience"
            },
            {
                month: "October",
                stone: "Opal & Tourmaline",
                stoneMeaning: "Inspiration, creativity, hope, and compassion",
                stoneHex: "#fb7185",
                flower: "Marigold & Cosmos",
                flowerMeaning: "Creativity, fierce drive, peace, and order"
            },
            {
                month: "November",
                stone: "Topaz & Citrine",
                stoneMeaning: "Warmth, healing, vitality, and wealth",
                stoneHex: "#f59e0b",
                flower: "Chrysanthemum",
                flowerMeaning: "Joy, optimism, long life, and fidelity"
            },
            {
                month: "December",
                stone: "Tanzanite & Turquoise",
                stoneMeaning: "Good luck, tranquil calm, and spiritual elevation",
                stoneHex: "#06b6d4",
                flower: "Narcissus & Holly",
                flowerMeaning: "Hope, good wishes, and domestic joy"
            }
        ];

        return monthData[month];
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AstrologyEngine;
}
