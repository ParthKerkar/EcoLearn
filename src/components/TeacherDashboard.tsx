import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  UserCheck, 
  BarChart3, 
  FileText, 
  CheckCircle, 
  X, 
  Leaf,
  Users,
  Trophy,
  Camera,
  Star,
  Download
} from "lucide-react";

interface TeacherDashboardProps {
  onLogout: () => void;
}

const TeacherDashboard = ({ onLogout }: TeacherDashboardProps) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'results' | 'submissions' | 'reports'>('overview');

  // Sample data
  const studentResults = [
    { id: 1, name: "Alex Green", lesson: "Climate Change Basics", score: 95, date: "2024-01-15", status: "completed" },
    { id: 2, name: "Maya Earth", lesson: "Renewable Energy", score: 88, date: "2024-01-14", status: "completed" },
    { id: 3, name: "Sam Forest", lesson: "Ocean Conservation", score: 76, date: "2024-01-13", status: "completed" },
    { id: 4, name: "Luna Sky", lesson: "Sustainable Living", score: 92, date: "2024-01-12", status: "completed" },
  ];

  const submissions = [
    { 
      id: 1, 
      student: "Alex Green", 
      challenge: "Recycling Project", 
      submitted: "2024-01-15", 
      status: "pending",
      description: "Created a compost bin from recycled materials"
    },
    { 
      id: 2, 
      student: "Maya Earth", 
      challenge: "Garden Project", 
      submitted: "2024-01-14", 
      status: "approved",
      description: "Started a small herb garden on balcony"
    },
    { 
      id: 3, 
      student: "Sam Forest", 
      challenge: "Eco Transportation", 
      submitted: "2024-01-13", 
      status: "rejected",
      description: "Used bike for school commute this week"
    },
  ];

  const classOverview = [
    { metric: "Total Students", value: "24", icon: Users, color: "text-primary" },
    { metric: "Average Score", value: "87%", icon: Trophy, color: "text-success" },
    { metric: "Pending Reviews", value: "6", icon: Camera, color: "text-warning" },
    { metric: "Completed Lessons", value: "156", icon: CheckCircle, color: "text-success" },
  ];

  const handleApproval = (submissionId: number, action: 'approve' | 'reject') => {
    // Handle approval/rejection logic here
    console.log(`${action} submission ${submissionId}`);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Class Overview</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {classOverview.map((item, index) => (
                  <Card key={index} className="shadow-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{item.metric}</p>
                          <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                        </div>
                        <item.icon className={`w-8 h-8 ${item.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-primary">Recent Student Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentResults.slice(0, 3).map((result) => (
                      <div key={result.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-semibold text-primary">{result.name}</p>
                          <p className="text-sm text-muted-foreground">{result.lesson}</p>
                        </div>
                        <Badge variant={result.score >= 80 ? "default" : "secondary"} className="bg-success text-success-foreground">
                          {result.score}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-primary">Pending Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {submissions.filter(s => s.status === 'pending').map((submission) => (
                      <div key={submission.id} className="p-3 bg-accent/10 rounded-lg border-l-4 border-warning">
                        <p className="font-semibold text-primary">{submission.student}</p>
                        <p className="text-sm text-muted-foreground">{submission.challenge}</p>
                        <p className="text-xs text-muted-foreground mt-1">Submitted: {submission.submitted}</p>
                      </div>
                    ))}
                    {submissions.filter(s => s.status === 'pending').length === 0 && (
                      <p className="text-muted-foreground text-center py-4">No pending submissions</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">Class Performance Chart</CardTitle>
                <CardDescription>Student progress visualization would be displayed here</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-muted-foreground mb-4 mx-auto" />
                    <p className="text-muted-foreground">Interactive charts and analytics</p>
                    <p className="text-sm text-muted-foreground">Performance tracking visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'results':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Student Quiz Results</h2>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">Recent Quiz Scores</CardTitle>
                <CardDescription>Monitor student performance across lessons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentResults.map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-primary">{result.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-primary">{result.name}</p>
                            <p className="text-sm text-muted-foreground">{result.lesson}</p>
                            <p className="text-xs text-muted-foreground">{result.date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          result.score >= 90 ? 'bg-success/20 text-success' :
                          result.score >= 70 ? 'bg-warning/20 text-warning' :
                          'bg-destructive/20 text-destructive'
                        }`}>
                          <span className="font-bold">{result.score}%</span>
                        </div>
                        <Badge variant={result.score >= 80 ? "default" : "secondary"} className="bg-success text-success-foreground">
                          {result.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'submissions':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Eco-Challenge Submissions</h2>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">Review Student Submissions</CardTitle>
                <CardDescription>Approve or reject student eco-challenge photos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                              <Camera className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-primary">{submission.student}</p>
                              <p className="text-sm text-muted-foreground">{submission.challenge}</p>
                            </div>
                            <Badge 
                              variant={
                                submission.status === 'approved' ? 'default' :
                                submission.status === 'rejected' ? 'destructive' :
                                'secondary'
                              }
                              className={
                                submission.status === 'approved' ? 'bg-success text-success-foreground' :
                                submission.status === 'pending' ? 'bg-warning text-warning-foreground' :
                                ''
                              }
                            >
                              {submission.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{submission.description}</p>
                          <p className="text-xs text-muted-foreground">Submitted: {submission.submitted}</p>
                          
                          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-2">Uploaded Image:</p>
                            <div className="w-32 h-24 bg-accent/20 rounded border-2 border-dashed border-accent flex items-center justify-center">
                              <Camera className="w-6 h-6 text-accent" />
                            </div>
                          </div>
                        </div>
                        
                        {submission.status === 'pending' && (
                          <div className="flex space-x-2 ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-success border-success hover:bg-success hover:text-success-foreground"
                              onClick={() => handleApproval(submission.id, 'approve')}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                              onClick={() => handleApproval(submission.id, 'reject')}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Progress Reports</h2>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">Generate Class Reports</CardTitle>
                <CardDescription>Download comprehensive progress and performance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button className="h-20 bg-nature-gradient hover:opacity-90 flex flex-col items-center justify-center">
                      <Download className="w-6 h-6 mb-2" />
                      <span>Download Student Progress Report</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-primary text-primary hover:bg-primary/10">
                      <BarChart3 className="w-6 h-6 mb-2" />
                      <span>Class Performance Summary</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">Class Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-primary">Student</th>
                        <th className="text-left py-3 px-4 font-semibold text-primary">Lessons Completed</th>
                        <th className="text-left py-3 px-4 font-semibold text-primary">Average Score</th>
                        <th className="text-left py-3 px-4 font-semibold text-primary">Eco Points</th>
                        <th className="text-left py-3 px-4 font-semibold text-primary">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Alex Green", lessons: "12/12", score: "92%", points: 1250, status: "Excellent" },
                        { name: "Maya Earth", lessons: "11/12", score: "88%", points: 1100, status: "Good" },
                        { name: "Sam Forest", lessons: "10/12", score: "76%", points: 650, status: "Improving" },
                        { name: "Luna Sky", lessons: "8/12", score: "84%", points: 500, status: "Good" },
                      ].map((student, index) => (
                        <tr key={index} className="border-b border-border hover:bg-muted/30">
                          <td className="py-3 px-4 text-primary font-medium">{student.name}</td>
                          <td className="py-3 px-4 text-muted-foreground">{student.lessons}</td>
                          <td className="py-3 px-4">
                            <span className={`font-semibold ${
                              parseInt(student.score) >= 90 ? 'text-success' :
                              parseInt(student.score) >= 70 ? 'text-warning' :
                              'text-destructive'
                            }`}>
                              {student.score}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-warning mr-1" />
                              <span className="font-semibold text-success">{student.points}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge 
                              variant={
                                student.status === 'Excellent' ? 'default' :
                                student.status === 'Good' ? 'secondary' :
                                'outline'
                              }
                              className={student.status === 'Excellent' ? 'bg-success text-success-foreground' : ''}
                            >
                              {student.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
              <h1 className="text-xl font-bold text-primary">EcoLearn Teacher</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-bold text-primary">24</span>
                <span className="text-sm text-muted-foreground">students</span>
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
                <CardTitle className="text-primary">Teacher Dashboard</CardTitle>
                <CardDescription>Manage your class and monitor progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { id: 'overview', icon: BarChart3, label: 'Overview' },
                  { id: 'results', icon: Trophy, label: 'Quiz Results' },
                  { id: 'submissions', icon: Camera, label: 'Submissions' },
                  { id: 'reports', icon: FileText, label: 'Reports' },
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

export default TeacherDashboard;