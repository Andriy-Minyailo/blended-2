import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Todo } from 'components';

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
    this.setState({ currentTodo: { ...todo }, isEditing: true });
  };

  handleCancel = () => {
    this.setState({ currentTodo: {}, isEditing: false });
  };

  handleInputEditChange = event => {
    const inputValue = event.currentTarget.value;
    this.setState({
      currentTodo: { id: this.state.currentTodo.id, text: inputValue },
    });
  };

  // handleAddUpdatedTodo = (id, updatedTodo) => {};

  // handleEditFormUpdate = e => {
  //   const currentTodo = this.state.currentTodo;
  //   const todos = this.state.todos;

  //   const newTodos = todos.map(todo =>
  //     if (todo.id === currentTodo.id) {
  //       todo.text = currentTodo.text;
  //     }
  //   );
  // };

  render() {
    console.log(this.state);
    const { todos, isEditing, currentTodo } = this.state;

    return (
      <>
        {isEditing ? (
          <EditForm
            currentTodo={currentTodo}
            onCancel={this.handleCancel}
            onChange={this.handleInputEditChange}
            onUpdate={this.handleEditFormUpdate}
          />
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
