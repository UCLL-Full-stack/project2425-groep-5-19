import createUser from "@services/UserService";
import { StatusMessage } from "../../types";
import { useRouter } from "next/router";
import { useState } from "react";
import UserService from "@services/UserService";

const UserSignup: React.FC = () => {
  const [userEmail, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const [userName, setName] = useState<string>(''); // Username
  const [nameError, setNameError] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const [firstName, setFirstName] = useState<string>(''); // New Field
  const [lastName, setLastName] = useState<string>(''); // New Field

  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  const router = useRouter();

  const validate = (): boolean => {
    setEmailError('');
    setPasswordError('');
    setNameError('');
    setStatusMessage(null);

    let errorBool = true;

    if (!userName || userName.trim() === '') {
      setNameError('User name is required');
      errorBool = false;
    }

    if (!userEmail || userEmail.trim() === '') {
      setEmailError('User email is required');
      errorBool = false;
    }

    if (!/\S+@\S+\.\S+/.test(userEmail)) {
      setEmailError('User email is invalid');
      errorBool = false;
    }

    if (!password || password.trim() === '') {
      setPasswordError('Password is required');
      errorBool = false;
    }

    return errorBool;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      const userInput = {
        username: userName,
        email: userEmail,
        password,
        firstName: firstName,
        lastName: lastName,
        role: "user",
      };

      const user = await UserService.createUser(userInput);

      setStatusMessage({ type: 'success', message: `User ${user.username} created successfully!` });

      sessionStorage.setItem("email", userEmail);
      router.push('/');
    } catch (error: any) {
      setStatusMessage({
        message: error.message || "An error occurred during signup.",
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="nameInput" className="block text-sm font-medium text-gray-600">
          Username:
        </label>
        <input
          id="nameInput"
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(event) => setName(event.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
        {nameError && <div className="text-red-500 mt-2">{nameError}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="emailInput" className="block text-sm font-medium text-gray-600">
          Email:
        </label>
        <input
          id="emailInput"
          type="text"
          placeholder="Email"
          value={userEmail}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
        {emailError && <div className="text-red-500 mt-2">{emailError}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="passwordInput" className="block text-sm font-medium text-gray-600">
          Password:
        </label>
        <input
          id="passwordInput"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
        {passwordError && <div className="text-red-500 mt-2">{passwordError}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="firstNameInput" className="block text-sm font-medium text-gray-600">
          First Name:
        </label>
        <input
          id="firstNameInput"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lastNameInput" className="block text-sm font-medium text-gray-600">
          Last Name:
        </label>
        <input
          id="lastNameInput"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Sign Up
      </button>

      {statusMessage && <div className={`mt-4 ${statusMessage.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
        {statusMessage.message}
      </div>}
    </form>
  );
};

export default UserSignup;

