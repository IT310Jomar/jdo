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

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Students',
    href: '/admin/students',
  },
];

interface Student {
  stud_fname: string;
  stud_mname?: string;
  stud_lname: string;
}

export default function Students() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentData, setStudentData] = useState<(string | number | JSX.Element)[][]>([]);

  const columns = ['No.', 'First Name', 'Middle Name', 'Last Name', 'Action'];

  const formatAndSet = (students: Student[]) => {
    const formatted = students.map((s, index) => [
      index + 1,
      s.stud_fname,
      s.stud_mname ?? '',
      s.stud_lname,
      <div className="flex gap-2 justify-center" key={index}>
        <a
          href="#"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          View
        </a>
        <a
          href="#"
          className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 font-medium rounded text-xs px-3 py-1.5 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800"
        >
          Edit
        </a>
      </div>
    ]);
    setStudentData(formatted);
  };

  useEffect(() => {
    const cached = localStorage.getItem('cached_students');
    const parsedCache: Student[] | null = cached ? JSON.parse(cached) : null;

    axios.get('/api/admin/fetch-students')
      .then((response) => {
        const fresh: Student[] = response.data.data;
        if (!parsedCache || parsedCache.length !== fresh.length) {
          formatAndSet(fresh);
          localStorage.setItem('cached_students', JSON.stringify(fresh));
        }else{
            formatAndSet(parsedCache); 
        }
      })
      .catch((error) => {
        console.error('Error fetching fresh students', error);
      });
  }, []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Students" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="text-xl font-semibold">Students List</div>
        <Card className="w-full box-border border border-blue-100 shadow-sm">
          <CardContent>
            <div className="flex justify-end">
              <Button type="button" className="mt-1" onClick={() => setIsModalOpen(true)}>
                Add Student
              </Button>
            </div>

            {studentData.length > 0 ? <Table columns={columns} data={studentData} /> : <Spinner/>}
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
