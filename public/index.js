// Your code here
window.addEventListener("DOMContentLoaded", event => {


  start();

  makeDiv("container");
  const mainContainer = document.getElementById("container")
  mainContainer.style.display = "flex";
  mainContainer.style.justifyContent = "center";

  picContainer();
  popularity();
  addComment();
  commentBox();


  const img = document.getElementById('container');

  const changeImg = e => {
    getPic();
  }

  img.addEventListener('click', changeImg);



  const popContainer = document.getElementById('popularity');
  const countContainer = document.getElementById('pop-count');
  const upButton = document.getElementById('upvote-button');
  const downButton = document.getElementById('downvote-button');

  const upvote = e => {
    popContainer.dataset.value++;

    countContainer.innerText = `Popularity Score: ${popContainer.dataset.value}`
    // e.stopPropagation();
  }

  const downvote = e => {
    let upVoteCount = +popContainer.dataset.value;
    upVoteCount += 2;
    // popContainer.dataset.value--;
    popContainer.dataset.value = upVoteCount;
    countContainer.innerText = `Popularity Score: ${upVoteCount}`
    alert("what's wrong you")
  }

  upButton.addEventListener('click', upvote);
  downButton.addEventListener('click', downvote);


  const submitButton = document.getElementById('comment-submit');
  const comment = document.getElementById('comment-text');

  const submitComment = e => {

    const newLi = document.createElement('li');
    newLi.setAttribute('class', 'comments');
    newLi.innerText = comment.value;

    const ul = document.getElementById('comments-list');

    ul.appendChild(newLi);

  }

  submitButton.addEventListener('click', submitComment);

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
  getPic();

  const mainContainer = document.getElementById("container")
  mainContainer.appendChild(img);
}

function makeDiv(id, parent = document.body) {
  const div = document.createElement('div')
  div.style.display = 'flex';
  div.style.justifyContent = 'center';

  if (id !== undefined) {
    div.id = id
  }
  appendTo(parent, div)

  return document.getElementById(id);
}

function popularity () {

  const popDiv = makeDiv('popularity');

  popDiv.setAttribute('data-value', 0)


  const countDiv = makeDiv('pop-count', popDiv)
  countDiv.innerText= `Popularity Score: ${popDiv.dataset.value}`;

  const buttonDiv = makeDiv('buttons', popDiv);

  const upvote = document.createElement('button');
  const downvote = document.createElement('button');

  upvote.innerText = "Upvote";
  upvote.id = "upvote-button";

  downvote.innerText = "Downvote";
  downvote.id = "downvote-button"


  buttonDiv.append(upvote, downvote);

}

function addComment () {

  const comment = makeDiv('comment-input');
  const label = document.createElement('label');
  const input = document.createElement('input');
  const button = document.createElement('button');

  label.setAttribute('for', 'comments');
  label.innerText = 'Comments: '

  input.type = 'text';
  input.name = 'comments';
  input.placeholder = 'Add a comment...';
  input.id = 'comment-text';

  button.innerText = 'Submit';
  button.id = 'comment-submit';

  comment.append(label, input, button);

}

function commentBox () {

  const box = makeDiv('comments-box');

  const ul = document.createElement('ul');
  ul.id = 'comments-list';

  box.appendChild(ul);

}

function appendTo(div, ...appended) {

  div.append(...appended)
}
