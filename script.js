window.onload = function(){
    document.getElementById("day").innerHTML = getWeekday(new Date(), "dk");
    const day_events = events.filter(event_today);
    day_events.forEach(add_to_plan);
    
    function getWeekday(date, locale){
        const days = {
            dk:["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag"],
            en:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        };
        
        locale = locale ? locale : "en";
        
        return days[locale][date.getDay()];
    }
    
    function add_to_plan(event){
        const plan = document.getElementById("plan");
        
        if(!plan) return;
        
        const hour_minutes_format = {hour: '2-digit', minute:'2-digit'};
        
        const table_row = document.createElement("tr");
        table_row.id = "event" + event.id;
        
        const row_time = document.createElement("td");
        const row_title = document.createElement("td");
        row_time.innerHTML = event.start.toLocaleTimeString([], hour_minutes_format);
        row_title.innerHTML = event.title;
        
        if(event_is_now(event)){
            table_row.classList.add("active_event");
        }
        
        table_row.appendChild(row_time);
        table_row.appendChild(row_title);
        plan.appendChild(table_row);
    }
    
    function event_is_now(event){
        const now = Date.now();
        
        return now > event.start && now < event.end;
    }
    
    function event_today(event){
        const today = new Date();
        today.setDate(13);
        today.setHours(0,0,0,0);
        
        const tomorrow = new Date(today.getTime()); // Ensures that the date is copied
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        return event.start > today && event.start < tomorrow;
    }
}