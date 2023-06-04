import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
    isEditing: false,
    currentTodo: {},
  };

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos) {
      this.setState({ todos: todos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { todos } = this.state;
    if (prevState.todos !== todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  requestSearch = value => {
    const todo = {
      id: nanoid(),
      text: value,
    };
    this.setState(prevState => ({ todos: [...prevState.todos, todo] }));
  };

  deleteTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  handleEditeTodo = todo => {
    console.log(todo);
    this.setState({ currentTodo: { ...todo }, isEditing: true });
  };

  render() {
    console.log(this.state.todos);
    const { todos, isEditing, currentTodo } = this.state;

    return (
      <>
        {isEditing ? (
          <EditForm currentTodo={currentTodo} />
        ) : (
          <SearchForm reqvestSearch={this.requestSearch} />
        )}
        <Grid>
          {todos.map((todo, index) => (
            <GridItem key={todo.id}>
              <Todo
                todo={todo}
                number={index + 1}
                deleteTodo={this.deleteTodo}
                handleEditeTodo={this.handleEditeTodo}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
