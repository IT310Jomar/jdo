import { useState } from 'react';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/admin/students',
    },
];

export default function Students() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const columns = ['ID', 'Name', 'Email'];
    const data = [
        [1, "Alice", "alice@example.com"],
        [2, "Bob", "bob@example.com"],
        [3, "Charlie", "charlie@example.com"],
        [4, "David", "david@example.com"],
        [5, "Eve", "eve@example.com"],
        [6, "Frank", "frank@example.com"],
        [7, "Grace", "grace@example.com"],
        [8, "Hannah", "hannah@example.com"],
    ];
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
                        <Card className="w-full box-border border border-blue-100 shadow-sm mt-4">
                            <CardContent>
                                <Table columns={columns} data={data} />
                            </CardContent>
                        </Card>

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
