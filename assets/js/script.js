const listQuestions = [
    {
        question: "De quem é a famosa frase “Penso, logo existo”?",
        options: [
            ["Platão", false],
            ["Sócrates", false],
            ["Descartes", true],
            ["Francis Bacon", false] 
        ]
    },
    {
        question: "Quais o menor e o maior país do mundo?",
        options: [
            ["Vaticano e Rússia", true],
            ["Mônaco e Canadá", false],
            ["Malta e Estados Unidos", false],
            ["Nauru e China", false] 
        ]
    },
    {
        question: "Qual o livro mais vendido no mundo a seguir à Bíblia?",
        options: [
            ["O Senhor dos Anéis", false],
            ["Dom Quixote", true],
            ["O Pequeno Príncipe", false],
            ["Um Conto de Duas Cidades", false]
        ]
    },
    {
        question: "Qual a nacionalidade de Che Guevara?",
        options: [
            ["Cubana", false],
            ["Panamenha", false],
            ["Boliviana", false],
            ["Argentina", true]
        ]
    },
    {
        question: "Quais são os três predadores do reino animal reconhecidos pela habilidade de caçar em grupo, se camuflar para surpreender as presas e possuir sentidos apurados, respectivamente:",
        options: [
            ["Tubarão branco, crocodilo e sucuri", false],
            ["Tigre, gavião e orca", false],
            ["Hiena, urso branco e lobo cinzento", true],
            ["Orca, onça e tarântula", false] 
        ]
    },
];


let questionField = document.querySelector('#question-field');
const btnOptions = document.querySelector('.btn-options');
const mainButton = document.querySelector('#main-btn');
const btnNext = document.querySelector('.btn-next');

let repeatedQuestiosList = [];
let numberQuestion = 0;
let score = 0;

function play(){
    $('#modal').modal('show');
    handleMainButton();
    scoreCalculator();
    console.log(score);

    if(numberQuestion < 5){
        questionIndex = getRandomNumber(listQuestions.length);
        while(repeatedQuestiosList.includes(questionIndex) && repeatedQuestiosList.length < 5){
            questionIndex = getRandomNumber(listQuestions.length);
        }

        if(!(repeatedQuestiosList.includes(questionIndex))){
            repeatedQuestiosList[numberQuestion] = questionIndex;
        }

        repeatedOptionsList = [];
        i = 0;
        while(repeatedOptionsList.length < listQuestions[questionIndex].options.length){
            optionIndex = getRandomNumber(listQuestions[questionIndex].options.length);
            if(!(repeatedOptionsList.includes(optionIndex))){
                repeatedOptionsList[i] = optionIndex;
                i++;
            }
        }

        view(questionIndex, numberQuestion, repeatedOptionsList);
        btnNext.disabled = true;
    } 
    else {
        $('#modal').modal('hide');
        document.querySelector('.message').innerHTML = `Resultado: ${ score } pontos`;
    }
    numberQuestion++;
}

function handleMainButton() {
    let btnType;

    if(numberQuestion == 0){
        mainButton.innerHTML = 'Começar';
        btnType = 'success';
        mainButton.onclick = play;
    }
    else if(numberQuestion > 0 && numberQuestion < 5){
        mainButton.innerHTML = '';
    } 
    else{
        mainButton.innerHTML = 'Sair';
        btnType = 'danger';
        mainButton.onclick = reset;
    }

    mainButton.setAttribute('class', `btn btn-lg btn-${btnType}`);
}

function enabledButtonNext(){
    //scoreCalculator();
    btnNext.disabled = false;
}

function scoreCalculator(){
    let optionChoosed = document.getElementsByName('option');
    for(let i=0; i < optionChoosed.length; i++){
        if(optionChoosed[i].checked && listQuestions[questionIndex].options[repeatedOptionsList[i]][1]){
            score += 100;
        }
    }
}

function reset(){
    numberQuestion = 0;
    repeatedQuestiosList = [];
    score = 0;
    document.querySelector('.message').innerHTML = '';
    btnOptions.innerHTML = '';
    handleMainButton();
}

function getRandomNumber(max){
    return Math.floor((Math.random() * max));
}

function view(questionIndex, numberQuestion, optionsList){
        document.querySelector('#modalLabel').innerHTML = `Pergunta ${numberQuestion+1}`;
        questionField.innerHTML = listQuestions[questionIndex].question;
        let html = "";
        for(let i=0; i < optionsList.length; i++){
            html += `<label class="btn"> <input type="radio" name="option" id="option${optionsList[i]}" onclick="enabledButtonNext()"> ${listQuestions[questionIndex].options[optionsList[i]][0] }</label>`;
        }
        btnOptions.innerHTML = html;
}