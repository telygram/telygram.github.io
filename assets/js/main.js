let posts = [];
let visible = 6;

fetch('data/posts.json')
  .then(res => res.json())
  .then(data => {
    posts = data;
    renderPosts();
    renderRecent();
  });

function renderPosts() {
  let container = document.getElementById('post-list');
  container.innerHTML = "";

  posts.slice(0, visible).forEach(post => {
    container.innerHTML += `
      <div class="col-md-6 mb-4">
        <div class="card">
          <img src="${post.image}">
          <div class="card-body">
            <h5>${post.title}</h5>
            <p>${post.date}</p>
            <a href="${post.link}" class="btn btn-dark">Read More</a>
          </div>
        </div>
      </div>
    `;
  });
}

function loadMore(){
  visible += 6;
  renderPosts();
}

function renderRecent(){
  let el = document.getElementById('recent-posts');
  posts.slice(0,5).forEach(p=>{
    el.innerHTML += `<li><a href="${p.link}">${p.title}</a></li>`;
  });
}

/* RELATED POSTS */
function getRelated(category){
  return posts.filter(p => p.category === category).slice(0,4);
}