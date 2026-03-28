import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDZD } from "@/lib/utils";
import { useGetCart, useCreateOrder } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, ChevronRight, Truck, CreditCard } from "lucide-react";

// Algerian Wilayas
const wilayas = [
  "01 - Adrar", "02 - Chlef", "03 - Laghouat", "04 - Oum El Bouaghi", "05 - Batna", 
  "06 - Béjaïa", "07 - Biskra", "08 - Béchar", "09 - Blida", "10 - Bouira", 
  "11 - Tamanrasset", "12 - Tébessa", "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou", 
  "16 - Alger", "17 - Djelfa", "18 - Jijel", "19 - Sétif", "20 - Saïda", 
  "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma", "25 - Constantine", 
  "26 - Médéa", "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla", 
  "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arreridj", "35 - Boumerdès", 
  "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela", 
  "41 - Souk Ahras", "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma", 
  "46 - Aïn Témouchent", "47 - Ghardaïa", "48 - Relizane", "49 - El M'Ghair", "50 - El Meniaa",
  "51 - Ouled Djellal", "52 - Bordj Baji Mokhtar", "53 - Béni Abbès", "54 - Timimoun", "55 - Touggourt",
  "56 - Djanet", "57 - In Salah", "58 - In Guezzam"
];

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Nom complet requis"),
  phone: z.string().min(10, "Numéro de téléphone invalide (ex: 0550...)", ),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  wilaya: z.string().min(1, "Veuillez sélectionner une wilaya"),
  commune: z.string().min(2, "Commune requise"),
  address: z.string().min(5, "Adresse complète requise"),
  paymentMethod: z.enum(["cash_on_delivery", "cib", "edahabia"]),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2>(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  const { data: cart } = useGetCart({ query: { retry: false } });
  const createOrderMutation = useCreateOrder();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "cash_on_delivery",
      wilaya: "16 - Alger"
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    if (!cart || cart.items.length === 0) return;

    createOrderMutation.mutate(
      {
        data: {
          ...data,
          items: cart.items.map(item => ({ productId: item.productId, quantity: item.quantity })),
        }
      },
      {
        onSuccess: (res) => {
          setOrderRef(res.orderNumber || `TM-${Math.floor(100000 + Math.random() * 900000)}`);
          setOrderSuccess(true);
          window.scrollTo(0, 0);
        },
        onError: () => {
          toast({
            title: "Erreur",
            description: "Impossible de créer la commande. Veuillez réessayer.",
            variant: "destructive"
          });
        }
      }
    );
  };

  if (orderSuccess) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-extrabold mb-4">Commande Confirmée !</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Merci pour votre achat. Votre commande a été enregistrée avec succès.
          </p>
          <div className="bg-card border border-border rounded-2xl p-8 mb-8 text-left max-w-md mx-auto shadow-sm">
            <div className="text-sm text-muted-foreground mb-1">Numéro de commande</div>
            <div className="text-2xl font-mono font-bold mb-6">{orderRef}</div>
            
            <div className="text-sm text-muted-foreground mb-1">Un conseiller va vous appeler dans les 24h sur le numéro:</div>
            <div className="text-lg font-bold">{form.getValues("phone")}</div>
          </div>
          <Button size="lg" asChild>
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Redirect if empty
  if (cart && cart.items.length === 0) {
    setLocation("/cart");
    return null;
  }

  return (
    <Layout>
      <div className="bg-muted py-6 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm font-medium text-muted-foreground">
            <Link href="/cart" className="hover:text-primary">Panier</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className={step === 1 ? "text-primary font-bold" : ""}>Livraison</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className={step === 2 ? "text-primary font-bold" : ""}>Paiement</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-8">Validation de la commande</h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Main Form Area */}
          <div className="w-full lg:w-2/3">
            <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Step 1: Shipping */}
              <div className={`bg-card rounded-3xl border ${step === 1 ? 'border-primary/50 shadow-md ring-4 ring-primary/5' : 'border-border shadow-sm'} p-6 sm:p-8 transition-all`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>1</div>
                  <h2 className="text-xl font-bold">Informations de livraison</h2>
                </div>

                {step === 1 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Nom complet <span className="text-red-500">*</span></Label>
                      <Input id="customerName" placeholder="Ex: Mohamed Ali" {...form.register("customerName")} />
                      {form.formState.errors.customerName && <span className="text-xs text-red-500">{form.formState.errors.customerName.message}</span>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone <span className="text-red-500">*</span></Label>
                      <Input id="phone" placeholder="Ex: 0550123456" {...form.register("phone")} />
                      {form.formState.errors.phone && <span className="text-xs text-red-500">{form.formState.errors.phone.message}</span>}
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email (Optionnel)</Label>
                      <Input id="email" type="email" placeholder="Ex: email@example.com" {...form.register("email")} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="wilaya">Wilaya <span className="text-red-500">*</span></Label>
                      <select 
                        id="wilaya" 
                        {...form.register("wilaya")}
                        className="flex h-12 w-full rounded-xl border-2 border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:border-primary"
                      >
                        {wilayas.map(w => <option key={w} value={w}>{w}</option>)}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="commune">Commune <span className="text-red-500">*</span></Label>
                      <Input id="commune" placeholder="Ex: Bab Ezzouar" {...form.register("commune")} />
                      {form.formState.errors.commune && <span className="text-xs text-red-500">{form.formState.errors.commune.message}</span>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Adresse complète <span className="text-red-500">*</span></Label>
                      <Input id="address" placeholder="N° de rue, bâtiment, quartier..." {...form.register("address")} />
                      {form.formState.errors.address && <span className="text-xs text-red-500">{form.formState.errors.address.message}</span>}
                    </div>

                    <div className="md:col-span-2 pt-4">
                      <Button type="button" size="lg" className="w-full sm:w-auto" onClick={async () => {
                        const isValid = await form.trigger(["customerName", "phone", "wilaya", "commune", "address"]);
                        if (isValid) setStep(2);
                      }}>
                        Continuer vers le paiement
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-muted-foreground bg-muted p-4 rounded-xl">
                    <div>
                      <p className="font-medium text-foreground">{form.getValues("customerName")} - {form.getValues("phone")}</p>
                      <p>{form.getValues("address")}, {form.getValues("commune")}, {form.getValues("wilaya")}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setStep(1)}>Modifier</Button>
                  </div>
                )}
              </div>

              {/* Step 2: Payment */}
              <div className={`bg-card rounded-3xl border ${step === 2 ? 'border-primary/50 shadow-md ring-4 ring-primary/5' : 'border-border shadow-sm'} p-6 sm:p-8 transition-all opacity-${step === 1 ? '50' : '100'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>2</div>
                  <h2 className="text-xl font-bold">Méthode de paiement</h2>
                </div>

                {step === 2 && (
                  <div className="space-y-4">
                    <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${form.watch("paymentMethod") === "cash_on_delivery" ? 'border-primary bg-primary/5' : 'border-input hover:border-primary/50'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" value="cash_on_delivery" {...form.register("paymentMethod")} className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-bold">Paiement à la livraison</p>
                          <p className="text-sm text-muted-foreground">Payez en espèces lorsque vous recevez votre commande</p>
                        </div>
                      </div>
                      <Truck className="w-8 h-8 text-primary" />
                    </label>

                    <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${form.watch("paymentMethod") === "cib" ? 'border-primary bg-primary/5' : 'border-input hover:border-primary/50'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" value="cib" {...form.register("paymentMethod")} className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-bold">Carte CIB</p>
                          <p className="text-sm text-muted-foreground">Paiement sécurisé avec votre carte bancaire</p>
                        </div>
                      </div>
                      <CreditCard className="w-8 h-8 text-primary" />
                    </label>

                    <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${form.watch("paymentMethod") === "edahabia" ? 'border-primary bg-primary/5' : 'border-input hover:border-primary/50'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" value="edahabia" {...form.register("paymentMethod")} className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-bold">Carte Edahabia</p>
                          <p className="text-sm text-muted-foreground">Paiement via Algérie Poste</p>
                        </div>
                      </div>
                      <CreditCard className="w-8 h-8 text-yellow-500" />
                    </label>

                    <div className="pt-6 flex gap-4">
                      <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)}>
                        Retour
                      </Button>
                      <Button type="submit" size="lg" className="flex-1" form="checkout-form" disabled={createOrderMutation.isPending}>
                        {createOrderMutation.isPending ? "Traitement..." : "Confirmer la commande"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-card p-6 rounded-3xl border border-border shadow-sm sticky top-28">
              <h3 className="font-bold text-lg mb-4">Votre Commande</h3>
              
              <div className="space-y-4 max-h-64 overflow-y-auto mb-6 pr-2">
                {cart?.items.map(item => (
                  <div key={item.productId} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-muted rounded-lg p-1 shrink-0">
                      <img src={item.imageUrl || "https://placehold.co/100/1a1a2e/white"} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">Qté: {item.quantity}</p>
                      <p className="text-sm font-bold text-primary">{formatDZD(item.subtotal)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Sous-total</span>
                  <span>{cart ? formatDZD(cart.subtotal) : '0 DA'}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Livraison</span>
                  <span>{cart?.deliveryFee === 0 ? 'Gratuite' : cart ? formatDZD(cart.deliveryFee) : '0 DA'}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 flex justify-between items-end">
                <span className="font-bold">Total à payer</span>
                <span className="text-2xl font-extrabold text-primary">{cart ? formatDZD(cart.total) : '0 DA'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
