document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/news")
        .then(res => res.json())
        .then(newsItems => {
            const newsSlider = document.getElementById("news-slider");
            if (!Array.isArray(newsItems)) return;

            const html = newsItems.map(item => `
                <div class="news-item p-2">
                    <a href="/pages/news-details.html?id=${item._id}" class="block font-bold text-blue-600 hover:underline">
                        ${item.title}
                    </a>
                    <p class="text-sm text-gray-700">${item.description.substring(0, 100)}...</p>
                </div>
            `).join("");

            newsSlider.innerHTML = html;

            $(newsSlider).slick({
                autoplay: true,
                autoplaySpeed: 2000,
                infinite: true,
                dots: true,
                arrows: false,
                speed: 500,
                slidesToShow: 3,
                vertical: true,
            });
        })
        .catch(err => {
            console.error("Error loading news:", err);
        });
});
