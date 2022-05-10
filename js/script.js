const addBtn = document.getElementById("btn-add");
const target = document.getElementById("modal");

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  target.classList.remove("no-display");
});

const main = document.getElementById("main");

// Remove old articles from DOM
function clearDOM() {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
}

// Implement getArticlesFromServer function using fetch API

function getArticlesFromServer() {
  fetch(" http://localhost:3000/articles")
    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          for (let i = 0; i < data.length; i++) {
            let article = data[i];
            let articleElem = createArticleNode(article);
            main.appendChild(articleElem);

            // dont exist in the DOM prior to this line
            const editButtons = document.querySelectorAll(".btn-edit");
            editButtons.forEach((btn) => {
              console.log(btn);
              btn.addEventListener("click", function (e) {
                e.preventDefault();
                target.classList.remove("no-display");
              });
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log("Fetch error!");
    });
}

// Create a DOM node for each element of the list and append it to <main> using DOM Methods

function createArticleNode(article) {
  // Article node
  let articleElem = document.createElement("article");

  // Title
  let title = document.createElement("h1");
  title.textContent = article.title;

  // Div info node
  let divInfo = document.createElement("div");

  divInfo.classList.add("article-info");
  let pInfo = document.createElement("p");
  pInfo.textContent = article.tag;

  let pDot = document.createElement("p"); // carefull u need it 2 times
  pDot.classList.add("dot");
  pDot.innerHTML = "&#8226";

  let pDot2 = document.createElement("p"); // carefull u need it 2 times
  pDot2.classList.add("dot");
  pDot2.innerHTML = "&#8226";

  let pAdd = document.createElement("p");
  pAdd.innerHTML = "Added by ";
  let pSpan = document.createElement("span");
  pSpan.classList.add("article-author");
  pSpan.textContent = article.author;
  pAdd.appendChild(pSpan);

  let pDate = document.createElement("p");
  pDate.textContent = article.date;

  divInfo.appendChild(pInfo);
  divInfo.appendChild(pDot);
  divInfo.appendChild(pAdd);
  divInfo.appendChild(pDot2);
  divInfo.appendChild(pDate);

  //Div modify

  let divModify = document.createElement("div");
  divModify.classList.add("article-modify");

  let btnEdit = document.createElement("button");
  btnEdit.classList.add("btn-edit");
  btnEdit.textContent = "Edit";

  let spanBtnEdit = document.createElement("span");
  spanBtnEdit.innerHTML = "&#124";

  let btnDelete = document.createElement("button");
  btnDelete.classList.add("btn-edit");
  btnDelete.textContent = "Delete";

  divModify.appendChild(btnEdit);
  divModify.appendChild(spanBtnEdit);
  divModify.appendChild(btnDelete);

  // Div image
  let divImage = document.createElement("div");
  divImage.classList.add("article-img");
  let img = document.createElement("img");
  img.src = article.imgUrl;
  divImage.appendChild(img);

  // Div content

  let divContent = document.createElement("div");
  divContent.classList.add("article-paragraph");
  let pContent = document.createElement("p");
  pContent.textContent = article.content;

  divContent.appendChild(pContent);

  // Append all elements to article

  articleElem.appendChild(title);
  articleElem.appendChild(divInfo);
  articleElem.appendChild(divModify);
  articleElem.appendChild(divImage);
  articleElem.appendChild(divContent);

  return articleElem;
}

clearDOM();
getArticlesFromServer();
