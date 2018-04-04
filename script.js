let is_counting_down = false;
let is_taking_pictures = false;

// Setup events
events.sort(function(a, b){
    return a.start - b.start;
});

let now = Date.now();
for(let event of events){
    let time_to_event = event.start - now;
    
    if(time_to_event < 0){
        console.log("Event " + event.id + " start time has already passed.\n"
                  + "Start time: " + event.start + "\n"
                  + "Event title: '" + event.title + "'");
        continue;
    }
    if(event.countdown){        
        setTimeout(function(){startEventCountDown(event);}, time_to_event - count_down_time);
    }
    
    console.log("Scheduled event for " + event.start + "\n" 
              + "Milliseconds to event " + time_to_event + "\n"
              + "Event title: '" + event.title + "'");
    setTimeout(function(){runEvent(event);}, time_to_event);
}

window.onload = function() {
    build_sidebar();
    startSponsorCycle();
    
    for(let event of events){
        if(event.is_now()){
            runEvent(event);
            continue;
        }
        
        if(!event.countdown) continue;
        
        let time_to_event = event.start - now;
        if(time_to_event < 0 && time_to_event > count_down_time){
            startEventCountDown(event);
        }
        
    }
}

let sponsor_cycle_handle;
function startSponsorCycle(){
    update_sponsor_logo();
    sponsor_cycle_handle = setInterval(update_sponsor_logo, sponsor_cycle_time);
}

document.addEventListener('keydown', handleKeyboardInput);
function handleKeyboardInput(event){    
    let index = event.keyCode - 48; // char '0' == int 48
    
    if(index >= events.length || index < 0){
        return;
    }
    
    let flan_event = events.find(function(element){
        return element.id == index && element.sponsor != undefined;
    });
    if(!flan_event) return;
    
    showSponsorCycle();
    clearInterval(sponsor_cycle_handle);
    set_sponsor_logo(flan_event.sponsor.logo, "#000");
    is_taking_pictures = true;
    
    
    console.log(flan_event);
    
    document.addEventListener('keydown', handleGoBackEvent);
    document.removeEventListener('keydown', handleKeyboardInput);
};

function handleGoBackEvent(event){
    if(event.keyCode != 27) return; // 27 == ESC
    startSponsorCycle();
    is_taking_pictures = false;
    
    if(is_counting_down) showCountDownScreen();
    
    document.addEventListener('keydown', handleKeyboardInput);
    document.removeEventListener('keydown', handleGoBackEvent);
};

function runEvent(event){
    console.log("Event " + event.id + " Started.");
    const element = document.getElementById("event" + event.id);
    if(!element) {
        console.log("Failed to find event " + event.id);
        return;
    }
    element.classList.add("active_event");
    setTimeout(function(){
        element.classList.remove("active_event");
        console.log("Event " + event.id + " Stopped.");
    }, event.end - Date.now());
}

function showSponsorCycle(){
    let sponsors = document.getElementById("sponsor_logo");
    let tournement = document.getElementById("tournement_start");
    sponsors.style.display = "block";
    tournement.style.display = "none";
}

function showCountDownScreen(){
    if(is_taking_pictures) return;
    let sponsors = document.getElementById("sponsor_logo");
    let tournement = document.getElementById("tournement_start");
    sponsors.style.display = "none";
    tournement.style.display = "block";
}

function show_responsible(responsible){
    let responsible_table = document.getElementById("responsible_table");
    responsible_table.innerHTML = "";
    let responsible_image_row = document.createElement("tr");
    let responsible_name_row = document.createElement("tr");
    
    for(let member of responsible){
        let image = document.createElement("td");
        image.style.overflow = "hidden";
        let name = document.createElement("td");
        name.align = "center";
        image.innerHTML = '<img src="' + member.image + '" class="portrait"/>';
        name.innerHTML = member.name;
        
        responsible_image_row.appendChild(image);
        responsible_name_row.appendChild(name);
    }
    
    responsible_table.appendChild(responsible_image_row);
    responsible_table.appendChild(responsible_name_row);
}

