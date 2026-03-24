import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Trophy, 
  Upload, 
  BookOpen, 
  Leaf, 
  Home,
  Sun,
  Users,
  Camera,
  CheckCircle,
  Star
} from "lucide-react";

interface StudentDashboardProps {
  onLogout: () => void;
}

const StudentDashboard = ({ onLogout }: StudentDashboardProps) => {
  const [activeSection, setActiveSection] = useState<'lessons' | 'quizzes' | 'challenges' | 'village' | 'leaderboard'>('lessons');
  const [ecoPoints] = useState(750);
  const [completedLessons] = useState(8);
  const [totalLessons] = useState(12);

  // Sample data
  const badges = [
    { name: "Eco Warrior", icon: "🌿", earned: true },
    { name: "Quiz Master", icon: "🧠", earned: true },
    { name: "Nature Photographer", icon: "📸", earned: false },
    { name: "Green Guardian", icon: "🛡️", earned: false },
  ];

  const lessons = [
    { id: 1, title: "Introduction to Climate Change", duration: "15 min", completed: true },
    { id: 2, title: "Renewable Energy Sources", duration: "20 min", completed: true },
    { id: 3, title: "Ocean Conservation", duration: "18 min", completed: false },
    { id: 4, title: "Sustainable Living", duration: "22 min", completed: false },
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Green", points: 1250, avatar: "🌟" },
    { rank: 2, name: "Maya Earth", points: 1100, avatar: "🌍" },
    { rank: 3, name: "You", points: 750, avatar: "🌱" },
    { rank: 4, name: "Sam Forest", points: 650, avatar: "🌲" },
    { rank: 5, name: "Luna Sky", points: 500, avatar: "☁️" },
  ];

  const getVillageStage = (points: number) => {
    if (points >= 1000) return { icon: "☀️", name: "Solar Village", description: "Your village now runs on clean solar energy!" };
    if (points >= 500) return { icon: "🏡", name: "Eco Huts", description: "Sustainable homes are taking shape!" };
    if (points >= 100) return { icon: "🌳", name: "Growing Forest", description: "Trees are starting to grow!" };
    return { icon: "🌱", name: "Seedling Stage", description: "Your environmental journey begins here!" };
  };

  const villageStage = getVillageStage(ecoPoints);

  const renderContent = () => {
    switch (activeSection) {
      case 'lessons':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Animated Lessons</h2>
              <div className="grid gap-4">
                {lessons.map((lesson) => (
                  <Card key={lesson.id} className="shadow-card hover:shadow-nature transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                            {lesson.completed ? 
                              <CheckCircle className="w-6 h-6 text-success" /> : 
                              <Play className="w-6 h-6 text-primary" />
                            }
                          </div>
                          <div>
                            <h3 className="font-semibold text-primary">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                          </div>
                        </div>
                        <Button 
                          variant={lesson.completed ? "secondary" : "default"}
                          className={!lesson.completed ? "bg-nature-gradient hover:opacity-90" : ""}
                        >
                          {lesson.completed ? "Review" : "Start"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">Sample Lesson Video</CardTitle>
                <CardDescription>Interactive environmental learning content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-muted-foreground mb-4 mx-auto" />
                    <p className="text-muted-foreground">Video player would be embedded here</p>
                    <p className="text-sm text-muted-foreground mt-2">MP4 video integration ready</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'quizzes':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Environmental Quizzes</h2>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">Climate Change Quiz</CardTitle>
                <CardDescription>Test your knowledge about global climate patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold">What is the primary cause of current climate change?</h3>
                  <div className="space-y-2">
                    {[
                      "Natural climate cycles",
                      "Human activities and greenhouse gas emissions",
                      "Solar radiation changes",
                      "Volcanic activity"
                    ].map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start text-left h-auto p-3 hover:border-success hover:bg-accent/10"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  <Button className="w-full bg-nature-gradient hover:opacity-90 mt-4">
                    Submit Answer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'challenges':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Real-life Eco-Challenges</h2>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Photo Upload Challenge
                </CardTitle>
                <CardDescription>Share your environmental action photos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Upload Your Eco-Action Photo</h3>
                  <p className="text-muted-foreground mb-4">
                    Show us your recycling project, garden, or environmental activity!
                  </p>
                  <Button className="bg-nature-gradient hover:opacity-90">
                    Choose Photo
                  </Button>
                </div>
                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold text-primary">Current Challenge Ideas:</h4>
                  <div className="grid gap-2">
                    <div className="flex items-center p-3 bg-accent/10 rounded-lg">
                      <span className="text-2xl mr-3">♻️</span>
                      <span>Create a recycling project</span>
                    </div>
                    <div className="flex items-center p-3 bg-accent/10 rounded-lg">
                      <span className="text-2xl mr-3">🌱</span>
                      <span>Start a small garden</span>
                    </div>
                    <div className="flex items-center p-3 bg-accent/10 rounded-lg">
                      <span className="text-2xl mr-3">🚶</span>
                      <span>Use eco-friendly transportation</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'village':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Growth Village</h2>
            <Card className="shadow-nature">
              <CardHeader>
                <CardTitle className="text-primary flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  Your Environmental Village
                </CardTitle>
                <CardDescription>Watch your village grow as you earn eco-points!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-8xl mb-4">{villageStage.icon}</div>
                  <h3 className="text-2xl font-bold text-primary mb-2">{villageStage.name}</h3>
                  <p className="text-muted-foreground">{villageStage.description}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progress to next stage</span>
                    <span>{ecoPoints} / 1000 points</span>
                  </div>
                  <Progress value={(ecoPoints % 1000) / 10} className="h-3" />
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-accent/10 rounded-lg">
                      <div className="text-2xl mb-2">🌱</div>
                      <p className="text-sm font-semibold">100 pts</p>
                      <p className="text-xs text-muted-foreground">Trees</p>
                    </div>
                    <div className="text-center p-4 bg-accent/10 rounded-lg">
                      <div className="text-2xl mb-2">🏡</div>
                      <p className="text-sm font-semibold">500 pts</p>
                      <p className="text-xs text-muted-foreground">Eco Huts</p>
                    </div>
                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <div className="text-2xl mb-2">☀️</div>
                      <p className="text-sm font-semibold">1000 pts</p>
                      <p className="text-xs text-muted-foreground">Solar Power</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-2">🌈</div>
                      <p className="text-sm font-semibold">2000 pts</p>
                      <p className="text-xs text-muted-foreground">Eco Paradise</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'leaderboard':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Class Leaderboard</h2>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Top Environmental Champions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((student, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                        student.name === 'You' 
                          ? 'bg-accent/20 border-2 border-accent' 
                          : 'bg-muted/50 hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          index === 0 ? 'bg-warning text-warning-foreground' :
                          index === 1 ? 'bg-muted-foreground/20 text-foreground' :
                          index === 2 ? 'bg-success/20 text-success' :
                          'bg-muted'
                        }`}>
                          {student.rank}
                        </div>
                        <span className="text-2xl">{student.avatar}</span>
                        <span className="font-semibold text-primary">{student.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-warning" />
                        <span className="font-bold text-success">{student.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Leaf className="w-8 h-8 text-success mr-3" />
              <h1 className="text-xl font-bold text-primary">EcoLearn Student</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-warning" />
                <span className="font-bold text-success">{ecoPoints}</span>
                <span className="text-sm text-muted-foreground">points</span>
              </div>
              <Button variant="outline" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">Dashboard</CardTitle>
                <CardDescription>Progress: {completedLessons}/{totalLessons} lessons</CardDescription>
                <Progress value={(completedLessons / totalLessons) * 100} className="mt-2" />
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { id: 'lessons', icon: BookOpen, label: 'Lessons' },
                  { id: 'quizzes', icon: Trophy, label: 'Quizzes' },
                  { id: 'challenges', icon: Camera, label: 'Challenges' },
                  { id: 'village', icon: Home, label: 'Village' },
                  { id: 'leaderboard', icon: Users, label: 'Leaderboard' },
                ].map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeSection === item.id ? 'bg-nature-gradient text-white' : ''
                    }`}
                    onClick={() => setActiveSection(item.id as any)}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Badges */}
            <Card className="mt-6 shadow-card">
              <CardHeader>
                <CardTitle className="text-primary text-lg">Your Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`text-center p-3 rounded-lg transition-all ${
                        badge.earned 
                          ? 'bg-success/10 border-2 border-success/30' 
                          : 'bg-muted/30 border-2 border-muted opacity-50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <p className="text-xs font-semibold text-primary">{badge.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;