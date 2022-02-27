const form = document.querySelector('form')
const nameInput = document.querySelector('#name-input')
const userComment = document.querySelector('#comment-text')
const commentList = document.querySelector('#comment-list')


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

    console.log(body)

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

getComments()
form.addEventListener('submit', submitHandler)
