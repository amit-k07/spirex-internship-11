const movies = [
    {
        title: "Avengers: Endgame",
        year: "2019",
        type: "Action • Sci-Fi • Adventure",
        description: "After the devastating events of Infinity War, the Avengers assemble once more to restore the universe and bring hope back to humanity.",
        image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
    },
    {
        title: "Avengers: Infinity War",
        year: "2018",
        type: "Action • Adventure • Sci-Fi",
        description: "The Avengers and their allies face their greatest threat as the powerful Thanos begins his quest for the Infinity Stones.",
        image: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
    },
    {
        title: "Spider-Man: No Way Home",
        year: "2021",
        type: "Action • Fantasy • Adventure",
        description: "Peter Parker's world turns upside down when the multiverse opens and unexpected villains enter his reality.",
        image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
    },
    {
        title: "Black Panther",
        year: "2018",
        type: "Action • Drama • Sci-Fi",
        description: "T'Challa returns to Wakanda to claim his throne, but a powerful enemy threatens the future of his kingdom.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_4QIAFckt_xyalsTvRHptsM3xTIuGpYjHrVluZIj9k1PyXlNk"
    },
    {
        title: "Doctor Strange",
        year: "2016",
        type: "Fantasy • Action • Sci-Fi",
        description: "A brilliant surgeon discovers the hidden world of magic and learns to protect reality from mysterious forces.",
        image: "https://upload.wikimedia.org/wikipedia/en/a/a1/Doctor_Strange_%282016_film%29_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"
    },
    {
        title: "Thor: Ragnarok",
        year: "2017",
        type: "Action • Fantasy • Adventure",
        description: "Thor finds himself trapped on a distant planet and must race to save Asgard from destruction.",
        image: "https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_FMjpg_UX1000_.jpg"
    },
    {
        title: "Iron Man",
        year: "2008",
        type: "Action • Sci-Fi • Adventure",
        description: "A genius billionaire builds an advanced suit of armor and transforms himself into the legendary Iron Man.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIQmjD_8dCDpRgmcMsip5ab7v0neCnwg0drCdF3gwRlghDQWTwXBWfOaC6&s=10"
    },
    {
        title: "Guardians of the Galaxy",
        year: "2014",
        type: "Action • Comedy • Sci-Fi",
        description: "A group of unlikely heroes joins forces to protect the galaxy from a dangerous cosmic power.",
        image: "https://m.media-amazon.com/images/M/MV5BM2ZmNjQ2MzAtNDlhNi00MmQyLWJhZDMtNmJiMjFlOWY4MzcxXkEyXkFqcGc@._V1_.jpg"
    }
];

const movieImage = document.getElementById("movieImage");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");

const movieTitle = document.getElementById("movieTitle");
const movieType = document.getElementById("movieType");
const movieDescription = document.getElementById("movieDescription");
const counter = document.getElementById("counter");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const dotsContainer = document.getElementById("dots");

const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const playText = document.getElementById("playText");

let currentIndex = 0;
let slideshow = null;

movies.forEach((movie, index) => {
    const dot = document.createElement("button");

    dot.classList.add("dot");
    dot.setAttribute("aria-label", `Go to ${movie.title}`);

    dot.addEventListener("click", () => {
        currentIndex = index;
        showMovie();
    });

    dotsContainer.appendChild(dot);
});

function showMovie() {
    const movie = movies[currentIndex];

    const previousIndex =
        (currentIndex - 1 + movies.length) % movies.length;

    const nextIndex =
        (currentIndex + 1) % movies.length;

    movieImage.src = movie.image;
    movieImage.alt = movie.title;

    prevImage.src = movies[previousIndex].image;
    nextImage.src = movies[nextIndex].image;

    movieTitle.textContent = movie.title;
    movieType.textContent = `${movie.type} • ${movie.year}`;
    movieDescription.textContent = movie.description;

    counter.textContent =
        `${String(currentIndex + 1).padStart(2, "0")} / ${String(movies.length).padStart(2, "0")}`;

    document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });

    const card = document.getElementById("mainCard");
    const info = document.getElementById("movieInfo");

    card.classList.remove("fade");
    info.classList.remove("fade");

    void card.offsetWidth;

    card.classList.add("fade");
    info.classList.add("fade");
}

function nextMovie() {
    currentIndex = (currentIndex + 1) % movies.length;
    showMovie();
}

function previousMovie() {
    currentIndex = (currentIndex - 1 + movies.length) % movies.length;
    showMovie();
}

function startSlideshow() {
    slideshow = setInterval(nextMovie, 3500);

    playIcon.textContent = "❚❚";
    playText.textContent = "PAUSE SLIDESHOW";
}

function stopSlideshow() {
    clearInterval(slideshow);
    slideshow = null;

    playIcon.textContent = "▶";
    playText.textContent = "START SLIDESHOW";
}

playBtn.addEventListener("click", () => {
    if (slideshow) {
        stopSlideshow();
    } else {
        startSlideshow();
    }
});

nextBtn.addEventListener("click", nextMovie);
prevBtn.addEventListener("click", previousMovie);

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") nextMovie();
    if (event.key === "ArrowLeft") previousMovie();
});

showMovie();