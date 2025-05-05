const animeList = document.getElementById("anime-list");
const searchBox = document.getElementById("search");

fetch("anime.json")
  .then(res => res.json())
  .then(data => {
    displayAnime(data);

    searchBox.addEventListener("input", () => {
      const keyword = searchBox.value.toLowerCase();
      const filtered = data.filter(anime => anime.title.toLowerCase().includes(keyword));
      displayAnime(filtered);
    });
  });

function displayAnime(list) {
  animeList.innerHTML = "";
  list.forEach(anime => {
    const card = document.createElement("div");
    card.className = "anime-card";
    card.innerHTML = `
      <img src="${anime.thumbnail}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <button>Xem tiếp</button>
    `;

    card.querySelector("button").onclick = () => {
      localStorage.setItem("currentAnime", anime.url);
      window.open(anime.url, "_blank");
    };

    animeList.appendChild(card);
  });
}
