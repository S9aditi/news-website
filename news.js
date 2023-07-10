const API_KEY="b4b85e22e16249b9838f96b6263fc17f";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchNews('India'));


async function fetchNews(query){
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    bindData(data.articles);
}


function bindData(articles){
    const cardscontainer=document.getElementById('cards-container');
    const newscardtemplate=document.getElementById('news-card');
    cardscontainer.innerHTML='';
    articles.forEach(element => {
        if(!element.urlToImage) return;
        const cardclone=newscardtemplate.content.cloneNode(true);
        filldataincard(cardclone,element);
        cardscontainer.appendChild(cardclone);
    });
}


function filldataincard(cardclone,element){
    const newsimage=cardclone.querySelector('#news-img');
    const newstitle=cardclone.querySelector('#news-title');
    const newssource=cardclone.querySelector('#news-source');
    const newsdesc=cardclone.querySelector('#news-desc');

    newsimage.src=element.urlToImage;
    newstitle.innerHTML=element.title;
    newsdesc.innerHTML=element.description;
    const date=new Date(element.publishedAt).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });

    newssource.innerHTML=`${element.source.name} . ${date}`;
    cardclone.firstElementChild.addEventListener('click', ()=>{
        window.open(element.url,'_blank');
    })
}

let current=null;
function onnavclick(id){
    fetchNews(id);
    const navitem=document.getElementById(id);
    current?.classList.remove("active");
    current=navitem;
    current.classList.add("active");
}

const search=document.getElementById('search');
const searchtext=document.getElementById('search-text');

search.addEventListener('click',()=>{
    const query=searchtext.value;
    if(!query)return;
    current?.classList.remove('active');
    fetchNews(query);
})

function reload(){
    window.location.reload();
}