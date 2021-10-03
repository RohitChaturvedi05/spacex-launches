
export interface IlaunchSite {
    site_name_long: string
}

export interface ILinks {
    article_link: string,
    video_link: string
}

export interface IRocket {
    first_stage: {
        cores: {
            core: {
                reuse_count: string,
                status: string
            },
            flight: string
        }
    },
    rocket_name: string,
    second_stage: {
        payloads: {
            payload_mass_kg: string,
            payload_mass_lbs: string,
            payload_type: string
        }
    }
}
export interface IShip {
    home_port: string,
    image: string,
    name: string
}

export interface ILaunch {
    id: string,
    mission_name: string,
    launch_date_local: string
    launch_site: IlaunchSite,
    links: ILinks,
    rocket: IRocket,
    ships: IShip[],
}