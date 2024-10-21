const s=JSON.parse(localStorage.getItem('highscores'))
const l = document.getElementById("list");
l.innerHTML = s.map(score=>{
    return `<li class="high-scores">${score.nam}-${score.score}</li>`
}).join(" ")
