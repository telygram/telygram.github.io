let posts = [];
let perPage = 6;
let current = 1;

fetch('data/posts.json')
.then(r=>r.json())
.then(d=>{
  posts = d;
  render();
  sidebar();
});

function render(){
  let start = (current-1)*perPage;
  let data = posts.slice(start, start+perPage);

  let el = document.getElementById('post-list');
  el.innerHTML = "";

  data.forEach(p=>{
    el.innerHTML += `
    <div class="col-md-6 mb-4">
      <div class="card">
        <img loading="lazy" src="${p.image}">
        <div class="card-body">
          <h5>${p.title}</h5>
          <a href="post.html?id=${p.id}" class="btn btn-dark">Read</a>
        </div>
      </div>
    </div>`;
  });

  pagination();
}

function pagination(){
  let total = Math.ceil(posts.length/perPage);
  let el = document.getElementById('pagination');
  el.innerHTML = "";

  for(let i=1;i<=total;i++){
    el.innerHTML += `<li class="page-item">
    <a class="page-link" onclick="go(${i})">${i}</a></li>`;
  }
}

function go(i){
  current=i;
  render();
}

/* SIDEBAR */
function sidebar(){
  let recent = document.getElementById('recent');
  posts.slice(0,5).forEach(p=>{
    recent.innerHTML += `<li><a href="post.html?id=${p.id}">${p.title}</a></li>`;
  });
}

/* DARK MODE */
document.getElementById("darkToggle")?.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("dark",document.body.classList.contains("dark"));
});

if(localStorage.getItem("dark")=="true"){
  document.body.classList.add("dark");
}

/* SCROLL TOP */
let btn = document.getElementById("topBtn");
window.onscroll=()=>{
  btn.style.display = window.scrollY>300 ? "block":"none";
}
btn.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});