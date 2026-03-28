import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé",
      description: "Notre équipe vous répondra dans les plus brefs délais.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contactez-nous</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une question sur un produit ? Un problème avec votre commande ? Notre équipe est à votre écoute.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" placeholder="Mohamed Ali" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" placeholder="0550..." required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <select id="subject" className="flex h-12 w-full rounded-xl border-2 border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:border-primary">
                  <option>Information sur un produit</option>
                  <option>Suivi de commande</option>
                  <option>Service Après-Vente (SAV)</option>
                  <option>Partenariat / B2B</option>
                  <option>Autre</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="flex w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:border-primary resize-none"
                  placeholder="Comment pouvons-nous vous aider ?"
                  required
                ></textarea>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Envoyer le message
              </Button>
            </form>
          </div>

          {/* Contact Info & Stores */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Nos Coordonnées</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Téléphone</h4>
                    <p className="text-muted-foreground mb-1">+213 555 12 34 56 (Service Commercial)</p>
                    <p className="text-muted-foreground">+213 555 12 34 57 (SAV)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Email</h4>
                    <p className="text-muted-foreground">contact@techmarket.dz</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Heures d'ouverture</h4>
                    <p className="text-muted-foreground">Samedi au Jeudi : 09:00 - 18:00</p>
                    <p className="text-muted-foreground">Vendredi : Fermé</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Nos Magasins physiques</h2>
              <div className="grid gap-4">
                <div className="p-4 border border-border rounded-xl bg-card">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> Store Alger - Bab Ezzouar
                  </h4>
                  <p className="text-sm text-muted-foreground">Centre commercial Bab Ezzouar, 1er étage.</p>
                </div>
                <div className="p-4 border border-border rounded-xl bg-card">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> Store Oran - Es Sénia
                  </h4>
                  <p className="text-sm text-muted-foreground">Boulevard de l'Aéroport, Es Sénia, Oran.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
