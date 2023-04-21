import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { PersonLink } from '../PersonLink';

import { Person } from '../../types/Person';

type Props = {
  people: Person[];
};

type Params = {
  slug?: string;
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { slug: selectedPersonSlug = '' } = useParams<Params>();

  return (
    <TableContainer
      component={Paper}
    >
      <Table
        data-cy="peopleTable"
        size="small"
      >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Sex</TableCell>
            <TableCell>Born</TableCell>
            <TableCell>Died</TableCell>
            <TableCell>Mother</TableCell>
            <TableCell>Father</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map(person => {
            const {
              sex,
              born,
              died,
              fatherName,
              motherName,
              mother,
              father,
              slug,
            } = person;

            return (
              <TableRow
                data-cy="person"
                className={classNames({
                  'has-background-warning': selectedPersonSlug === slug,
                })}
                hover
                key={slug}
              >
                <TableCell>
                  <PersonLink person={person} />
                </TableCell>

                <TableCell>{sex}</TableCell>
                <TableCell>{born}</TableCell>
                <TableCell>{died}</TableCell>

                <TableCell>
                  {mother && (
                    <PersonLink person={mother} />
                  )}

                  {(!mother && motherName)
                    ? motherName
                    : '-'}
                </TableCell>

                <TableCell>
                  {father && (
                    <PersonLink person={father} />
                  )}

                  {(!father && fatherName)
                    ? fatherName
                    : '-'}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
