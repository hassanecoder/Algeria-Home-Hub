import { Link } from "wouter";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <img src={`${import.meta.env.BASE_URL}images/logo-icon.png`} alt="TechMarket Logo" className="w-8 h-8 object-contain grayscale" />
              <span className="font-bold text-xl text-foreground">TechMarket</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Votre destination N°1 pour l'électronique et l'électroménager en Algérie. Les meilleures marques aux meilleurs prix.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Liens Rapides</h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-primary transition-colors">Tous les produits</Link></li>
              <li><Link href="/deals" className="hover:text-primary transition-colors">Promotions</Link></li>
              <li><Link href="/brands" className="hover:text-primary transition-colors">Marques</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">À propos de nous</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Politique de retour</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-lg mb-6">Catégories</h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/products?category=smartphones" className="hover:text-primary transition-colors">Smartphones</Link></li>
              <li><Link href="/products?category=laptops" className="hover:text-primary transition-colors">PC Portables</Link></li>
              <li><Link href="/products?category=tvs" className="hover:text-primary transition-colors">Téléviseurs</Link></li>
              <li><Link href="/products?category=appliances" className="hover:text-primary transition-colors">Électroménager</Link></li>
              <li><Link href="/products?category=gaming" className="hover:text-primary transition-colors">Gaming</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contactez-nous</h4>
            <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Centre Commercial Bab Ezzouar, Alger, Algérie</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span dir="ltr">+213 555 12 34 56</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>contact@techmarket.dz</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TechMarket Algeria. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
            <span>Paiement:</span>
            <span className="px-2 py-1 bg-muted rounded border border-border">Paiement à la livraison</span>
            <span className="px-2 py-1 bg-muted rounded border border-border">CIB</span>
            <span className="px-2 py-1 bg-muted rounded border border-border">Edahabia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
