const DUMMY_EVENTS = [
    {
      id: 'e1',
      title: '🇺🇸 DeSci Boston',
      description:
        'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
      location: 'Somestreet 25, 12345 San Somewhereo',
      date: '2022-09-18',
      link: 'https://www.desciboston.com/',
      image: 'images/desci-boston.svg',
      isFeatured: false,
    },
    {
      id: 'e2',
      title: '🇩🇪 DeSci Berlin',
      description:
        "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
      location: 'New Wall Street 5, 98765 New Work',
      date: '2022-09-15',
      link: 'https://www.desci.berlin/',
      image: 'images/devcon-bogota.png',
      isFeatured: true,
    },
    {
      id: 'e3',
      title: '🇨🇴 DeSci Bogota',
      description:
        'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
      location: 'My Street 12, 10115 Broke City',
      date: '2022-10-09',
      link: 'https://ethbogota.com/',
      image: 'images/devcon-bogota.png',
      isFeatured: true,
    },
    {
      id: 'e4',
      title: '🇨🇴 Schelling Point Bogota',
      description:
        'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
      location: 'My Street 12, 10115 Broke City',
      date: '2022-10-10',
      link: 'https://schellingpoint.gitcoin.co/',
      image: 'images/schelling-point-bogota.jpeg',
      isFeatured: true,
    },
     {
      id: 'e5',
      title: '🇺🇸 DeSci Seattle',
      description:
      'Join us for brainstorming and help make Seattle Ground Central for \#DeSci',
      date: '2022-09-22',
      link: 'https://optispan.life/calendar',
      image: 'https://www.swedish.org/~/media/Images/Swedish/Swedishlogo.png?h=50&w=200',
      isFeatured: true,
    },
  ];
  
  export function getFeaturedEvents() {
    return DUMMY_EVENTS.filter((event) => event.isFeatured);
  }
  
  export function getAllEvents() {
    return DUMMY_EVENTS;
  }
  
  export function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
  
    let filteredEvents = DUMMY_EVENTS.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
  }
  
  export function getEventById(id) {
    return DUMMY_EVENTS.find((event) => event.id === id);
  }
  
