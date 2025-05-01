// import AppLogoIcon from '@/components/app-logo-icon';
import JomarLogoIcon from '@/components/jdo-log';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { Card, CardContent } from '@/components/ui/card';


interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10" 
        style={{
            backgroundImage: `url('/assets/img/background.png')`,
            backgroundSize: 'cover',
            height: '300px',
          }}>

         <Card className="w-full max-w-sm box-border border border-blue-100 shadow-sm">
                <CardContent className="flex flex-col gap-8 pt-6">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                            <JomarLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white"/>
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-muted-foreground text-center text-sm">{description}</p>
                        </div>
                    </div>

                    {children}
                </CardContent>
            </Card>
         </div>
        
    );
}
