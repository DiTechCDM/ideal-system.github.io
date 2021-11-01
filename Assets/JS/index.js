var $progressValue = 0;
var resultList = [];


const quizdata = [
    {
        question: "He replied <u class = 'under'>that he would come</u>.",
        options: ["noun clause", "adverb clauses", "adjective clause"],
        answer: "noun clause",
        correct: 1
    },
    {
        question: "I waited for my friend <u class = 'under'>until he arrived</u>.",
        options: ["noun clause", "adverb clauses", "adjective clause"],
        answer: "adverb clauses",
        correct: 2
    },
    {
        question: "Can you tell me the reason <u class = 'under'>why you are looking upset</u>?",
        options: ["noun clause", "adverb clauses", "adjective clause"],
        answer: "adjective clause",
        correct: 3
    },
    {
        question: "This is the city <u class = 'under'>where I was born</u>.",
        options: ["noun clause", "adverb clauses", "adjective clause"],
        answer: "adjective clause",
        correct: 3
    },
    {
        question: "<u class = 'under'>If you eat too much</u>, you may fall ill.",
        options: ["noun clause", "adverb clauses", "adjective clause"],
        answer: "adverb clauses",
        correct: 2
    },
    {
        question: "<u class = 'under'>That honesty is the best policy</u> is a well-known fact.",
        options: ["noun clause", "adverb clauses", "adjective clause"],
        answer: "noun clause",
        correct: 1
    },
    {
        question: "Show me the place <u class = 'under'>where you put those lemons</u>.",
        options: ["noun clause", "adverb clauses", "adjective clause"],
        answer: "adjective clause",
        correct: 3
    },
    {
        question: "Do not go <u class = 'under'>until I get ready</u>.",
        options: ["noun clause", "adverb clauses", "adjective clause"],
        answer: "adverb clauses",
        correct: 2
    },
    {
        question: "I expected <u class = 'under'>that I would get the first prize</u>.",
        options: ["noun clause", "adverb clauses", "adjective clause"],
        answer: "noun clause",
        correct: 1
    },
    {
        question: "The police have caught the man <u class = 'under'>who committed the theft last night</u>.",
        options: ["noun clause", "adverb clauses", "adjective clause"],
        answer: "adjective clause",
        correct: 3
    },
    {
        question: "You can put the book down <u class = 'under'>wherever you like</u>.",
        options: ["noun clause", "adverb clauses", "adjective clause"],
        answer: "adverb clauses",
        correct: 2
    },
];
/** Random shuffle questions **/
function shuffleArray(question) {
    var shuffled = question.sort(function () {
        return .5 - Math.random();
    });
    return shuffled;
}

function shuffle(a) {
    for (var i = a.length; i; i--) {
        var j = Math.floor(Math.random() * i);
        var _ref = [a[j], a[i - 1]];
        a[i - 1] = _ref[0];
        a[j] = _ref[1];
    }
}

/*** Return shuffled question ***/
function generateQuestions() {
    var questions = shuffleArray(quizdata);
    return questions;
}


/*** Return list of options ***/
function returnOptionList(opts, i) {

    var optionHtml = '<li id="buts" class="myoptions">' +
        '<input value="' + opts + '" name="optRdBtn"  class="select" type="radio" id="rd_' + i + '">' +
        '<label for="rd_' + i + '">' + opts + '</label>' +
        '<div class="bullet">' +
        '<div class="line zero"></div>' +
        '<div class="line one"></div>' +
        '<div class="line two"></div>' +
        '<div class="line three"></div>' +
        '<div class="line four"></div>' +
        '<div class="line five"></div>' +
        '<div class="line six"></div>' +
        '<div class="line seven"></div>' +
        '</div>' +
        '</li>';

    return optionHtml;
}


/** Render Options **/
function renderOptions(optionList) {
    var ulContainer = $('<ul>').attr('id', 'optionList');
    for (var i = 0, len = optionList.length; i < len; i++) {
        var optionContainer = returnOptionList(optionList[i], i)
        ulContainer.append(optionContainer);
    }
    $(".answerOptions").html('').append(ulContainer);
}

/** Render question **/
function renderQuestion(question) {
    $(".question").html("<h1>" + question + "</h1>");
}

/** Render quiz :: Question and option **/
function renderQuiz(questions, index) {
    var currentQuest = questions[index];
    renderQuestion(currentQuest.question);
    renderOptions(currentQuest.options);
    // console.log("Question");
    // console.log(questions[index]);
}


