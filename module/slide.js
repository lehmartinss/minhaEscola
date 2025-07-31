import { getMinhaEscola } from "./api.js";

let indiceAtual = 0;
let slides = [];

function extrairIdGoogleDrive(url) {
  const match = url.match(/\/d\/(.+?)\//);
  return match ? match[1] : '';
}

function atualizarCarrossel() {
  const carrossel = document.getElementById('carrossel');
  carrossel.style.transform = `translateX(-${indiceAtual * 100}%)`;
}

function avancarSlide() {
  indiceAtual = (indiceAtual + 1) % slides.length;
  atualizarCarrossel();
}

function voltarSlide() {
  indiceAtual = (indiceAtual - 1 + slides.length) % slides.length;
  atualizarCarrossel();
}

// Disponibiliza no escopo global para os botões do HTML funcionarem
globalThis.avancarSlide = avancarSlide;
globalThis.voltarSlide = voltarSlide;

async function carregarSlides() {
  const dados = await getMinhaEscola();
  slides = dados;

  const carrossel = document.getElementById('carrossel');

  carrossel.innerHTML = slides.map(foto => `
    <div class="slide">
      <img src="https://drive.google.com/uc?id=${extrairIdGoogleDrive(foto.imagem)}" alt="${foto.legenda}">
      <div class="informacoes">
        <h2>${foto.legenda}</h2>
        <p>Data: ${foto.data}</p>
      </div>
    </div>
  `).join('');

  atualizarCarrossel();
}

carregarSlides();
