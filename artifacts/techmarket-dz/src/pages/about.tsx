import { Layout } from "@/components/layout/Layout";
import { CheckCircle2, MapPin, Truck, ShieldCheck, HeartHandshake } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-muted">
        <div className="absolute inset-0">
          <img src={`${import.meta.env.BASE_URL}images/about-store.png`} alt="TechMarket Store" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">À Propos de TechMarket</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            La première destination e-commerce en Algérie pour tous vos besoins en électronique, informatique et électroménager.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              Fondé en 2020 à Alger, TechMarket est né de la volonté de démocratiser l'accès aux nouvelles technologies pour tous les Algériens. Face au défi de trouver des produits originaux garantis au bon prix, nous avons créé une plateforme transparente et fiable.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Aujourd'hui, nous livrons quotidiennement des centaines de commandes à travers les 58 wilayas, en garantissant un service après-vente de qualité et des partenariats directs avec les plus grandes marques (Samsung, LG, Condor, Apple, etc.).
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-card rounded-2xl border border-border text-center">
                <div className="text-4xl font-extrabold text-primary mb-2">58</div>
                <div className="text-sm font-bold text-muted-foreground">Wilayas Desservies</div>
              </div>
              <div className="p-6 bg-card rounded-2xl border border-border text-center">
                <div className="text-4xl font-extrabold text-primary mb-2">10k+</div>
                <div className="text-sm font-bold text-muted-foreground">Produits en Stock</div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl relative h-[500px]">
             <img src={`${import.meta.env.BASE_URL}images/about-store.png`} alt="Team" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-16">Nos Engagements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-4">Produits Authentiques</h3>
              <p className="text-muted-foreground">Nous luttons contre la contrefaçon. Chaque produit vendu sur TechMarket est 100% original et accompagné d'une garantie officielle.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <Truck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-4">Livraison Express</h3>
              <p className="text-muted-foreground">Notre réseau logistique couvre l'ensemble du territoire national avec des délais de 24h (Alger) à 72h (Sud).</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <HeartHandshake className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-4">Client au Centre</h3>
              <p className="text-muted-foreground">Notre service client est disponible 6j/7 pour vous accompagner avant, pendant et après votre achat.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
