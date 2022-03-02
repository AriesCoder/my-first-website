const form = document.querySelector('form')
const nameInput = document.querySelector('#name-input')
const userComment = document.querySelector('#comment-text')
const commentList = document.querySelector('#comment-list')
const dropBtn = document.querySelector('#filtercontent')
const filterBtn = document.querySelector('.stars')
const filterCmt = document.querySelector('.fil-cmt')
const filterCont = document.querySelector('.filter-container')
// const closeFilBtn = document.querySelector('.closebutton')


function dropDownBtn() {
    dropBtn.classList.toggle("show");
  }
  
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
    let userRating = document.querySelector('input[name="rate"]:checked').value
    event.preventDefault()
    let body = {
        name: nameInput.value,
        rating: userRating,
        comment: userComment.value
    }

    axios.post('http://localhost:4004/link1', body)
    .then(()=>{
        nameInput.value = ''
        userComment.value = ''
        document.querySelector('input[name="rate"]:checked').checked = false
        getComments()
    })
}

function deleteComment(id) {
    axios.delete(`http://localhost:4004/link1/${id}`)
        .then(() => getComments())
        .catch(err => console.log(err))
}

function getComments(){
    commentList.innerHTML = ''

    axios.get('http://localhost:4004/link1')
    .then(res => {
        res.data.forEach(elem =>{
            let commentCard = `<div class="comment-card">
            <h2>${elem.name}: </h2>
            <p style="font-size:20px">${elem.comment}</p>
            <h3>Rating: ${elem.rating}/5</h3>
            <button onclick="deleteComment(${elem['comment_id']})">Delete</button>
            </div>
        `
        commentList.innerHTML += commentCard
        })
    })
}

function getRecipe(){
    const pageTitle = document.title 
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
    console.log(1, pageTitle, name)
    axios.get(`http://localhost:4004/link1/recipes/${name}`)
      .then(res => {
        console.log(2, res)
        recipeName.textContent += res.data[0].title
        ingredients.innerText += res.data[0].ingredients
        instructions.innerText += res.data[0].instructions
        source.textContent = res.data[0].source
      })
      .catch(err => console.log(err))
}

function getRating(rate){
  filterCont.innerHTML = ''
  filterCont.innerHTML += "<br><button class='closebutton' onclick='doClose()' >X </button><br>"; 
    console.log(rate)
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

getRecipe()
getComments()
form.addEventListener('submit', submitHandler)
// closeFilBtn.addEventListener('click', doClose)