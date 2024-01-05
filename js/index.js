const pageContent = document.querySelector("body #page-content");
const loader = document.querySelector("body #loader");
const projectInfo = document.querySelector("#project-details");
const skillsSection = document.getElementById("skills");
const menu = document.querySelector("#main-menu");
const typingElements = document.querySelectorAll(".typing-effect");
var currentSection = "my-info";


var projectsAvailable = {};
var stacksData = {};


window.onload = () => {
    // Calling services

    getProjects();
    getStacks();

    // End data loading

    loader.style.display = "none";
    pageContent.style.animation = "fadeIn 2s forwards";
    setupTyping();
};

window.onresize = () => {
    selectSection(currentSection, false);
    menu.style.right = -1 * menu.getBoundingClientRect().width + "px";
}

function setProjects(projects) {
    let list = document.querySelector("#projects-list");
    let template = document.querySelector("#project-template");
    
    
    projects.forEach(function (p) {
        let clone = template.content.cloneNode(true);
        
        if (p.logo) {
            clone.querySelector(".project-logo img").src = `../data/projects/${p.id}/${p.logo}`;
        }
        
        clone.querySelector(".project-info-link").id = `project-${p.id}`;
        
        projectsAvailable[`project-${p.id}`] = p;
        list.appendChild(clone);
    });
}

function setStacks(stacks) {
    let list = document.querySelector("#stacks-list");
    let template = document.querySelector("#stack-template");
    let keys = Object.keys(stacks);
    
    let stackID = 1;
    keys.forEach(function (k) {
        let stackRepr = template.content.cloneNode(true).firstElementChild;
        let text = `${ stacks[k].name } \n ${ stacks[k].experience } \n ${ stacks[k].level }`;

        list.appendChild(stackRepr);
        stacksData[k] = stacks[k];

        stackRepr.querySelector(".stack-info").innerText = text;
        
        stackID++;
    });
}

function showProjectInfo(projectID) {
    let project = projectsAvailable[projectID];
    
    projectInfo.style.display = "flex";
    projectInfo.querySelector("#project-title").innerText = project.name;
    projectInfo.querySelector("#project-description").innerText = project.description;
    projectInfo.querySelector("#project-source").innerText = project.source === "#" ? "Código fonte privado" : project.source;
    projectInfo.querySelector("#project-source").href = project.source;
    projectInfo.querySelector("#project-source").style.pointerEvents = project.source === "#" ? "none" : "auto";
    projectInfo.querySelector("#project-screenshots").innerHTML = "";
    projectInfo.querySelector("#project-stacks").innerHTML = "";
    
    project.stacks.forEach((s) => {
        let label = document.createElement("label");
        label.innerText = s;
        
        projectInfo.querySelector("#project-stacks").appendChild(label);
    });
    
    project.screenshots.forEach((s) => {
        let img = document.createElement("img");
        img.src = `../data/projects/${project.id}/${s}`;
        
        projectInfo.querySelector("#project-screenshots").appendChild(img);
    });
    
    if (project.logo) {
        projectInfo.querySelector("#logo").src = `../data/projects/${project.id}/${project.logo}`;
    }
}

function hideProjectInfo() {
    projectInfo.style.display = "none";
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

    if(!target) {
        return;
    }

    let targetPosY = target.offsetTop;
    
    pageContent.style.top = -1 * targetPosY + "px";

    if (toggleM) {
        toggleMenu();
    }

    startAnimationSection(target);

    currentSection = targetID;
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
        default:
            return;
    }
}
