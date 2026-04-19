let posts=[];

fetch('data/posts.json')
.then(r=>r.json())
.then(d=>{
  posts=d;
  home();
});

/* HOME */
function home(){
  let featured = posts[0];

  document.getElementById("featured").innerHTML=`
  <div class="card featured mb-4">
    <img src="${featured.image}">
    <div class="p-3">
      <h3>${featured.title}</h3>
      <a href="post.html?id=${featured.id}">Read More</a>
    </div>
  </div>`;

  let grid="";
  posts.slice(1).forEach((p,i)=>{
    grid+=`
    <div class="col-md-6 mb-4">
      <div class="card">
        <img loading="lazy" src="${p.image}">
        <div class="p-2">
          <h6>${p.title}</h6>
          <a href="post.html?id=${p.id}">Read</a>
        </div>
      </div>
    </div>`;

    /* INSERT ADS EVERY 4 POSTS */
    if((i+1)%4==0){
      grid+=`<div class="col-12"><div class="ads text-center">ADS SLOT</div></div>`;
    }
  });

  document.getElementById("posts").innerHTML=grid;
}

/* POST PAGE */
const url = new URLSearchParams(window.location.search);
const id = url.get("id");

if(id){
fetch('data/posts.json')
.then(r=>r.json())
.then(data=>{
  let post = data.find(p=>p.id==id);

  document.getElementById("title").innerText=post.title;
  document.getElementById("img").src=post.image;
  document.getElementById("content").innerHTML=post.content;

  /* RELATED */
  let rel = data.filter(p=>p.category==post.category && p.id!=post.id).slice(0,4);

  let html="";
  rel.forEach(r=>{
    html+=`
    <div class="col-md-3">
      <div class="card">
        <img src="${r.image}">
        <div class="p-2">
          <small>${r.title}</small>
        </div>
      </div>
    </div>`;
  });

  document.getElementById("related").innerHTML=html;
});
}