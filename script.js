const second = 1000;
const minute = 60*second;
const hour = 60*minute

// Setup events
events.sort(function(a, b){
    return a.start - b.start;
});

let now = Date.now();
for(index in events){
    let event = events[index];
    let time_to_event = event.start - now;
    
    if(time_to_event < 0){
        console.log("Event " + event.id + " start time has already passed.\n"
                  + "Start time: " + event.start + "\n"
                  + "Event title: '" + event.title + "'");
        continue;
    }
    else if(event.is_now()){
        runEvent(event);
    }
    if(event.sponsor){        
        setTimeout(function(){startEventCountDown(event);}, time_to_event - 1*minute);
    }
    
    console.log("Scheduled event for " + event.start + "\n" 
              + "Milliseconds to event " + time_to_event + "\n"
              + "Event title: '" + event.title + "'");
    setTimeout(function(){runEvent(event);}, time_to_event);
}

window.onload = function() {
    build_sidebar();
    const t = new Timer(30*minute);
    t.start();
    setTimeout(function(){t.stop();}, 30*minute)
}

function runEvent(event){
    console.log("Event " + event.id + " Started.");
    const element = document.getElementById("event" + event.id);
    element.classList.add("active_event");
    setTimeout(function(){
        element.classList.remove("active_event");
        console.log("Event " + event.id + " Stopped.");
    }, event.end - Date.now());
}

function startEventCountDown(event){
    const t = new Timer(event.start - Date.now());
    t.start();}

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
    sponsor_logo.style.backgroundImage = "url(" + sponsor.logo + ")";
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

function Timer(duration){
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
        ctx.arc(0, 0, radius*0.95, -0.5*Math.PI, -0.5*Math.PI+2*Math.PI*(time_left/duration));
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
        this.stop();
      }
    }
    
    this.start = function(){
        console.log("Timer::start called");
        end_time = Date.now() + duration;
        this.interval_id = setInterval(drawClock, 1000);
    }
    
    this.stop = function(){
        console.log("Timer::stop called");
        clearInterval(this.interval_id);
    }
}