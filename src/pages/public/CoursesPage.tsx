import { useEffect, useState } from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { courseApi } from '@/services/api';
import { Course } from '@/types';
import { BookOpen } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseApi.getAll().then(setCourses).finally(() => setLoading(false));
  }, []);

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Our Courses</h1>
          <p className="text-muted-foreground">Discover the programs we offer</p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-40 rounded-lg" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {courses.map((course, i) => (
              <Card key={course._id} className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-2">
                    <BookOpen className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-base">{course.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default CoursesPage;
