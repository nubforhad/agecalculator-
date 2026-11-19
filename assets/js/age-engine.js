/**
 * AgeEngine - High-precision date, time, and age calculation library
 * Handles leap years, differing month lengths, timezones, and microsecond accuracy.
 */
class AgeEngine {
    /**
     * Determine if a year is a leap year in the Gregorian calendar
     * @param {number} year
     * @returns {boolean}
     */
    static isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    /**
     * Get number of days in a given month and year
     * @param {number} year
     * @param {number} month - 0-indexed (0 = Jan, 11 = Dec)
     * @returns {number}
     */
    static getDaysInMonth(year, month) {
        // month is 0-indexed. Passing month + 1 with day 0 gives the last day of 'month'
        return new Date(year, month + 1, 0).getDate();
    }

    /**
     * Calculate exact age between birthDate and targetDate
     * Returns structured object with years, months, days, hours, minutes, seconds,
     * as well as total cumulative totals.
     * 
     * @param {Date|string} birthDateInput
     * @param {Date|string} [targetDateInput] Defaults to now
     * @returns {Object} Full breakdown of age
     */
    static calculateAge(birthDateInput, targetDateInput = new Date()) {
        const birthDate = new Date(birthDateInput);
        const targetDate = new Date(targetDateInput);

        if (isNaN(birthDate.getTime()) || isNaN(targetDate.getTime())) {
            throw new Error("Invalid date provided to AgeEngine.calculateAge");
        }

        const isNegative = targetDate < birthDate;
        let start = isNegative ? targetDate : birthDate;
        let end = isNegative ? birthDate : targetDate;

        // Breakdown components
        let endYear = end.getFullYear();
        let endMonth = end.getMonth();
        let endDay = end.getDate();
        let endHour = end.getHours();
        let endMinute = end.getMinutes();
        let endSecond = end.getSeconds();

        let startYear = start.getFullYear();
        let startMonth = start.getMonth();
        let startDay = start.getDate();
        let startHour = start.getHours();
        let startMinute = start.getMinutes();
        let startSecond = start.getSeconds();

        let seconds = endSecond - startSecond;
        let minutes = endMinute - startMinute;
        let hours = endHour - startHour;
        let days = endDay - startDay;
        let months = endMonth - startMonth;
        let years = endYear - startYear;

        // Borrow seconds
        if (seconds < 0) {
            seconds += 60;
            minutes -= 1;
        }

        // Borrow minutes
        if (minutes < 0) {
            minutes += 60;
            hours -= 1;
        }

        // Borrow hours
        if (hours < 0) {
            hours += 24;
            days -= 1;
        }

        // Borrow days
        if (days < 0) {
            // Find days in previous month of target
            let prevMonth = endMonth - 1;
            let prevYear = endYear;
            if (prevMonth < 0) {
                prevMonth = 11;
                prevYear -= 1;
            }
            const daysInPrevMonth = AgeEngine.getDaysInMonth(prevYear, prevMonth);
            days += daysInPrevMonth;
            months -= 1;
        }

        // Borrow months
        if (months < 0) {
            months += 12;
            years -= 1;
        }

        // Cumulative totals
        const totalMilliseconds = Math.abs(end.getTime() - start.getTime());
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);
        const totalWeeks = Math.floor(totalDays / 7);
        const remainingDaysInWeek = totalDays % 7;

        // Approximate total months (taking exact calendar span into account)
        const totalMonths = (years * 12) + months + (days / AgeEngine.getDaysInMonth(endYear, endMonth));

        // Precision decimal years (using average Gregorian year of 365.2425 days)
        const decimalYears = totalDays / 365.2425;

        // Next birthday calculation
        const nextBirthdayInfo = AgeEngine.getNextBirthday(birthDate, targetDate);

        // Half birthday calculation
        const halfBirthdayInfo = AgeEngine.getHalfBirthday(birthDate, targetDate);

        // Day of week born
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const birthDayOfWeek = daysOfWeek[birthDate.getDay()];

