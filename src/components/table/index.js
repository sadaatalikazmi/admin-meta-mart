import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { Autocomplete, Skeleton, TextField } from '@mui/material';
import { withRouter } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useEffect } from 'react';

const rowsPerPage = 20;

const getColors = (status) => {
  switch (status) {
    case 'PENDING':
      return {
        backgroundColor: '#FFC107',
        color: '#fff'
      }

    case 'IN PROCESS':
      return {
        backgroundColor: '#03A9F4',
        color: '#fff'
      }
    case 'COMPLETED':
      return {
        backgroundColor: '#33691E',
        color: '#fff'

      }
    case 'CANCELLED':
      return {
        backgroundColor: '#D50000',
        color: '#fff'
      }
    case 'ONHOLD':
      return {
        backgroundColor: '#673AB7',
        color: '#fff'
      }

    default: return {
      backgroundColor: '#00C853',
      color: '#fff'
    }
  }
}

const getBannersColors = (status) => {
  switch (status) {
    case 'active':
      return {
        backgroundColor: '#03A9F4',
        color: '#fff'
      }
    case 'pending':
      return {
        backgroundColor: '#FFC107',
        color: '#fff'
      }
    case 'approved':
      return {
        backgroundColor: '#00C853',
        color: '#fff'

      }
    case 'suspended':
      return {
        backgroundColor: '#808080',
        color: '#fff'

      }
    case 'rejected':
      return {
        backgroundColor: '#D50000',
        color: '#fff'
      }
    case 'expired':
      return {
        backgroundColor: '#673AB7',
        color: '#fff'
      }

    default: return {
      backgroundColor: '#00C853',
      color: '#fff'
    }
  }
}

const getCellValue = (el, accessor) => {
  const value = accessor
    .split('.')
    .reduce((acc, key) => (acc ? acc[key] : undefined), el);

  if (accessor.includes('image')) {
    return <img
      src={value}
      alt={el.label}

      style={{
        height: 50,
        width: 50,
        objectFit: 'contain',
      }}
    />
  }
  else if (accessor === 'createdAt') {
    return new Date(value).toGMTString().replace("GMT", "");
  }
  else if (accessor === '_id')
    return value.slice(0, 10)
  else return value || '-';
};

function descendingComparator(a, b, orderBy = '') {
  let aValue = getCellValue(a, orderBy) || ''


  if (typeof aValue === 'string') aValue = aValue.toLowerCase(); // Convert to lowercase for case-insensitive comparison
  let bValue = getCellValue(b, orderBy) || ''


  if (typeof bValue === 'string') bValue = bValue.toLowerCase(); // Convert to lowercase for case-insensitive comparison


  // const aValue = a[orderBy].toLowerCase(); // Convert to lowercase for case-insensitive comparison
  // const bValue = b[orderBy].toLowerCase(); // Convert to lowercase for case-insensitive comparison

  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
}


const EnhancedTableHead = React.memo(props => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columns,
    showCheckbox,
    showActions,
    showActionButtons,
    specialTableRows
  } = props;
  useEffect(() => {
  },)

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {showCheckbox && (
          <TableCell padding='checkbox'>
            <Checkbox
              color='primary'
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts'
              }}
            />
          </TableCell>
        )}
        {columns.map((headCell, idx) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.accessor)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}

        {specialTableRows.map(headCell =>
        (
          <TableCell
            align={'center'}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        )
        )}
        {showActions && (
          <TableCell
            align={'center'}
            padding={'normal'}
          >
          </TableCell>
        )}
        {showActionButtons && (
          <TableCell
            align={'center'}
            padding={'normal'}
          >
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
});

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
  showActions: PropTypes.bool,
  showActionButtons: PropTypes.bool,
  showCheckbox: PropTypes.bool
};

function EnhancedTableToolbar(props) {
  const { numSelected, selectButton, selectAction, showCheckbox } = props;

  useEffect(() => {
  },)

  if (!showCheckbox) return <></>
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >


      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <></>
      )}

      {
        numSelected > 0 ? (
          <div onClick={selectAction}>{selectButton}</div>
        ) : (
          <>

          </>
        )
      }
    </Toolbar >
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selectButton: PropTypes.any,
};

