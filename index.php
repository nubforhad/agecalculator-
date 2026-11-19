<?php
/**
 * ChronoAge Pro - PHP Entry Point
 * Serves the full single-page web app and provides backend support.
 */

// If requested with an accept header of application/json, redirect or forward to api/calculate.php
if (isset($_GET['api']) && $_GET['api'] === 'true') {
    require_once __DIR__ . '/api/calculate.php';
    exit;
}

// Serve the frontend
include_once __DIR__ . '/index.html';
