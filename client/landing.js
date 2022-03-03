const useremailInput = document.querySelector('.useremail')
const usernameInput = document.querySelector('.username')
const userInfo = document.getElementById('user-info')

userInfo.addEventListener('submit', (e) => {
    e.preventDefault()
    window.localStorage.setItem('username', usernameInput.value)
    console.log('local', window.localStorage, typeof window.localStorage)
    window.localStorage.setItem('useremail', useremailInput.value)
    document.getElementById('landing-container').style.display = 'none'
})

