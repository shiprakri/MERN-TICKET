import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Hidden } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Button, makeStyles, Typography } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { visuallyHidden } from "@mui/utils";
import { deleteTicket, getTickets, updateTicket } from "../service/api";

const useStyles = makeStyles({
  button: {
    fontSize: "15px",
    // backgroundColor:'Green',
    color: "Green",
    width: "70px",
  },
  close: {
    fontSize: "15px",
    // backgroundColor:'Green',
    color: "red",
    width: "70px",
  },

  // 330033,000066
  Tablehead: {
    backgroundColor: "#9c9ce2",
    color: "#33eaff",
    fontWeight: "bold",
    fontSize: "20px",
    boxShadow:'6px 2px 12px black',
  },
  head: {
    color: "#fffff",
    fontWeight: "bold",
    fontSize: "20px",
  },
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "index",
    numeric: false,
    disablePadding: true,
    label: "Index",
  },
  {
    id: "fname",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: true,
    label: "Username",
  },
  {
    id: "ticket_des",
    numeric: true,
    disablePadding: false,
    label: "Ticket Description",
  },

  {
    id: "createdAt",
    numeric: true,
    disablePadding: true,
    label: "Created_At",
  },
  {
    id: "updatedAt",
    numeric: true,
    disablePadding: false,
    label: "Updated_at",
  },
  {
    id: "DeletedAt",
    numeric: true,
    disablePadding: false,
    label: "Resolved_at",
  },
  {
    id: "",
    numeric: true,
    disablePadding: false,
  },
  {
    id: "",
    numeric: true,
    disablePadding: false,
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const classes = useStyles();

  return (
    <TableHead>
      <TableRow className={classes.Tablehead}>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.head}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  //   onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export const Home1 = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentId, setCurrentId] = useState(0);

  const ticketfind = currentId
    ? users?.find((message) => message._id === currentId)
    : null;
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("username");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emp = JSON.parse(localStorage.getItem("profile"));


  const [userold, setUserold] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  // console.log( userold?.result.fname,)

  const [ticket, setTicket] = useState({
    uid: "",
    ticket_des: "",
    name: userold?.result.username,
    fname: userold?.result.fname,
   
  });


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentId(0);
  };

  useEffect(() => {
    if (ticketfind) {
      setTicket(ticketfind);
    } else {
      getAll();
    }
  }, [ticketfind]);

  const getAll = async () => {
    let response = await getTickets();
    setUsers(response.data);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteticketone = async (user) => {
    const { data } = deleteTicket(user).then(window.location.reload());
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {stableSort(users, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  return (
                    <>
                      <TableRow
                        hover
                        tabIndex={2}
                        key={user._id}
                        style={{
                          backgroundColor: user.Resolved
                            ? "#d9d9e8"
                            : "transparent",

                        
                          boxShadow: user.Resolved
                            ? "2px 0px 5px #000000 inset"
                            : "none",
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {user.fname}
                        </TableCell>

                        <TableCell align="right">{user.name}</TableCell>

                        <TableCell align="right">{user.ticket_des}</TableCell>
                        <TableCell align="right">
                          {user.createdAt}{" "}
                          <Typography>{moment(user.Date).fromNow()}</Typography>
                        </TableCell>

                        {user?.updatedAt ? (
                          <TableCell align="right">
                            {/* {user.updatedAt}  */}
                            <Typography>
                              {moment(user.updatedAt).fromNow()}
                            </Typography>
                          </TableCell>
                        ) : (
                          <TableCell align="right"></TableCell>
                        )}

                        {user?.DeletedAt ? (
                          <TableCell align="right">
                            <Typography>
                              {moment(user.DeletedAt).fromNow()}
                            </Typography>
                          </TableCell>
                        ) : (
                          <TableCell align="right"></TableCell>
                        )}

                        {emp?.result?._id === user?.creator? (
                          <>
                            <TableCell align="right">
                              <Button
                                variant="outlined"
                                color="primary"
                                disabled={user.Resolved}
                                className={classes.Update}
                                onClick={() => {
                                  setOpen(true);
                                  setCurrentId(user._id);
                                }}
                              >
                                Update
                              </Button>

                              <div>
                                <Dialog
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                                >
                                  <DialogTitle id="alert-dialog-title" color="#0288d1" fontWeight="bold" align="center" fontSize="30px">
                                    {"Update Ticket Here"}
                                  </DialogTitle>
                                  <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                      <TextField
                                        sx={{
                                          width: 500,
                                          maxWidth: "100%",
                                          marginTop: "30px",
                                        }}
                                        disabled
                                        value={ticket.fname}
                                        name="name"
                                        id="outlined-disabled"
                                        label=" USERNAME"
                                      />
                                      <br />
                                      <br />
                                      <TextField
                                        sx={{
                                          width: 500,
                                          maxWidth: "100%",
                                          marginTop: "30px",
                                        }}
                                        disabled
                                        value={ticket.name}
                                        name="fname"
                                        id="outlined-disabled"
                                        label=" NAME"
                                      />
                                      <br />
                                      <br />

                                      <TextField
                                        sx={{
                                          width: 500,
                                          maxWidth: "100%",
                                          marginTop: "30px",
                                        }}
                                        id="outlined-basic"
                                        label="Ticket Description"
                                        name="ticket_des"
                                        value={ticket.ticket_des}
                                        onChange={(e) =>
                                          setTicket({
                                            ...ticket,
                                            ticket_des: e.target.value,
                                          })
                                        }
                                      />
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      onClick={() => {
                                        updateTicket(user._id, ticket);
                                        setOpen(false);
                                        window.location.reload();
                                        
                                      }}
                                      className={classes.button}
                                    >
                                      Submit
                                    </Button>
                                    <Button
                                      onClick={handleClose}
                                      className={classes.close}
                                      autoFocus
                                    >
                                      Close
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </div>
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                disabled={user.Resolved}
                                className={classes.Delete}
                                variant="outlined"
                                color="secondary"
                                onClick={() => deleteticketone(user)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell align="right">
                              <Button
                                variant="outlined"
                                color="primary"
                                disabled={true}
                                className={classes.Update}
                              >
                                Update
                              </Button>
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                disabled={true}
                                className={classes.Delete}
                                variant="outlined"
                                color="secondary"
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </>
                        )}

                        {emptyRows > 0 && (
                          <TableRow
                            style={{
                              height: (dense ? 33 : 53) * emptyRows,
                            }}
                          >
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
