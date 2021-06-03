let addToy = false;
let ogDiv = document.querySelector('#toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  
  
  
  const getToys = () => {
    return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys => {toys.forEach(toy => {
      createToyData(toy)
    })
  })
}

const createToyData = (toy) => {
  let divCard = document.createElement('div')
  divCard.id = 'toyCard'
  
  let name = document.createElement('h2')
  name.innerText = toy.name
  
  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  
  let likes = document.createElement('p')
  likes.innerText = toy.likes
  
  let button = document.createElement('button')
  button.id= 'likesBtn'
  
  divCard.append(name, img, likes, button)
  ogDiv.append(divCard)
}

const createToys = (toy) => {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify ({
      "name": toy.name.value,
      "image": toy.image.value,
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then(function(newToy) {
    createToyData(newToy)
  })
}

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
    toyFormContainer.addEventListener('submit', e => {
      e.preventDefault()
      createToys(e.target)
    })
  } else {
    toyFormContainer.style.display = "none";
  }
});

getToys()

});
    