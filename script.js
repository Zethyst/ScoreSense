var flag = 0;
const ICSEMODE = document.getElementById("icse");
ICSEMODE.addEventListener("click", () => {
    if (ICSEMODE.checked) {
        flag = 1;
    }
    if (!ICSEMODE.checked) {
        flag = 0;
    }
});
let inputBox = document.getElementsByTagName("input");
let percentBtn = document.getElementById("Percentage");
for (i = 0; i < inputBox.length; i++) {
    inputBox[i].onkeyup = (e) => {
        let userEnteredValue = e.target.value;
        if (userEnteredValue.trim() != 0) {
            percentBtn.classList.add("active");
        } else {
            percentBtn.classList.remove("active");
        }
    }
}
const calc = () => {
    const subjectsInput = document.querySelectorAll(".sub");
    var subjectslen = subjectsInput.length;
    const marks = [];
    var invalid_flag = 0;
    for (let i = 0; i < subjectslen; i++) {
        marks[i] = subjectsInput[i].value;
        if (marks[i] > 100) {
            invalid_flag = 1;
        }
    }
    let grade = "";
    var totalGrade = 0.0;
    var min = marks[0];
    if (flag == 1) {
        for (i = 0; i < subjectslen; i++) {
            if (min > marks[i]) {
                min = marks[i];
            }
        }
    }

    for (i = 0; i < subjectslen; i++) {
        totalGrade = totalGrade + parseFloat(marks[i]);
    }
    if (flag == 1) {
        totalGrade = totalGrade - parseFloat(min);
        subjectslen = subjectslen - 1;
    }
    let percent = (totalGrade / subjectslen);
    if (percent <= 100 && percent >= 90) {
        grade = 'O';
    } else if (percent <= 89 && percent >= 80) {
        grade = 'A';
    }
    else if (percent <= 79 && percent >= 70) {
        grade = 'B';
    }
    else if (percent <= 69 && percent >= 60) {
        grade = 'C';
    }
    else if (percent <= 59 && percent >= 50) {
        grade = 'D';
    }
    else if (percent <= 49 && percent >= 40) {
        grade = 'E';
    }
    else {
        grade = 'F';
    }
    if (invalid_flag == 1) {
        document.getElementById('result').innerHTML = `<span style="color:#1c99fe">INVALID DATA ENTRY.<br/><i style="font-size:12px">I didn't know a grading system exists where marks are greater than 100?!</i></span>`
    } else {
        if (percent >= 39.5) {
            document.getElementById('result').innerHTML = `Total Marks Out of ${subjectslen * 100} : ${totalGrade}<br/> Percentage : ${Math.trunc(percent)}% <br/> Grade : ${grade} <span style="color:green ;">(You are Pass)</span> `
        }
        else {
            document.getElementById('result').innerHTML = `Total Marks Out of ${subjectslen * 100} :  ${totalGrade} <br/> Percentage : ${Math.trunc(percent)}% <br/> Grade : ${grade} <span style="color:#e41919;">(You are Fail)</span> `
        }
    }
}
AddSub.addEventListener("click", () => {

    let subjects = document.querySelector(".inputs");
    let len = subjects.children.length;
    let divSub = document.createElement("div");
    divSub.setAttribute("class", "subjects");
    let newSub = document.createElement("input");
    newSub.setAttribute("type", "text");
    newSub.setAttribute("placeholder", `Subject ${len + 1}`);
    newSub.setAttribute("class", "sub");
    divSub.appendChild(newSub);
    divSub.insertAdjacentHTML("beforeend", `<span class="icon" onclick="this.parentElement.remove()"><i class="fas fa-trash"></i></span>`);
    subjects.insertAdjacentElement("beforeend", divSub);
});

//!Getting the next input field by pressing enter
let subjects = document.querySelectorAll(".sub");
for (let i = 0; i < subjects.length; i++) {
    subjects[i].addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (i == subjects.length - 1) {
                calc();
            }
            console.log(subjects[i].nextElementSibling);
            subjects[i + 1].focus();
        }
    })
}