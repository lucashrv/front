const dataGallery = [
    {
        img: "../img/waterfall.jpg",
        title: "Fontes termais"
    },
    {
        img: "../img/waterfall.jpg",
        title: "Cachoeiras"
    },
    {
        img: "../img/waterfall.jpg",
        title: "Floresta"
    },
    {
        img: "../img/waterfall.jpg",
        title: "Rochas"
    },
    {
        img: "../img/waterfall.jpg",
        title: "Lago"
    },
    {
        img: "../img/waterfall.jpg",
        title: "Natureza"
    }
]

const query = {
    get(element) {
        return document.querySelector(element)
    }
}

const gallery = query.get(".gallery")
const input = query.get(".input")
const notFound = query.get("#not-found")

const init = () => {
    renderCards(dataGallery)
}

const renderCards = (data) => {
    const renderCards = data.map(item => {

        return `
            <div class="card" >
                <div class="card-top">
                    <picture class="img-waterfall">
                        <img src="${item.img}" alt="${item.title}">
                    </picture>
                </div>

                <div class="card-bottom">
                    <h4>${item.title}</h4>
                </div>
            </div >
      `
    })
    notFound.classList.add(!data.length ? "visible" : "hidden")
    notFound.classList.remove(!data.length ? "hidden" : "visible")

    gallery.innerHTML = renderCards.join('')
}

init()

input.addEventListener('keyup', () => {
    const inputValue = input.value.trim().toLowerCase()

    const search = dataGallery.filter(item => {
        const title = item.title.trim().toLowerCase()

        return title.includes(inputValue)
    })

    renderCards(search)
})

input.addEventListener('', () => {
    const inputValue = input.value.trim().toLowerCase()

    const search = dataGallery.filter(item => {
        const title = item.title.trim().toLowerCase()

        return title.includes(inputValue)
    })

    renderCards(search)
})
