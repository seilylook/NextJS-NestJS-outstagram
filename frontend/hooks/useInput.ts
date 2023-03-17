import {
  useState,
  useCallback,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

type UserInputProps = [
  string,
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  Dispatch<SetStateAction<string>>
];

const useInput = (initialValue: string): UserInputProps => {
  const [userForm, setUserForm] = useState(initialValue);
  const onChangeForm = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setUserForm(e.currentTarget.value);
    },
    []
  );

  return [userForm, onChangeForm, setUserForm];
};

export default useInput;