const EnhancedTable = ({
  rows,
  columns,
  count = 0,
  showCheckbox = false,
  showFilters = false,
  showActions = false,
  showActionButtons = false,
  actions = [],
  actionButtons = [],
  selectButton,
  selectAction,
  fetching,
  specialTableRows = [],
  filters = [],
  showPagination = true,
  selected, setSelected

}) => {
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState();
  const [page, setPage] = React.useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
  },)


  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = rows.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }


    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const visibleRows = React.useMemo(
    () => {
      let newArry = stableSort(rows, getComparator(order, orderBy))


      newArry = newArry.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      )
      return newArry;
    },
    [order, orderBy, rows, page]
  );

  useEffect(() => {
    if (!columns || !columns.length) return

    setOrderBy(columns[0].accessor)

  }, [columns])


  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          selectButton={selectButton}
          selectAction={() => selectAction(selected)}
          numSelected={selected.length}
          showCheckbox={showCheckbox}
          showFilters={showFilters}
          filters={filters}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 500 }}
            aria-labelledby='tableTitle'
            size={'small'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              columns={columns}
              showActions={showActions}
              showActionButtons={showActionButtons}
              showCheckbox={showCheckbox}
              specialTableRows={specialTableRows}
            />
            <TableBody>
              {fetching
                ? Array(10)
                  .fill()
                  .map((row, index) => (
                    <TableRow
                      hover={showCheckbox}
                      role='checkbox'
                      tabIndex={-1}
                      key={index}
                      sx={{ cursor: 'pointer' }}
                    >
                      {showCheckbox && (
                        <TableCell align='center'>
                          <Skeleton variant='rectangular' />
                        </TableCell>
                      )}
                      {columns.map((el, idx) => (
                        <TableCell align='center' key={el.id}>
                          <Skeleton variant='rectangular' />
                        </TableCell>
                      ))}
                      {specialTableRows.map((el, idx) => (
                        <TableCell align='center' key={el.id}>
                          <Skeleton variant='rectangular' />
                        </TableCell>
                      ))}
                      {actions.map((el, idx) => (
                        <TableCell align='center' key={idx}>
                          <Skeleton variant='rectangular' />
                        </TableCell>
                      ))}
                      {actionButtons.map((el, idx) => (
                        <TableCell align='center' key={idx}>
                          <Skeleton variant='rectangular' />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                :
                <>

                  {filters.length > 0 && <TableRow
                    aria-checked={false}
                    tabIndex={-1}
                    selected={false}
                    sx={{ cursor: 'pointer' }}
                  >
                    {showCheckbox && (
                      <TableCell padding='checkbox'>

                      </TableCell>
                    )}
                    {filters.map(el =>
                      el.type === 'autocomplete' ?
                        <TableCell
                          component='th'
                          id={el.id}
                          scope='row'
                          padding={showCheckbox && 'none'}
                          align='center'
                          key={el.id}
                        >
                          <Autocomplete
                            style={{ marginRight: '1rem' }}
                            size='small'
                            value={el.value || ''}
                            id={el.id}
                            sx={{ minWidth: 'fit-content' }}
                            options={el.options}
                            getOptionLabel={(option) => (option && option.name) || ''}
                            renderInput={(params) => (
                              <TextField size='small' {...params} label={el.label} margin="normal" />
                            )}
                            onChange={(e, value) => {
                              el.handleChange(value || '')
                            }}
                            renderOption={(props, option, { inputValue }) => {
                              const matches = match(option.name, inputValue, { insideWords: true });
                              const parts = parse(option.name, matches);

                              return (
                                <li {...props}>
                                  <div>
                                    {parts.map((part, index) => (
                                      <span
                                        key={index}
                                        style={{
                                          fontWeight: part.highlight ? 700 : 400,
                                        }}
                                      >
                                        {part.text}
                                      </span>
                                    ))}
                                  </div>
                                </li>
                              );
                            }}
                          />
                        </TableCell>
                        : el.type === 'text' ?

                          <TableCell
                            component='th'
                            id={el.id}
                            scope='row'
                            padding={showCheckbox && 'none'}
                            align='center'
                            key={el.id}
                            style={{
                              paddingRight: '1rem'
                            }}
                          >
                            <TextField size='small'
                              placeholder={el.label}
                              value={el.value}
                              onChange={el.handleChange}
                              name={el.name}
                              style={{
                                marginRight: '1rem',
                                marginTop: 16,
                                marginBottom: 8,
                              }}
                            />
                          </TableCell>
                          : el.isSpace ?
                            <TableCell></TableCell>
                            : <></>
                    )}

                    {
                      showActions &&
                      <TableCell align='center' >
                      </TableCell>
                    }

                    {
                      showActionButtons &&
                      <TableCell align='center' >
                      </TableCell>
                    }

                    {Array(columns.length - filters.length).fill().map((el, idx) =>
                      <TableCell align='center'></TableCell>
                    )}

                  </TableRow>
                  }
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover={showCheckbox}
                        onClick={event =>
                          showCheckbox &&
                          handleClick(event, row.id)}
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        {showCheckbox && (
                          <TableCell padding='checkbox'>
                            <Checkbox
                              color='primary'
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId
                              }}
                            />
                          </TableCell>
                        )}

                        {columns.map((el, idx) =>
                          idx === 0 ? (
                            <TableCell
                              component='th'
                              id={labelId}
                              scope='row'
                              padding={showCheckbox && 'none'}
                              align='center'
                              key={el.id}


                            >
                              {getCellValue(row, el.accessor)}
                            </TableCell>

                          ) : (

                            <Tooltip title={el.toolTip ? el.toolTip : ''}>
                              <TableCell align='center'
                                onClick={(e) => {
                                  if (el.onClick) {
                                    e.stopPropagation();
                                    el.onClick(row);
                                  }
                                }}
                                style={{
                                  color: el.accessor.includes('quantity') &&
                                    getCellValue(row, el.accessor) < 5 && '#f90000'
                                  ,
                                  minWidth: el.accessor === 'createdAt' && '192px',
                                }}
                                key={el.id}>
                                {getCellValue(row, el.accessor)}
                              </TableCell>
                            </Tooltip>
                          )
                        )}

                        {specialTableRows.map((el, idx) =>
                          el.id === 'totalprice' ? (
                            <TableCell align='center' key={el.id}>
                              {getCellValue(row, 'productId.price') * row.quantity}
                            </TableCell>
                          ) :
                            idx === 0 ? (
                              <>
                                {
                                  el.type === 'banners' ? (
                                    <TableCell
                                      component='th'
                                      id={labelId}
                                      scope='row'
                                      padding={showCheckbox && 'none'}
                                      align='center'
                                      key={Math.random() * 1230434123}

                                    >
                                      <div>
                                        <select
                                          value={row.status}
                                          defaultValue={row.status}
                                          disabled={['rejected', 'expired'].includes(row.status)}
                                          onChange={(event) => { el.onChange(row.id, event.target.value) }}
                                          style={{
                                            ...getBannersColors(row.status),
                                            opacity: ['rejected', 'expired'].includes(row.status) ? 0.5 : 1,
                                          }}
                                        >
                                          {/* <option value='active' style={{ color: '#03A9F4', backgroundColor: '#fff' }}>ACTIVE</option>
                                          <option value='pending' style={{ color: '#FFC107', backgroundColor: '#fff' }}>PENDING</option> */}
                                          <option value='approved' style={{ color: '#00C853', backgroundColor: '#fff' }}>APPROVED</option>
                                          <option value='suspended' style={{ color: '#808080', backgroundColor: '#fff' }}>SUSPENDED</option>
                                          {/* <option value='rejected' style={{ color: '#D50000', backgroundColor: '#fff' }}>REJECTED</option> */}
                                          {/* <option value='expired' style={{ color: '#673AB7', backgroundColor: '#fff' }}>EXPIRED</option> */}

                                        </select>
                                      </div>
                                    </TableCell>
                                  ) : (
                                    <TableCell
                                      component='th'
                                      id={labelId}
                                      scope='row'
                                      padding={showCheckbox && 'none'}
                                      align='center'
                                      key={Math.random() * 1230434123}
                                    >
                                      <div>
                                        <select
                                          value={row.status}
                                          defaultValue={row.status}
                                          disabled={['COMPLETED', 'CANCELLED'].includes(row.status)}
                                          onChange={event => { el.onChange(row.orderId, event.target.value) }}
                                          style={{
                                            ...getColors(row.status),
                                            opacity: ['COMPLETED', 'CANCELLED'].includes(row.status) ? 0.5 : 1,
                                          }}
                                        >
                                          <option value='PENDING' style={{ color: '#FFC107', backgroundColor: '#fff' }}>PENDING</option>
                                          <option value='IN PROCESS' style={{ color: '#03A9F4', backgroundColor: '#fff' }}>IN PROCESS</option>
                                          <option value='COMPLETED' style={{ color: '#33691E', backgroundColor: '#fff' }}>COMPLETED</option>
                                          <option value='CANCELLED' style={{ color: '#D50000', backgroundColor: '#fff' }}>CANCELLED</option>
                                          <option value='ONHOLD' style={{ color: '#673AB7', backgroundColor: '#fff' }}>ONHOLD</option>
                                          <option value='REFUND' style={{ color: '#00C853', backgroundColor: '#fff' }}>REFUND</option>
                                        </select>
                                      </div>
                                    </TableCell>
                                  )
                                }
                              </>
                            ) : (
                              <TableCell align='center' key={el.id}>
                                {getCellValue(row, el.accessor)}
                              </TableCell>
                            )
                        )}

                        {
                          showActions &&
                          <TableCell align='center' style={{
                            display: actions.length > 1 && 'flex',
                            justifyContent: actions.length > 1 && 'center',
                          }}>

                            {actions.map(action => (
                              <div onClick={(e) => {
                                e.stopPropagation();
                                action.onClick(row);
                              }}>
                                {action.component}
                              </div>
                            ))}
                          </TableCell>
                        }

                        {
                          showActionButtons &&
                          <TableCell align='center' style={{
                            display: actionButtons.length > 1 && 'flex',
                            justifyContent: actionButtons.length > 1 && 'center',
                          }}>
                            {actionButtons.map(action => (<div onClick={(e) => { e.stopPropagation() }}>{action.component(row)}</div>))}
                          </TableCell>
                        }

                      </TableRow>
                    );
                  })}
                </>
              }
            </TableBody>
          </Table>
        </TableContainer>
        {showPagination && <TablePagination
          rowsPerPageOptions={[20]}
          component='div'
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />}
      </Paper>
    </Box>
  );
};

export default withRouter(EnhancedTable);
