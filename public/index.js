// Your code here
window.addEventListener("DOMContentLoaded", event => {


  start();

  makeDiv("container");
  const mainContainer = document.getElementById("container")
  mainContainer.style.display = "flex";
  mainContainer.style.justifyContent = "center";

  const hasUrl = localStorage.getItem('url');
  const hasVoteCount = localStorage.getItem('votes');


  picContainer(hasUrl, hasVoteCount);
  popularity();
  addComment();
  commentBox();


  const img = document.getElementById('container');

  const changeImg = e => {
    getPic();
  }

  img.addEventListener('click', changeImg);



  const countContainer = document.getElementById('pop-count');
  const upButton = document.getElementById('upvote-button');
  const downButton = document.getElementById('downvote-button');

  const upvote = e => {
    img.dataset.value++;

    countContainer.innerText = `Popularity Score: ${img.dataset.votes}`
    // e.stopPropagation();
  }

  const downvote = e => {
    let upVoteCount = +img.dataset.votes;
    upVoteCount += 2;
    // img.dataset.value--;
    img.dataset.value = upVoteCount;
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

    const url = data[0].url;

    const img = document.getElementById("cat-pic")
    img.src = url;
    localStorage.setItem('url', url);


  } catch (e) {
    console.error(e);
  }

}

function picContainer(pastUrl = null, hasVoteCount) {

  const img = document.createElement('img');
  img.style.width = '400px';
  img.style.height = '300px';
  img.id = 'cat-pic';
  let count;
  hasVoteCount === null ? count = 0: count = hasVoteCount;
  img.setAttribute('data-votes', count);


  if (pastUrl) {
    img.src = pastUrl;
    img.dataset.votes = hasVoteCount;
  } else {
    getPic();
    img.dataset.votes = 0;
  }

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

  const count = document.getElementById('container').dataset.votes;


  const countDiv = makeDiv('pop-count', popDiv)
  countDiv.innerText= `Popularity Score: ${count}`;

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
