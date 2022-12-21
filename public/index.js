// Your code here
window.addEventListener("DOMContentLoaded", event => {


  start();

  makeDiv("container");
  const mainContainer = document.getElementById("container")
  mainContainer.style.display = "flex";
  mainContainer.style.justifyContent = "center";

  picContainer();

  let img = document.getElementById('container');

  const changeImg = e => {


    // document.getElementById("container").remove();
    // makeDiv("container");
    // const mainContainer = document.getElementById("container")
    // mainContainer.style.display = "flex";
    // mainContainer.style.justifyContent = "center";

    // document.querySelector("img").remove()

    getPic();

  }

  img.addEventListener('click', changeImg);


});


function start() {
  const header = document.createElement('h1');
  header.innerText = "Catstagram";
  header.style.display = "flex";
  header.style.justifyContent = 'center';
  document.body.appendChild(header)
}

async function getPic() {
  try {
    let resp = await fetch('https://api.thecatapi.com/v1/images/search')
    let data = await resp.json();
    // console.log(data[0].url.split('.'))
    //console.log(data[0].url)
    // console.log(mainContainer)
    const img = document.getElementById("cat-pic")
    img.src = data[0].url
    // return data[0].url;

  } catch (e) {
    console.error(e);
  }

}

function picContainer() {

  const img = document.createElement('img');
  img.style.width = '400px';
  img.style.height = '300px';
  img.id = 'cat-pic';
  getPic()

  const mainContainer = document.getElementById("container")
  mainContainer.appendChild(img);
}

function makeDiv(id, parent = document.body) {
  const div = document.createElement('div')

  if (id !== undefined) {
    div.id = id
  }
  appendTo(parent, div)
}

function popularity () {

  makeDiv('popularity');
  const popDiv = document.getElementById('popularity');

  let score = 0;
  popDiv.innerText= `Popularity Score: ${score}`;

  makeDiv('buttons', popDiv);




}

function appendTo(div, ...appended) {

  div.append(...appended)
}
