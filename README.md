# ⏳ fAge - Precision Age Calculator & Cosmic Life Chronicle

A modern, high-precision, multi-feature Age Calculator and Life Chronicle web application. Built with vanilla modern JavaScript (ES6+), responsive CSS3 glassmorphism design, and an optional PHP backend REST API.

![fAge Banner](https://raw.githubusercontent.com/nubforhad/agecalculator-/main/assets/preview.png)

---

## ✨ Features & Capabilities

### 1. 🎯 Precision Real-Time Age Calculation
- **Live Ticking Clock**: Ticks every second displaying real-time live years, months, days, hours, minutes, and seconds.
- **Granular Totals**: Cumulative totals in months, weeks, days, hours, minutes, and seconds.
- **Micro-Precision**: Supports exact birth time down to the minute.
- **Flawless Gregorian Calendar Math**: Precise leap year handling and varying days in months (tested with unit tests).

### 2. 🎂 Birthday & Half-Birthday Milestones
- **Live Birthday Countdown**: Days, hours, minutes, and seconds remaining until your next birthday.
- **Turning Age & Day of Week**: Shows what day of the week your next birthday falls on, and what age you will turn.
- **Half-Birthday Calculation**: Exact date and countdown for your 6-month half-birthday!
- **Day of Week of Birth**: Discovers whether you were born on a Monday, Friday, etc.
- **Interactive Confetti Celebration**: Canvas-powered confetti burst and audio chime when you celebrate.

### 3. ✨ Astrology, Cultural & Cosmic Identity
- **Western Zodiac**: Sign name, symbol, element, ruling planet, and personality traits.
- **Chinese Zodiac**: 12 animals + 5 elements (Wood, Fire, Earth, Metal, Water) + Yin/Yang polarity.
- **Generational Classification**: Identifies your demographic generation (Gen Alpha, Gen Z, Millennial, Gen X, Baby Boomer, etc.).
- **Birthstone & Birth Flower**: Monthly gemstone and flower with traditional meanings.
- **Natal Moon Phase**: Calculates your approximate Moon Phase at birth (New Moon, Full Moon, Crescent, etc.).

### 4. 🧬 Biological & Cosmic Life Journey
- Total **heartbeats pumped** (average resting rate).
- Total **breaths taken**.
- Total **hours and days spent sleeping & dreaming**.
- Estimated **meals eaten** and water consumed.
- Total **times blinked** during awake hours.
- **Distance traveled around the Sun** aboard spaceship Earth (~2.57 million km/day).
- Earth axial rotation distance traveled.
- Chuckles and laughs smiled.

### 5. 🪐 Planetary & Pet Ages
- **Planetary Age Calculator**: How old are you on Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, and Pluto? Includes your next planetary birthday countdown and planetary facts!
- **Pet Age Converter**: Scientific canine & feline developmental curves (Small Dog, Medium Dog, Large Dog, Cat, Horse, Rabbit).

### 6. 🚀 Future Time Machine & Legendary Milestones
- **Age on Any Date**: See how old you will be on any future or past date (e.g., Year 2050, Mars Landing, Retirement).
- **The 10,000-Day Club**: Exact calendar dates when you unlock 1,000 days, 5,000 days, 10,000 days, 25,000 days, 1 billion seconds, and milestone anniversaries.

### 7. ⏱️ Date Difference & Comparison
- **Date Difference**: Measure exact duration between any two dates and times.
- **Two-Person Age Comparison**: Compares Person A and Person B, determining who is older and the exact age gap in years, months, and days.

### 8. 👤 LocalStorage Profiles & Printable Certificate
- **Saved Profiles**: Save family, friends, or yourself for 1-click loading.
- **Printable Certificate of Life**: Elegant framed modal with print-optimized CSS (`@media print`) to print or save as PDF.
- **Clipboard Summary**: One-click emoji-formatted text summary ready to paste on WhatsApp, Messenger, or social media.

---

## 🛠️ Project Structure

```
agecalculator/
├── index.html                 # Standalone single-page responsive web app
├── index.php                  # PHP entrypoint with JSON API forwarding
├── api/
│   ├── calculate.php          # REST API endpoint for age calculations
│   └── compare.php            # REST API endpoint for two-person comparison
├── assets/
│   ├── css/
│   │   └── style.css          # Modern glassmorphism CSS, dark/light themes, print layout
│   └── js/
│       ├── age-engine.js      # Core calendar arithmetic & leap-year engine
│       ├── astrology.js       # Western/Chinese zodiac, generations, birthstones
│       ├── life-stats.js      # Heartbeats, breaths, cosmic travel, moon phases
│       ├── milestones.js      # 10k days, planetary physics, pet conversions
│       ├── profiles.js        # LocalStorage profile manager
│       ├── export.js          # Printable certificate & clipboard exporter
│       └── app.js             # UI orchestrator, live ticker, tabs, audio, confetti
├── tests/
│   └── test_engine.js         # Automated test suite (22 test cases)
├── .gitignore
└── README.md
```

---

## 🚀 How to Run & Preview

### Option 1: Direct File Preview
Simply double click `index.html` or open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using PHP Built-in Server
Open your terminal in this directory and run:
```bash
php -S localhost:8000
```
Then visit: `http://localhost:8000`

### Option 3: Using XAMPP / Apache
1. Copy or clone this folder into `C:\xampp\htdocs\antigraph` (or `htdocs/agecalculator`).
2. Start Apache from the XAMPP Control Panel.
3. Open `http://localhost/antigraph/` or `http://localhost/agecalculator/` in your browser.

---

## 🧪 Running Unit Tests

Run the engine test suite with Node.js:
```bash
node tests/test_engine.js
```

---

## 📡 REST API Documentation

### 1. Calculate Age
**Endpoint:** `GET /api/calculate.php?dob=1995-08-15&time=14:30`
```json
{
  "status": "success",
  "data": {
    "birth_date": "1995-08-15 14:30:00",
    "age": { "years": 31, "months": 3, "days": 4, "hours": 5, "minutes": 2, "seconds": 15 },
    "totals": { "total_days": 11419, "total_weeks": 1631, "remaining_days": 2 },
    "next_birthday": { "date": "2027-08-15", "day_of_week": "Sunday", "days_remaining": 268 },
    "zodiac": { "name": "Leo", "symbol": "♌" }
  }
}
```

### 2. Compare Ages
**Endpoint:** `GET /api/compare.php?dob_a=1995-05-15&dob_b=1998-09-22&name_a=Alice&name_b=Bob`
```json
{
  "status": "success",
  "data": {
    "is_equal": false,
    "older_person": "Alice",
    "younger_person": "Bob",
    "difference": { "years": 3, "months": 4, "days": 7, "total_days": 1226 }
  }
}
```

---

## 📄 License
MIT License. Created by [nubforhad](https://github.com/nubforhad).
