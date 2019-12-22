function submitQuiz() {
    const el = document.all.question.elements;
    const name = el.name.value;
    const gender = el.gender.value;
    const birthday = el.birthday.value;
    const review = el.review.value;
    console.log(name, gender, birthday, review)
    if (name == "" | gender == "" | birthday == "" | review == "") {
        alert("입력되지 않은 부분이 있습니다!");
        return 
    }
    alert(name + "님, 제출이 완료되었습니다!");
    
    const q1 = [el.q1[0].checked, el.q1[1].checked, el.q1[2].checked];
    const q2 = el.q2.value;
    const q3_raw = el.q3.selectedOptions;
    const q3 = [];
    for(let i = 0; i < q3_raw.length; i++) {
        // console.log(i)
        q3.push(q3_raw[i].index)
    }
    const q4 = el.q4.value;
    // false, true, false, "당근", 0, "1"
    // console.log(q1, q2, q3, q4);
    let score = 0;
    if (q1[1] == true) score+=1;
    if (q2 == "당근") score+=1;
    if (q3 == [0]) score+=1;
    if (q4 == "1") score+=1;
    showResult({name:name, gender:gender, birthday:birthday, review:review, score:score})
}

function showResult(info) {
    ptag = (text) => {return "<p>" + text + "</p>"}
    let newHTML = ""
    newHTML += '<div class="card">' 
    newHTML += ptag("<b>이름</b> : " + info.name)
    newHTML += ptag("<b>성별</b> : " + info.gender)
    newHTML += ptag("<b>생일</b> : " + info.birthday)
    newHTML += ptag("<b>리뷰</b> : " + info.review)
    newHTML += ptag("<b>점수</b> : " + info.score * 25 + "점")
    newHTML += `<button onclick="location.href='quiz.html'">다시 풀러 가기</button>`
    newHTML += '</div>' 
    document.getElementById("quiz").innerHTML = newHTML
}