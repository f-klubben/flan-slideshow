let next_event_id = 0;

function is_between(value, low, high) {
    if(low > high) return is_between(value, high, low);
    return value > low && value < high;
}

class Event{
    constructor(title, start, end, sponsor = undefined, responsible = undefined, message = undefined){
        this.id = next_event_id++;
        this.start = start;
        this.end = end;
        this.title = title;
        this.sponsor = sponsor;
        this.responsible = responsible;
        this.message = message;
    }
    
    is_now() {
        const now = new Date();
        return is_between(now, this.start, this.end);
    }
    
    is_today(){
        const today = new Date();
        today.setHours(0,0,0,0);
        
        const tomorrow = new Date(today.getTime()); // Ensures that the date is copied
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        return is_between(this.start, today, tomorrow);
    }
}

