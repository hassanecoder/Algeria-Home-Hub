import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-[150px] font-extrabold text-primary leading-none tracking-tighter">
            404
          </div>
          <h1 className="text-3xl font-bold mt-4 mb-4">Page Introuvable</h1>
          <p className="text-muted-foreground mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/">Retour à l'accueil</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/products">Parcourir les produits</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
