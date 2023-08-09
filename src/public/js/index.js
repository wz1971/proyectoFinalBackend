const socket = io()

socket.on("initialProducts", (prodlist) => {
  console.log("Nuevo mensaje del server")
  const listContainer = document.getElementById("prodlist")
  listContainer.innerHTML = ""
  prodlist.forEach((element) => {
    let title = JSON.stringify(element.title)
    let desc = JSON.stringify(element.description)
    product = document.createElement("li")
    product.innerHTML = `<h5>${title}</h5><p>${desc}</p>`
    listContainer.appendChild(product)
  })
})
