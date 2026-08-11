/* =============================================
   Grace — A Life That Became Home
   Combined script (hero + chapters reveal + main + memory viewer + family letters)
   ============================================= */

/* --- hero.js: opening lines, title typing, begin-journey transition --- */
const openingLines = [

    "Every life begins quietly.",

    "Some stories grow beyond what anyone imagined.",

    "This is one of those stories."

];


let currentLine = 0;


function showOpeningLine() {

    if (currentLine >= openingLines.length) {

        startTitle();

        return;

    }


    const opening =
        document.getElementById("opening");


    opening.textContent =
        openingLines[currentLine];


    opening.style.opacity = "1";


    setTimeout(() => {

        opening.style.opacity = "0";


        currentLine++;


        setTimeout(
            showOpeningLine,
            1200
        );


    }, 2400);

}



function startTitle() {

    const title =
        document.getElementById("title");


    const text = "Grace";


    let index = 0;


    function typeCharacter() {

        if (index >= text.length) {

            setTimeout(
                showSubtitle,
                900
            );

            return;

        }


        title.textContent +=
            text[index];


        index++;


        setTimeout(
            typeCharacter,
            220
        );

    }


    typeCharacter();

}



function showSubtitle() {

    const subtitle =
        document.getElementById("subtitle");


    subtitle.textContent =
        "A Life That Became Home";


    subtitle.style.opacity =
        "1";


    setTimeout(() => {

        const button =
            document.getElementById("journey");


        button.style.opacity =
            "1";

    }, 1200);

}



function beginJourney() {

    const hero =
        document.getElementById("hero");


    const prologue =
        document.getElementById("prologue");


    hero.classList.add(
        "hero-leaving"
    );


    prologue.classList.add(
        "prologue-active"
    );


    setTimeout(() => {

        prologue.scrollIntoView({
            behavior: "smooth"
        });

    }, 700);

}



window.addEventListener(
    "load",
    showOpeningLine
);


document
    .getElementById("journey")
    .addEventListener(
        "click",
        beginJourney
    );

/* --- chapters.js: scroll reveal animations --- */
const revealElements =
    document.querySelectorAll("[data-reveal]");


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting &&
                    entry.intersectionRatio > 0.15
                ) {

                    entry.target.classList.add(
                        "revealed"
                    );

                }

            });

        },

        {
            threshold: [0.15]
        }

    );


revealElements.forEach((element) => {

    observer.observe(element);

});

/* --- main.js: opening screen gate + background music toggle --- */

const openingScreen =
    document.getElementById("openingScreen");

const beginStory =
    document.getElementById("beginStory");


beginStory.addEventListener(
    "click",
    () => {

        openingScreen.classList.add(
            "hidden"
        );

        document.body.classList.add(
            "story-started"
        );

        if (
            typeof startMusic ===
            "function"
        ) {
            startMusic();
        }

    }
);
const music =
    document.getElementById(
        "storyMusic"
    );

const musicToggle =
    document.getElementById(
        "musicToggle"
    );


let musicStarted = false;


function startMusic() {

    if (musicStarted) {
        return;
    }

    music.volume = 0.25;

    music.play()
        .then(() => {

            musicStarted = true;

        })
        .catch(() => {

            
        });

}


musicToggle.addEventListener(
    "click",
    () => {

        if (music.paused) {

            music.play();

            musicToggle.textContent =
                "♪";

        } else {

            music.pause();

            musicToggle.textContent =
                "×";

        }

    }
);

/* --- memory-viewer.js: click-to-zoom gallery photos --- */
const viewer =
    document.getElementById("memoryViewer");

const viewerImage =
    document.getElementById("memoryViewerImage");

const viewerYear =
    document.getElementById("memoryViewerYear");

const viewerTitle =
    document.getElementById("memoryViewerTitle");

const viewerText =
    document.getElementById("memoryViewerText");

const closeButton =
    document.getElementById("memoryViewerClose");


const memories =
    document.querySelectorAll(".memory-photo");


memories.forEach((memory) => {

    memory.addEventListener("click", () => {

        const image =
            memory.querySelector("img");

        const year =
            memory.querySelector(
                ".memory-caption span"
            );

        const title =
            memory.querySelector(
                ".memory-caption h4"
            );

        const text =
            memory.querySelector(
                ".memory-caption p"
            );


        viewerImage.src =
            image.src;

        viewerImage.alt =
            image.alt;

        viewerYear.textContent =
            year
                ? year.textContent
                : "";

        viewerTitle.textContent =
            title.textContent;

        viewerText.textContent =
            text.textContent;


        viewer.classList.add("active");

        viewer.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    });

});


function closeMemory() {

    viewer.classList.remove("active");

    viewer.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

}


closeButton.addEventListener(
    "click",
    closeMemory
);


viewer.addEventListener(
    "click",
    (event) => {

        if (
            event.target === viewer
        ) {

            closeMemory();

        }

    }
);


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeMemory();

        }

    }
);

/* --- family-letters.js: family voice letter modal --- */
document.addEventListener("DOMContentLoaded", () => {

    const familyCards =
        document.querySelectorAll(
            ".family-voice-card"
        );

    const letterViewer =
        document.getElementById(
            "familyLetterViewer"
        );

    const letterClose =
        document.getElementById(
            "familyLetterClose"
        );

    const letterRole =
        document.getElementById(
            "letterRole"
        );

    const letterName =
        document.getElementById(
            "letterName"
        );

    const letterMessage =
        document.getElementById(
            "letterMessage"
        );

    const letterSignature =
        document.getElementById(
            "letterSignature"
        );

    const familyData =
        window.FAMILY_MEMBERS || {};


    /*
     * Make sure the letter viewer actually exists.
     */

    if (!letterViewer) {
        console.error(
            "Family letter viewer was not found."
        );

        return;
    }


    /*
     * Open a family member's letter.
     */

    familyCards.forEach((card) => {

        const button =
            card.querySelector(
                ".open-letter"
            );


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.member;


                const member =
                    familyData[id];


                

                if (!member) {

                    console.error(
                        "No family data found for:",
                        id
                    );

                    
                    return;
                }


                letterRole.textContent =
                    member.role || "";


                letterName.textContent =
                    member.name || "";


                letterMessage.innerHTML =
                    member.message || "";


                letterSignature.textContent =
                    member.name || "";


                letterViewer.classList.add(
                    "active"
                );


                letterViewer.setAttribute(
                    "aria-hidden",
                    "false"
                );


                document.body.style.overflow =
                    "hidden";

            }
        );

    });


    /*
     * Close the letter.
     */

    function closeFamilyLetter() {

        letterViewer.classList.remove(
            "active"
        );


        letterViewer.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }


    /*
     * Close button.
     */

    if (letterClose) {

        letterClose.addEventListener(
            "click",
            closeFamilyLetter
        );

    }


    /*
     * Close when clicking outside
     * the actual letter.
     */

    letterViewer.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                letterViewer
            ) {

                closeFamilyLetter();

            }

        }
    );


    /*
     * Close with Escape.
     */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeFamilyLetter();

            }

        }
    );

});