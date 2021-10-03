import take from 'lodash/fp/take';
import { ILaunch } from '../../types/launch'


export interface IState {
    compare: boolean,
    data: ILaunch[],
    err: Error | null,
    limit: number,
    missionName: string,
    offset: number,
    rocketName: string,
    selected: string[],
}
export interface IAction {
    type: string,
    payload?: any
}

export const initialState: IState = {
    compare: false,
    data: [],
    err: null,
    limit: 5,
    missionName: '',
    offset: 1,
    rocketName: '',
    selected: []
};


const TYPES = {
    SET_COMPARE: 'SET_COMPARE',
    SET_DATA: 'SET_DATA',
    SET_ERROR: 'SET_ERROR',
    SET_LIMIT: 'SET_LIMIT',
    SET_MISSION_NAME: 'SET_MISSION_NAME',
    SET_OFFSET: 'SET_OFFSET',
    SET_ROCKET_NAME: 'SET_ROCKET_NAME',
    SET_SELECTED: 'SET_SELECTED'
}


export const Actions = {
    setCompare: (payload: boolean) => ({ type: TYPES.SET_COMPARE, payload }),
    setData: (payload: ILaunch[]) => ({ type: TYPES.SET_DATA, payload }),
    setError: (payload: Error) => ({ type: TYPES.SET_DATA, payload }),
    setLimit: (payload: number) => ({ type: TYPES.SET_LIMIT, payload }),
    setMissionName: (payload: string) => ({ type: TYPES.SET_MISSION_NAME, payload }),
    setRocketName: (payload: string) => ({ type: TYPES.SET_ROCKET_NAME, payload }),
    setOffset: (payload: number) => ({ type: TYPES.SET_OFFSET, payload }),
    setSelected: (payload: { id: string[], checked: boolean }) => ({ type: TYPES.SET_SELECTED, payload })
}

export function reducer(state: IState, action: IAction) {
    console.log(action.type, action, state)
    switch (action.type) {
        case TYPES.SET_COMPARE:
            return {
                ...state,
                compare: action.payload
            };
        case TYPES.SET_DATA:
            return {
                ...state,
                data: action.payload
            };
        case TYPES.SET_MISSION_NAME:
            return {
                ...state,
                missionName: action.payload
            };
        case TYPES.SET_ROCKET_NAME:
            return {
                ...state,
                rocketName: action.payload
            };
        case TYPES.SET_OFFSET:
            return {
                ...state,
                offset: action.payload
            };
        case TYPES.SET_SELECTED: {
            const { id, checked } = action.payload
            const selected = checked
                ? take(2, [...state.selected, id])
                : take(2, state.selected.filter((rowid: string) => rowid !== id))

            return {
                ...state,
                selected
            }
        }
        default:
            return state
    }
}
