<?php
/**
 * REST API Endpoint: Calculate Age & Life Statistics
 * Method: GET or POST
 * Params:
 *  - dob: YYYY-MM-DD (required)
 *  - time: HH:MM (optional, default: 00:00)
 *  - target: YYYY-MM-DD (optional, default: today)
 *  - target_time: HH:MM (optional, default: current time)
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$input = $_SERVER['REQUEST_METHOD'] === 'POST' ? json_decode(file_get_contents('php://input'), true) ?? $_POST : $_GET;

$dobStr = $input['dob'] ?? null;
$birthTime = $input['time'] ?? '00:00';
$targetStr = $input['target'] ?? null;
$targetTime = $input['target_time'] ?? date('H:i:s');

if (!$dobStr) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing required parameter: dob (Date of Birth, e.g. YYYY-MM-DD)'
    ]);
    exit;
}

try {
    $birthDate = new DateTime("$dobStr $birthTime");
    $targetDate = $targetStr ? new DateTime("$targetStr $targetTime") : new DateTime();
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid date format provided.'
    ]);
    exit;
}

// Age difference
$diff = $birthDate->diff($targetDate);
$totalSeconds = abs($targetDate->getTimestamp() - $birthDate->getTimestamp());
$totalMinutes = floor($totalSeconds / 60);
$totalHours = floor($totalMinutes / 60);
$totalDays = floor($totalHours / 24);
$totalWeeks = floor($totalDays / 7);
$remainingDays = $totalDays % 7;

// Next Birthday
$currentYear = (int)$targetDate->format('Y');
$birthMonth = (int)$birthDate->format('m');
$birthDay = (int)$birthDate->format('d');

$nextBday = new DateTime("$currentYear-$birthMonth-$birthDay {$birthDate->format('H:i:s')}");
if ($nextBday < $targetDate) {
    $nextYear = $currentYear + 1;
    $nextBday = new DateTime("$nextYear-$birthMonth-$birthDay {$birthDate->format('H:i:s')}");
}
$bdayDiff = $targetDate->diff($nextBday);

// Zodiac calculation
$month = (int)$birthDate->format('n');
$day = (int)$birthDate->format('j');
$zodiacSigns = [
    ['name' => 'Capricorn', 'symbol' => '♑', 'start' => [12, 22], 'end' => [1, 19]],
    ['name' => 'Aquarius', 'symbol' => '♒', 'start' => [1, 20], 'end' => [2, 18]],
    ['name' => 'Pisces', 'symbol' => '♓', 'start' => [2, 19], 'end' => [3, 20]],
    ['name' => 'Aries', 'symbol' => '♈', 'start' => [3, 21], 'end' => [4, 19]],
    ['name' => 'Taurus', 'symbol' => '♉', 'start' => [4, 20], 'end' => [5, 20]],
    ['name' => 'Gemini', 'symbol' => '♊', 'start' => [5, 21], 'end' => [6, 20]],
    ['name' => 'Cancer', 'symbol' => '♋', 'start' => [6, 21], 'end' => [7, 22]],
    ['name' => 'Leo', 'symbol' => '♌', 'start' => [7, 23], 'end' => [8, 22]],
    ['name' => 'Virgo', 'symbol' => '♍', 'start' => [8, 23], 'end' => [9, 22]],
    ['name' => 'Libra', 'symbol' => '♎', 'start' => [9, 23], 'end' => [10, 22]],
    ['name' => 'Scorpio', 'symbol' => '♏', 'start' => [10, 23], 'end' => [11, 21]],
    ['name' => 'Sagittarius', 'symbol' => '♐', 'start' => [11, 22], 'end' => [12, 21]]
];

$matchedZodiac = 'Capricorn';
$matchedSymbol = '♑';
foreach ($zodiacSigns as $z) {
    [$sm, $sd] = $z['start'];
    [$em, $ed] = $z['end'];
    if ($sm > $em) {
        if (($month === $sm && $day >= $sd) || ($month === $em && $day <= $ed)) {
            $matchedZodiac = $z['name'];
            $matchedSymbol = $z['symbol'];
            break;
        }
    } else {
        if (($month === $sm && $day >= $sd) || ($month === $em && $day <= $ed) || ($month > $sm && $month < $em)) {
            $matchedZodiac = $z['name'];
            $matchedSymbol = $z['symbol'];
            break;
        }
    }
}

// Biological estimates
$heartbeats = (int)($totalMinutes * 78);
$breaths = (int)($totalMinutes * 16);
$hoursSlept = (int)($totalDays * 8);
$sunDistanceKm = (int)($totalDays * 2573424);

echo json_encode([
    'status' => 'success',
    'data' => [
        'birth_date' => $birthDate->format('Y-m-d H:i:s'),
        'target_date' => $targetDate->format('Y-m-d H:i:s'),
        'age' => [
            'years' => $diff->y,
            'months' => $diff->m,
            'days' => $diff->d,
            'hours' => $diff->h,
            'minutes' => $diff->i,
            'seconds' => $diff->s
        ],
        'totals' => [
            'total_days' => $totalDays,
            'total_weeks' => $totalWeeks,
            'remaining_days' => $remainingDays,
            'total_hours' => $totalHours,
            'total_minutes' => $totalMinutes,
            'total_seconds' => $totalSeconds
        ],
        'next_birthday' => [
            'date' => $nextBday->format('Y-m-d'),
            'day_of_week' => $nextBday->format('l'),
            'days_remaining' => (int)$bdayDiff->format('%a'),
            'turning_age' => (int)$nextBday->format('Y') - (int)$birthDate->format('Y')
        ],
        'zodiac' => [
            'name' => $matchedZodiac,
            'symbol' => $matchedSymbol
        ],
        'life_stats' => [
            'heartbeats' => $heartbeats,
            'breaths' => $breaths,
            'hours_slept' => $hoursSlept,
            'sun_distance_km' => $sunDistanceKm
        ]
    ]
], JSON_PRETTY_PRINT);
