// Your code here

window.onload = () => {
    start();

    makeDiv("container");
    const mainContainer = document.getElementById("container")
    mainContainer.style.display = "flex";
    mainContainer.style.justifyContent = "center";

    getPic();

};

window.addEventListener("DOMContentLoaded", event => {

  const img = document.getElementById('cat-pic');

  const changeImg = e => {

    img.remove();
    getPic();

  }

  img.addEventListener('click', changeImg);


});


function start(){
    const header = document.createElement('h1');
    header.innerText = "Kitten Pic";
    header.style.display = "flex";
    header.style.justifyContent = 'center';
    document.body.appendChild(header)
}

async function getPic(){
  try {
    let resp = await fetch('https://api.thecatapi.com/v1/images/search')
      let data = await resp.json();
      // console.log(data[0].url.split('.'))

    //   console.log(data[0].url)

        const img = document.createElement('img');
        img.src = data[0].url
        // img.style.aspectRatio = '16/9'

        img.style.width = '800px';
        img.style.height = '450px';
        img.id = 'cat-pic';
        const mainContainer = document.getElementById("container")
        mainContainer.appendChild(img);
        return data[0].url;

  } catch(e) {
    console.error(e);
  }

}

function makeDiv(id) {
   const div = document.createElement('div')

   if(id !== undefined){
    div.id = id
   }
   appendTo(document.body, div)
}

function appendTo(div, ...appended){

    div.append(...appended)
}
