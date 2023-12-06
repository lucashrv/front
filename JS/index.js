const query = {
    get(element) {
        return document.querySelector(element)
    }
}

const title = query.get('.typing')
const titleArray = title.innerHTML.split('')

const init = () => {
    titleTyping(titleArray)
}

const titleTyping = (array) => {
    title.innerHTML = ''

    array.map((item, i) => {
        setTimeout(() => {
            title.innerHTML += item
        }, 100 * i);
    })
}

init()