/** Return correct answer of a question ***/
function getCorrectAnswer(questions, index) {
    var value = document.querySelector("input[name=optRdBtn]:checked").value;
    // alert(value);
    var quest = questions[index].answer;
    if (value === quest) {
        // alert("The Correct Answer is " + quest + "\n" + "your have choosen " + value + "\n" + "Great work The answer Match....");
        swal({
            title: "Good job!",
            // text: "The Correct Answer is : " + quest + "\n" + "you have choosen : " + value,
            icon: "success",
            button: "Ok",
        });
        setTimeout(function () {
            document.getElementById("audio1").play()
        })
        // document.getElementById("answer1").innerHTML = "The Correct Answer is " + quest;
        // document.getElementById('answer1').innerHTML = "The correct answer is " + quest;
        // setTimeout(function () {
        //     $('#answer1').fadeOut(3000);
        // }); // <-- time in milliseconds
        // var aud = document.getElementById('audio1');
        // aud.play();
        var correctVideo = document.getElementById('video-correct');
        if (correctVideo.style.display === "none") {
            correctVideo.style.display = "block";
            setTimeout(function () {
                $('#video-correct').fadeOut('fast');
            }, 2000); // <-- time in milliseconds
        }
        else {
            correctVideo.style.display = "none"
        }
    }
    else {
        // alert("The Correct Answer is " + quest + "\n" + "your have choosen " + value + "\n" + "Uh No That's The wrong Choice..");
        swal({
            title: "Uh No That's The wrong Choice..",
            // text: "The Correct Answer is : " + quest + "\n" + "you have choosen : " + value,
            icon: "error",
            button: "Ok",
        });
        setTimeout(function () {
            document.getElementById("audio2").play();
        })
        // document.getElementById("answer1").innerHTML = "The Correct Answer is " + quest;
        var incorrectVideo = document.getElementById('video-incorrect');
        if (incorrectVideo.style.display === "none") {
            incorrectVideo.style.display = "block";
            // document.getElementById('answer1').innerHTML = "The correct answer is " + quest;
            // setTimeout(function () {
            //     $('#answer1').fadeOut(3000);
            // }, 2600); // <-- time in milliseconds
            setTimeout(function () {
                $('#video-incorrect').fadeOut('fast');
            }, 2000); // <-- time in milliseconds
        }
        else {
            incorrectVideo.style.display = "none";
        }
    }
    return questions[index].answer;
}



/** pushanswers in array **/
function correctAnswerArray(resultByCat) {
    var arrayForChart = [];
    for (var i = 0; i < resultByCat.length; i++) {
        arrayForChart.push(resultByCat[i].correctanswer);
    }

    return arrayForChart;
    // console.log(arrayForChart);
}


/** Generate array for percentage calculation **/
function genResultArray(results, wrong) {
    var resultByCat = resultByCategory(results);
    var arrayForChart = correctAnswerArray(resultByCat);
    arrayForChart.push(wrong);
    return arrayForChart
}

/** percentage Calculation **/
// function percentCalculation(array, total) {
//     var percent = array.map(function (d, i) {
//         return (100 * d / total).toFixed(2);
//     });
//     return percent;
// }

/*** Get percentage for chart **/



/** count right and wrong answer number **/
function countAnswers(results) {

    var countCorrect = 0, countWrong = 0;


    for (var i = 0; i < results.length; i++) {
        if (results[i].iscorrect == true)
            countCorrect++;
        else countWrong++;
    }

    // if(countCorrect > countWrong){
    //     document.getElementById('show-info').innerHTML = "Great You have </br> Have score Much...";
    // }
    // else{
    //     document.getElementById('show-info').innerHTML = "Oh No You Need </br> Some More Practice"
    // }

    return [countCorrect, countWrong];
}

/**** Categorize result *****/
function resultByCategory(results) {

    var categoryCount = [];
    var ctArray = results.reduce(function (res, value) {
        if (!res[value.category]) {
            res[value.category] = {
                category: value.category,
                correctanswer: 0
            };
            categoryCount.push(res[value.category])
        }
        var val = (value.iscorrect == true) ? 1 : 0;
        res[value.category].correctanswer += val;
        return res;
    }, {});

    categoryCount.sort(function (a, b) {
        return a.category - b.category;
    });

    return categoryCount;
}


