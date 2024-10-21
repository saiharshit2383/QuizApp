let question = document.getElementById("question");
let options = Array.from(document.getElementsByClassName("options"));
let currentquestion = {};
let acceptinganswer=false;
let score=0;
let questioncounter = 0;
let availablequestions=[];
async function questionmark(){
    let response = await fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=hard&type=multiple')
    let questions =await response.json()
    finalquestions=questions.results.map(q=>{const forques={question:q.question}
        const answerschoi = [...q.incorrect_answers]
        forques.answer=Math.floor(Math.random()*3)+1;
        answerschoi.splice(forques.answer-1,0,q.correct_answer);
        answerschoi.forEach((choice,index)=>{forques["choice"+(index+1)]=choice})
        console.log(JSON.stringify(forques))
        return forques
    });
    startgame(finalquestions);
}


let maxquestions = 3;
let bonus=10;

startgame=(questions)=>{
    questioncounter = 0;
    score=0;
    availablequestions=[...questions];
    getnewquestions();
}

getnewquestions =()=>{
    if(availablequestions.length==0 || questioncounter>=maxquestions){
        localStorage.setItem('mostrecent',score);
        //document.getElementById("display112").innerHTML=score;
        return window.location.assign('./end.html');
    }
    questioncounter++;
    document.getElementById("questionno").innerHTML=questioncounter +"/"+maxquestions;
    const questionindex=Math.floor(Math.random()*availablequestions.length);
    currentquestion=availablequestions[questionindex];
    question.innerText=currentquestion.question;
    options.forEach(choice=>{
        const number = choice.dataset["number"];
        choice.innerText = currentquestion["choice" + number];
    });
    availablequestions.splice(questionindex,1)
    acceptinganswer=true
}
options.forEach(choice =>{
    choice.addEventListener('click',e =>{
        if(!acceptinganswer){return}
        acceptinganswer=false
        const selectedchoice=e.target
        const selectedanswer=selectedchoice.dataset["number"]
        const eval = selectedanswer==currentquestion.answer ? "correct":"incorrect";
        if(eval=="correct"){
            score+=10;
            document.getElementById("scores").innerHTML=score;
        }
        selectedchoice.classList.add(eval);
        setTimeout(() =>{
            selectedchoice.classList.remove(eval);
            getnewquestions();
        },2000);
    })
})

questionmark()
