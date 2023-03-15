import { useState, useCallback, ChangeEvent } from "react";

type UserInputProps = [
  string,
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
];

const useInput = (initialValue: string): UserInputProps => {
  const [userForm, setUserForm] = useState(initialValue);
  const onChangeForm = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setUserForm(e.target.value);
    },
    []
  );

  return [userForm, onChangeForm];
};

export default useInput;
