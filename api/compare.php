<?php
/**
 * REST API Endpoint: Compare Ages of Two People
 * Method: GET or POST
 * Params:
 *  - dob_a: YYYY-MM-DD (Person A)
 *  - name_a: Name A (optional)
 *  - dob_b: YYYY-MM-DD (Person B)
 *  - name_b: Name B (optional)
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

$input = $_SERVER['REQUEST_METHOD'] === 'POST' ? json_decode(file_get_contents('php://input'), true) ?? $_POST : $_GET;

$dobA = $input['dob_a'] ?? null;
$dobB = $input['dob_b'] ?? null;
$nameA = $input['name_a'] ?? 'Person A';
$nameB = $input['name_b'] ?? 'Person B';

if (!$dobA || !$dobB) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Both dob_a and dob_b are required.']);
    exit;
}

try {
    $dateA = new DateTime($dobA);
    $dateB = new DateTime($dobB);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid date format.']);
    exit;
}

$diff = $dateA->diff($dateB);
$older = $dateA < $dateB ? $nameA : $nameB;
$younger = $dateA < $dateB ? $nameB : $nameA;
$isEqual = $dateA->getTimestamp() === $dateB->getTimestamp();

echo json_encode([
    'status' => 'success',
    'data' => [
        'person_a' => ['name' => $nameA, 'dob' => $dateA->format('Y-m-d')],
        'person_b' => ['name' => $nameB, 'dob' => $dateB->format('Y-m-d')],
        'is_equal' => $isEqual,
        'older_person' => $older,
        'younger_person' => $younger,
        'difference' => [
            'years' => $diff->y,
            'months' => $diff->m,
            'days' => $diff->d,
            'total_days' => (int)$diff->format('%a')
        ]
    ]
], JSON_PRETTY_PRINT);
