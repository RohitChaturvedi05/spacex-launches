import axios from 'axios'
import Config from '../../config.json'
import { ILaunch } from '../../types/launch'
import query from './query'


interface IParams {
    limit: number,
    offset: number,
    missionName?: string,
    rocketName?: string
}

const parseResponse = (response: { data: { data: { launchesPast: any[] } } }): ILaunch[] => {
    const launches = response?.data?.data?.launchesPast
    if (!launches) return [];

    return launches.map(launch => ({
        ...launch,
        rocket: {
            ...launch.rocket,
            first_stage: {
                ...launch.rocket.first_stage,
                cores: launch.rocket.first_stage.cores[0]
            },
            second_stage: {
                ...launch.rocket.second_stage,
                payloads: {
                    ...launch.rocket.second_stage.payloads[0],
                }
            }
        }

    }))
}

const getLaunchesPast = ({ rocketName = '', missionName = '', limit = 10, offset = 1 }: IParams): Promise<ILaunch[]> => (
    axios({
        data: {
            query, variables: {
                limit,
                offset,
                ...(rocketName && { rocketName }),
                ...(missionName && { missionName })
            }
        },
        timeout: 5000,
        method: 'POST',
        url: Config.api.graphql,
    }).then(parseResponse)
)

export default getLaunchesPast;
