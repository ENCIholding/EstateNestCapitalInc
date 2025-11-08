import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Minus, Printer, Send, Save, Download } from "lucide-react";
import { InvoiceSendDialog, EmailData } from "@/components/invoices/InvoiceSendDialog";

const Invoices = () => {
  const navigate = useNavigate();
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [invoice, setInvoice] = useState({
    invoice_number: `INV-${Date.now()}`,
    invoice_date: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    terms: "Net 14",
    client_name: "",
    client_company: "",
    client_address: "",
    client_email: "",
    client_phone: "",
    notes: "",
  });

  const [lineItems, setLineItems] = useState([
    { description: "", quantity: 1, unit_price: 0 }
  ]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/management-login");
      }
    };

    checkAuth();
  }, [navigate]);

  const addLineItem = () => {
    setLineItems([...lineItems, { description: "", quantity: 1, unit_price: 0 }]);
  };

  const removeLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const updateLineItem = (index: number, field: string, value: any) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    setLineItems(updated);
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  };

  const calculateGST = () => {
    return calculateSubtotal() * 0.05;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST();
  };

  const handleSaveInvoice = async () => {
    if (!invoice.client_name) {
      toast.error("Client name is required");
      return;
    }

    const subtotal = calculateSubtotal();
    const gst = calculateGST();
    const total = calculateTotal();

    const { data: invoiceData, error: invoiceError } = await supabase
      .from("invoices")
      .insert({
        ...invoice,
        subtotal,
        gst_amount: gst,
        total_amount: total,
        status: "draft",
      })
      .select()
      .single();

    if (invoiceError) {
      toast.error("Failed to save invoice");
      return;
    }

    const itemsToInsert = lineItems.map(item => ({
      invoice_id: invoiceData.id,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      line_total: item.quantity * item.unit_price,
    }));

    const { error: itemsError } = await supabase
      .from("invoice_items")
      .insert(itemsToInsert);

    if (itemsError) {
      toast.error("Failed to save invoice items");
    } else {
      toast.success("Invoice saved as draft");
    }
  };

  const handleSendInvoice = async (emailData: EmailData) => {
    // First save the invoice if not already saved
    await handleSaveInvoice();
    
    // In a real implementation, this would call an edge function to send the email
    // For now, we'll simulate the send and update the status
    toast.success("Invoice sent successfully! (Email functionality requires edge function setup)");
    
    // Update invoice status to "sent"
    // This would be done after successful email send in production
  };

  const handleDownloadPDF = () => {
    window.print();
    toast.success("PDF ready for download - use browser's save as PDF option");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 print:space-y-4">
        <div className="flex justify-between items-start print:hidden">
          <div>
            <h1 className="text-3xl font-bold">Invoices</h1>
            <p className="text-muted-foreground">Create and manage invoices</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSaveInvoice} variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button onClick={() => setSendDialogOpen(true)} className="bg-gradient-to-r from-enc-orange to-enc-yellow text-white">
              <Send className="mr-2 h-4 w-4" />
              Send Invoice
            </Button>
            <Button onClick={handleDownloadPDF} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={() => window.print()} variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        <InvoiceSendDialog 
          open={sendDialogOpen}
          onOpenChange={setSendDialogOpen}
          invoiceNumber={invoice.invoice_number}
          clientEmail={invoice.client_email}
          onSend={handleSendInvoice}
        />

        <Card>
          <CardContent className="p-8 print:p-12">
            {/* Invoice Header */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Estate Nest Capital Inc.
                  </h2>
                  <p className="text-sm mt-2">5619 Kootook Place SW</p>
                  <p className="text-sm">Edmonton, AB</p>
                  <p className="text-sm">hello@estatenest.capital</p>
                  <p className="text-sm">www.estatenest.capital</p>
                </div>
                <div className="text-right">
                  <h3 className="text-2xl font-bold">INVOICE</h3>
                  <p className="text-sm text-muted-foreground mt-2">#{invoice.invoice_number}</p>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-2 gap-8 mb-8 print:mb-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-sm bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Bill To
                </h3>
                <div className="space-y-2 print:hidden">
                  <Input placeholder="Client Name *" value={invoice.client_name} onChange={(e) => setInvoice({...invoice, client_name: e.target.value})} />
                  <Input placeholder="Company" value={invoice.client_company} onChange={(e) => setInvoice({...invoice, client_company: e.target.value})} />
                  <Input placeholder="Address" value={invoice.client_address} onChange={(e) => setInvoice({...invoice, client_address: e.target.value})} />
                  <Input placeholder="Email" value={invoice.client_email} onChange={(e) => setInvoice({...invoice, client_email: e.target.value})} />
                  <Input placeholder="Phone" value={invoice.client_phone} onChange={(e) => setInvoice({...invoice, client_phone: e.target.value})} />
                </div>
                <div className="hidden print:block text-sm">
                  <p className="font-semibold">{invoice.client_name}</p>
                  {invoice.client_company && <p>{invoice.client_company}</p>}
                  {invoice.client_address && <p>{invoice.client_address}</p>}
                  {invoice.client_email && <p>{invoice.client_email}</p>}
                  {invoice.client_phone && <p>{invoice.client_phone}</p>}
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 print:gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Invoice Date</Label>
                    <Input type="date" value={invoice.invoice_date} onChange={(e) => setInvoice({...invoice, invoice_date: e.target.value})} className="print:border-0 print:p-0" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Due Date</Label>
                    <Input type="date" value={invoice.due_date} onChange={(e) => setInvoice({...invoice, due_date: e.target.value})} className="print:border-0 print:p-0" />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-xs text-muted-foreground">Terms</Label>
                    <Input value={invoice.terms} onChange={(e) => setInvoice({...invoice, terms: e.target.value})} className="print:border-0 print:p-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-primary">
                    <th className="text-left py-2 font-semibold text-sm">Description</th>
                    <th className="text-right py-2 font-semibold text-sm w-24">Qty</th>
                    <th className="text-right py-2 font-semibold text-sm w-32">Unit Price</th>
                    <th className="text-right py-2 font-semibold text-sm w-32">Total</th>
                    <th className="w-12 print:hidden"></th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">
                        <Input
                          value={item.description}
                          onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                          placeholder="Description"
                          className="print:border-0 print:p-0"
                        />
                      </td>
                      <td className="py-2">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                          className="text-right print:border-0 print:p-0"
                        />
                      </td>
                      <td className="py-2">
                        <Input
                          type="number"
                          step="0.01"
                          value={item.unit_price}
                          onChange={(e) => updateLineItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                          className="text-right print:border-0 print:p-0"
                        />
                      </td>
                      <td className="py-2 text-right font-semibold">
                        CA${(item.quantity * item.unit_price).toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 text-right print:hidden">
                        {lineItems.length > 1 && (
                          <Button variant="ghost" size="sm" onClick={() => removeLineItem(index)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button variant="outline" size="sm" onClick={addLineItem} className="mt-2 print:hidden">
                <Plus className="mr-2 h-4 w-4" />
                Add Line Item
              </Button>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span className="font-semibold">CA${calculateSubtotal().toLocaleString('en-CA', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>GST (5%):</span>
                  <span className="font-semibold">CA${calculateGST().toLocaleString('en-CA', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total Due (CAD):</span>
                  <span className="text-primary">CA${calculateTotal().toLocaleString('en-CA', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            {/* Terms and Payment */}
            <div className="border-t pt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-2">Terms & Conditions</h3>
                <p className="text-xs text-muted-foreground">
                  This invoice reflects the amount due in CAD and includes GST. Payment is due within 14 days upon receipt of this invoice. 
                  All payments are to be made to Estate Nest Capital Inc. Late payments will incur interest at 20% compounded annually for any 
                  outstanding balance. Thank you for your business, understanding, and cooperation.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">Payment Options</h3>
                <p className="text-xs text-muted-foreground">
                  <strong>ATB Bank:</strong> Institution 219, Transit 08359, Account 00698705279<br />
                  <strong>E-Transfer:</strong> hello@estatenest.capital
                </p>
              </div>
              <div className="flex justify-between items-end">
                <div className="text-xs text-muted-foreground">
                  <p>GST #: 706943131RT0001</p>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <p>___________________</p>
                  <p>Signature</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Invoices;
