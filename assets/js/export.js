/**
 * ExportEngine - Handles generating printable age certificates, sharing summaries, and exporting data
 */
class ExportEngine {
    /**
     * Generate structured text summary for clipboard sharing
     */
    static generateSummaryText(name, ageData, astrologyData, statsData) {
        const pName = name || 'Friend';
        return `🌟 AGE & LIFE SUMMARY FOR ${pName.toUpperCase()} 🌟
━━━━━━━━━━━━━━━━━━━━━━━━━━
🎂 Born on: ${ageData.birthDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
⏳ Current Age: ${ageData.years} Years, ${ageData.months} Months, ${ageData.days} Days (${ageData.hours}h ${ageData.minutes}m ${ageData.seconds}s)
📅 Total Days Lived: ${ageData.total.days.toLocaleString()} days
🎉 Next Birthday: in ${ageData.nextBirthday.daysRemaining} days (Turning ${ageData.nextBirthday.turningAge})
━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ ASTROLOGY & HERITAGE:
• Western Zodiac: ${astrologyData.western.symbol} ${astrologyData.western.name} (${astrologyData.western.element} Element)
• Chinese Zodiac: ${astrologyData.chinese.emoji} ${astrologyData.chinese.title}
• Generation: ${astrologyData.generation.name} (${astrologyData.generation.era})
• Birthstone: ${astrologyData.birthGem.stone}
━━━━━━━━━━━━━━━━━━━━━━━━━━
🌍 COSMIC & BIOLOGICAL JOURNEY:
• Heartbeats: ~${statsData.heartbeats.toLocaleString()} beats
• Breaths: ~${statsData.breaths.toLocaleString()} breaths
• Distance around the Sun: ~${statsData.distanceAroundSunKm.toLocaleString()} km
• Earth Rotations: ~${statsData.rotationDistanceKm.toLocaleString()} km
━━━━━━━━━━━━━━━━━━━━━━━━━━
Calculated via ChronoAge Pro: Precision Age Calculator`;
    }

    /**
     * Copy text to clipboard with fallback
     */
    static async copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                textArea.remove();
                return true;
            } catch (err) {
                console.error('Fallback copy failed', err);
                textArea.remove();
                return false;
            }
        }
    }

    /**
     * Render the printable certificate in a modal and trigger print
     */
    static printCertificate() {
        window.print();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExportEngine;
}
