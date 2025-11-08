import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Project {
  id: string;
  project_name: string;
  project_address: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  realtor_name: string;
  realtor_email: string;
  closed_price: number;
  project_start_date: string;
  project_finish_date: string;
  warranty_start_date: string;
  warranty_end_date: string;
  wcb_policy: string;
  insurance_policy: string;
  status: string;
}

const Transactions = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/management-login");
      } else {
        fetchProjects();
      }
    };

    checkAuth();
  }, [navigate]);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      archived: "bg-gray-100 text-gray-800",
    };
    return colors[status as keyof typeof colors] || colors.archived;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Transactions / Current Projects</h1>
          <p className="text-muted-foreground">View all project transactions and details</p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading transactions...</div>
        ) : projects.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No transactions found
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{project.project_name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{project.project_address}</p>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-semibold text-sm mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        Buyer Information
                      </h3>
                      <dl className="space-y-1 text-sm">
                        <div><dt className="text-muted-foreground inline">Name:</dt> <dd className="inline ml-2">{project.buyer_name || 'N/A'}</dd></div>
                        <div><dt className="text-muted-foreground inline">Email:</dt> <dd className="inline ml-2">{project.buyer_email || 'N/A'}</dd></div>
                        <div><dt className="text-muted-foreground inline">Phone:</dt> <dd className="inline ml-2">{project.buyer_phone || 'N/A'}</dd></div>
                      </dl>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        Realtor Information
                      </h3>
                      <dl className="space-y-1 text-sm">
                        <div><dt className="text-muted-foreground inline">Name:</dt> <dd className="inline ml-2">{project.realtor_name || 'N/A'}</dd></div>
                        <div><dt className="text-muted-foreground inline">Email:</dt> <dd className="inline ml-2">{project.realtor_email || 'N/A'}</dd></div>
                        <div><dt className="text-muted-foreground inline">Closed Price:</dt> <dd className="inline ml-2 font-semibold">CA${project.closed_price?.toLocaleString() || 'N/A'}</dd></div>
                      </dl>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        Project Timeline
                      </h3>
                      <dl className="space-y-1 text-sm">
                        <div><dt className="text-muted-foreground inline">Start:</dt> <dd className="inline ml-2">{project.project_start_date ? format(new Date(project.project_start_date), 'MMM dd, yyyy') : 'N/A'}</dd></div>
                        <div><dt className="text-muted-foreground inline">Finish:</dt> <dd className="inline ml-2">{project.project_finish_date ? format(new Date(project.project_finish_date), 'MMM dd, yyyy') : 'N/A'}</dd></div>
                      </dl>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        Warranty Information
                      </h3>
                      <dl className="space-y-1 text-sm">
                        <div><dt className="text-muted-foreground inline">Start:</dt> <dd className="inline ml-2">{project.warranty_start_date ? format(new Date(project.warranty_start_date), 'MMM dd, yyyy') : 'N/A'}</dd></div>
                        <div><dt className="text-muted-foreground inline">End:</dt> <dd className="inline ml-2">{project.warranty_end_date ? format(new Date(project.warranty_end_date), 'MMM dd, yyyy') : 'N/A'}</dd></div>
                      </dl>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        Insurance & WCB
                      </h3>
                      <dl className="space-y-1 text-sm">
                        <div><dt className="text-muted-foreground inline">WCB:</dt> <dd className="inline ml-2">{project.wcb_policy || 'N/A'}</dd></div>
                        <div><dt className="text-muted-foreground inline">Insurance:</dt> <dd className="inline ml-2">{project.insurance_policy || 'N/A'}</dd></div>
                      </dl>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
