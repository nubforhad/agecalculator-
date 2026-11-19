/**
 * Automated Unit Tests for ChronoAge Engine
 * Run with: node tests/test_engine.js
 */

const AgeEngine = require('../assets/js/age-engine.js');
const AstrologyEngine = require('../assets/js/astrology.js');
const MilestonesEngine = require('../assets/js/milestones.js');
const LifeStatsEngine = require('../assets/js/life-stats.js');

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`  ✅ PASS: ${message}`);
        passed++;
    } else {
        console.error(`  ❌ FAIL: ${message}`);
        failed++;
    }
}

console.log('--- RUNNING CHRONOAGE ENGINE TESTS ---\n');

// Test 1: Leap Year calculations
console.log('Test Group 1: Leap Year Math');
assert(AgeEngine.isLeapYear(2024) === true, '2024 is a leap year');
assert(AgeEngine.isLeapYear(2020) === true, '2020 is a leap year');
assert(AgeEngine.isLeapYear(2000) === true, '2000 is a leap year (400 rule)');
assert(AgeEngine.isLeapYear(1900) === false, '1900 is NOT a leap year (100 rule)');
assert(AgeEngine.isLeapYear(2023) === false, '2023 is NOT a leap year');

// Test 2: Days in month
console.log('\nTest Group 2: Days in Month');
assert(AgeEngine.getDaysInMonth(2024, 1) === 29, 'Feb 2024 has 29 days');
assert(AgeEngine.getDaysInMonth(2023, 1) === 28, 'Feb 2023 has 28 days');
assert(AgeEngine.getDaysInMonth(2024, 0) === 31, 'Jan has 31 days');
assert(AgeEngine.getDaysInMonth(2024, 3) === 30, 'April has 30 days');

// Test 3: Exact Age Calculation
console.log('\nTest Group 3: Exact Age Math');
const birth = new Date('2000-01-01T00:00:00');
const target = new Date('2025-01-01T00:00:00');
const age25 = AgeEngine.calculateAge(birth, target);

assert(age25.years === 25, 'Exact 25 years');
assert(age25.months === 0, 'Exact 0 months');
assert(age25.days === 0, 'Exact 0 days');
assert(age25.birthDayOfWeek === 'Saturday', 'Born on a Saturday');

// Test 4: Zodiac Calculation
console.log('\nTest Group 4: Astrology & Zodiac');
const capricorn = AstrologyEngine.getWesternZodiac(new Date('2000-01-01'));
assert(capricorn.name === 'Capricorn', 'Jan 1 is Capricorn');
assert(capricorn.symbol === '♑', 'Symbol is ♑');

const aries = AstrologyEngine.getWesternZodiac(new Date('2000-03-25'));
assert(aries.name === 'Aries', 'March 25 is Aries');

const dragon = AstrologyEngine.getChineseZodiac(new Date('2000-01-01'));
assert(dragon.animal === 'Dragon', '2000 is Year of the Dragon');

const genZ = AstrologyEngine.getGeneration(new Date('2000-01-01'));
assert(genZ.name.includes('Generation Z'), '2000 is Gen Z');

// Test 5: Next Birthday Calculation
console.log('\nTest Group 5: Next Birthday');
const nb = AgeEngine.getNextBirthday(new Date('2000-05-15'), new Date('2024-01-01'));
assert(nb.date.getFullYear() === 2024, 'Next birthday year is 2024');
assert(nb.turningAge === 24, 'Turning 24 years old');

// Test 6: Planetary Ages
console.log('\nTest Group 6: Planetary Ages');
const planets = MilestonesEngine.getPlanetaryAges(3652.56, new Date('2010-01-01'), new Date('2020-01-01'));
const earth = planets.find(p => p.name === 'Earth');
assert(Math.round(earth.years) === 10, '10 Earth years');
const mercury = planets.find(p => p.name === 'Mercury');
assert(mercury.years > 40, 'Over 40 Mercury years');

console.log(`\n========================================`);
console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);
