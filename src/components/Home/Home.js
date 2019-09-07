import React from 'react';
import './home.css';
import moment from 'moment';
import CreateTaskForm from '../CreateTaskForm/CreateTaskForm';

import Button from '@material-ui/core/Button/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';


const SAMPLE_JSON =[
  {
    "id":"1",
    "taskText":"Order Groceries",
    "dueDate":"2019-09-08T03:30:00.000Z",
    "priority":1,
    "status":"Pending",
    "createdDate":"2019-09-07T07:50:53.633Z"
  }
];
const LOCALSTORAGE_KEY = 'taskStorage';


class Home extends React.Component {
  state={
    isCreateTaskFormOpen:false,
    taskStorage:[]
  };

  componentDidMount() {
    this.loadJson();
    //alert("Loading the tasks")
  }

  openCreateTaskForm = () => {
    this.setState({isCreateTaskFormOpen:true});
  };

  closeCreateTaskForm = () => {
    this.setState({isCreateTaskFormOpen:false});
  };

  saveTask = (task) => {
    this.setState({taskStorage:[...this.state.taskStorage,task]});
    this.saveJson();
  };

  deleteTask = () => {
  /*  this.setState({taskStorage:[...this.state.taskStorage].filter((item)=>(item.id!==id))});
    this.saveJson();*/
    alert("DELETE CLICKED")
  };

  loadJson = () => {
    const json = window.localStorage.getItem(LOCALSTORAGE_KEY) || JSON.stringify(SAMPLE_JSON, null, 2);
    this.setState({ taskStorage:JSON.parse(json)});
  };

  validateJson () {
    let validJson;
    try{
      validJson = JSON.stringify(this.state.taskStorage, null, 2)
    } catch(e) {
      throw e
    }
    return validJson
  }

  saveJson = () => {
    const validJson = this.validateJson(this.state.taskStorage);
    if (!validJson) return;
    window.localStorage.setItem(
        LOCALSTORAGE_KEY,
        validJson
    )
  };

  render() {
    console.log(this.state.taskStorage);
    return (
        <div className="home-container">
          <CreateTaskForm
              saveTask={this.saveTask}
              isCreateTaskFormOpen={this.state.isCreateTaskFormOpen}
              closeDialog={this.closeCreateTaskForm}
          />

          <Grid item xs={12}>
            <Typography variant="h6">
              Your Tasks
            </Typography>
            <div>
              <List>
                {
                  this.state.taskStorage.map((item, index)=>
                    (<ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText>
                        Title : {item.taskText} <br/>
                        Due Date : {moment(item.dueDate).format('MMM Do YY')} <br/>
                        Priority : {item.priority} <br/>
                        Status :  {item.status} <br/>
                        Created On : {moment(item.createdDate).format('MMM Do YY')}  <br/>
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon onClick={()=>this.deleteTask(item.id)}/>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>)
                  )
                }
              </List>
            </div>
          </Grid>

          <div style={{marginTop:"16px"}}>
            <Button variant="contained" color="primary" onClick={this.openCreateTaskForm}>
              Create a task
            </Button>
          </div>
        </div>
    );
  }
}

export default Home;
