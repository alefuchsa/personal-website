$.ajaxSetup({
    // disable caching of html files
    cache: false
});

window.addEventListener("load", (event) => {
    checkReducedMotion();
    window.history.replaceState({"content": document.getElementById("nested-content").innerHTML, "title": document.title}, "", document.location);
});

function redirect(obj, e){
    url = new URL($(obj).prop("href"));
    if (url.hostname == window.location.hostname){
        unhideElement("loading");
        e.preventDefault();
        $("#content").load(url + " #nested-content", function(response, status, xhr){
            if(status != "success"){
                document.getElementById("loading").innerHTML = "Error loading page (" + status + ")<br><a href='#' onclick='hideElement(\"loading\")'>Hide this message</a>";
                return;
            }
            var newTitle = $(response).filter('title').text();
            window.history.pushState({"content": document.getElementById("nested-content").innerHTML, "title": newTitle}, "", url);
            document.title = newTitle; // first push, then set title
            hideElement("loading");
            window.scrollTo(0, 0);
            checkReducedMotion()
        });
    }
}

function hideElement(elementName){
    document.getElementById(elementName).style.display = "none";
    document.getElementById(elementName).style.visibility = "hidden";
}

function unhideElement(elementName){
    document.getElementById(elementName).style.display = "block";
    document.getElementById(elementName).style.visibility = "visible";
}

function toggleColours(){
    if (document.documentElement.classList.contains("light")) {
        document.documentElement.classList.remove("light")
        document.documentElement.classList.add("dark")
    } else if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark")
        document.documentElement.classList.add("light")
    }
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add("dark")
} else {
    document.documentElement.classList.add("light")
}

function checkReducedMotion(){
    const isReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
    if (isReducedMotion){
        document.getElementById("noanim").innerHTML = "Your browser/system has reduced motions enabled. Some features of this website might not work!";
        document.getElementById("background").classList.remove('background');
    }
}

$(window).bind("popstate", function(e) {
    hideElement("loading");
    document.getElementById("loading").innerHTML = "Loading ...";
    document.getElementById("nested-content").innerHTML = e.originalEvent.state.content;
    document.title = e.originalEvent.state.title;
});
