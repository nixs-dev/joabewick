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

function getLanguages () {
    let request = new XMLHttpRequest();
    let languages;
    
    request.open("GET", dataURL, true);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            languages = JSON.parse(request.responseText).languages;
            
            setLanguages(languages);
        }
    };
    request.send();
}