import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Table } from '@/components/ui/datatable';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/admin/students',
    },
];

export default function Students() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [studentData, setStudentData] = useState<any[]>([]);
    const columns = ['No.', 'First Name', 'Middle Name', 'Last Name', 'Action'];


    const students = () => {
        axios.get('/api/admin/fetch-students')
            .then((response) => {
                const stud = response.data.data
                const formatted = stud.map((s: any, index: number) => [
                    index + 1,
                    s.stud_fname,
                    s.stud_mname ?? '',
                    s.stud_lname,
                    <div className="flex gap-2 justify-center">
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
                    </div>,
                ]);

                setStudentData(formatted);
            }).catch((error) => {
                console.error(error);
            })
    }
    useEffect(() => {
        students();
    }, []);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="text-xl font-semibold">Students List</div>
                <Card className="w-full box-border border border-blue-100 shadow-sm">
                    <CardContent>
                        <div className="flex justify-end">
                            <Button type="submit" className="mt-1" onClick={() => setIsModalOpen(true)}>
                                Add Student
                            </Button>
                        </div>
                        <Table columns={columns} data={studentData} />

                    </CardContent>
                </Card>
            </div>

            {/* ✅ Modal rendered conditionally */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Student">
                <form className="space-y-4">
                    <div>
                        <Label htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="firstname"
                            type="text"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="name">
                            Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">Save Student</Button>
                </form>
            </Modal>
        </AppLayout>

    );
}
