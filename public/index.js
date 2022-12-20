// Your code here

window.onload = () => {
    start();
    makeDiv("container");
    // const mainContainer = document.getElementById("container")
    // appendTo(mainContainer, getPic())
    const mainContainer = document.getElementById("container")
    getPic();

    mainContainer.style.display = "flex";
    mainContainer.style.justifyContent = "center";
//   const data = getPic()
//     .then(r =>  r)

//   console.log(data);
//   console.log(data[0], "Data")


}


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