function startEventCountDown(event){
    console.log("Starting Event Countdown");
    
    show_responsible(event.responsible);
    let message = document.getElementById("tournement_message");
    if(event.message == undefined)
        message.innerHTML = "";
    else 
        message.innerHTML = event.message;
    
    let name = document.getElementById("tournement_name");
    name.innerHTML = event.title;
    let sponsor_name = document.getElementById("tournement_sponsor_name");
    sponsor_name.innerHTML = event.sponsor.name;
    let sponsor_logo = document.getElementById("tournement_sponsor_logo");
    sponsor_logo.src = event.sponsor.logo; 
    let event_logo = document.getElementById("game_logo");
    event_logo.src = event.image;
    
    showCountDownScreen();   
    const t = new Timer(event.start - Date.now(), 
        function(){ // Timer finished callback
            showSponsorCycle();
            is_counting_down = false;
        }
    );
    t.start();
    is_counting_down = true;
}

const sponsor_iterator = infinite_sponsor_iterator();

function* infinite_sponsor_iterator(){
    while(true){
        for(const sponsor in sponsors){
            yield sponsors[sponsor];
        }
    }
}

function update_sponsor_logo(){
    const sponsor_logo = document.getElementById("sponsor_logo");
    const sponsor = sponsor_iterator.next().value;
    set_sponsor_logo(sponsor.logo);
}

function set_sponsor_logo(uri, background_color = "#FFF"){
    sponsor_logo.style.backgroundImage = "url(" + uri + ")";
    sponsor_logo.style.backgroundColor = background_color;
    //sponsor_logo.src = uri;
}

function build_sidebar() {
    clear_plan();
    const header = document.createElement("h2");
    header.innerHTML = getWeekday(new Date(), "dk");
    document.getElementById("plan").appendChild(header);
    events.filter(function(event){
        return event.is_today();
    }).forEach(add_to_plan);
}

function getWeekday(date, locale = "en") {
    const days = {
        dk:["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag"],
        en:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    };
    
    return days[locale][date.getDay()];
}

function clear_plan() {
    document.getElementById("plan").innerHTML = "";
}

const hour_minutes_format = {hour: '2-digit', minute:'2-digit'};

function add_to_plan(event){
    const row_time = document.createElement("td");
    row_time.innerHTML = event.start.toLocaleTimeString([], hour_minutes_format);

    const row_title = document.createElement("td");
    row_title.innerHTML = event.title;
    
    const table_row = document.createElement("tr");
    table_row.id = "event" + event.id;

    table_row.appendChild(row_time);
    table_row.appendChild(row_title);
    
    document.getElementById("plan").appendChild(table_row);
}

function Timer(duration, callback = undefined){
    console.log("Timer::constructor called with parameter duration: " + duration);
    const canvas = document.getElementById("timer");
    const ctx = canvas.getContext("2d");
    let radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius *= 0.90;
    let end_time = undefined;
    
    const drawFace = function(ctx, radius) {
      //console.log("Timer::drawFace called");
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2*Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
      let grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
      grad.addColorStop(0, '#333');
      grad.addColorStop(0.5, 'white');
      grad.addColorStop(1, '#333');
      ctx.strokeStyle = grad;
      ctx.lineWidth = radius*0.1;
      ctx.stroke();
    }

    const drawTime = function(ctx, radius, time_left, duration){   
        //console.log("Timer::drawTime called");
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.arc(0, 0, radius*0.95, -0.5*Math.PI, -0.5*Math.PI+2*Math.PI*(time_left/count_down_time));
        ctx.lineTo(0,0);
        ctx.fillStyle = '#3c3';
        ctx.fill();
    }

    const drawCountDown = function(ctx, radius, time_left){
        //onsole.log("Timer::drawCountDown called");
        ctx.textBaseline="middle";
        ctx.textAlign="center";
        ctx.font = radius*0.5 + "px arial";
        ctx.fillStyle= '#333';
        ctx.fillText(time_left.toLocaleTimeString([],{minute: "2-digit", second: "2-digit"}), 0, 0);
    }
    
    const drawClock = function() {
      //console.log("Timer::drawClock called");
      drawFace(ctx, radius);
      const time_left = new Date(end_time - Date.now());
      drawTime(ctx, radius, time_left, duration);
      drawCountDown(ctx, radius, time_left);
      
      if(time_left.getMinutes() + time_left.getSeconds() == 0){
        console.log("Timer::completed called");
        clearInterval(this.interval_id);
        if(callback) callback();
      }
    }
    
    this.start = function(){
        console.log("Timer::start called");
        end_time = Date.now() + duration;
        this.interval_id = setInterval(drawClock, 500);
        drawClock();
    }
    
    this.stop = function(){
        console.log("Timer::stop called");
        clearInterval(this.interval_id);
    }
}