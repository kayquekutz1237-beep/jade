// ================================================================
// CONFIGURAÇÕES
// ================================================================
const NOME = "Jade";
const DATA_INICIO = new Date(2026, 0, 18); // 18 de janeiro de 2026

// ================================================================
// 🎵 MÚSICA DE FUNDO
// Para ativar:
//   1. Descomente o <audio> no index.html
//   2. Descomente o botão #music-btn no index.html
//   3. Descomente o bloco abaixo:
// ================================================================
// let musicaTocando = false;
// function toggleMusica() {
//   const audio = document.getElementById("musica");
//   const btn   = document.getElementById("music-btn");
//   if (musicaTocando) { audio.pause(); btn.textContent = "🎵"; }
//   else               { audio.play();  btn.textContent = "⏸"; }
//   musicaTocando = !musicaTocando;
// }

// ================================================================
// INTRO
// ================================================================
function entrar() {
  const intro = document.getElementById("intro");
  intro.classList.add("fade-out");
  setTimeout(() => {
    intro.style.display = "none";
    document.getElementById("main").classList.remove("hidden");
    iniciarCoracoes();
    iniciarContador();
    mostrarDataInicio();
    iniciarSlideshow();
    tratarFotos();
  }, 900);
}

// ================================================================
// CORAÇÕES CAINDO
// ================================================================
const emojis = ["💙", "🩵", "💎", "✨", "💫", "⭐", "🌊", "💙"];

function criarCoracao() {
  const container = document.getElementById("hearts-container");
  const el = document.createElement("span");
  el.classList.add("heart");
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = (Math.random() * 1.4 + 0.7) + "rem";
  const dur = Math.random() * 7 + 6;
  el.style.animationDuration = dur + "s";
  el.style.animationDelay = (Math.random() * 2) + "s";
  container.appendChild(el);
  setTimeout(() => el.remove(), (dur + 3) * 1000);
}

function iniciarCoracoes() {
  for (let i = 0; i < 20; i++) setTimeout(criarCoracao, i * 200);
  setInterval(criarCoracao, 700);
}

// ================================================================
// CONTADOR EM TEMPO REAL
// ================================================================
function iniciarContador() {
  atualizarContador();
  setInterval(atualizarContador, 1000);
}

function atualizarContador() {
  const agora = new Date();
  const diff  = agora - DATA_INICIO; // ms

  const totalSeg  = Math.floor(diff / 1000);
  const totalMin  = Math.floor(totalSeg / 60);
  const totalHora = Math.floor(totalMin / 60);
  const dias      = Math.floor(totalHora / 24);
  const horas     = totalHora % 24;
  const min       = totalMin % 60;
  const seg       = totalSeg % 60;

  document.getElementById("c-dias").textContent  = String(dias);
  document.getElementById("c-horas").textContent = String(horas).padStart(2, "0");
  document.getElementById("c-min").textContent   = String(min).padStart(2, "0");
  document.getElementById("c-seg").textContent   = String(seg).padStart(2, "0");
}

function mostrarDataInicio() {
  const opts = { day: "numeric", month: "long", year: "numeric" };
  document.getElementById("data-inicio-label").textContent =
    DATA_INICIO.toLocaleDateString("pt-BR", opts);
}

// ================================================================
// SLIDESHOW DA HERO
// ================================================================
function iniciarSlideshow() {
  const slides = document.querySelectorAll(".hero-bg.slide");
  if (slides.length < 2) return;
  let atual = 0;
  setInterval(() => {
    slides[atual].classList.remove("active");
    atual = (atual + 1) % slides.length;
    slides[atual].classList.add("active");
  }, 5000); // troca a cada 5 segundos
}

// ================================================================
// FOTOS — fallback visual
// ================================================================
const fallbacks = ["📷", "🌊", "💙", "✨", "🩵", "💎"];

function tratarFotos() {
  // slideshow fallback
  document.querySelectorAll(".hero-bg.slide").forEach(img => {
    img.onerror = () => img.style.display = "none";
  });

  // galeria
  document.querySelectorAll(".photo-card img").forEach((img, i) => {
    img.onerror = function () {
      this.style.display = "none";
      this.parentElement.textContent = fallbacks[i] || "📷";
    };
  });
}

// ================================================================
// BOTÃO TE AMO
// ================================================================
function explodir() {
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const el = document.createElement("span");
      el.classList.add("heart");
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = Math.random() * 100 + "vw";
      el.style.fontSize = (Math.random() * 2.5 + 1) + "rem";
      el.style.animationDuration = (Math.random() * 3 + 2) + "s";
      el.style.animationDelay = "0s";
      document.getElementById("hearts-container").appendChild(el);
      setTimeout(() => el.remove(), 5000);
    }, i * 40);
  }
}
