/**
 * Milestones, Planetary Ages, and Pet Age Conversions
 */
class MilestonesEngine {
    /**
     * Compute special life milestones (1,000 days, 10,000 days, 1 billion seconds, etc.)
     * @param {Date} birthDate
     * @param {Date} [now]
     */
    static getLifeMilestones(birthDate, now = new Date()) {
        const milestones = [
            { type: 'days', value: 100, label: "100 Days Celebration (Traditional Baek-il)", icon: "🌱" },
            { type: 'days', value: 1000, label: "1,000 Days on Earth (~2.7 years)", icon: "⭐" },
            { type: 'days', value: 5000, label: "5,000 Days Milestone (~13.7 years)", icon: "🚀" },
            { type: 'days', value: 10000, label: "The 10,000-Day Club (~27.4 years)", icon: "👑" },
            { type: 'days', value: 15000, label: "15,000 Days Milestone (~41.1 years)", icon: "🏆" },
            { type: 'days', value: 20000, label: "20,000 Days Milestone (~54.8 years)", icon: "🌟" },
            { type: 'days', value: 25000, label: "Quarter Century of Thousand Days (25k days = ~68.4 yrs)", icon: "💎" },
            { type: 'days', value: 30000, label: "30,000 Days Legend (~82.1 years)", icon: "✨" },

            // Seconds milestones
            { type: 'seconds', value: 100000000, label: "100 Million Seconds (~3.17 years)", icon: "⏱️" },
            { type: 'seconds', value: 500000000, label: "Half-Billion Seconds (~15.85 years)", icon: "⚡" },
            { type: 'seconds', value: 1000000000, label: "The 1 Billion Seconds Club (~31.69 years)", icon: "🌌" },
            { type: 'seconds', value: 2000000000, label: "2 Billion Seconds Milestone (~63.38 years)", icon: "🔮" },

            // Traditional Age Milestones
            { type: 'years', value: 18, label: "Official Adulthood (18 Years)", icon: "🎓" },
            { type: 'years', value: 21, label: "Universal Majority (21 Years)", icon: "🔑" },
            { type: 'years', value: 30, label: "Flirty Thirties (30 Years)", icon: "🔥" },
            { type: 'years', value: 40, label: "Fabulous Forties (40 Years)", icon: "🍷" },
            { type: 'years', value: 50, label: "Golden Jubilee (50 Years)", icon: "🥇" },
            { type: 'years', value: 60, label: "Diamond Wisdom (60 Years)", icon: "💎" },
            { type: 'years', value: 75, label: "Platinum Age (75 Years)", icon: "🏅" },
            { type: 'years', value: 100, label: "Centenarian Milestone (100 Years!)", icon: "👑" }
        ];

        return milestones.map(m => {
            const milestoneDate = AgeEngine.getDateAtMilestone(birthDate, m.type, m.value);
            const isAchieved = milestoneDate <= now;
            const diffMs = Math.abs(milestoneDate.getTime() - now.getTime());
            const daysDiff = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

            return {
                ...m,
                date: milestoneDate,
                formattedDate: milestoneDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),
                isAchieved,
                daysRemaining: isAchieved ? 0 : daysDiff,
                daysPassed: isAchieved ? daysDiff : 0
            };
        }).sort((a, b) => a.date.getTime() - b.date.getTime());
    }

    /**
     * Calculate age on all planets in the Solar System
     * @param {number} totalEarthDays
     * @param {Date} birthDate
     * @param {Date} [now]
     */
    static getPlanetaryAges(totalEarthDays, birthDate, now = new Date()) {
        const planets = [
            {
                name: "Mercury",
                orbitalDays: 87.969,
                color: "#94a3b8",
                icon: "⚪",
                funFact: "A year on Mercury is shorter than a day on Mercury (which takes 176 Earth days)!"
            },
            {
                name: "Venus",
                orbitalDays: 224.701,
                color: "#f59e0b",
                icon: "🟡",
                funFact: "Venus spins backwards compared to most other planets!"
            },
            {
                name: "Earth",
                orbitalDays: 365.256,
                color: "#3b82f6",
                icon: "🌍",
                funFact: "Your home planet! Traveling through space at 107,000 km/h."
            },
            {
                name: "Mars",
                orbitalDays: 686.980,
                color: "#ef4444",
                icon: "🔴",
                funFact: "Home to Olympus Mons, the largest volcano in the Solar System (3x Everest)!"
            },
            {
                name: "Jupiter",
                orbitalDays: 4332.589,
                color: "#d97706",
                icon: "🪐",
                funFact: "Massive gas giant with 95 moons; its Great Red Spot storm is bigger than Earth."
            },
            {
                name: "Saturn",
                orbitalDays: 10759.22,
                color: "#eab308",
                icon: "🪐",
                funFact: "Spectacular ring system spanning 282,000 km across but only ~10 meters thick!"
            },
            {
                name: "Uranus",
                orbitalDays: 30685.4,
                color: "#06b6d4",
                icon: "🌐",
                funFact: "Rotates on its side with an axial tilt of 98 degrees—seasons last 21 Earth years!"
            },
            {
                name: "Neptune",
                orbitalDays: 60189.0,
                color: "#2563eb",
                icon: "🔵",
                funFact: "Features the fastest winds recorded in the solar system, exceeding 2,100 km/h!"
            },
            {
                name: "Pluto",
                orbitalDays: 90560.0,
                color: "#a855f7",
                icon: "🟣",
                funFact: "Beloved dwarf planet with a giant nitrogen-ice heart named Tombaugh Regio."
            }
        ];

        return planets.map(p => {
            const planetYears = totalEarthDays / p.orbitalDays;
            const wholeYears = Math.floor(planetYears);
            const remainingFraction = planetYears - wholeYears;
            const daysIntoCurrentYear = remainingFraction * p.orbitalDays;
            const daysUntilNextPlanetBday = Math.ceil(p.orbitalDays - daysIntoCurrentYear);

            // Approximate next planetary birthday date on Earth calendar
            const nextBirthdayDate = new Date(now.getTime() + (daysUntilNextPlanetBday * 86400 * 1000));

            return {
                name: p.name,
                years: Number(planetYears.toFixed(2)),
                wholeYears,
                color: p.color,
                icon: p.icon,
                orbitalPeriodDays: p.orbitalDays,
                daysUntilNextBday: daysUntilNextPlanetBday,
                nextBirthdayDate: nextBirthdayDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }),
                funFact: p.funFact
            };
        });
    }

    /**
     * Calculate pet equivalent ages based on modern veterinary biology
     * @param {number} humanYears
     */
    static getPetAges(humanYears) {
        // Dog curves:
        // Small dogs (<20 lbs): Year 1 = 15, Year 2 = 24, then +4/yr
        let smallDog = 0;
        if (humanYears <= 1) smallDog = humanYears * 15;
        else if (humanYears <= 2) smallDog = 15 + (humanYears - 1) * 9;
        else smallDog = 24 + (humanYears - 2) * 4;

        // Medium dogs (20-50 lbs): Year 1 = 15, Year 2 = 24, then +5/yr
        let mediumDog = 0;
        if (humanYears <= 1) mediumDog = humanYears * 15;
        else if (humanYears <= 2) mediumDog = 15 + (humanYears - 1) * 9;
        else mediumDog = 24 + (humanYears - 2) * 5;

        // Large dogs (>50 lbs): Year 1 = 14, Year 2 = 22, then +6-7/yr
        let largeDog = 0;
        if (humanYears <= 1) largeDog = humanYears * 14;
        else if (humanYears <= 2) largeDog = 14 + (humanYears - 1) * 8;
        else largeDog = 22 + (humanYears - 2) * 6.5;

        // Cats: Year 1 = 15, Year 2 = 24, then +4/yr
        let cat = 0;
        if (humanYears <= 1) cat = humanYears * 15;
        else if (humanYears <= 2) cat = 15 + (humanYears - 1) * 9;
        else cat = 24 + (humanYears - 2) * 4;

        // Horse: Year 1 = 6.5, Year 2 = 13, Year 3 = 18, then +2.5/yr
        let horse = 0;
        if (humanYears <= 3) horse = humanYears * 6;
        else horse = 18 + (humanYears - 3) * 2.5;

        // Rabbit: Year 1 = 20, Year 2 = 28, then +6/yr
        let rabbit = 0;
        if (humanYears <= 1) rabbit = humanYears * 20;
        else if (humanYears <= 2) rabbit = 20 + (humanYears - 1) * 8;
        else rabbit = 28 + (humanYears - 2) * 6;

        return [
            { species: "Cat", emoji: "🐱", age: Number(cat.toFixed(1)), note: "Feline years (15yr first year, +4yr thereafter)" },
            { species: "Small Dog (<20 lbs)", emoji: "🐕", age: Number(smallDog.toFixed(1)), note: "Longer average lifespan (14-16 yrs)" },
            { species: "Medium Dog (20-50 lbs)", emoji: "🦮", age: Number(mediumDog.toFixed(1)), note: "Balanced canine development curve" },
            { species: "Large Dog (>50 lbs)", emoji: "🐕‍🦺", age: Number(largeDog.toFixed(1)), note: "Ages faster after year 5" },
            { species: "Rabbit", emoji: "🐇", age: Number(rabbit.toFixed(1)), note: "Matures very rapidly in early life" },
            { species: "Horse", emoji: "🐎", age: Number(horse.toFixed(1)), note: "Lifespan commonly reaches 25-30 years" }
        ];
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MilestonesEngine;
}
