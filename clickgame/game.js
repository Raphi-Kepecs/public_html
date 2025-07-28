let widget_container = document.getElementById("widget-container")
let score_element = document.getElementById("score")
let stores = document.getElementsByClassName("store")
let score = 5;
let super_gompei_count = 0;
let selling = false;

function changescore(amount) {
    score += amount;
    score_element.innerHTML = "Cars: " + score;



    for (let store of stores) {
        let cost = parseInt(store.getAttribute("cost"))

        if (score < cost) {
            store.setAttribute("broke", "")
        } else {
            store.removeAttribute("broke")

        }

    }
}

function changeselling() {
    if (selling == true) {
        const button = document.getElementById("SellButton");
        button.textContent = "Sell drivers";
        selling = false;

        for (let widget of widget_container.children)
            widget.removeAttribute("selling", "");
    } else {
        const button = document.getElementById("SellButton");
        button.textContent = "Stop selling";
        selling = true;
        for (let widget of widget_container.children)
            widget.setAttribute("selling", "");

    }
}



function buy(store) {
    let cost = parseInt(store.getAttribute("cost"))

    if (cost > score) {
        return;

    }

    changescore(-cost)

    /*let super_gompei = document.querySelector("#widget-container #super-gompei")?.parentElement;
    if (store.getAttribute("name") == "Super-Gompei" && super_gompei != null) {
        let old_yield = parseInt(super_gompei.getAttribute("reap"));
        super_gompei.setAttribute("reap", old_yield + 100);
        super_gompei_count += 1;
        document.body.style = "--gompei-count:" + super_gompei_count;
        return;
    }*/


    let new_widget = store.firstElementChild.cloneNode(true)

    new_widget.onclick = () => {
        harvest(new_widget)

    }

    widget_container.appendChild(new_widget)

    if (new_widget.getAttribute("auto") == "true") {
        new_widget.setAttribute("harvesting", "")
        setup_end_harvest(new_widget)
    }
}

function setup_end_harvest(widget) {
    setTimeout(() => {
        widget.removeAttribute("harvesting")
        if (widget.getAttribute("auto") == "true") {
            harvest(widget)
        }

    }, parseFloat(widget.getAttribute("cooldown")) * 1000);
}

function harvest(widget) {
    if (widget.hasAttribute("harvesting")) {
        return;
    }

    widget.setAttribute("harvesting", "")

    changescore(parseInt(widget.getAttribute("reap")))
    givePoints(widget)

    setup_end_harvest(widget)
}

function givePoints(widget) {
    let points_element = document.createElement("span");
    points_element.className = "point";
    points_element.innerHTML = "+" + widget.getAttribute("reap");
    points_element.onanimationend = () => {
        points_element.remove();
    }
    widget.appendChild(points_element);
}

changescore(0);