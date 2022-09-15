window.onload = function () {
    getProjects();
};


function getProjects () {
    let request = new XMLHttpRequest();
    let url = "/data.json";
    let projects;
    
    request.open("GET", url, true);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            projects = JSON.parse(request.responseText).projects;
            
            setProjects(projects);
        }
    };
    request.send();
}