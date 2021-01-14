let addToy = false;
const BASE_URL = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToy();
  handleForm();

});

const getToy = () => {
  document.querySelector("#toy-collection").innerHTML = "";
  fetch(BASE_URL)
    .then((res) => res.json())
    .then((toyData) => toyData.forEach(renderToy))
};


const renderToy = (toy) => {

  let toys = document.querySelector("#toy-collection");

  let div = document.createElement("div");
  div.className = "card";



  let h2 = document.createElement("h2");
  h2.innerText = toy.name

  
  let img = document.createElement("img");
  img.className = "toy-avatar";
  img.src = toy.image;


  let p = document.createElement("p");
  p.innerText = `Likes ${toy.likes}`
  p.id = `footer-${toy.id}`;
  
  
  
  let button = document.createElement("button");
  button.className = "like-btn";
  button.innerText = "Like <3";
  button.addEventListener("click", () => {
    updateLikes(toy);
  });
  
  toys.appendChild(div)
  div.append(h2, img, p, button);


};

const handleForm = () => {
  const toyForm = document.querySelector("form");
  toyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let newToy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0,
    };

    let reqPackage = {};
    reqPackage.headers = { "Content-Type": "application/json" };
    reqPackage.method = "POST";
    reqPackage.body = JSON.stringify(newToy);
    fetch(BASE_URL, reqPackage)
      .then((res) => res.json())
      .then(renderToy);
    toyForm.reset();
  });
};

const updateLikes = (toy) => {
  let likes = parseInt(
    document.getElementById(`footer-${toy.id}`).innerText.split(" ")[1]
  );

  let newLikes = {
    likes: likes + 1,
  };

  let reqPackage = {};
  reqPackage.headers = { "Content-Type": "application/json" };
  reqPackage.method = "PATCH";
  reqPackage.body = JSON.stringify(newLikes);

  fetch(BASE_URL + `/${toy.id}`, reqPackage)
    .then((res) => res.json())
    .then((toyObj) => {
      document.getElementById(`footer-${toyObj.id}`).innerText =
        `Likes ${newLikes.likes}`;
    });
};

