<?php
// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Get JSON input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Check if data is valid
if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid key data provided']);
    exit;
}

// Sanitize inputs
$name = sanitize_input($data['name']);
$email = sanitize_input($data['email']);
$message = sanitize_input($data['message']);

// Validate inputs
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required']);
    exit;
}

// Validate Email Format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit;
}

// Strict TLD Validation
// Allowed: .com, .dev, .net, .io, .ai + country specific (.in, .us, .uk, .ca, .au, .de, .jp, .fr, .br, .sg)
$allowed_tlds = ['com', 'dev', 'net', 'io', 'ai', 'org', 'edu', 'gov', 'in', 'us', 'uk', 'ca', 'au', 'de', 'jp', 'fr', 'br', 'sg'];
$email_parts = explode('.', $email);
$tld = strtolower(end($email_parts));

if (!in_array($tld, $allowed_tlds)) {
     http_response_code(400);
     echo json_encode(['error' => 'Email domain not allowed. Please use a standard or work email.']);
     exit;
}

// Email Configuration
$to = "laxuaryal@gmail.com"; 
$subject = "New Portfolio Contact: " . $name;
$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$email_body = "Name: $name\n";
$email_body .= "Email: $email\n\n";
$email_body .= "Message:\n$message\n";

// Send Email
if (mail($to, $subject, $email_body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message. Please try again later.']);
}
?>
