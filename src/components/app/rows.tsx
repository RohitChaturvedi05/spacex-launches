import { Checkbox, Link, TableBody, TableCell, TableRow } from '@mui/material';
import { format } from 'date-fns';
import { memoize } from 'lodash';
import getOr from 'lodash/fp/getOr';
import React from 'react';
import { ILaunch } from '../../types/launch';
import { IColumn } from '../app/headers';


interface IProps {
    columns?: IColumn[],
    data?: ILaunch[],
    selected?: string[],
    onSelect?(id: string, checked: boolean): void,
}

const Rows = ({ columns = [], data = [], selected = [], onSelect }: IProps) => {
    const onRowSelect = memoize(id => (e: { target: { checked: boolean } }) => {
        onSelect && onSelect(id, e.target.checked)
    })
    return <TableBody>{
        data.map(row => (
            <TableRow key={row.id}>{
                columns.map(col => {
                    const key = `${row.id}_${col.field}`
                    if (col.type === 'checkbox') {
                        return <TableCell key={key}>
                            <Checkbox checked={selected.includes(row.id)} onChange={onRowSelect(row.id)}
                            ></Checkbox>
                        </TableCell>
                    }
                    if (col.type === 'link') {
                        return <TableCell key={key}>
                            <Link target="_blank" href={getOr('#', col.field, row)}>{col.linkText || col.label}</Link>
                        </TableCell>
                    }
                    if (col.type === 'date') {
                        return <TableCell key={key}>{
                            format(new Date(getOr('', col.field, row)), col.format || 'dd/MM/yyyy')
                        }</TableCell>
                    }
                    return <TableCell key={key}>{getOr('', col.field, row)}</TableCell>
                })
            }</TableRow>
        ))
    }</TableBody>
};


export default Rows;
