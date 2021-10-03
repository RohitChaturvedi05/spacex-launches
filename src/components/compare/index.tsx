import { Button, Grid, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { getOr } from 'lodash/fp';
import React from 'react';
import { ILaunch } from '../../types/launch';
import { IColumn } from '../app/headers';


interface IProps {
    rows: ILaunch[],
    columns: IColumn[],
    onClose?(e: any): void,
}

const ignoreList: string[] = ['', 'Article Links', 'Vedio Links']

function Compare({ columns = [], rows, onClose }: IProps) {
    return <Grid container spacing={1}>
        <Grid xs={11} item><Typography variant="h5">Comparing Launches</Typography></Grid>
        <Grid xs={1} item>
            <Button variant="outlined" name="close" onClick={onClose}>Close</Button>
        </Grid>
        <Grid xs={12} item>
            <Table>
                <TableBody>{
                    columns.map(col => ignoreList.includes(col.label) ? null : (
                        <TableRow key={col.field}>
                            <TableCell>{col.label}</TableCell>
                            <TableCell>{getOr('', `0.${col.field}`, rows)}</TableCell>
                            <TableCell>{getOr('', `1.${col.field}`, rows)}</TableCell>
                        </TableRow>
                    ))
                }</TableBody>
            </Table>
        </Grid>
    </Grid>
}

export default Compare;
