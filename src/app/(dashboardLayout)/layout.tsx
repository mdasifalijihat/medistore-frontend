// app/(dashboardLayout)/layout.tsx
import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { userService } from "@/service/user.service";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function DashboardPage({
  admin,
  seller,
}: {
  admin: React.ReactNode;
  seller: React.ReactNode;
}) {
  const { data } = await userService.getSession();

  // unified user object
  const user = data?.user;
  console.log("SESSION DATA:", data);

  console.log("UNIFIED USER:", user);

  // DENY ACCESS if not admin or seller
  if (!user || (user.role !== Roles.admin && user.role !== Roles.seller)) {
    return (
      <div className="p-8 text-center text-red-600 font-bold">
        ❌ Access Denied: You are not authorized to view this page.
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar seller={user} /> {/* now user always exists */}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Medi-Store
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {user.role === Roles.admin ? admin : seller}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
