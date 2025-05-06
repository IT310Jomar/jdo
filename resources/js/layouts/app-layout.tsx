import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface AppLayoutProps {
    
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
         <Toaster
            position="bottom-right"
            toastOptions={{
            success: {
                style: {
                background: '#22c55e', 
                color: '#fff',
                },
                iconTheme: {
                    primary: '#fff',      
                    secondary: '#22c55e', 
                  },
            },
            error: {
                style: {
                background: '#ef4444', 
                color: '#fff',
                },
                iconTheme: {
                    primary: '#fff',     
                    secondary: '#ef4444',  
                  },
            },
        
            }}
            />
        {children}
    </AppLayoutTemplate>
);
