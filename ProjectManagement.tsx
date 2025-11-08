import { Users, Building2, FileCheck, MessageSquare } from "lucide-react";
import strategyDocs from "@/assets/strategy-docs.jpg";

const ProjectManagement = () => {
  return (
    <section 
      id="project-management" 
      className="py-24 bg-background relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${strategyDocs})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="gradient-text">Project Management</span>
            <span className="text-enc-text-primary"> & Governance</span>
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            ENCI manages projects under the PMP framework, ensuring they are delivered on time, within budget, and without compromising safety or code. Our stakeholder management spans:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-lg p-8 group hover:scale-[1.02] transition-all duration-500 hover:shadow-glow hover:bg-gradient-to-br hover:from-enc-orange/5 hover:to-enc-yellow/5">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-enc-orange to-enc-yellow p-3 rounded-lg flex-shrink-0">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:gradient-text-alt transition-all">
                    Trades Level
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Coordinating skilled professionals to ensure seamless sequencing and quality assurance.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 group hover:scale-[1.02] transition-all duration-500 hover:shadow-glow hover:bg-gradient-to-br hover:from-enc-orange/5 hover:to-enc-yellow/5">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-enc-orange to-enc-yellow p-3 rounded-lg flex-shrink-0">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:gradient-text-alt transition-all">
                    Vendor Level
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Managing suppliers to secure timely materials and avoid budget overruns.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 group hover:scale-[1.02] transition-all duration-500 hover:shadow-glow hover:bg-gradient-to-br hover:from-enc-orange/5 hover:to-enc-yellow/5">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-enc-orange to-enc-yellow p-3 rounded-lg flex-shrink-0">
                  <FileCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:gradient-text-alt transition-all">
                    Compliance Level
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Continuous adherence to municipal bylaws, Alberta Building Code, OHS, and lender requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 group hover:scale-[1.02] transition-all duration-500 hover:shadow-glow hover:bg-gradient-to-br hover:from-enc-orange/5 hover:to-enc-yellow/5">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-enc-orange to-enc-yellow p-3 rounded-lg flex-shrink-0">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:gradient-text-alt transition-all">
                    Client Level
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Transparent communication, milestone approvals, and documented trust conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-lg text-center text-muted-foreground mt-12 leading-relaxed max-w-3xl mx-auto">
            Every build is monitored through MS Project, Gantt charts, and Procore, giving clients and lenders visibility into real-time progress. This multi-tiered approach ensures projects are delivered on time, within budget, and to the highest standards of quality while protecting profitability for the company and satisfaction for the client.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectManagement;
