import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Heart, Search, Menu, X, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useGetCart, useGetWishlist } from "@workspace/api-client-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  // Queries - ignoring errors since they might fail without backend
  const { data: cart } = useGetCart({ query: { retry: false } });
  const { data: wishlist } = useGetWishlist({ query: { retry: false } });

  const cartCount = cart?.itemCount || 0;
  const wishlistCount = wishlist?.length || 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Produits", href: "/products" },
    { name: "Promotions", href: "/deals" },
    { name: "Marques", href: "/brands" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border">
      {/* Top Bar - Contact & Lang */}
      <div className="bg-primary text-primary-foreground py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3" /> +213 555 12 34 56
            </span>
            <span className="hidden sm:inline-block">Livraison 58 Wilayas 🇩🇿</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hover:underline cursor-pointer">العربية</span>
            <span>|</span>
            <span className="font-bold">Français</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 md:gap-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={`${import.meta.env.BASE_URL}images/logo-icon.png`} alt="TechMarket Logo" className="w-10 h-10 object-contain" />
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-xl leading-tight text-primary">TechMarket</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Algeria</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <form onSubmit={handleSearch} className="relative w-full flex items-center">
              <Input 
                type="search" 
                placeholder="Rechercher un produit, marque (ex: Samsung S24)..." 
                className="pr-12 rounded-full bg-muted border-transparent focus-visible:bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" variant="ghost" className="absolute right-1 w-10 h-10 rounded-full hover:bg-transparent text-muted-foreground hover:text-primary">
                <Search className="w-5 h-5" />
              </Button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Heart className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative rounded-full text-primary hover:bg-primary/10">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex">
              <User className="w-6 h-6" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search - Visible only on small screens */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative w-full">
            <Input 
              type="search" 
              placeholder="Rechercher..." 
              className="rounded-full bg-muted border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:block border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="py-3 text-sm font-semibold text-muted-foreground hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-xl py-4 px-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="py-3 px-4 rounded-xl text-foreground font-semibold hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button variant="outline" className="mt-4 justify-start px-4">
            <User className="w-5 h-5 mr-2" /> Mon Compte
          </Button>
        </div>
      )}
    </header>
  );
}
