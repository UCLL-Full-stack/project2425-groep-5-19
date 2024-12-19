import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import UserService from "@services/UserService";
import { StatusMessage } from "../../types";

const UserSignup: React.FC = () => {
  const { t } = useTranslation();

  const [userEmail, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const [userName, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  const router = useRouter();

  const validate = (): boolean => {
    setEmailError('');
    setPasswordError('');
    setNameError('');
    setStatusMessage(null);

    let errorBool = true;

    if (!userName || userName.trim() === '') {
      setNameError(t('signup.usernameError'));
      errorBool = false;
    }

    if (!userEmail || userEmail.trim() === '') {
      setEmailError(t('signup.emailError'));
      errorBool = false;
    }

    if (!/\S+@\S+\.\S+/.test(userEmail)) {
      setEmailError(t('signup.invalidEmailError'));
      errorBool = false;
    }

    if (!password || password.trim() === '') {
      setPasswordError(t('signup.passwordError'));
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

      setStatusMessage({ type: 'success', message: t('signup.successMessage', { username: user.username }) });

      sessionStorage.setItem("email", userEmail);
      router.push('/');
    } catch (error: any) {
      setStatusMessage({
        message: error.message || t('signup.errorMessage'),
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="nameInput" className="block text-sm font-medium text-gray-600">
          {t('signup.username')}:
        </label>
        <input
          id="nameInput"
          type="text"
          placeholder={t('signup.username')}
          value={userName}
          onChange={(event) => setName(event.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
        {nameError && <div className="text-red-500 mt-2">{nameError}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="emailInput" className="block text-sm font-medium text-gray-600">
          {t('signup.email')}:
        </label>
        <input
          id="emailInput"
          type="text"
          placeholder={t('signup.email')}
          value={userEmail}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
        {emailError && <div className="text-red-500 mt-2">{emailError}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="passwordInput" className="block text-sm font-medium text-gray-600">
          {t('signup.password')}:
        </label>
        <input
          id="passwordInput"
          type="password"
          placeholder={t('signup.password')}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
        {passwordError && <div className="text-red-500 mt-2">{passwordError}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="firstNameInput" className="block text-sm font-medium text-gray-600">
          {t('signup.firstName')}:
        </label>
        <input
          id="firstNameInput"
          type="text"
          placeholder={t('signup.firstName')}
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lastNameInput" className="block text-sm font-medium text-gray-600">
          {t('signup.lastName')}:
        </label>
        <input
          id="lastNameInput"
          type="text"
          placeholder={t('signup.lastName')}
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        {t('signup.submitButton')}
      </button>

      {statusMessage && <div className={`mt-4 ${statusMessage.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
        {statusMessage.message}
      </div>}
    </form>
  );
};

export default UserSignup;

