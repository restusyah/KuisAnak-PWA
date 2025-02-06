<?php
header('Content-Type: application/json');

// Koneksi ke database
$host = 'localhost';
$db = 'quiz_app';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Query untuk mengambil data pengguna
$sql = "SELECT id, username, role FROM users";
$result = $conn->query($sql);

$users = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

// Tutup koneksi
$conn->close();

// Kirim data sebagai JSON
echo json_encode($users);
?>