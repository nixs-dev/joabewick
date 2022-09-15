const body = document.querySelector("body");
const projectInfo = document.querySelector("#project-details");
const skillsSection = document.getElementById("skills");

var projectsAvailable = {};


document.addEventListener("scroll", function () {
    const clientHeight = document.documentElement.clientHeight;
    const skillsPos = skillsSection.getBoundingClientRect().y;
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
    }
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