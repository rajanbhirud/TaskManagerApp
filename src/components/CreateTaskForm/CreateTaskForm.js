import React from 'react';
import './create-task-form.css';

// material ui component imports
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

class CreateTaskForm extends React.Component {
  state={
    id:Math.random(),
    taskText:"",
    dueDate:new Date(),
    priority:"",
    status:"Pending",
    createdDate:new Date()
  };

  handleTaskTextChange=(event)=>{
    this.setState({taskText: event.target.value});
  };

  handleDateChange=(date) =>{
    this.setState({dueDate: date});
  };

  handlePriorityChange=(event)=>{
    this.setState({priority: event.target.value});
  };

  onCreate = () => {
    this.props.saveTask({...this.state});
    this.props.closeDialog();
  };



  render() {
    const {isCreateTaskFormOpen, closeDialog} = this.props;
    const {taskText, dueDate, priority} = this.state;

    return (
        <div className="home-container">
          <Dialog open={isCreateTaskFormOpen} onClose={closeDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create Task</DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                  <TextField
                      required
                      id="taskText"
                      name="taskText"
                      label="Task"
                      fullWidth
                      value={taskText}
                      onChange={this.handleTaskTextChange}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <InputLabel htmlFor="priority">Priority</InputLabel>
                  <Select
                      value={priority}
                      onChange={this.handlePriorityChange}
                      inputProps={{
                        name: 'priority',
                        id: 'priority',
                      }}
                      fullWidth
                  >
                    <MenuItem value={0}>P0</MenuItem>
                    <MenuItem value={1}>P1</MenuItem>
                    <MenuItem value={2}>P2</MenuItem>
                    <MenuItem value={3}>P3</MenuItem>
                  </Select>
                </Grid>


                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={12} sm={6}>
                  <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Date picker dialog"
                      format="MM/dd/yyyy"
                      value={dueDate}
                      onChange={this.handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="Time picker"
                      value={dueDate}
                      onChange={this.handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                  />
                </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={this.onCreate} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
  }
}

export default CreateTaskForm;
