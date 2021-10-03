import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';


export interface IColumn {
    field: string,
    format?: string
    label: string,
    linkText?: string,
    type: 'checkbox' | 'text' | 'link' | 'date',
}

interface IProps {
    columns?: IColumn[]
}

const Headers = ({ columns = [] }: IProps) => {
    return <TableHead>
        <TableRow>{
            columns.map(col => (
                <TableCell key={col.field}>{col.label}</TableCell>
            ))
        }</TableRow>
    </TableHead>
};

export default Headers;
