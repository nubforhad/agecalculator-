/**
 * LifeStatsEngine - Calculates biological, physical, and cosmic stats of a person's life journey
 */
class LifeStatsEngine {
    /**
     * Calculate comprehensive life stats based on total age seconds and days
     * @param {Object} ageResult - Result from AgeEngine.calculateAge
     * @param {Date} birthDate
     */
    static calculateStats(ageResult, birthDate) {
        const totalSeconds = ageResult.total.seconds;
        const totalMinutes = ageResult.total.minutes;
        const totalHours = ageResult.total.hours;
        const totalDays = ageResult.total.days;
        const totalYears = ageResult.total.years;

        // Biological estimates based on medical research averages:
        // Average resting heart rate ~72-80 bpm
        const heartbeats = Math.floor(totalMinutes * 78);
        
        // Average breathing rate: 16 breaths per minute
        const breaths = Math.floor(totalMinutes * 16);

        // Sleep: Average human sleeps ~8 hours per day (~33.3% of life)
        const hoursSlept = Math.floor(totalDays * 8);
        const daysSlept = Number((hoursSlept / 24).toFixed(1));
        // Average person has 4-6 dreams per night
        const dreams = Math.floor(totalDays * 4.5);

        // Nutrition & Hydration:
        // Average 3 meals per day
        const meals = Math.floor(totalDays * 3);
        // Average ~2 liters of water/fluid per day
        const waterLiters = Math.floor(totalDays * 2.2);

        // Blinking:
        // Average 17 blinks per minute during awake hours (16 hours/day)
        const awakeMinutes = Math.floor(totalDays * 16 * 60);
        const blinks = Math.floor(awakeMinutes * 17);

        // Cosmic & Earth Journey:
        // Earth orbits Sun at ~107,226 km/h (29.78 km/s) -> ~2,573,424 km per day
        const distanceAroundSunKm = Math.floor(totalDays * 2573424);
        const distanceAroundSunMiles = Math.floor(distanceAroundSunKm * 0.621371);

        // Earth rotational distance (approx 1,670 km/h at equator, ~1,100 km/h average human latitude)
        const rotationDistanceKm = Math.floor(totalDays * 30000);

        // Psychological / Social:
        // Average adult laughs ~15 times per day (children ~300, we use a balanced adult average ~18)
        const laughs = Math.floor(totalDays * 18);

        // Hair & Nails Growth:
        // Scalp hair grows ~0.4 mm per day (approx 15 cm / 6 inches per year)
        const hairGrowthCm = Number((totalDays * 0.04).toFixed(1));
        // Finger nails grow ~0.1 mm per day (approx 3.6 cm per year)
        const nailGrowthCm = Number((totalDays * 0.01).toFixed(1));

        // Moon Phase at birth
        const moonPhase = LifeStatsEngine.getMoonPhase(birthDate);

        return {
            heartbeats,
            breaths,
            hoursSlept,
            daysSlept,
            dreams,
            meals,
            waterLiters,
            blinks,
            distanceAroundSunKm,
            distanceAroundSunMiles,
            rotationDistanceKm,
            laughs,
            hairGrowthCm,
            nailGrowthCm,
            moonPhase
        };
    }

    /**
     * Calculate approximate Moon Phase for any date
     * Uses the synodic month cycle (29.53058867 days)
     * Reference known New Moon: January 6, 2000 at 18:14 UTC
     * @param {Date} date
     */
    static getMoonPhase(date) {
        const synodicMonth = 29.53058867;
        const refNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
        const diffDays = (date.getTime() - refNewMoon.getTime()) / (1000 * 60 * 60 * 24);

        // Normalize phase between 0 and 29.53
        let phaseDay = diffDays % synodicMonth;
        if (phaseDay < 0) phaseDay += synodicMonth;

        const phaseFraction = phaseDay / synodicMonth;

        const phases = [
            { name: "New Moon", emoji: "🌑", min: 0.0, max: 0.03, description: "Beginnings, stillness, new intentions" },
            { name: "Waxing Crescent", emoji: "🌒", min: 0.03, max: 0.22, description: "Growth, curiosity, developing momentum" },
            { name: "First Quarter", emoji: "🌓", min: 0.22, max: 0.28, description: "Decision, strength, overcoming obstacles" },
            { name: "Waxing Gibbous", emoji: "🌔", min: 0.28, max: 0.47, description: "Refinement, dedication, anticipation" },
            { name: "Full Moon", emoji: "🌕", min: 0.47, max: 0.53, description: "Radiance, culmination, heightened intuition" },
            { name: "Waning Gibbous", emoji: "🌖", min: 0.53, max: 0.72, description: "Gratitude, sharing wisdom, harvest" },
            { name: "Last Quarter", emoji: "🌗", min: 0.72, max: 0.78, description: "Release, reflection, forgiveness" },
            { name: "Waning Crescent", emoji: "🌘", min: 0.78, max: 0.97, description: "Rest, surrender, deep contemplation" },
            { name: "New Moon", emoji: "🌑", min: 0.97, max: 1.0, description: "Beginnings, stillness, new intentions" }
        ];

        for (const p of phases) {
            if (phaseFraction >= p.min && phaseFraction < p.max) {
                return {
                    name: p.name,
                    emoji: p.emoji,
                    illumination: Math.round((1 - Math.cos(phaseFraction * 2 * Math.PI)) / 2 * 100),
                    description: p.description,
                    dayOfCycle: Number(phaseDay.toFixed(1))
                };
            }
        }

        return {
            name: "Full Moon",
            emoji: "🌕",
            illumination: 100,
            description: "Radiance and fruition",
            dayOfCycle: 14.8
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LifeStatsEngine;
}
