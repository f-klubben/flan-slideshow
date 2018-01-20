const sponsors = {
    sponsor1: {
        logo: "default.png",
        name: "Default Sponsor"
    },
    sponsor2: {
        logo: "default2.png",
        name: "Default Sponsor"
    }
};

const flan_crew = {
    wiingreen: {
        name: "Claus Wiingreen",
        image: "default.png"
    }
}

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

const day1 = "2018-01-19T"
const day2 = "2018-01-20T"
const day3 = "2018-01-21T"

const events = [
// Tournements
    new Event(
        "Heroes 3", 
        new Date(day1 + "22:29"), 
        new Date(day3 + "10:00"), 
        sponsors["sponsor1"], 
        [flan_crew["wiingreen"]]),
    new Event(
        "Worms Amageddon",
        new Date(day1 + "20:00"),
        new Date(day1 + "22:00"),
        sponsors["sponsor1"],
        [flan_crew["wiingreen"]]),
    new Event(
        "Overwatch 3v3",
        new Date(day1 + "22:00"),
        new Date(day2 + "00:00"),
        sponsors["sponsor1"],
        [flan_crew["wiingreen"]]),
    new Event(
        "Warcraft 3 - Custom Maps",
        new Date(day2 + "14:50"),
        new Date(day2 + "15:00"),
        sponsors["sponsor1"],
        [flan_crew["wiingreen"]]),
    new Event(
        "Rocket League",
        new Date(day2 + "12:00"),
        new Date(day2 + "13:00"),
        sponsors["sponsor1"],   
        [flan_crew["wiingreen"]]),
    new Event(
        "Leagues of Legends",
        new Date(day2 + "14:00"),
        new Date(day2 + "20:00"),
        sponsors["sponsor1"],
        [flan_crew["wiingreen"]]),
    new Event(
        "Counter Strike: Global Offence",
        new Date(day2 + "20:00"),
        new Date(day3 + "00:00"),
        sponsors["sponsor1"],
        [flan_crew["wiingreen"]]),
        
// Standard events
    new Event(
        "Dørene Åbner", 
        new Date(day1 + "17:00"), 
        new Date(day1 + "18:00")),
    new Event(
        "Aftensmad Servers", 
        new Date(day1 + "18:45"), 
        new Date(day1+ "19:00")),
    new Event(
        "Velkomst og Sponsoroplæg", 
        new Date(day1 + "19:00"), 
        new Date(day1 + "20:00")),
    new Event(
        "Morgenmad Serveres",
        new Date(day2 + "09:00"),
        new Date(day2 + "10:00")),
    new Event(
        "Sandwiches Serveres",
        new Date(day2 + "13:00"),
        new Date(day2 + "14:00")),
    new Event(
        "Morgenmad Serveres",
        new Date(day3 + "09:00"),
        new Date(day3 + "10:00")),
    new Event(
        "Dørene Lukkes",
        new Date(day3 + "10:00"),
        new Date(day3 + "11:00"))
];