let username = document.getElementById("username");
let savebtn = document.getElementById("savebtn");
const recentscore = localStorage.getItem('mostrecent');
let presentscore = document.getElementById("display112");
presentscore.innerText=recentscore;
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
username.addEventListener("keyup",()=>{
    console.log("djhfndm");
    console.log(savebtn.disabled);
    savebtn.disabled = !username.value;
}); 

f = e =>{
    e.preventDefault();
    const scores={
        score :recentscore,
        nam :username.value
    };
    highscores.push(scores);
    highscores.sort((a,b)=>b.score - a.score);
    highscores.splice(5);
    localStorage.setItem("highscores",JSON.stringify(highscores));
    window.location.assign("./q.html");
}



