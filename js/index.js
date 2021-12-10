 //getting all required elements
 const start_btn = document.querySelector('.start_btn button');
 const info_box = document.querySelector('.info_box');
 const exit_btn = document.querySelector('.buttons .quit');
 const continue_btn = document.querySelector('.buttons .restart');
 const quiz_box = document.querySelector('.quiz_box');
 const option_list = document.querySelector('.option_list');
 const timeCount = document.querySelector('.timer .timer_sec');



 //By default timeLeft text
 quiz_box.querySelector('.time_text').innerText = 'Time Left';
 //if start quiz button clicked
 
 start_btn.onclick = ()=>{
     info_box.classList.add('activeInfo');
    }
    exit_btn.onclick = ()=>{
        info_box.classList.remove('activeInfo');
}

let time_line = quiz_box.querySelector('.time_line');

continue_btn.onclick = ()=>{
    //time_line.classList.add('activeTimeLine');
    startTimeLine(0);
    info_box.classList.remove('activeInfo');
    quiz_box.classList.add('activeQuiz');
    showQuestions(0);
    queCounter(1);
    startTimer(timeValue);
}

let que_count = 0;
let counter;
let counterLine;
let timeValue = 15;
let timeLineValue = 0;
const next_btn = document.querySelector('.next_btn')

//getting questions and options from array

function showQuestions(index){
    const que_text = document.querySelector('.que_text');
    let que_tag = `<span>`+ questions[index].numb +". " + questions[index].question + `</span>`;
    let option_tag = `<div class="option"><span>${questions[index].options[0]} </span></div>`
                     + `<div class="option"><span> ${questions[index].options[1]} </span></div>`
                     + `<div class="option"><span> ${questions[index].options[2]} </span></div>`
                     + `<div class="option"><span> ${questions[index].options[3]} </span></div>`;
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const options = option_list.querySelectorAll('.option');
    options.forEach((option)=>{
        option.setAttribute('onclick','optionSelector(this)');
    });
}

let tickIcon ='<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon ='<div class="icon cross"><i class="fas fa-times"></i></div>';

let userScore = 0;
//let correctItem = [];
function optionSelector(item){
    clearInterval(counter);
    clearInterval(counterLine);
    let allOption = option_list.childNodes;

    if(item.innerText === questions[que_count].answer){
        console.log(questions[que_count].answer);
        item.classList.add('correct');
        item.insertAdjacentHTML('beforeend',tickIcon);
        //correctItem.push(item);
        userScore +=1;
        //console.log(correctItem);
        //updateResult(correctItem.length);
        updateResult(userScore);
    }else{
        console.log('wrong ans');
        item.classList.add('incorrect');
        for(let i =0; i<allOption.length; i++){
            if(allOption[i].innerText === questions[que_count].answer){
                allOption[i].setAttribute('class','option correct');
                allOption[i].insertAdjacentHTML('beforeend',tickIcon);
            }
        }
        item.insertAdjacentHTML('beforeend',crossIcon);
    }
    allOption.forEach((option)=>{
        option.classList.add('disabled');
    });
    next_btn.style.display = 'block';
}

function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector('.total_que');
    let totalQuesCountTag = `<span><p>${index}</p>of<p>${questions.length}</p>Questions</span>`;
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}

let result_box = document.querySelector('.result_box');

// All Next Buttons
next_btn.onclick = ()=>{
    //que_count == 4 ? console.log('question completed') : que_count++;
    if(que_count < 4){
        que_count++;
        showQuestions(que_count);
        queCounter(que_count+1);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimeLine(timeLineValue);
    }else{
        console.log("que is completed");
        quiz_box.classList.remove('activeQuiz');
        result_box.classList.add('activeResult');
        updateResult(userScore);
        //correctItem = [];
        
    }
    quiz_box.querySelector('.time_text').innerText = 'Time Left';
    next_btn.style.display ='none';
    //showQuestions(que_count);
    //queCounter(que_count+1);
}
//Result box Restart button
result_box.querySelector('.restart').onclick = ()=>{
    result_box.classList.remove('activeResult');
    que_count = 0;
    showQuestions(que_count);
    queCounter(que_count+1);
    startTimer(15);
    startTimeLine(timeLineValue);
    quiz_box.classList.add('activeQuiz');
    userScore = 0;
}
//Result box quit button
result_box.querySelector('.quit').onclick = ()=>{
    result_box.classList.remove('activeResult');
    que_count = 0;
    showQuestions(que_count);
    queCounter(que_count+1);
    userScore = 0;
}

//Time Left setInterval Counter
function startTimer(time){
    counter = setInterval(()=>{
        timeCount.textContent = time;
        if(time < 10){
            let addzero = timeCount.textContent;
            timeCount.textContent = '0' + addzero;
        }
        if(time == 0){
            clearInterval(counter);
            timeCount.textContent = '00';
            let allOption = option_list.childNodes;
            for(let i =0; i<allOption.length; i++){
                if(allOption[i].innerText === questions[que_count].answer){
                    allOption[i].setAttribute('class','option correct');
                    allOption[i].insertAdjacentHTML('beforeend',tickIcon);
                }
            }
            quiz_box.querySelector('.time_text').innerText = 'Time Up';
            next_btn.style.display= 'block';
            item.insertAdjacentHTML('beforeend',crossIcon);
        }
        time--;
    },1000);
}

//Visual Line setInterval Counter
function startTimeLine(time){
    counterLine = setInterval(()=>{
        time +=1;
        time_line.style.width = time +'px';
        if(time >= 400){
            clearInterval(counterLine);
        }
    },39);
}

//Updating result box
let resultText = result_box.querySelector('.score_text');

function updateResult(times){
    let congo_sorry = '';
    let only = '';
    times >= 3 ? congo_sorry = 'Congrasulation' : congo_sorry = 'Sorry';
    times >= 3 ? only = '' : only = 'only';
    resultText.innerHTML = `<span>and ${congo_sorry}, you got ${only} <p>${times}</p> out of <p>5</p></span>`;
}