/** Total score pie chart**/
function totalPieChart(_upto, _cir_progress_id, _correct, _incorrect) {

    $("#" + _cir_progress_id).find("._text_incor").html("Incorrect Answers : " + _incorrect);
    $("#" + _cir_progress_id).find("._text_cor").html("Correct Answers : " + _correct);

    var unchnagedPer = _upto;

    _upto = (_upto > 100) ? 100 : ((_upto < 0) ? 0 : _upto);

    var _progress = 0;

    var _cir_progress = $("#" + _cir_progress_id).find("._cir_P_y");
    var _text_percentage = $("#" + _cir_progress_id).find("._cir_Per");

    var _input_percentage;
    var _percentage;

    var _sleep = setInterval(_animateCircle, 25);

    function _animateCircle() {
        //2*pi*r == 753.6 +xxx=764
        _input_percentage = (_upto / 100) * 764;
        _percentage = (_progress / 100) * 764;

        _text_percentage.html(_progress + '%');

        if (_percentage >= _input_percentage) {
            _text_percentage.html('<tspan x="50%" dy="0em">' + unchnagedPer + '% </tspan><tspan  x="50%" dy="1.9em">Your Score</tspan>');
            clearInterval(_sleep);
        } else {

            _progress++;

            _cir_progress.attr("stroke-dasharray", _percentage + ',764');
        }
    }
}

function renderBriefChart(correct, total, incorrect) {
    var percent = (100 * correct / total);
    if (Math.round(percent) !== percent) {
        percent = percent.toFixed(2);
    }

    totalPieChart(percent, '_cir_progress', correct, incorrect)

}


/** List question and your answer and correct answer  
 
*****/
function getAllAnswer(results) {
    var innerhtml = "";
    for (var i = 0; i < results.length; i++) {

        var _class = ((results[i].iscorrect) ? "item-correct" : "item-incorrect");
        var _classH = ((results[i].iscorrect) ? "h-correct" : "h-incorrect");


        var _html = '<div class="_resultboard ' + _class + '">' +
            '<div class="_header">' + results[i].question + '</div>' +
            '<div class="_yourans ' + _classH + '">' + results[i].clicked + '</div>';

        var html = "";
        if (!results[i].iscorrect)
            html = '<div class="_correct">' + results[i].answer + '</div>';
        _html = (_html + html) + '</div>';
        innerhtml += _html;
    }

    $(".allAnswerBox").html('').append(innerhtml);
}


/** render  Brief Result **/
function renderResult(resultList) {

    var results = resultList;
    // console.log(results);
    var countCorrect = countAnswers(results)[0],
        countWrong = countAnswers(results)[1];


    renderBriefChart(countCorrect, resultList.length, countWrong);
}

function renderChartResult() {
    var results = resultList;
    var countCorrect = countAnswers(results)[0],
        countWrong = countAnswers(results)[1];
    var dataForChart = genResultArray(resultList, countWrong);
    renderChart(dataForChart);
}

/** Insert progress bar in html **/
function getProgressindicator(length) {
    var progressbarhtml = " ";
    for (var i = 0; i < length; i++) {
        progressbarhtml += '<div class="my-progress-indicator progress_' + (i + 1) + ' ' + ((i == 0) ? "active" : "") + '"></div>';
    }
    $(progressbarhtml).insertAfter(".my-progress-bar");
}

/*** change progress bar when next button is clicked ***/
function changeProgressValue() {
    $progressValue += 9;
    if ($progressValue >= 100) {

    } else {
        if ($progressValue == 99) $progressValue = 100;
        $('.my-progress')
            .find('.my-progress-indicator.active')
            .next('.my-progress-indicator')
            .addClass('active');
        $('progress').val($progressValue);
    }
    $('.js-my-progress-completion').html($('progress').val() + '% complete');

}
function addClickedAnswerToResult(questions, presentIndex, clicked) {
    var correct = getCorrectAnswer(questions, presentIndex);
    var result = {
        index: presentIndex,
        question: questions[presentIndex].question,
        clicked: clicked,
        iscorrect: (clicked == correct) ? true : false,
        answer: correct,
        category: questions[presentIndex].category
    }
    resultList.push(result);

    // console.log("result");
    // console.log(result);

}

