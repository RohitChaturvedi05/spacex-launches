import { Button, ButtonGroup, Grid, Paper, Table, TableCell, TableFooter, TableRow, Typography } from '@mui/material';
import React, { useCallback, useEffect, useReducer } from 'react';
import getLaunchesPast from '../../services/get-launches-past';
import { ILaunch } from '../../types/launch';
import Compare from '../compare';
import Search from '../search';
import Headers, { IColumn } from './headers';
import { Actions, reducer, initialState } from './reducer';
import Rows from './rows';
import './app.css';


const columns: IColumn[] = [
  { field: '', label: '', type: 'checkbox' },
  { field: 'mission_name', label: 'Mission Name', type: 'text' },
  { field: 'rocket.rocket_name', label: 'Rocket Name', type: 'text' },
  { field: 'rocket.first_stage.cores.flight', label: 'Flight', type: 'text' },
  { field: 'rocket.first_stage.cores.core.reuse_count', label: 'Reuse Count', type: 'text' },
  { field: 'rocket.first_stage.cores.core.status', label: 'Status', type: 'text' },
  { field: 'rocket.second_stage.payloads.payload_type', label: 'Payload Type', type: 'text' },
  { field: 'rocket.second_stage.payloads.payload_mass_kg', label: 'Payload Mass (Kg)', type: 'text' },
  { field: 'launch_date_local', label: 'Launch Date', type: 'date', format: 'dd/MM/yyyy' },
  { field: 'launch_site.site_name_long', label: 'Site Name', type: 'text' },
  { field: 'links.article_link', label: 'Article Links', type: 'link', linkText: 'Article' },
  { field: 'links.video_link', label: 'Vedio Links', type: 'link', linkText: 'Vedio' },
]

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const params = {
      limit: state.limit,
      offset: state.offset,
      rocketName: state.rocketName,
      missionName: state.missionName
    }
    getLaunchesPast(params)
      .then(payload => dispatch(Actions.setData(payload)))
      .catch(err => dispatch(Actions.setError(err)))
      .catch(console.log)

  }, [state.limit, state.offset, state.rocketName, state.missionName, dispatch])


  const onPageChange = useCallback(e => {
    if (e?.target?.name === 'prev') {
      const val = state.offset > 1 ? state.offset - 1 : 1
      return dispatch(Actions.setOffset(val));
    }
    if (e?.target?.name === 'next') {
      return dispatch(Actions.setOffset(state.offset + 1));
    }
  }, [state.offset, dispatch])

  const onSelect = useCallback((id, checked) => {
    console.log(state.selected, id, checked)
    return dispatch(Actions.setSelected({ id, checked }))

  }, [state.selected, dispatch])

  const onSearch = useCallback(e => {
    if (e?.target?.name === 'rocketName') {
      return dispatch(Actions.setRocketName(e.target.value))
    }
    if (e?.target?.name === 'missionName') {
      return dispatch(Actions.setMissionName(e.target.value))
    }
  }, [dispatch])

  const onCompare = useCallback(e => {
    console.log('state.compare', state.compare)
    dispatch(Actions.setCompare(!state.compare))
  }, [state.compare, dispatch])

  const onCloseCompare = useCallback(e => {
    dispatch(Actions.setCompare(false))
  }, [dispatch])

  if (state.err?.message) {
    return <Typography variant="h5">{state.err.message}</Typography>
  }

  if (state.compare) {
    const recordsToCompare = state.data.filter((row: ILaunch) => state.selected.includes(row.id))
    return <Compare columns={columns} rows={recordsToCompare} onClose={onCloseCompare} />
  }

  return <Paper>

    <Grid container spacing={1}>

      <Grid item xs={6} >
        <Typography variant="h5">SpaceX Launches</Typography>
      </Grid>
      {/* Hard Filters */}
      <Grid item xs={3}>
        <Search label="Mission" name="missionName" value={state.missionName} onChange={onSearch} />
      </Grid>
      <Grid item xs={3}>
        <Search label="Rocket" name="rocketName" value={state.rocketName} onChange={onSearch} />
      </Grid>
      {/* Table */}
      <Grid item xs={12}>
        <Table>
          <Headers columns={columns} />
          <Rows columns={columns} data={state.data} onSelect={onSelect} selected={state.selected} />
          <TableFooter>
            <TableRow>
              <TableCell align="left">
                <Button name="compare" disabled={state.selected.length !== 2} variant="contained" onClick={onCompare}>Compare</Button>
              </TableCell>
              <TableCell align="right" colSpan={columns.length - 1}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Button name="prev" disabled={state.offset === 1} onClick={onPageChange}>Prev</Button>
                  <Button name="next" onClick={onPageChange}>Next</Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Grid>
    </Grid >
  </Paper>
}

export default App;
