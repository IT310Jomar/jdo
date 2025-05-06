import AppLayout from '@/layouts/app-layout';
import toast from 'react-hot-toast';
import { useState, useEffect, JSX } from 'react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Table } from '@/components/ui/datatable';
import { Spinner } from '@/components/ui/spinner';
import { api } from '@/utils/api';
import { Plus } from 'lucide-react';
import { StepForward } from 'lucide-react';
import { SkipBack } from 'lucide-react';
import { View } from 'lucide-react';
import { SquarePen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LoaderCircle } from 'lucide-react';
import { Tooltip } from "@mui/material";


const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Students', href: '/admin/students' },
];

interface Student {
  id: number;
  stud_fname: string;
  stud_mname: string | null;
  stud_lname: string;
  email: string;
  stud_status: string;
}
type AddStudProp = {
  studFname: string,
  studMname: string | null,
  studLname: string,
  studEmail: string

}

type EditStudProp = {
  stud_id: number
  editStudFname: string,
  editStudMname: string | null,
  editStudLname: string,
  editStudEmail: string
}

export default function Students() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen,setEditModalOpen] = useState(false);
  const [studentData, setStudentData] = useState<(string | number | JSX.Element)[][]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [editFormData,setEditFormData] = useState<EditStudProp>({
    stud_id: 0,
    editStudFname: '',
    editStudMname: '',
    editStudLname: '',
    editStudEmail: '',
  });

  const [formData, setFormData] = useState<AddStudProp>({
    studFname: '',
    studMname: '',
    studLname: '',
    studEmail: ''
  });

  const columns = ['No.', 'First Name', 'Middle Name', 'Last Name', 'Email Address', 'Action'];

  const formatAndSet = (students: Student[]) => {
    const formatted = students.map((s, index) => [
      index + 1 + (page - 1) * 500,
      <span className="flex items-center gap-2" key={`name-${s.id}`}>
        <Badge variant={s.stud_status === 'active' ? 'success' : 'destructive'} />
        {s.stud_fname}
      </span>,
      s.stud_mname ?? '',
      s.stud_lname,
      s.email,
      <div className="flex gap-2 justify-center" key={s.id}>
        <Tooltip title="View Student" arrow placement="top-end">
          <a onClick={() => { console.log('test') }} className="text-white bg-blue-700 hover:bg-blue-800 text-xs px-3 py-1.5 rounded"><View size={16} /></a>
        </Tooltip>
        <Tooltip title="Edit Student" arrow placement="top-end">
          <a onClick={() => {
          setEditFormData({
            stud_id:s.id,
            editStudFname: s.stud_fname,
            editStudMname: s.stud_mname ?? '',
            editStudLname: s.stud_lname,
            editStudEmail: s.email,
          });
          setEditModalOpen(true);
    }} className="text-white bg-yellow-500 hover:bg-yellow-600 text-xs px-3 py-1.5 rounded"><SquarePen size={16} /></a>
        </Tooltip>
      </div>
    ]);
    setStudentData(formatted);


  };

  // for getting data from back-end
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
  // input change handler for form input (post)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  // input change handler for form input (update)
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const {id,value} = e.target;
    setEditFormData(data=>({
      ...data,
      [id]: value
    }));

  }


  // posting students data to database 
  const addStudents = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    try {
      await api.post('/api/admin/add-students', formData);
      toast.success('Student added successfully!');
      fetchStudents()
      setFormData({ studFname: '', studMname: '', studLname: '', studEmail: '' });
      setIsModalOpen(false)
    } catch (error: any) {
      if (error.response?.status === 422) {
        const data = error.response.data
        if (data.message?.toLowerCase().includes('already added')) {
          toast.error('That student is already in the system.')

        } else if (data.errors?.studFname?.[0]?.toLowerCase().includes('already added')) {
          toast.error('That student (first, middle & last name) is already added.')

        } else {
          const emailErr = data.errors?.studEmail?.[0] ?? ''
          if (emailErr.toLowerCase().includes('taken')) {
            toast.error('Email has already been taken');
          } else {
            toast.error('Validation failed. Please check the input fields.');
          }
        }
      } else {
        toast.error('Failed to add student');
      }
    } finally {
      setProcessing(false)
    }
  }

  //update Student Data
  const updateStudents = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    try{
      const response = await api.post('/api/admin/update-stundent',editFormData)
      console.log(response)
    }catch(e: any){
      console.error(e)
    }finally{
      setProcessing(false)
    }

  }

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
              <Tooltip title="Click to add a new student" arrow placement="top-end">
                <span>
                  <Button type="button" onClick={() => setIsModalOpen(true)}>
                    <Plus />Add Student
                  </Button>
                </span>
              </Tooltip>
              <div className="flex gap-2">
              <Tooltip title="Previous" arrow placement="top-end">
                <Button variant="outline" onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
                  <SkipBack />Previous
                </Button>
               </Tooltip>
               <Tooltip title="Next" arrow placement="top-end">
                <Button variant="outline" onClick={() => setPage(p => p + 1)} disabled={page >= lastPage}>
                  Next <StepForward />
                </Button>
                </Tooltip>
              </div>
            </div>
            {loading ? <Spinner /> : <Table columns={columns} data={studentData} />}
          </CardContent>
        </Card>
      </div>
       {/* add Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Student">
        <form className="space-y-4" onSubmit={addStudents}>
          <div>
            <Label htmlFor="studFname">First Name</Label>
            <Input id="studFname" type="text" required onChange={handleChange} value={formData.studFname.toLowerCase()} />
          </div>
          <div>
            <Label htmlFor="studMname">Middle Name</Label>
            <Input id="studMname" type="text" onChange={handleChange} value={formData.studMname ? formData.studMname.toLowerCase() : ''} />
          </div>
          <div>
            <Label htmlFor="studLname">Last Name</Label>
            <Input id="studLname" type="text" required onChange={handleChange} value={formData.studLname.toLowerCase()} />
          </div>
          <div>
            <Label htmlFor="studEmail">Email</Label>
            <Input id="studEmail" type="email" required onChange={handleChange} value={formData.studEmail} />
          </div>
          <Button type="submit" className="w-full" tabIndex={4} disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Save Student
          </Button>
        </form>
      </Modal>
      {/* end of add modal */}

      {/* edit modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Student">
        <form className="space-y-4" onSubmit={updateStudents}>
          <Input id="stud_id" readOnly  required onChange={handleEditChange} value={editFormData.stud_id} hidden/>
          <div>
            <Label htmlFor="studFname">First Name</Label>
            <Input id="editStudFname" type="text" required onChange={handleEditChange} value={editFormData.editStudFname.toLowerCase()} />
          </div>
          <div>
            <Label htmlFor="studMname">Middle Name</Label>
            <Input id="editStudMname" type="text" onChange={handleEditChange} value={editFormData.editStudMname ? editFormData.editStudMname.toLowerCase() : ''} />
          </div>
          <div>
            <Label htmlFor="studLname">Last Name</Label>
            <Input id="editStudLname" type="text" required onChange={handleEditChange} value={editFormData.editStudLname.toLowerCase()} />
          </div>
          <div>
            <Label htmlFor="studEmail">Email</Label>
            <Input id="editStudEmail" type="email" required onChange={handleEditChange} value={editFormData.editStudEmail} />
          </div>
          <Button type="submit" className="w-full" tabIndex={4} disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
             Update
          </Button>
        </form>
      </Modal>

      {/* end of edit modal */}
    </AppLayout>
  );
}
