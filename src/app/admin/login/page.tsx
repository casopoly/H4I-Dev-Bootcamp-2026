import Navbar from "@/components/Navbar";
import AdminLoginForm from "@/components/AdminLoginForm";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

// Only go back to an admin page. Anything else (like another site) falls back to the admin list
function safeNext(next: string | undefined): string {
  return next && (next === "/admin" || next.startsWith("/admin/")) ? next : "/admin";
}

export default function AdminLoginPage({ searchParams }: { searchParams: { next?: string } }) {
  return (
    <main>
      <Navbar />
      <Container className="pb-12">
        <PageHeader title="Admin login" subtitle="Enter the admin password to continue" />
        <AdminLoginForm next={safeNext(searchParams.next)} />
      </Container>
    </main>
  );
}
