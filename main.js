;(async () => { 
  
  const API_KEY = '7035c60c'
  const keywordsEl = document.querySelector('input');
  const typeEl = document.querySelector('#selection__content-type');
  const sizeEl = document.querySelector('#selection__list-size');
  const yearEl = document.querySelector('#selection__release-year');
  const applyEl = document.querySelector('.select-apply')
  const moviesEl = document.querySelector('.movies');
  const moreEl = document.querySelector('.result-more');

  async function initMovies() {
    moviesEl.innerHTML = ''
  }

  applyEl.addEventListener('click', async() => {
    initMovies()
    let type = typeEl.value
    let toPage = Number(sizeEl.value) / 10
    let year = yearEl.value 
    for (let page = 1; page <= toPage; page += 1) {
      const movies = await callMovies(keywords, type, page, year)
      renderMovies(movies)
    }
  })

  keywordsEl.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      initMovies()    
      let keywords = keywordsEl.value
      let type = typeEl.value
      let toPage = Number(sizeEl.value) / 10
      let year = yearEl.value 
      for (let page = 1; page <= toPage; page += 1) {
        const movies = await callMovies(keywords, type, page, year)
        renderMovies(movies)
      }
    }
  })

  async function callMovies(keywords, type, page, year) {
    const response = await fetch(`https://omdbapi.com/?apikey=${API_KEY}&s=${keywords}&type=${type}&page=${page}&y=${year}`)
  }

  async function callMovies(keywords, type, page=1, year) {
    const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&s=${keywords}&type=${type}&page=${page}&y=${year}`)
    const { Search: movies } = await res.json();
    console.log(res)
    console.log(movies)
    page += 1
    return movies
  }

  function renderMovies(movies) {     
    if (!movies) {
      alert("더 검색할 영화가 없습니다. :)")
      return
    } 
    for (const movie of movies) {
      const el =document.createElement('div')
      el.classList.add('movie')
      const h1El = document.createElement('h1')
      h1El.textContent = movie.Title
      h1El.classList.add('content-title')
      const imgEl = document.createElement('img')
      imgEl.src = movie.Poster === 'N/A' ? './images/icon-movie.png' : movie.Poster
      el.append(imgEl, h1El)
      moviesEl.append(el)
    }
  }

  moreEl.addEventListener('click', async () => {
    let keywords = keywordsEl.value
    let type = typeEl.value 
    let toPage = Number(sizeEl.value) / 10   
    let year = yearEl.value 
    let page = toPage + 1
    const movies = await callMovies(keywords, type, page +=1, year)
    renderMovies(movies)
    return
  })

})()

