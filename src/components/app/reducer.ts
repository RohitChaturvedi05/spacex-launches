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
    key: string,
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

const ActionTypes = {
    SET_COMPARE: 'SET_COMPARE',
    SET_DATA: 'SET_DATA',
    SET_ERROR: 'SET_ERROR',
    SET_LIMIT: 'SET_LIMIT',
    SET_MISSION_NAME: 'SET_MISSION_NAME',
    SET_NEXT: 'SET_NEXT',
    SET_PREV: 'SET_PREV',
    SET_ROCKET_NAME: 'SET_ROCKET_NAME',
    SET_SELECTED: 'SET_SELECTED'
}

export const Actions = {
    setCompare: (payload: boolean) => ({
        key: 'compare',
        payload,
        type: ActionTypes.SET_COMPARE
    }),
    setData: (payload: ILaunch[]) => ({
        key: 'data',
        payload,
        type: ActionTypes.SET_DATA
    }),
    setError: (payload: Error) => ({
        key: 'err',
        payload,
        type: ActionTypes.SET_DATA
    }),
    setLimit: (payload: number) => ({
        key: 'limit',
        payload,
        type: ActionTypes.SET_LIMIT
    }),
    setMissionName: (payload: string) => ({
        key: 'missionName',
        payload,
        type: ActionTypes.SET_MISSION_NAME
    }),
    setNext: () => ({
        key: 'offset',
        type: ActionTypes.SET_NEXT
    }),
    setPrev: () => ({
        key: 'offset',
        type: ActionTypes.SET_PREV
    }),
    setRocketName: (payload: string) => ({
        key: 'rocketName',
        payload,
        type: ActionTypes.SET_ROCKET_NAME
    }),
    setSelected: (payload: {
        id: string[];
        checked: boolean;
    }) => ({
        key: 'selected',
        payload,
        type: ActionTypes.SET_SELECTED
    })
}

export function reducer(state: IState, action: IAction) {
    const { key, payload, type } = action
    console.log(type, { action, state })

    switch (type) {
        case ActionTypes.SET_DATA:
        case ActionTypes.SET_COMPARE:
        case ActionTypes.SET_ROCKET_NAME:
        case ActionTypes.SET_MISSION_NAME:
            return {
                ...state,
                [key]: payload
            };
        case ActionTypes.SET_NEXT:
            return {
                ...state,
                offset: state.offset + 1
            };
        case ActionTypes.SET_PREV:
            return {
                ...state,
                offset: state.offset > 1 ? state.offset - 1 : 1
            };
        case ActionTypes.SET_SELECTED: {
            const { id, checked } = payload
            const selected = checked
                ? [...state.selected, id]
                : state.selected.filter((rowid: string) => rowid !== id)

            return {
                ...state,
                selected: take(2, selected)
            }
        }
        default:
            return state
    }
}