        return {
            isFuture: isNegative,
            birthDate,
            targetDate,
            years,
            months,
            days,
            hours,
            minutes,
            seconds,
            total: {
                years: Number(decimalYears.toFixed(4)),
                months: Number(totalMonths.toFixed(2)),
                weeks: totalWeeks,
                remainingDaysInWeek,
                days: totalDays,
                hours: totalHours,
                minutes: totalMinutes,
                seconds: totalSeconds,
                milliseconds: totalMilliseconds
            },
            nextBirthday: nextBirthdayInfo,
            halfBirthday: halfBirthdayInfo,
            birthDayOfWeek
        };
    }

    /**
     * Calculate details regarding the next birthday
     * @param {Date} birthDate 
     * @param {Date} now 
     */
    static getNextBirthday(birthDate, now = new Date()) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentYear = now.getFullYear();
        const birthMonth = birthDate.getMonth();
        const birthDay = birthDate.getDate();

        // Check for leap year birth (Feb 29)
        let isLeapBorn = (birthMonth === 1 && birthDay === 29);

        let nextBirthdayYear = currentYear;
        let testBirthday = new Date(nextBirthdayYear, birthMonth, birthDay, birthDate.getHours(), birthDate.getMinutes(), birthDate.getSeconds());

        // Handle leap year birth in non-leap year: celebrate on March 1 or Feb 28
        if (isLeapBorn && !AgeEngine.isLeapYear(nextBirthdayYear)) {
            // By convention, Feb 28 or March 1. In standard Date, Feb 29 becomes March 1 in non-leap years.
            testBirthday = new Date(nextBirthdayYear, 2, 1, birthDate.getHours(), birthDate.getMinutes(), birthDate.getSeconds());
        }

        // If birthday has passed this year, look at next year
        if (testBirthday < now) {
            nextBirthdayYear += 1;
            if (isLeapBorn && !AgeEngine.isLeapYear(nextBirthdayYear)) {
                testBirthday = new Date(nextBirthdayYear, 2, 1, birthDate.getHours(), birthDate.getMinutes(), birthDate.getSeconds());
            } else {
                testBirthday = new Date(nextBirthdayYear, birthMonth, birthDay, birthDate.getHours(), birthDate.getMinutes(), birthDate.getSeconds());
            }
        }

        // Check if today is birthday (matching month & date, regardless of time of day)
        const isToday = (now.getMonth() === birthMonth && now.getDate() === birthDay) ||
            (isLeapBorn && !AgeEngine.isLeapYear(currentYear) && now.getMonth() === 2 && now.getDate() === 1);

        const diffMs = testBirthday.getTime() - now.getTime();
        const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
        const daysRemaining = Math.floor(totalSeconds / 86400);
        const hoursRemaining = Math.floor((totalSeconds % 86400) / 3600);
        const minutesRemaining = Math.floor((totalSeconds % 3600) / 60);
        const secondsRemaining = totalSeconds % 60;

        // Turning age
        const turningAge = nextBirthdayYear - birthDate.getFullYear();

        return {
            date: testBirthday,
            dayOfWeek: daysOfWeek[testBirthday.getDay()],
            turningAge,
            isToday,
            daysRemaining,
            hoursRemaining,
            minutesRemaining,
            secondsRemaining,
            totalSecondsRemaining: totalSeconds
        };
    }

    /**
     * Calculate half-birthday (6 calendar months from birthday)
     */
    static getHalfBirthday(birthDate, now = new Date()) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const birthMonth = birthDate.getMonth();
        const halfMonth = (birthMonth + 6) % 12;
        let year = now.getFullYear();

        let halfBday = new Date(year, halfMonth, birthDate.getDate());
        if (halfBday < now) {
            year += 1;
            halfBday = new Date(year, halfMonth, birthDate.getDate());
        }

        const diffMs = halfBday.getTime() - now.getTime();
        const daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

        return {
            date: halfBday,
            dayOfWeek: daysOfWeek[halfBday.getDay()],
            daysRemaining
        };
    }

    /**
     * Compare ages of two individuals
     */
    static compareAges(personA, personB, referenceDate = new Date()) {
        const ageA = AgeEngine.calculateAge(personA.birthDate, referenceDate);
        const ageB = AgeEngine.calculateAge(personB.birthDate, referenceDate);

        const diffMs = Math.abs(personA.birthDate.getTime() - personB.birthDate.getTime());
        const olderPerson = personA.birthDate < personB.birthDate ? personA : personB;
        const youngerPerson = personA.birthDate < personB.birthDate ? personB : personA;
        const isEqual = personA.birthDate.getTime() === personB.birthDate.getTime();

        // Exact difference between their birthdays
        const gap = AgeEngine.calculateAge(olderPerson.birthDate, youngerPerson.birthDate);

        return {
            older: olderPerson.name || (personA.birthDate < personB.birthDate ? "Person A" : "Person B"),
            younger: youngerPerson.name || (personA.birthDate < personB.birthDate ? "Person B" : "Person A"),
            isEqual,
            gapYears: gap.years,
            gapMonths: gap.months,
            gapDays: gap.days,
            gapTotalDays: gap.total.days,
            ageA,
            ageB
        };
    }

    /**
     * Calculate what date the person reaches a specific milestone (e.g. 10,000 days, 1 billion seconds, or X years old)
     */
    static getDateAtMilestone(birthDate, milestoneType, value) {
        const b = new Date(birthDate);
        const result = new Date(b.getTime());

        switch (milestoneType) {
            case 'years':
                result.setFullYear(b.getFullYear() + value);
                break;
            case 'days':
                result.setDate(b.getDate() + value);
                break;
            case 'seconds':
                result.setTime(b.getTime() + (value * 1000));
                break;
            default:
                throw new Error("Invalid milestone type");
        }

        return result;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AgeEngine;
}
