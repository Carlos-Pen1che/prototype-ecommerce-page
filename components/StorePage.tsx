import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Categories } from "./Categories";
import { FeaturedProducts } from "./FeaturedProducts";
import { Footer } from "./Footer";
import { SearchResults } from "./SearchResults";
import { ProductDetail } from "./ProductDetail";
import { CategoryPage } from "./CategoryPage";
import { Cart } from "./Cart";
import { Wishlist } from "./Wishlist";
import { Checkout } from "./Checkout";
import { OrderConfirmation } from "./OrderConfirmation";
import { AboutPage } from "./AboutPage";
import { ContactPage } from "./ContactPage";
import { HelpPage } from "./HelpPage";
import { FAQPage } from "./FAQPage";
import { ReturnsPage } from "./ReturnsPage";
import { AdminPage } from "./AdminPage";
import { useApp } from "../contexts/AppContext";
import { products } from "../data/products";

interface StorePageProps {
  onLogout: () => void;
}

export function StorePage({ onLogout }: StorePageProps) {
  const { currentPage, selectedProductId, selectedCategory } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(products);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.subcategory?.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query)) ||
          product.description.toLowerCase().includes(query)
        );
      });
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
      setSearchResults(products);
    }
  }, [searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleCloseSearch = () => {
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleOpenAdmin = () => {
    setShowAdmin(true);
  };

  const handleCloseAdmin = () => {
    setShowAdmin(false);
  };

  // If admin panel is open, show it
  if (showAdmin) {
    return <AdminPage onExit={handleCloseAdmin} />;
  }

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case "product":
        return selectedProductId ? <ProductDetail productId={selectedProductId} /> : null;
      case "category":
        return selectedCategory ? <CategoryPage category={selectedCategory} /> : null;
      case "cart":
        return <Cart />;
      case "wishlist":
        return <Wishlist />;
      case "checkout":
        return <Checkout />;
      case "confirmation":
        return <OrderConfirmation />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "help":
        return <HelpPage />;
      case "faq":
        return <FAQPage />;
      case "returns":
        return <ReturnsPage />;
      case "admin":
        return <AdminPage />;
      case "home":
      default:
        return (
          <>
            <Header 
              onLogout={onLogout} 
              onSearchChange={handleSearchChange}
              searchQuery={searchQuery}
              onOpenAdmin={handleOpenAdmin}
            />
            <main>
              <Hero />
              <Categories />
              <FeaturedProducts />
            </main>
            <Footer />
            
            {showSearchResults && (
              <SearchResults 
                products={searchResults}
                searchQuery={searchQuery}
                onClose={handleCloseSearch}
              />
            )}
          </>
        );
    }
  };

  // Show header for non-home pages
  if (currentPage !== "home") {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onLogout={onLogout} 
          onSearchChange={handleSearchChange}
          searchQuery={searchQuery}
          onOpenAdmin={handleOpenAdmin}
        />
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}
    </div>
  );
}