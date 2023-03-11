import { useState, useCallback, ChangeEvent } from "react";

type UserInputProps = [string, (e: ChangeEvent<HTMLInputElement>) => void];

const useInput = (initialValue: string): UserInputProps => {
  const [userForm, setUserForm] = useState(initialValue);
  const onChangeForm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserForm(e.target.value);
  }, []);

  return [userForm, onChangeForm];
};

export default useInput;
