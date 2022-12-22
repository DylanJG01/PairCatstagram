// Your code here
const random_hex_color_code = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

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

    let voteCount = +localStorage.getItem('votes');
    voteCount++;

    localStorage.setItem('votes', voteCount)
    countContainer.innerText = `Popularity Score: ${voteCount}`
    e.stopPropagation();
  }

  const downvote = e => {
    let voteCount = +localStorage.getItem('votes');
    voteCount += 2;
    // voteCount--;
    localStorage.setItem('votes', voteCount)
    countContainer.innerText = `Popularity Score: ${voteCount}`
    alert("what's wrong you")
    e.stopPropagation();
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

    const hasComments = localStorage.getItem('comments');

  if (hasComments) {
    localStorage.setItem('comments', hasComments + '=' + comment.value)
  } else {
    localStorage.setItem('comments', comment.value);
  }

  const text = document.getElementById("comment-text");
  text.value = "";

  }

  submitButton.addEventListener('click', submitComment);

});


function start() {
  const header = document.createElement('h1');
  header.innerText = "Catstagram";
  header.style.display = "flex";
  header.style.justifyContent = 'center';
  header.style.color = random_hex_color_code();
  header.style.background = "white";  
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

    document.querySelector('#pop-count').innerText = 'Popularity Score: 0'
    localStorage.setItem('votes', 0);

    localStorage.removeItem('comments');
    document.querySelectorAll('li').forEach(li => li.remove());


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
  localStorage.setItem('votes', count);


  if (pastUrl) {
    img.src = pastUrl;

  } else {
    getPic();
    // localStorage.removeItem('votes');
  }

  const mainContainer = document.getElementById("container")
  mainContainer.appendChild(img);
  mainContainer.style.flexDirection = 'column';

}

function makeDiv(id, parent = document.body) {
  const div = document.createElement('div')
  div.style.display = 'flex';
  div.style.justifyContent = 'center';
  div.style.margin = "5px" 


  if (id !== undefined) {
    div.id = id
  }
  appendTo(parent, div)

  return document.getElementById(id);
}

function popularity () {


  const img = document.getElementById('container');

  const popDiv = makeDiv('popularity', img);
  popDiv.style.flexDirection = 'column';

  const count = localStorage.getItem('votes')


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
  popDiv.appendChild(buttonDiv);

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

  const pastComments = localStorage.getItem('comments');

  const ul = document.createElement('ul');
  ul.id = 'comments-list';

  if (pastComments) {
    const arr = pastComments.split('=');

    arr.forEach(comment => {

      const li = document.createElement('li');
      li.innerText = comment;
      li.setAttribute('class', 'comments');

      ul.appendChild(li);
    });
  }

  box.appendChild(ul);

}

function appendTo(div, ...appended) {

  div.append(...appended)
}
