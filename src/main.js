import { data } from "./data.js";

const searchForm = document.querySelector(".gameList .searchForm");
const toggleSearchButton = document.querySelector(
  ".gameList .toggleSearchButton"
);

function toggleSearchForm() {
  searchForm.style.display = searchForm.style.display === "none" ? "" : "none";
  toggleSearchButton.classList.toggle("opened");
}

toggleSearchButton.addEventListener("click", toggleSearchForm);

function handleSearchFormSubmit(event) {
  event.preventDefault();
  const searchInput = searchForm.querySelector("[name=search]"),
    orderingSelect = searchForm.querySelector("[name=ordering]");
  renderGameList(searchInput.value, orderingSelect.value);
}

searchForm.addEventListener("submit", handleSearchFormSubmit);

const sortFunctions = {
  "-metacritic": (a, b) => b.metacritic - a.metacritic,
  "-released": (a, b) => b.released.localeCompare(a.released),
};

function renderGameList(search = "", ordering) {
  const sortingFunction = sortFunctions[ordering];

  const filteredData = data.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );
  const sortedData = sortingFunction
    ? filteredData.sort(sortingFunction)
    : filteredData;

  document.querySelector(".gameList .results").innerHTML = sortedData
    .map(renderGameThumbnail)
    .join("");
}

renderGameList();

function renderGameThumbnail({
  name,
  background_image,
  released,
  metacritic,
  description,
}) {
  const releasedDate = new Date(released);
  const link = `https://www.google.com/search?q=${encodeURIComponent(name)}`;
  return `<a href="${link}" target="_blank">
			<img src="${background_image}" />
			<footer>
				<h3>${name}</h3>
				<div class="infos">
					<time datetime="${released}">${releasedDate.toLocaleDateString()}</time>
					<span class="metacritic">${metacritic}</span>
				</div>
        <div class="desc">
          <p>${description}</p>
        </div>
			</footer>
		</a>`;
}
