import { useState, useEffect, JSX } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Table } from '@/components/ui/datatable';
import axios from 'axios';
import { Spinner } from '@/components/ui/spinner';
import { api } from '@/utils/api';
import { Plus } from 'lucide-react';
import { StepForward } from 'lucide-react';
import { SkipBack } from 'lucide-react';
import { View } from 'lucide-react';
import { SquarePen } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Students', href: '/admin/students' },
];

interface Student {
  id: number;
  stud_fname: string;
  stud_mname: string | null;
  stud_lname: string;
}

export default function Students() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentData, setStudentData] = useState<(string | number | JSX.Element)[][]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const columns = ['No.', 'First Name', 'Middle Name', 'Last Name', 'Action'];

  const formatAndSet = (students: Student[]) => {
    const formatted = students.map((s, index) => [
      index + 1 + (page - 1) * 500, 
      s.stud_fname,
      s.stud_mname ?? '',
      s.stud_lname,
      <div className="flex gap-2 justify-center" key={s.id}>
        <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 text-xs px-3 py-1.5 rounded"><View size={16} /></a>
        <a href="#" className="text-white bg-yellow-500 hover:bg-yellow-600 text-xs px-3 py-1.5 rounded"><SquarePen size={16}/></a>
      </div>
    ]);
    setStudentData(formatted);
  };

  const fetchStudents = async (currentPage = 1) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/admin/fetch-students?page=${currentPage}&perPage=50`, {
        cache: { ttl: 1000 * 60 * 5 }
      });
      const resData = response.data.data;
      const fetched = response.data.data.data;
      formatAndSet(fetched);
      setLastPage(resData.last_page);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(page);
  }, [page]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Students" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="text-xl font-semibold">Students List</div>
        <Card className="w-full box-border border border-blue-100 shadow-sm">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Button type="button" onClick={() => setIsModalOpen(true)}>
              <Plus /> Add Student
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
                <SkipBack />Previous
                </Button>
                <Button variant="outline" onClick={() => setPage(p => p + 1)}   disabled={page >= lastPage}>
                   Next <StepForward />
                </Button>
              </div>
            </div>
            {loading ? <Spinner /> : <Table columns={columns} data={studentData} />}
          </CardContent>
        </Card>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Student">
        <form className="space-y-4">
          <div>
            <Label htmlFor="studentEmail">Email</Label>
            <Input id="studentEmail" type="email" required />
          </div>
          <div>
            <Label htmlFor="studentName">Name</Label>
            <Input id="studentName" type="text" required />
          </div>
          <Button type="submit" className="w-full">
            Save Student
          </Button>
        </form>
      </Modal>
    </AppLayout>
  );
}
