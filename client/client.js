const form = document.querySelector('form')
const nameInput = document.querySelector('#name-input')
const userComment = document.querySelector('#comment-text')
const commentList = document.querySelector('#comment-list')
const dropBtn = document.querySelector('#filtercontent')
const filterBtn = document.querySelector('.stars')
const filterCmt = document.querySelector('.fil-cmt')
const filterCont = document.querySelector('.filter-container')
const searchInput = document.querySelector('.search-field')
const useremailInput = document.querySelector('.useremail')
const usernameInput = document.querySelector('.username')
const userInfo = document.getElementById('user-info')
const exitBtn = document.querySelector('.exit-btn')
const pageTitle = document.title 
const id_map = {
  link1 : 1,
  link2 : 2,
  link3 : 3
}

function dropDownBtn() {
    dropBtn.classList.toggle("show");
  }

searchInput.addEventListener('keyup', function (e) {
  if (e.keyCode == 13) {
    e.preventDefault()
    document.querySelector(".result-content").style.display = 'block';
    searchInput.value = ''
  }
  });
searchInput.addEventListener('click', function (e) {
    e.preventDefault()
    document.querySelector(".result-content").style.display = 'none';
  });

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.filterbtn')) {
    var dropdowns = document.getElementsByClassName("filter-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function submitHandler(event){
    event.preventDefault()
    let id = id_map[pageTitle]
    let userRating = document.querySelector('input[name="rate"]:checked').value
    let {username} =  window.localStorage
    let body = {
        name: username,
        rating: userRating,
        comment: userComment.value,
        recipe_id: id
    }

    axios.post('http://localhost:4004/link1', body)
    .then(()=>{
        userComment.value = ''
        document.querySelector('input[name="rate"]:checked').checked = false
        getAllCmtByPage(id)
    })
}

function deleteComment(id) {
    axios.delete(`http://localhost:4004/link1/${id}`)
        .then(() => getAllCmtByPage(id_map[pageTitle]))
        .catch(err => console.log(err))
}

function getAllCmtByPage(id){
    commentList.innerHTML = ''
    axios.get(`http://localhost:4004/comments/${id}`)
    .then(res => {
      let {username} =  window.localStorage
      let commentCard = ''
        res.data.forEach(elem =>{
            if (username === elem.name) {
              commentCard = `<div class="comment-card">
              <h2>${elem.name}: </h2>
              <p style="font-size:20px">${elem.comment}</p>
              <h3>Rating: ${elem.rating}/5</h3>
              <button onclick="deleteComment(${elem.comment_id})">Delete</button>
              </div>
              `
            } else {
              commentCard = `<div class="comment-card">
              <h2>${elem.name}: </h2>
              <p style="font-size:20px">${elem.comment}</p>
              <h3>Rating: ${elem.rating}/5</h3>
              </div>
              `
            }
        commentList.innerHTML += commentCard
        })
    })
}

function getRecipe(){
    const recipeName = document.querySelector('.recipe-name')
    const instructions = document.querySelector('.instructions')
    const ingredients = document.querySelector('.ingredients')
    const source = document.querySelector('.source')
    const page_map = {
      link1 : "pho",
      link2 : "springrolls",
      link3 : "banhxeo",
    }
    let name = page_map[pageTitle]
    axios.get(`http://localhost:4004/recipes/${name}`)
      .then(res => {
        recipeName.textContent += res.data[0].title
        ingredients.innerText += res.data[0].ingredients
        instructions.innerText += res.data[0].instructions
        source.textContent = res.data[0].source
      })
      .catch(err => console.log(err))
}

function searchRecipes(){
  let input = document.querySelector('.search-field').value
  let result = document.querySelector('.result-content')
  result.innerHTML = ''
  let resultCard = ''
  axios.get(`http://localhost:4004/search/${input}`)
  .then(res => { 
    if(res.data[0] === undefined){
      resultCard = `<div class="result-card">
      <a>No result</a>
      </div>`   
    }else{
      resultCard = `<div class="result-card">
          <a href="${res.data[0].link}">${input}</a>
          </div>`   
    }
    result.innerHTML += resultCard 
  })
  .catch(err => console.log(err))
}

function getRating(rate){
  filterCont.innerHTML = ''
  filterCont.innerHTML += "<br><button class='closebutton' onclick='doClose()' >X </button><br>"; 
    axios.get(`http://localhost:4004/link1/${rate}`)
    .then(res => {
      res.data.forEach(elem =>{
          let commentCard = `<div class="comment-card">
          <h2>${elem.name}: </h2>
          <p style="font-size:20px">${elem.comment}</p>
          <h3>Rating: ${elem.rating}/5</h3>
          </div>
    `
    filterCont.innerHTML += commentCard   
    })

  })
}
function doClose(){
    filterCont.innerHTML = ''
}

function exitOnClick(){
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('useremail')
    window.location.href = './home.html'
    exitBtn.style.display = 'none'
    document.getElementById('landing-container').style.visibility = 'visible'
}

// landing
if(pageTitle ==='home'){
  userInfo.addEventListener('submit', (e) => {
    e.preventDefault()
    window.localStorage.setItem('username', usernameInput.value)
    console.log('local', window.localStorage, typeof window.localStorage)
    window.localStorage.setItem('useremail', useremailInput.value)
    document.getElementById('landing-container').style.visibility = 'hidden'
    exitBtn.style.display = 'block'
})

function landingPage(){
    let localSt = window.localStorage.length
    console.log(localSt)
    if(localSt === 0){
        document.getElementById('landing-container').style.visibility = 'visible'
        exitBtn.style.display = 'none'
    }else{
        document.getElementById('landing-container').style.visibility = 'hidden'
        exitBtn.style.display = 'block'
    }
  }
  landingPage()
}
console.log("pageTitle" ,pageTitle);

if( pageTitle === 'link1' || pageTitle === 'link2' || pageTitle === 'link3'){
    getRecipe()
    getAllCmtByPage(id_map[pageTitle])
    console.log("link", pageTitle)
    form.addEventListener('submit', submitHandler)
}


