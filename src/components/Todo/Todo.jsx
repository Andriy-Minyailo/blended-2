import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({ todo, number, deleteTodo, handleEditeTodo }) => {
  console.log(handleEditeTodo);
  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO #{number}
      </Text>
      <Text>{todo.text}</Text>
      <DeleteButton type="button" onClick={() => deleteTodo(todo.id)}>
        <RiDeleteBinLine size={24} />
      </DeleteButton>
      <EditButton type="button" onClick={() => handleEditeTodo(todo)}>
        <RiEdit2Line size={24} />
      </EditButton>
    </TodoWrapper>
  );
};
