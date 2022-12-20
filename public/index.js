// Your code here

window.onload = () => {
  start();
  const data = getPic()
    .then(r => r);
  console.log(data);
  console.log(data[0])
  const link = data[0].url;
  console.log(link);
  const img = document.createElement('img');
  img.src = link
  document.body.appendChild(img);
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
      let ext = data[0].url.split('.')[3]
      if (ext === 'png' || ext === 'jpg') return data;

      return getPic();
  } catch(e) {
    console.error(e);
  }

}