$(document).ready(function () {

    var presentIndex = 0;
    var clicked = 0;

    var questions = generateQuestions();
    renderQuiz(questions, presentIndex);
    getProgressindicator(questions.length);

    $(".answerOptions ").on('click', '.myoptions>input', function (e) {
        clicked = $(this).val();

        if (questions.length == (presentIndex + 1)) {
            $("#submit").removeClass('hidden');
            $("#next").addClass("hidden");
        }
        else {

            $("#next").removeClass("hidden");
        }



    });



    $("#next").on('click', function (e) {
        e.preventDefault();
        // console.clear();
        addClickedAnswerToResult(questions, presentIndex, clicked);

        $(this).addClass("hidden");

        // presentIndex++;
        // renderQuiz(questions, presentIndex);
        // changeProgressValue();
    });

    $("#forward").on('click', function (e) {
        e.preventDefault();
        // addClickedAnswerToResult(questions, presentIndex, clicked);
        // document.getElementsByClassName('swal-overlay')[0].style.visibility = 'hidden';
        // var k = document.getElementById("audio1");
        // k.pause();
        // var l = document.getElementById("audio2");
        // l.pause();
        $(this).addClass("hidden");
        document.getElementById('video-correct').style.display = "none";
        document.getElementById("video-incorrect").style.display = "none";

        presentIndex++;
        renderQuiz(questions, presentIndex);
        changeProgressValue();
    });



    $("#submit").on('click', function (e) {
        addClickedAnswerToResult(questions, presentIndex, clicked);
        $('.multipleChoiceQues').hide();
        $(".resultArea").show();
        renderResult(resultList);

    });




    $(".resultArea").on('click', '.viewchart', function () {
        $(".resultPage2").show();
        $(".resultPage1").hide();
        $(".resultPage3").hide();
        renderChartResult();
    });

    $(".resultArea").on('click', '.backBtn', function () {
        $(".resultPage1").show();
        $(".resultPage2").hide();
        $(".resultPage3").hide();
        renderResult(resultList);
    });

    $(".resultArea").on('click', '.viewanswer', function () {
        $(".resultPage3").show();
        $(".resultPage2").hide();
        $(".resultPage1").hide();
        getAllAnswer(resultList);
    });

    $(".resultArea").on('click', '.replay', function () {
        window.location.reload(true);
    });

});


function play() {
    document.getElementById("forward").style.display = 'none' ? 'block' : 'none';
    var z = document.getElementById("forward");
    if (z.style.display === "block") {
        z.style.display = "block";
    }
    else {
        z.style.display = "block";
    }
}



function check() {
    var n = document.getElementById("forward");
    if (n.style.display === "block") {
        n.style.display = "none";
    }
    else {
        n.style.display = "block";
    }
    var selectedAns = ["rd_0", "rd_1", "rd_2", "rd_3"];


    // Query each group for a checked radio button:
    var selRadio = document.querySelector("input[name=optRdBtn]:checked");
    // var colorRadio = document.querySelector("input[name=colour]:checked");

    // If each variable holds a valid reference to an element, 
    // then a pet and a color were chosen/
    if (selRadio) {
        // A string holding a number can be converted quickly to a number by 
        // prepending a plus sign in front of it. For multiplication, just use *
        // as the operator insteach of + (the one in the middle)
        // alert("You have selected a " + selRadio.value);
    } else {
        // document.getElementsByClassName('swal-overlay')[0].style.visibility = 'visible';
        // Otherwise, one or both were not chosen
        swal({
            title: "Oops you have not selected any answer",
            icon: "error",
        });
    }
}


function fHide() {
    document.getElementById("firework1").style.display = "none";
}


function hide() {
    // console.clear();
    var a = document.getElementById("audio1");
    a.pause();
    var b = document.getElementById("audio2");
    b.pause();
    document.getElementById('boy-animate').style.display = 'block' ? 'none' : 'block';
    // document.getElementById('HideDive1').style.display = 'block' ? 'none' : 'block';
    var firwork = document.getElementById('firework');
    // document.getElementById('none').style.display = 'block' ? 'none' : 'block';
    firwork.play();

    // if ((hideDiv.style.display === "block") || (hideDiv1.style.display === 'block') || (none.style.display === 'block')) {
    //     hideDiv.style.display = "none";
    //     hideDiv1.style.display = "none";
    //     none.style.display = "none";
    // }
    // else {
    //     hideDiv.style.display = "block";
    //     hideDiv1.style.display = "block";
    //     none.style.display = "block";
    // }
}
