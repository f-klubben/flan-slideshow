const sponsors = {
    sponsor1: {
        logo: "sponsorlogos/default.png",
        name: "Sponsor1"
    }
};

const flan_crew = {
    crew1: {
        name: "CrewName",
        image: "crewportraits/default.png",
    }
}

const events = [
// Tournements
    new Event(
        "Tournement1",
        new Date(day1 + "20:00"),
        new Date(day1 + "21:00"),
        sponsors["sponsor1"],
        [
            flan_crew["crew1"]
        ],
        "eventlogos/default.png",
        "Regler og tilmelding på <a href='#'>link</a><br/>Evt. andre kommentarer."),
       
// Standard events
    new Event(
        "Dørene Åbner", 
        new Date(day1 + "17:00"), 
        new Date(day1 + "18:00")),
    new Event(
        "Aftensmad Servers", 
        new Date(day1 + "18:45"), 
        new Date(day1 + "19:00")),
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
        "Dørene Lukker",
        new Date(day3 + "10:00"),
        new Date(day3 + "11:00"))
];