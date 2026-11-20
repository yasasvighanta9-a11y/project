/* =========================================================
   SRKR STUDYMATE AI
========================================================= */


/* =========================================================
   DATE
========================================================= */

function updateDate() {

    const now = new Date();

    const date = now.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

    const day = now.toLocaleDateString(
        "en-IN",
        {
            weekday: "long"
        }
    );

    document.getElementById("currentDate").textContent = date;

    document.getElementById("currentDay").textContent =
        day + " • Keep learning 🌱";
}

updateDate();


/* =========================================================
   SECTION NAVIGATION
========================================================= */

function showSection(section) {

    const appArea =
        document.getElementById("appArea");

    appArea.classList.remove("hidden");

    const sections = [
        "planner",
        "ai",
        "brain",
        "games",
        "mates",
        "exams",
        "progress",
        "settings"
    ];

    sections.forEach(name => {

        const element =
            document.getElementById(
                name + "Section"
            );

        if (element) {

            element.classList.add("hidden");
        }
    });


    const selected =
        document.getElementById(
            section + "Section"
        );

    if (selected) {

        selected.classList.remove("hidden");
    }


    appArea.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


function scrollHome() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   DARK MODE
========================================================= */

function toggleTheme() {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "srkrDarkMode",
        dark
    );

    updateThemeIcon();
}


function updateThemeIcon() {

    const button =
        document.getElementById("themeBtn");

    const icon =
        button.querySelector("i");

    if (
        document.body.classList.contains("dark")
    ) {

        icon.className =
            "fa-solid fa-sun";

    } else {

        icon.className =
            "fa-solid fa-moon";
    }
}


if (
    localStorage.getItem("srkrDarkMode")
    === "true"
) {

    document.body.classList.add("dark");
}

updateThemeIcon();


document
    .getElementById("themeBtn")
    .addEventListener(
        "click",
        toggleTheme
    );


/* =========================================================
   NOTIFICATION
========================================================= */

document
    .getElementById("notificationBtn")
    .addEventListener(
        "click",
        function () {

            alert(
                "🌿 No new distractions.\n\n" +
                "Your study space is ready!"
            );
        }
    );


/* =========================================================
   SEARCH
========================================================= */

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        function () {

            const query =
                this.value
                    .toLowerCase()
                    .trim();

            if (!query) return;

            if (query.includes("planner")) {

                showSection("planner");

            } else if (
                query.includes("coding")
                ||
                query.includes("ai")
            ) {

                showSection("ai");

            } else if (
                query.includes("brain")
                ||
                query.includes("question")
            ) {

                showSection("brain");

            } else if (
                query.includes("game")
                ||
                query.includes("gesture")
            ) {

                showSection("games");

            } else if (
                query.includes("progress")
                ||
                query.includes("statistics")
            ) {

                showSection("progress");

            } else if (
                query.includes("exam")
            ) {

                showSection("exams");
            }
        }
    );


/* =========================================================
   PLANNER
========================================================= */

let tasks =
    JSON.parse(
        localStorage.getItem(
            "srkrTasks"
        )
    ) || [

        {
            title: "Data Structures",
            detail: "Study arrays and linked lists",
            completed: false
        },

        {
            title: "C Programming",
            detail: "Practice if-else programs",
            completed: false
        },

        {
            title: "Mathematics",
            detail: "Revise important formulas",
            completed: false
        }

    ];


function saveTasks() {

    localStorage.setItem(
        "srkrTasks",
        JSON.stringify(tasks)
    );
}


function renderTasks() {

    const list =
        document.getElementById(
            "taskList"
        );

    list.innerHTML = "";


    tasks.forEach(
        (task, index) => {

            const div =
                document.createElement(
                    "div"
                );

            div.className = "task";


            div.innerHTML = `

                <button
                    class="task-check"
                    onclick="completeTask(${index})"
                >

                    <i class="${
                        task.completed
                            ? "fa-solid fa-circle-check"
                            : "fa-regular fa-circle"
                    }"></i>

                </button>


                <div class="task-info">

                    <strong style="${
                        task.completed
                            ? "text-decoration:line-through;opacity:.5;"
                            : ""
                    }">

                        ${task.title}

                    </strong>

                    <span>
                        ${task.detail}
                    </span>

                </div>


                <button
                    class="delete-task"
                    onclick="deleteTask(${index})"
                >

                    <i class="fa-solid fa-trash"></i>

                </button>
            `;


            list.appendChild(div);
        }
    );
}


