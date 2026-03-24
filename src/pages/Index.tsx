import { useState } from "react";
import LoginPage from "@/components/LoginPage";
import StudentDashboard from "@/components/StudentDashboard";
import TeacherDashboard from "@/components/TeacherDashboard";

type UserState = {
  isLoggedIn: boolean;
  role: 'student' | 'teacher' | null;
};

const Index = () => {
  const [userState, setUserState] = useState<UserState>({
    isLoggedIn: false,
    role: null,
  });

  const handleLogin = (role: 'student' | 'teacher') => {
    setUserState({
      isLoggedIn: true,
      role,
    });
  };

  const handleLogout = () => {
    setUserState({
      isLoggedIn: false,
      role: null,
    });
  };

  if (!userState.isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (userState.role === 'student') {
    return <StudentDashboard onLogout={handleLogout} />;
  }

  if (userState.role === 'teacher') {
    return <TeacherDashboard onLogout={handleLogout} />;
  }

  return null;
};

export default Index;
