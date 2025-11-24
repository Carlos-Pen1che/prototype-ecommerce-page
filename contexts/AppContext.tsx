import { createContext, useContext, useState, ReactNode } from "react";

type Page = "home" | "product" | "category" | "cart" | "wishlist" | "checkout" | "confirmation" | "about" | "contact" | "help" | "faq" | "returns";

interface AppContextType {
  currentPage: Page;
  selectedProductId: number | null;
  selectedCategory: string | null;
  wishlist: number[];
  navigateToHome: () => void;
  navigateToProduct: (productId: number) => void;
  navigateToCategory: (category: string) => void;
  navigateToCart: () => void;
  navigateToWishlist: () => void;
  navigateToCheckout: () => void;
  navigateToConfirmation: () => void;
  navigateToAbout: () => void;
  navigateToContact: () => void;
  navigateToHelp: () => void;
  navigateToFAQ: () => void;
  navigateToReturns: () => void;
  goBack: () => void;
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [pageHistory, setPageHistory] = useState<Page[]>([]);

  const navigateToHome = () => {
    setPageHistory([...pageHistory, currentPage]);
    setCurrentPage("home");
    setSelectedProductId(null);
    setSelectedCategory(null);
  };

  const navigateToProduct = (productId: number) => {
    setPageHistory([...pageHistory, currentPage]);
    setCurrentPage("product");
    setSelectedProductId(productId);
  };

  const navigateToCategory = (category: string) => {
    setPageHistory([...pageHistory, currentPage]);
    setCurrentPage("category");
    setSelectedCategory(category);
  };

  const navigateToCart = () => {
    setPageHistory([...pageHistory, currentPage]);
    setCurrentPage("cart");
  };

  const navigateToWishlist = () => {
    setPageHistory([...pageHistory, currentPage]);
    setCurrentPage("wishlist");
  };

  const navigateToCheckout = () => {
    setPageHistory([...pageHistory, currentPage]);
    setCurrentPage("checkout");
  };

  const navigateToConfirmation = () => {
    setPageHistory([...pageHistory, currentPage]);
    setCurrentPage("confirmation");
  };

  const navigateToAbout = () => {
    setPageHistory([...pageHistory, currentPage]);
    setCurrentPage("about");
  };

  const navigateToContact = () => {
    setPageHistory([...pageHistory, currentPage]);
    setCurrentPage("contact");
  };

  const navigateToHelp = () => {
    setPageHistory([...pageHistory, currentPage]);
    setCurrentPage("help");
  };

  const navigateToFAQ = () => {
    setPageHistory([...pageHistory, currentPage]);
    setCurrentPage("faq");
  };

  const navigateToReturns = () => {
    setPageHistory([...pageHistory, currentPage]);
    setCurrentPage("returns");
  };

  const goBack = () => {
    if (pageHistory.length > 0) {
      const previousPage = pageHistory[pageHistory.length - 1];
      setPageHistory(pageHistory.slice(0, -1));
      setCurrentPage(previousPage);
      
      if (previousPage !== "product") {
        setSelectedProductId(null);
      }
      if (previousPage !== "category") {
        setSelectedCategory(null);
      }
    } else {
      navigateToHome();
    }
  };

  const addToWishlist = (productId: number) => {
    setWishlist((prev) => {
      if (!prev.includes(productId)) {
        return [...prev, productId];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  const isInWishlist = (productId: number) => {
    return wishlist.includes(productId);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        selectedProductId,
        selectedCategory,
        wishlist,
        navigateToHome,
        navigateToProduct,
        navigateToCategory,
        navigateToCart,
        navigateToWishlist,
        navigateToCheckout,
        navigateToConfirmation,
        navigateToAbout,
        navigateToContact,
        navigateToHelp,
        navigateToFAQ,
        navigateToReturns,
        goBack,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}