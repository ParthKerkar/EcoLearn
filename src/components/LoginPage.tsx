import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, GraduationCap, UserCheck } from "lucide-react";

interface LoginPageProps {
  onLogin: (role: 'student' | 'teacher') => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole && email && password) {
      onLogin(selectedRole);
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-growth-gradient flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Leaf className="w-12 h-12 text-success mr-3" />
              <h1 className="text-4xl font-bold text-primary">EcoLearn Platform</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Gamified Environmental Learning for a Sustainable Future
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card 
              className="cursor-pointer transition-all duration-300 hover:shadow-nature hover:scale-105 border-2 hover:border-success"
              onClick={() => setSelectedRole('student')}
            >
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-success" />
                </div>
                <CardTitle className="text-2xl text-primary">Student Login</CardTitle>
                <CardDescription className="text-base">
                  Learn, explore, and earn eco-points through interactive lessons and challenges
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center justify-center space-x-6 text-muted-foreground">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">🏆</div>
                    <p className="text-sm">Earn Badges</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">🌱</div>
                    <p className="text-sm">Take Quizzes</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">🏡</div>
                    <p className="text-sm">Grow Village</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer transition-all duration-300 hover:shadow-nature hover:scale-105 border-2 hover:border-primary"
              onClick={() => setSelectedRole('teacher')}
            >
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl text-primary">Teacher Login</CardTitle>
                <CardDescription className="text-base">
                  Monitor student progress, review submissions, and generate comprehensive reports
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center justify-center space-x-6 text-muted-foreground">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">📊</div>
                    <p className="text-sm">View Reports</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">✅</div>
                    <p className="text-sm">Review Work</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">📈</div>
                    <p className="text-sm">Track Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-growth-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-nature">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="w-8 h-8 text-success mr-2" />
            <CardTitle className="text-2xl text-primary">
              {selectedRole === 'student' ? 'Student' : 'Teacher'} Login
            </CardTitle>
          </div>
          <CardDescription>
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedRole(null)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-nature-gradient hover:opacity-90 transition-opacity"
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;