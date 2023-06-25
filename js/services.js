var dataURL = "/data.json";

function getProjects () {
    let request = new XMLHttpRequest();
    let projects;
    
    request.open("GET", dataURL, true);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            projects = JSON.parse(request.responseText).projects;
            
            setProjects(projects);
        }
    };
    request.send();
}

function getStacks () {
    let request = new XMLHttpRequest();
    let stacks;
    
    request.open("GET", dataURL, true);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            stacks = JSON.parse(request.responseText).stacks;
            
            setStacks(stacks);
        }
    };
    request.send();
}