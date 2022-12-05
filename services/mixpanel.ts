import mixpanel from 'mixpanel-browser'

export class MixpanelTracking {
  private static _instance: MixpanelTracking

  public static getInstance(): MixpanelTracking {
    // if there is no Mixpanel Instance, we create one and return it
    if (MixpanelTracking._instance == null)
      return (MixpanelTracking._instance = new MixpanelTracking())

    // if we already have a instance we will return it
    return this._instance
  }

  public constructor() {
    if (MixpanelTracking._instance)
      throw new Error(
        'Error: Instance creation of MixpanelTracking is not allowed. Use Mixpanel.getInstance()'
      )

    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID || '', {
      debug: true,
      ignore_dnt: true,
      api_host: 'https://api-eu.mixpanel.com'
    })
  }
  // tracking class

  public track(name: string, data: object = {}) {
    mixpanel.track(name, data)
  }
  // properties class
  public register(data: object = {}) {
    mixpanel.register(data)
  }

  // Identfiy mixpanel user (after login or signup)
  public identify(id: string) {
    mixpanel.identify(id)
  }
  // Populate information to user profile
  public people(id: string) {
    mixpanel.people.set(id, id)
  }

  // helper functions

  public pageView() {
    this.track('page_view')
  }

  public eventSubmitted(title: any) {
    this.track('event_submit', {
      eventTitle: title
    })
    this.register({ eventSubmitter: true })
  }


  public calendarSubscribed(location: string) {
    this.track('calendar_subscribed', {
        ctaLocation: location
    })
  }

  public eventLinkClicked( eventName: string) {
    this.track('event_link_clicked', {
        eventName: eventName
    })
  }
  // Here we assign our internal ID to a Mixpanel visitor ID once we identified them
  // public identifyUser(id: any) {
  //   console.log('Event::useridentified');
  //   this.identify(id);
  // }

  // Here we can populate Mixpanel with User profiles and Information
  // public setUser(id: any) {
  //   console.log('Event::userSet');
  //   this.people(id);

  // }
}
