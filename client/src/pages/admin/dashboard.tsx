import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/admin/columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "wouter";

export default function AdminDashboard() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/posts"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>
      
      <DataTable columns={columns} data={posts || []} />
    </div>
  );
}
