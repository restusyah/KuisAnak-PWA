document.getElementById("start-quiz").addEventListener("click", function () {
  const username = document.getElementById("username").value.trim();
  if (username === "") {
    alert("Nama tidak boleh kosong!");
    return;
  }

  // Simpan nama pengguna di localStorage
  localStorage.setItem("quizUsername", username);

  // Sembunyikan bagian input nama
  document.getElementById("user-info").style.display = "none";
  document.getElementById("prompt").style.display = "none"; // Hilangkan teks prompt
  document.getElementById("categories").style.display = "block";
});
