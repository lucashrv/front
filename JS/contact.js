const query = {
    get(element) {
        return document.querySelector(element)
    }
}

const btn = query.get(".btn")
const nome = query.get("#nome")
const email = query.get("#email")
const phone = query.get("#phone")
const opnion = query.get("#opnion")

const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
}

btn.addEventListener("click", () => {
    !nome.value ? nome.style.border = "2px solid red" : ""
    !email.value ? email.style.border = "2px solid red" : ""
    !phone.value
        || phone.value.length < 15
        || phone.value.length > 15
            ? phone.style.border = "2px solid red" : ""
    !opnion.value ? opnion.style.border = "2px solid red" : ""
})

nome.addEventListener("keyup", () => {
    nome.value ? nome.style.border = "1px solid" : ""
})

email.addEventListener("keyup", () => {
    email.value ? email.style.border = "1px solid" : ""
})

phone.addEventListener("keyup", () => {
    phone.value ? phone.style.border = "1px solid" : ""
    phone.value = phoneMask(phone.value)
})

opnion.addEventListener("keyup", () => {
    opnion.value ? opnion.style.border = "1px solid" : ""
})