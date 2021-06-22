// set inital date
const current = new Date();
let currentYear = current.getFullYear();
let currentMonth = current.getMonth();
let currentDate = current.getDate();
let currentDay = current.getDay();

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
const feelings = {
    'feeling-content': '😀',
    'feeling-happy': '😊', 
    'feeling-excited': '😋',
    'feeling-relaxed': '😌',
    'feeling-unsure': '😕',
    'feeling-stressed': '😣',
    'feeling-sad': '😞',
    'feeling-anxious': '😬',
}

const currentYearBox = document.querySelector(".currentYear");
const currentMonthBox = document.querySelector(".currentMonth");
const currentDateBox = document.querySelector(".currentDate");
const currentDayBox = document.querySelector(".currentDay");

currentYearBox.innerText = `${currentYear}년`;
currentMonthBox.innerText = months[currentMonth];
currentDateBox.innerText = `${currentDate}일`;
currentDayBox.innerText = days[currentDay];

let selectedMonthBox = document.querySelector(".selectedMonth");
let selectedYearBox = document.querySelector(".selectedYear");
let selectedDateBox = document.querySelector(".selectedDate");

selectedYearBox.innerText = `${currentYear}년`;
selectedMonthBox.innerText = months[currentMonth];
selectedDateBox.innerText = `${currentDate}일`;



let totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
let firstDay = new Date(currentYear, currentMonth, 1).getDay();

function createCalendar(totalDaysInMonth, firstDay) {
    let dateNum = 1;

    for (let rowNum = 1; rowNum <= 6; rowNum++) {
        // At fist row, date has to start at first day
        if (rowNum === 1) {
            for (let colNum = firstDay + 1; colNum <= 7; colNum++) {
                let box = document.querySelector(`tr:nth-child(${rowNum}) > td:nth-child(${colNum})`);
                box.innerText = dateNum;
                dateNum += 1;
            }
        
        } else {
            // from second row, date has to start at sunday
            for (colNum = 1; colNum <= 7; colNum++) {
                if (dateNum > totalDaysInMonth) {
                    // it date is over
                    break;
                }
                let box = document.querySelector(`tr:nth-child(${rowNum}) > td:nth-child(${colNum})`)
                box.innerText = dateNum;
                dateNum += 1;
            }
        }

    }

}


function goPrevCalendar() {

    currentMonth -= 1;
    let totalDaysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    let firstDay = new Date(currentYear, currentMonth, 1).getDay();

    resetCalendar();
    createCalendar(totalDaysInMonth, firstDay);
    dates.forEach(date => { date.classList.remove('clicked') })
    selectDate(currentMonth, currentYear, currentDate);
    
}

function goNextCalendar() {
    currentMonth += 1;
    currnetYear = new Date(currentYear, currentMonth, 1).getYear();
    let totalDaysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    let firstDay = new Date(currentYear, currentMonth, 1).getDay();

    resetCalendar();
    createCalendar(totalDaysInMonth, firstDay);
    dates.forEach(date => { date.classList.remove('clicked') })
    selectDate(currentMonth, currentYear, currentDate);
}

function resetCalendar() {
    let allTableData = document.querySelectorAll("td")
    allTableData.forEach(tableData => { tableData.innerText = "" });

};

function onDate(event) {
    
    dates.forEach(date => { date.classList.remove('clicked') })
    event.target.classList.toggle('clicked'); // make it red

    clickedDate = parseInt(event.target.innerText);
    console.log(clickedDate);
    // set current date
    selectDate(currentMonth, currentYear, clickedDate);
}


function selectDate(currentMonth, currentYear, currentDate) {

    let selected = new Date(currentYear, currentMonth, currentDate);
    selectedYearBox.innerText = `${selected.getFullYear()}년`;
    selectedMonthBox.innerText = months[selected.getMonth()];
    selectedDateBox.innerText = `${selected.getDate()}일`;
};


function selectInitalDate () {
    dates.forEach(date => { date.innerText == currentDate ? date.classList.toggle('clicked') : null})
} 


function setMood (event) {
    let feeling = feelings[event.target.classList[0]]
    console.log(feeling);
    let feelingElem = document.createTextNode(feeling);
    let setMoodDate = document.querySelector('.clicked');
    console.dir(setMoodDate);
    setMoodDate.appendChild(feelingElem);
    
}

createCalendar(totalDaysInMonth, firstDay);

const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");

arrowLeft.addEventListener("click", goPrevCalendar);
arrowRight.addEventListener("click", goNextCalendar);

const dates = document.querySelectorAll("td");
dates.forEach(date => { date.addEventListener('click', onDate) })


const moods = document.querySelectorAll('.emoji span');
console.dir(moods)
moods.forEach(mood => { mood.addEventListener('click', setMood) });

selectInitalDate();