const quizzes = [
  {
    question: "Hewan apakah ini?",
    image: "assets/icons/gajah.png",
    options: ["Kucing", "Gajah", "Sapi"],
    answer: 1, // Jawaban: Gajah
  },
  {
    question: "Apa warna apel ini?",
    image: "assets/icons/apel.png",
    options: ["Biru", "Hijau", "Merah"],
    answer: 2, // Jawaban: Merah
  },
  {
    question: "Benda apakah ini?",
    image: "assets/icons/bola.png",
    options: ["Bola", "Meja", "Tas"],
    answer: 0, // Jawaban: Bola
  },
  {
    question: "Bentuk apakah ini?",
    image: "assets/icons/segitiga.png",
    options: ["Lingkaran", "Segitiga", "Persegi"],
    answer: 1, // Jawaban: Segitiga
  },
  {
    question: "Hewan apakah ini?",
    image: "assets/icons/jerapah.png",
    options: ["Jerapah", "Kuda", "Sapi"],
    answer: 0, // Jawaban: Jerapah
  },
  {
    question: "Buah apakah ini?",
    image: "assets/icons/pisang.png",
    options: ["Mangga", "Pisang", "Jeruk"],
    answer: 1, // Jawaban: Pisang
  },
  {
    question: "Benda apakah ini?",
    image: "assets/icons/mobil.png",
    options: ["Motor", "Sepeda", "Mobil"],
    answer: 2, // Jawaban: Mobil
  },
  {
    question: "Apa warna Anggur ini?",
    image: "assets/icons/anggur.png",
    options: ["Merah", "Ungu", "Hijau"],
    answer: 1, // Jawaban: Ungu
  },
  {
    question: "Hewan apakah ini?",
    image: "assets/icons/ikan.png",
    options: ["Ayam", "Ikan", "Kucing"],
    answer: 1, // Jawaban: Ikan
  },
  {
    question: "Apa nama bangun ini?",
    image: "assets/icons/persegi.png",
    options: ["Persegi", "Lingkaran", "Segitiga"],
    answer: 0, // Jawaban: Persegi
  }
];


let currentIndex = 0;
let score = 0;
const username = localStorage.getItem("quizUsername") || "Pengguna";
const quizContainer = document.querySelector("#quiz-container");

function loadQuestion() {
  const question = quizzes[currentIndex];
  quizContainer.innerHTML = `
    <h2>${question.question}</h2>
    <img src="${question.image}" alt="Gambar pertanyaan" class="quiz-image">
    <div class="options">
      ${question.options
        .map(
          (opt, idx) =>
            `<button class="option-button" onclick="checkAnswer(${idx})">${opt}</button>`
        )
        .join("")}
    </div>
    <p id="feedback"></p>
  `;
}

const correctSound = new Audio("assets/audio/jawaban/correct.mp3");
const wrongSound = new Audio("assets/audio/jawaban/wrong.mp3");

window.checkAnswer = (selected) => {
  const correct = selected === quizzes[currentIndex].answer;
  
  // Mainkan suara
  correct ? correctSound.play() : wrongSound.play();

  // Tampilkan notifikasi besar dengan gambar
  showLargeNotification(correct ? "Benar🎉" : "Coba Lagi😢", correct);

  if (correct) score++;

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < quizzes.length) {
      loadQuestion();
    } else {
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
  
};

// Fungsi untuk menampilkan notifikasi besar dengan gambar dan background sesuai status
function showLargeNotification(message, isCorrect) {
  let notification = document.createElement("div");
  notification.classList.add("large-notification");

  if (isCorrect) {
    notification.classList.add("benar"); 
  } else {
    notification.classList.add("salah"); 
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

loadQuestion();