function addTask() {

    const title =
        prompt(
            "Enter your study task:"
        );

    if (!title) return;


    const detail =
        prompt(
            "Enter task details:"
        )
        || "Study task";


    tasks.push({

        title: title,

        detail: detail,

        completed: false

    });


    saveTasks();

    renderTasks();
}


function completeTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();

    renderTasks();
}


function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    renderTasks();
}


renderTasks();


/* =========================================================
   FOCUS MODE
========================================================= */

let focusSeconds = 25 * 60;

let focusInterval = null;

let focusRunning = false;


function startFocus() {

    document
        .getElementById("focusModal")
        .classList.remove("hidden");

    focusRunning = true;


    clearInterval(focusInterval);


    focusSeconds = 25 * 60;

    updateTimer();


    focusInterval =
        setInterval(
            () => {

                focusSeconds--;

                updateTimer();


                if (
                    focusSeconds <= 0
                ) {

                    clearInterval(
                        focusInterval
                    );

                    alert(
                        "🎉 Focus session complete!"
                    );

                    closeFocus();
                }

            },
            1000
        );
}


function updateTimer() {

    const minutes =
        Math.floor(
            focusSeconds / 60
        );

    const seconds =
        focusSeconds % 60;


    const formatted =
        String(minutes)
            .padStart(2, "0")
        +
        ":"
        +
        String(seconds)
            .padStart(2, "0");


    document.getElementById(
        "largeTimer"
    ).textContent = formatted;


    document.getElementById(
        "timerMinutes"
    ).textContent = minutes;
}


function requestExitFocus() {

    createMathQuestion();

    document
        .getElementById("mathModal")
        .classList.remove("hidden");
}


function createMathQuestion() {

    const a =
        Math.floor(
            Math.random() * 20
        ) + 5;

    const b =
        Math.floor(
            Math.random() * 15
        ) + 2;


    window.mathCorrect =
        a + b;


    document.getElementById(
        "mathQuestion"
    ).textContent =
        `${a} + ${b} = ?`;


    document.getElementById(
        "mathAnswer"
    ).value = "";


    document.getElementById(
        "mathMessage"
    ).textContent = "";
}


function checkMathAnswer() {

    const answer =
        Number(
            document.getElementById(
                "mathAnswer"
            ).value
        );


    if (
        answer ===
        window.mathCorrect
    ) {

        document.getElementById(
            "mathMessage"
        ).textContent =
            "✅ Correct! Focus Mode closed.";

        setTimeout(
            closeFocus,
            500
        );

    } else {

        document.getElementById(
            "mathMessage"
        ).textContent =
            "❌ Not quite. Try again!";
    }
}


function closeFocus() {

    clearInterval(
        focusInterval
    );

    focusRunning = false;


    document
        .getElementById("focusModal")
        .classList.add("hidden");

    document
        .getElementById("mathModal")
        .classList.add("hidden");
}


/* =========================================================
   AI CODING ASSISTANT
========================================================= */

function askAI() {

    const question =
        document.getElementById(
            "codeQuestion"
        ).value.trim();


    const language =
        document.getElementById(
            "languageSelect"
        ).value;


    const answer =
        document.getElementById(
            "aiAnswer"
        );


    if (!question) {

        answer.innerHTML =
            "💡 Please enter a coding question.";

        return;
    }


    answer.innerHTML = `

        <strong>
            🤖 StudyMate AI • ${language}
        </strong>

        <br><br>

        I understand your question:

        <br><br>

        <em>${question}</em>

        <br><br>

        🌱 <strong>Learning tip:</strong>

        Break the problem into smaller steps,
        understand the input and output,
        then write the logic before coding.

        <br><br>

        💻 This starter version is running
        locally. A real AI API can be connected
        later through a secure backend.

    `;
}


/* =========================================================
   BRAIN TREASURES
========================================================= */

