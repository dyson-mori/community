import styled from "styled-components/native";

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#555',
  placeholder: 'Search'
})`
  margin-left: -25px;
  width: 90%;
  height: 35px;
  padding: 0 10px;
  font-size: 18px;
  color: #555;
  font-weight: 400;
  border-radius: 6px;
  background-color: #f1f1f1;
`;