window.onload = function() {
    update_sidebar();
    setInterval(update_sidebar, 3000);
    setInterval(update_sponsor_logo, 3000);
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
    sponsor_logo.style.backgroundImage = "url(" + sponsor.logo + ")";
}

function update_sidebar() {
    document.getElementById("day").innerHTML = getWeekday(new Date(), "dk");
    clear_plan();
    const day_events = events.filter(event_today);
    day_events.forEach(add_to_plan);
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

function add_to_plan(event){    
    const hour_minutes_format = {hour: '2-digit', minute:'2-digit'};
    
    const row_time = document.createElement("td");
    row_time.innerHTML = event.start.toLocaleTimeString([], hour_minutes_format);

    const row_title = document.createElement("td");
    row_title.innerHTML = event.title;
    
    const table_row = document.createElement("tr");
    table_row.id = "event" + event.id;
    if(event_is_now(event)){
        table_row.classList.add("active_event");
    }
    table_row.appendChild(row_time);
    table_row.appendChild(row_title);
    
    document.getElementById("plan").appendChild(table_row);
}

function is_between(value, low, high) {
    if(low > high) return between(value, high, low);
    return value > low && value < high;
}

function event_is_now(event) {
    const now = new Date();
    return is_between(now, event.start, event.end);
}

function event_today(event) {
    const today = new Date();
    today.setHours(0,0,0,0);
    
    const tomorrow = new Date(today.getTime()); // Ensures that the date is copied
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return is_between(event.start, today, tomorrow);
}