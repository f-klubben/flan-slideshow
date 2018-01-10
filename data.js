const sponsors = {
    sponsor1: {
        logo: "default.png",
        name: "Default Sponsor"
    }
};

const flan_crew = {
    wiingreen: {
        name: "Claus Wiingreen",
        image: "default.png"
    }
}

const events = [
    {
        id: 0,
        start: new Date("2018-01-12T17:00"),
        end: new Date("2018-01-12T18:00"),
        title: "Dørene Åbner"
    },
    {
        id: 1,
        start: new Date("2018-01-12T18:45"),
        end: new Date("2018-01-12T19:00"),
        title: "Aftensmad Serveres"
    },
    {
        id: 2,
        start: new Date("2018-01-12T19:00"),
        end: new Date("2018-01-12T20:00"),
        title: "Velkomst og Sponsoroplæg"
    },
    {
        id: 3,
        start: new Date("2018-01-12T20:00"),
        end: new Date("2018-01-14T10:00"),
        title: "Heroes 3<br/>(Kører hele Weekenden)",
        sponsor: sponsors["sponsor1"],
        responsible: [
            flan_crew["wiingreen"]
        ],
        fiki: "http://fklubben.dk/flan/heroes3"
    },
    {
        id: 4,
        start: new Date("2018-01-12T20:00"),
        end: new Date("2018-01-12T22:00"),
        title: "Worms Amageddon",
        sponsor: sponsors["sponsor1"],
        responsible: [
            flan_crew["wiingreen"]
        ],
        fiki: "http://fklubben.dk/flan/worms",
        signup: "[challonge link]"
    },
    {
        id: 5,
        start: new Date("2018-01-12T22:00"),
        end: new Date("2018-01-12T00:00"),
        title: "Overwatch 3v3",
        sponsor: sponsors["sponsor1"],
        responsible: [
            flan_crew["wiingreen"]
        ],
        fiki: "http://fklubben.dk/flan/overwatch",
        signup: "[challonge link]"
    },
    {
        id: 6,
        start: new Date("2018-01-13T09:00"),
        end: new Date("2018-01-13T10:00"),
        title: "Morgenmad serveres"
    },
    {
        id: 7,
        start: new Date("2018-01-13T10:00"),
        end: new Date("2018-01-13T12:00"),
        title: "Warcraft 3 - Custom Maps",
        sponsor: sponsors["sponsor1"],
        responsible: [
            flan_crew["wiingreen"]
        ],
        fiki: "http://fklubben.dk/flan/warcraft3",
        signup: "[challonge link]"
    },
    {
        id: 8,
        start: new Date("2018-01-13T12:00"),
        end: new Date("2018-01-13T13:00"),
        title: "Rocket League",
        sponsor: sponsors["sponsor1"],
        responsible: [
            flan_crew["wiingreen"]
        ],
        fiki: "http://fklubben.dk/flan/rocket_league",
        signup: "[challonge link]"
    },
    {
        id: 9,
        start: new Date("2018-01-13T13:00"),
        end: new Date("2018-01-13T14:00"),
        title: "Sandwiches Serveres"
    },
    {
        id: 10,
        start: new Date("2018-01-13T14:00"),
        end: new Date("2018-01-13T20:00"),
        title: "Leagues of Legends",
        sponsor: sponsors["sponsor1"],
        responsible: [
            flan_crew["wiingreen"]
        ],
        fiki: "http://fklubben.dk/flan/lol",
        signup: "[challonge link]"
    },
    {
        id: 10,
        start: new Date("2018-01-13T20:00"),
        end: new Date("2018-01-14T00:00"),
        title: "Counter Strike: Global Offence",
        sponsor: sponsors["sponsor1"],
        responsible: [
            flan_crew["wiingreen"]
        ],
        fiki: "http://fklubben.dk/flan/csgo",
        signup: "[challonge link]"
    }
];