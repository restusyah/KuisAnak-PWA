// Mengambil nama pengguna dari localStorage
const username = localStorage.getItem("quizUsername") || "Pengguna";
const welcomeMessage = document.getElementById("welcome-message");

// Menampilkan pesan selamat datang selama quiz berlangsung
welcomeMessage.textContent = `Selamat datang, ${username}! Dengarkan dan jawab pertanyaan berikut.`;

// Soal Quiz Audiotori
const quizzes = [
  {
    question: "Suara apakah ini?",
    audio: "assets/audio/kucing.mp3",
    options: ["Anjing", "Kucing", "Burung"],
    answer: 1
  },
  {
    question: "Suara apakah ini?",
    audio: "assets/audio/piano.mp3",
    options: ["Piano", "Gitar", "Biola"],
    answer: 0
  },
  {
    question: "Suara apakah ini?",
    audio: "assets/audio/pesawat.mp3",
    options: ["Mobil", "Pesawat", "Kereta Api"],
    answer: 1
  },
  {
    question: "Suara apakah ini?",
    audio: "assets/audio/anjing.mp3",
    options: ["Kucing", "Anjing", "Sapi"],
    answer: 1
  },
  {
    question: "Suara apakah ini?",
    audio: "assets/audio/air.mp3",
    options: ["Api", "Air", "Angin"],
    answer: 1
  },
  {
    question: "Suara apakah ini?",
    audio: "assets/audio/klakson.mp3",
    options: ["Bel Sekolah", "Alarm", "Klakson Mobil"],
    answer: 2
  },
  {
    question: "Suara apakah ini?",
    audio: "assets/audio/ayam.mp3",
    options: ["Ayam", "Bebek", "Kuda"],
    answer: 0
  },
  {
    question: "Suara apakah ini?",
    audio: "assets/audio/ambulance.mp3",
    options: ["Bus Sekolah", "Pesawat", "Ambulans"],
    answer: 2
  },
  {
    question: "Suara apakah ini?",
    audio: "assets/audio/helikopter.mp3",
    options: ["Mobil", "Helikopter", "Kereta"],
    answer: 1
  },
  {
    question: "Suara apakah ini?",
    audio: "assets/audio/gajah.mp3",
    options: ["Gajah", "Harimau", "Kuda"],
    answer: 0
  }
];

let currentIndex = 0;
let score = 0;

// Elemen HTML
const questionText = document.getElementById("question-text");
const questionAudio = document.getElementById("question-audio");
const playAudioBtn = document.getElementById("play-audio");
const optionsContainer = document.getElementById("options-container");
const feedback = document.getElementById("feedback");
const quizContainer = document.getElementById("quiz-container");

// Tambahkan event listener untuk tombol putar suara
playAudioBtn.addEventListener("click", function () {
  if (questionAudio.src && questionAudio.src !== window.location.href) {
    questionAudio.play();
  } else {
    alert("Audio belum tersedia!");
  }
});

// Pastikan audio dimuat saat soal ditampilkan
function loadQuestion() {
  const question = quizzes[currentIndex];
  questionText.textContent = question.question;
  questionAudio.src = question.audio; // Atur sumber audio

  // Pastikan audio dapat diputar ulang
  questionAudio.load();

  optionsContainer.innerHTML = "";
  question.options.forEach((option, idx) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-button");
    button.onclick = () => checkAnswer(idx);
    optionsContainer.appendChild(button);
  });

  feedback.textContent = "";
}


// Tambahkan suara notifikasi
const correctSound = new Audio("assets/audio/jawaban/correct.mp3");
const wrongSound = new Audio("assets/audio/jawaban/wrong.mp3");

window.checkAnswer = (selected) => {
  const correct = selected === quizzes[currentIndex].answer;
  
  // Hentikan semua audio yang sedang diputar sebelum memainkan suara notifikasi
  questionAudio.pause();
  questionAudio.currentTime = 0;

  correctSound.pause();
  correctSound.currentTime = 0;
  wrongSound.pause();
  wrongSound.currentTime = 0;
  
  // Mainkan suara
  correct ? correctSound.play() : wrongSound.play();

  // Tampilkan large notification
  showLargeNotification(correct ? "Benar! 🎉🎺" : "Salah! 😢", correct);
  
  if (correct) score++;

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < quizzes.length) {
      loadQuestion();
    } else {
      welcomeMessage.style.display = "none";
  
      quizContainer.innerHTML = `
        <div class="quiz-result">
          <img src="assets/icons/answer/thropy.png" alt="Trophy" class="trophy-icon">
          <h2>Selamat, ${username}!</h2>
          <p>Anda telah menyelesaikan quiz dengan skor:</p>
          <div class="score-box">${score} / ${quizzes.length}</div>
          <p class="feedback">${getFeedback(score, quizzes.length)}</p>
          <button class="btn-home" onclick="location.href='index.html'">🏠 Kembali ke Beranda</button>
        </div>
      `;
    }
  }, 2000);  
  
  // Fungsi untuk memberikan feedback berdasarkan skor
  function getFeedback(score, total) {
    const percentage = (score / total) * 100;
    if (percentage === 100) {
      return "Luar biasa! Anda menjawab semua dengan benar! 🎉";
    } else if (percentage >= 80) {
      return "Hebat! Skor Anda hampir sempurna! 🚀";
    } else if (percentage >= 50) {
      return "Bagus! Tapi masih bisa lebih baik lagi. 💪";
    } else {
      return "Jangan menyerah! Coba lagi dan tingkatkan skor Anda. 📚";
    }
  }
}

// Fungsi untuk menampilkan notifikasi besar dengan gambar dan background sesuai status
function showLargeNotification(message, isCorrect) {
  let notification = document.createElement("div");
  notification.classList.add("large-notification");

  // Menambahkan kelas untuk mengubah warna background sesuai dengan status jawaban
  if (isCorrect) {
    notification.classList.add("benar"); // Kelas untuk background hijau (benar)
  } else {
    notification.classList.add("salah"); // Kelas untuk background merah (salah)
  }

  // Membuat elemen gambar berdasarkan status jawaban
  let img = document.createElement("img");
  img.src = isCorrect ? "assets/icons/answer/true.png" : "assets/icons/answer/false.png";
  img.alt = isCorrect ? "Jempol" : "Sedih";
  img.classList.add("notification-image");

  // Membuat elemen teks untuk notifikasi
  let text = document.createElement("p");
  text.textContent = message;

  // Menambahkan gambar dan teks ke dalam notifikasi
  notification.appendChild(img);
  notification.appendChild(text);

  // Menambahkan notifikasi ke dalam body
  document.body.appendChild(notification);

  // Menghilangkan notifikasi setelah beberapa detik
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => notification.remove(), 500);
  }, 2000);
}

// Memulai quiz pertama kali
loadQuestion();
