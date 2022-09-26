const body = document.querySelector("body");
const projectInfo = document.querySelector("#project-details");
const skillsSection = document.getElementById("skills");
const menu = document.querySelector("#main-menu");
const typingElements = document.querySelectorAll(".typing-effect");


var projectsAvailable = {};
var languagesData = {
    "js": {
        "name": "JavaScript",
        "experience": "4",
        "level": "Intermediário",
        "additional": "aaaaa"
    },
    "php": {
        "name": "PHP",
        "experience": "3",
        "level": "Intermediário",
        "additional": "aaaaa"
    },
    "python": {
        "name": "Python",
        "experience": "2",
        "level": "Intermediário - avançado",
        "additional": "aaaaa"
    }
};


document.addEventListener("scroll", function () {
    const clientHeight = body.style.top;
    const skillsPos = skillsSection.offsetTop;
    const skillsHeight = skillsSection.getBoundingClientRect().height;
    
    if (clientHeight > skillsPos + (skillsHeight * 2/3)) {
        skillsSection.querySelector(".section-content > img").style.animation = "showInfoFromLeft 2s forwards";
        skillsSection.querySelector(".section-content > div").style.animation = "showInfoFromRight 2s forwards";
    }
});

document.addEventListener("readystatechange", function (event) {
    let state = document.readyState;
    
    if(state == "complete") {
        body.style.animation = "fadeIn 2s forwards";
        setupTyping();
    }
});

document.querySelectorAll(".language-coin").forEach((e) => {
    e.addEventListener("click", () => {
        clickCoin(e);
    });
    
    e.addEventListener("animationend", () => {
        e.classList.toggle("animate");
    });
});

document.querySelector("#language-description").addEventListener("animationend", () => {
    document.querySelector("#language-description").classList.toggle("animate");
});


function setProjects(projects) {
    let list = document.querySelector("#projects-list");
    let template = document.querySelector("#project-template");
    
    let projectID = 1;
    projects.forEach(function (p) {
        let clone = template.content.cloneNode(true);
        
        clone.querySelector(".project-logo").src = "1.jpg";
        clone.querySelector(".project-info-link").id = `project-${projectID}`;
        
        projectsAvailable[`project-${projectID}`] = p;
        list.appendChild(clone);
        
        projectID++;
    });
}

function showProjectInfo(projectID) {
    projectID = `project-${projectID}`;
    project = projectsAvailable[projectID];
    
    projectInfo.style.display = "flex";
}

function hideProjectInfo() {
    projectInfo.style.display = "none";
}

function clickCoin(coin) {
    const languageDescription = document.querySelector("#language-description");
    const languageTitle = document.querySelector("#description-title");
    const descriptionContent = document.querySelector("#description-content");
    let data = languagesData[coin.id];
    
    languageDescription.style.display = "flex";
    coin.classList.toggle("animate");

    languageTitle.innerText = data.name;
    descriptionContent.querySelector("#experience").lastElementChild.innerText = data.experience;
    descriptionContent.querySelector("#level").lastElementChild.innerText = data.level;
    descriptionContent.querySelector("#additional-info").innerText = data.additional;
    
    languageDescription.classList.toggle("animate");
}

function toggleMenu() {
    let width = menu.getBoundingClientRect().width;
    
    if(getComputedStyle(menu).right == "0px") {
        menu.style.right = -1 * width + "px";
    }
    else {
        menu.style.right = 0;
    }
    
    menu.querySelector("#menu-toggle").querySelector("i").classList.toggle("fa-arrow-left");
    menu.querySelector("#menu-toggle").querySelector("i").classList.toggle("fa-arrow-right");
}

function selectSection(targetID, toggleM=true) {
    let target = document.querySelector(`#${targetID}`);
    let targetPosY = target.offsetTop;
    
    body.style.top = -1 * targetPosY + "px";
    if (toggleM) {
        toggleMenu();
    }
    startAnimationSection(target);
}

function setupTyping() {
    typingElements.forEach((e) => {
        let typingContent = document.createElement("label");
        typingContent.classList.add("typing-content");
        
        typingContent.innerHTML = e.innerHTML;
        e.innerHTML = "";
        
        let typingCursor = document.createElement("label");
        typingCursor.classList.add("typing-cursor");
        typingCursor.innerHTML = "|";
        
        e.appendChild(typingContent);
        e.appendChild(typingCursor);

        typingEffect(typingContent, typingCursor);
    });
}

function typingEffect(element, cursor) {
    let content = element.innerHTML;
    let index = 1;
    
    element.innerHTML = "";
    cursor.classList.add("animate");
    
    setTimeout(() => {
        cursor.classList.toggle("animate");
        
        let typing = setInterval(() => {
            element.innerHTML = content.substr(0, index);
            
            if(index == content.length) {
                cursor.classList.toggle("animate");
                clearInterval(typing);
            }
            else {
                index++;
            }
        }, 400);
    }, 1300);
}

function startAnimationSection(section) {
    switch (section.id) {
        case "skills":
            section.querySelector(".section-content > img").style.animation = "showInfoFromLeft 2s forwards";
            section.querySelector(".section-content > div").style.animation = "showInfoFromRight 2s forwards";
    }
}