const questions = [

    {
        question:
            "Which data structure follows FIFO?",
        options: [
            "Stack",
            "Queue",
            "Tree",
            "Graph"
        ],
        answer: "Queue"
    },

    {
        question:
            "Which keyword is used to define a constant in C?",
        options: [
            "const",
            "fixed",
            "constant",
            "final"
        ],
        answer: "const"
    },

    {
        question:
            "What is 12 × 8?",
        options: [
            "86",
            "96",
            "108",
            "88"
        ],
        answer: "96"
    },

    {
        question:
            "Which symbol is used for comments in C?",
        options: [
            "//",
            "##",
            "<!--",
            "**"
        ],
        answer: "//"
    },

    {
        question:
            "Which number system uses only 0 and 1?",
        options: [
            "Decimal",
            "Octal",
            "Binary",
            "Hexadecimal"
        ],
        answer: "Binary"
    }

];


let questionIndex = 0;

let brainScore = 0;


function loadQuestion() {

    const q =
        questions[
            questionIndex
        ];


    document.getElementById(
        "questionNumber"
    ).textContent =
        questionIndex + 1;


    document.getElementById(
        "questionText"
    ).textContent =
        q.question;


    const options =
        document.getElementById(
            "answerOptions"
        );


    options.innerHTML = "";


    q.options.forEach(
        option => {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "answer-option";

            button.innerHTML =
                option;

            button.onclick =
                () => checkAnswer(
                    option
                );

            options.appendChild(
                button
            );
        }
    );
}


function checkAnswer(answer) {

    const correct =
        questions[
            questionIndex
        ].answer;


    if (answer === correct) {

        brainScore += 10;

        alert(
            "🎉 Correct! +10 points"
        );

    } else {

        alert(
            "🌱 Keep learning! The correct answer is " +
            correct
        );
    }


    document.getElementById(
        "brainScore"
    ).textContent =
        brainScore;
}


function nextQuestion() {

    questionIndex++;

    if (
        questionIndex >=
        questions.length
    ) {

        questionIndex = 0;
    }

    loadQuestion();
}


loadQuestion();


/* =========================================================
   GAMES
========================================================= */

function playGame(game) {

    const output =
        document.getElementById(
            "gameOutput"
        );


    if (game === "cricket") {

        output.innerHTML = `

            🏏 <strong>Hand Cricket</strong>

            <br><br>

            Camera-based hand gesture cricket
            can be connected here using MediaPipe.

            <br><br>

            ✋ Show a number with your hand
            and try to score runs!

        `;

    }


    else if (game === "rps") {

        const choices = [
            "Rock 🪨",
            "Paper 📄",
            "Scissors ✂️"
        ];

        const computer =
            choices[
                Math.floor(
                    Math.random() *
                    choices.length
                )
            ];


        output.innerHTML = `

            ✋ <strong>Rock Paper Scissors</strong>

            <br><br>

            Computer chose:
            <strong>${computer}</strong>

            <br><br>

            Camera gesture detection
            can be connected for the player's move.

        `;
    }


    else if (game === "math") {

        const a =
            Math.floor(
                Math.random() * 20
            ) + 1;

        const b =
            Math.floor(
                Math.random() * 20
            ) + 1;


        output.innerHTML = `

            🧮 <strong>Finger Math</strong>

            <br><br>

            Solve:

            <strong>
                ${a} + ${b} = ?
            </strong>

            <br><br>

            Use your brain quickly! ⚡

        `;

    }


    else {

        output.innerHTML = `

            🧩 <strong>Memory Gesture</strong>

            <br><br>

            Remember the gesture sequence
            and reproduce it correctly.

            <br><br>

            🖐️ → ✊ → 👍 → ✌️

        `;
    }
}


/* =========================================================
   STUDY MATE
========================================================= */

function searchMate() {

    const query =
        document.getElementById(
            "mateInput"
        ).value
        .trim();


    const results =
        document.getElementById(
            "mateResults"
        );


    if (!query) {

        results.innerHTML = `

            <div class="mate-result">

                <div class="result-avatar">
                    <i class="fa-solid fa-users"></i>
                </div>

                <div>

                    <strong>
                        Try searching a subject
                    </strong>

                    <span>
                        Example: C, Maths, AI,
                        Data Structures
                    </span>

                </div>

            </div>

        `;

        return;
    }


    results.innerHTML = `

        <div class="mate-result">

            <div class="result-avatar">

                <i class="fa-solid fa-users"></i>

            </div>

            <div>

                <strong>
                    ${query} Study Group
                </strong>

                <span>
                    Students interested in ${query}
                </span>

            </div>

            <button
                onclick="alert('Study group joined! 🌱')"
            >
                Join
            </button>

        </div>

    `;
}


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
            &&
            focusRunning
        ) {

            requestExitFocus();
        }
    }
);