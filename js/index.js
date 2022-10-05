const body = document.querySelector("body");
const projectInfo = document.querySelector("#project-details");
const skillsSection = document.getElementById("skills");
const menu = document.querySelector("#main-menu");
const typingElements = document.querySelectorAll(".typing-effect");


var projectsAvailable = {};
var languagesData = {};


window.onload = function () {
    calculateVH();
    getProjects();
    getLanguages();
    body.style.animation = "fadeIn 2s forwards";
    setupTyping();
};


window.addEventListener('resize', calculateVH);
window.addEventListener('orientationchange', calculateVH);

document.querySelector("#language-description").addEventListener("animationend", () => {
    document.querySelector("#language-description").classList.toggle("animate");
});


function calculateVH () {
    let vh = window.innerHeight * 0.01; // VH FIX
    
    document.documentElement.style.setProperty("--vh", vh + 'px');
}

function setProjects(projects) {
    let list = document.querySelector("#projects-list");
    let template = document.querySelector("#project-template");
    
    
    projects.forEach(function (p) {
        let clone = template.content.cloneNode(true);
        
        if (p.logo) {
            clone.querySelector(".project-logo img").src = `/data/projects/${p.id}/${p.logo}`;
        }
        
        clone.querySelector(".project-info-link").id = `project-${p.id}`;
        
        projectsAvailable[`project-${p.id}`] = p;
        list.appendChild(clone);
    });
}

function setLanguages(languages) {
    let list = document.querySelector("#languages-repr");
    let template = document.querySelector("#language-coin-template");
    let keys = Object.keys(languages).slice(0, 3);
    
    let languageID = 1;
    keys.forEach(function (k) {
        let clone = template.content.cloneNode(true);
        
        clone.querySelector("img").id = k;
        clone.querySelector("img").classList.add(`orbit-${languageID}`);
        clone.querySelector("img").src = `/data/languages/${languages[k].icon}`;
        
        if (languageID % 2 == 0) {
            clone.querySelector("img").parentNode.classList.add("reverse");
        }
        
        clone.querySelector("img").addEventListener("animationend", () => {
            document.querySelector(`.language-coin#${k}`).classList.toggle("animate");
        });
        
        list.appendChild(clone);
        languagesData[k] = languages[k];
        
        languageID++;
    });
}

function showProjectInfo(projectID) {
    let project = projectsAvailable[projectID];
    
    projectInfo.style.display = "flex";
    projectInfo.querySelector("#project-title").innerText = project.name;
    projectInfo.querySelector("#project-description").innerText = project.description;
    projectInfo.querySelector("#project-source").innerText = project.source;
    projectInfo.querySelector("#project-source").href = project.source;
    
    project.stacks.forEach((s) => {
        let label = document.createElement("label");
        label.innerText = s;
        
        projectInfo.querySelector("#project-stacks").appendChild(label);
    });
    
    project.screenshots.forEach((s) => {
        let img = document.createElement("img");
        img.src = `/data/projects/${project.id}/${s}`;
        
        projectInfo.querySelector("#project-screenshots").appendChild(img);
    });
    
    if (project.logo) {
        projectInfo.querySelector("#logo").src = `/data/projects/${project.id}/${project.logo}`;
    }
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
        }, 250);
    }, 1300);
}

function startAnimationSection(section) {
    switch (section.id) {
        case "skills":
            section.querySelector(".section-content > img").style.animation = "showInfoFromLeft 2s forwards";
            section.querySelector(".section-content > div").style.animation = "showInfoFromRight 2s forwards";
    }
}