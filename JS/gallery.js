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
    // renderAllCards(dataGallery)
    filterSearch()
    controls.createListeners()
}

const renderAllCards = (array) => {
    array.length === 0
        ? gallery.innerHTML =
            "<div id='not-found' style='text-align: center;'>Nenhuma imagem encontrada</div>"
        : ''
    array.map(item => {
        gallery.innerHTML += `
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
}

let itemsPerPage = 2

const state = {
    page: 1,
    itemsPerPage,
    totalPage: Math.ceil(dataGallery.length / itemsPerPage),
    maxVisibleButtons: 3
}

const controls = {
    next() {
        state.page++

        const lastPage = state.page > state.totalPage
        if (lastPage) {
            state.page--
        }
    },
    prev() {
        state.page--

        if (state.page < 1) {
            state.page++
        }
    },
    goTo(page) {
        if (page < 1) {
            page = 1
        }

        state.page = +page

        if (page > state.totalPage) {
            state.page = state.totalPage
        }
    },
    createListeners() {
        query.get("#first").addEventListener('click', () => {
            controls.goTo(1)
            filterSearch()
        })

        query.get("#last").addEventListener('click', () => {
            controls.goTo(state.totalPage)
            filterSearch()
        })

        query.get("#next").addEventListener('click', () => {
            controls.next()
            filterSearch()
        })

        query.get("#prev").addEventListener('click', () => {
            controls.prev()
            filterSearch()
        })
    }
}

const buttons = {
    element: query.get('#list'),
    create(number) {
        const button = document.createElement('div')

        button.innerHTML = number

        button.classList.add("paginate-item")

        if (state.page == number) {
            button.classList.add('mark')
        }

        button.addEventListener('click', event => {
            const page = event.target.innerText
            controls.goTo(page)
            filterSearch()
        })

        buttons.element.appendChild(button)
    },
    update() {
        buttons.element.innerHTML = ''

        const { maxLeft, maxRight } = buttons.calculateMaxVisible()

        for (let page = maxLeft; page <= maxRight; page++) {
            buttons.create(page)
        }
    },
    calculateMaxVisible() {
        const { maxVisibleButtons } = state

        let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2))
        let maxRight = (state.page + Math.floor(maxVisibleButtons / 2))

        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = maxVisibleButtons
        }

        if (maxRight > state.totalPage) {
            maxLeft = state.totalPage - (maxVisibleButtons - 1)
            maxRight = state.totalPage
        }

        if (maxLeft < 1) maxLeft = 1

        return { maxLeft, maxRight }
    }
}

const filterSearch = () => {
    const inputValue = input.value.trim().toLowerCase()

    const searchCards = dataGallery.filter(card =>
        card.title
            .trim()
            .toLowerCase()
            .includes(inputValue)
    )

    gallery.innerHTML = ''

    state.totalPage = Math.ceil(searchCards.length / itemsPerPage)

    const list = {
      element: query.get('.gallery'),
      update() {
        list.element.innerHTML = ''

        let page = state.page - 1
        let start = page * state.itemsPerPage
        let end = start + state.itemsPerPage

        const paginatedItems = searchCards.slice(start, end)
        return paginatedItems
      }
  }

  const update = () => {
    buttons.update()
  }

  update()

  renderAllCards(list.update())
}

init()

input.addEventListener('keyup', () => {
    state.page = 1
    filterSearch()
})

