$(function() {
    //儲存目前作答到第幾題
    var currentQuiz = null;
    //當按鈕按下後，要做的事情
    $("#startButton").on("click", function() {
        if (currentQuiz == null) {
            //設定目前作答從第0題開始
            currentQuiz = 0;
            //顯示題目
            $("#question").text(questions[0].question);
            document.getElementById("myImage").src = "";
            //將選項區清空(可以試著先不寫)
            $("#options").empty();
            $("#loading").empty();
            $("#Link").empty();
            //將選項逐個加入
            questions[0].answers.forEach(function(element, index, array) {
                $("#options").append(`<label><input name='options' type='radio' value='${index}'>${element[0]}</label><br>`);
            });
            //將按鈕上的文字換成Next
            /*var b1 = "www.maomao365.com";
            var a = b1 + "0000";
            document.write(a);*/
            document.querySelector('#startButton').textContent = 'Next';
        } else {
            //已經開始作答從這邊繼續
            //巡訪哪一個選項有被選取
            $.each($(":radio"), function(i, val) {

                if (val.checked) { //是否已走到最後要產生結果(A~D)
                    if (isNaN(questions[currentQuiz].answers[i][1])) {
                        //通往最終結果
                        var finalResult = questions[currentQuiz].answers[i][1];
                        //顯示最終結果的標題
                        //將選項區域清空
                        $("#options").empty();
                        $("#question").empty();
                        $("#Link").empty();
                        //顯示最終結果內容

                        $("#loading").append(`<div class="loading"><div></div><div></div><div></div><div></div></div>`);
                        $("#loading").fadeIn().delay(1500).fadeOut('1500', function() {
                            $("#question").delay(4000).text(finalAnswers[finalResult][0]);
                            $("#options").delay(4000).append(`${ finalAnswers[finalResult][1]} <br> ${ finalAnswers[finalResult][2] }<br> ${ finalAnswers[finalResult][4] }`);
                            var mystr = new String("👉️露營地官網連結👈️");
                            $("#Link").delay(4000).append(mystr.link(`${finalAnswers[finalResult][3]}`));
                            setTimeout(function() { document.getElementById("myImage").src = finalAnswer[finalResult]; }, 30);

                        });
                        currentQuiz = null;
                        document.querySelector('#startButton').textContent = '重新開始';

                    } else {
                        //指定下一題，原始資料從1開始，所以要-1
                        currentQuiz = questions[currentQuiz].answers[i][1] - 1;
                        //顯示新的題目
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element, index, array) {
                            $("#options").append(`<label><input name='options' type='radio' value='${index
                        }'>${element[0]}</label><br>`);
                        });
                    }
                    return false; //跳離迴圈的方式
                }
            });
        }
    });
});