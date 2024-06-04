import { ReactNode, createContext, useEffect, useState } from 'react';

interface CarrinhoProviderProps {
  children: ReactNode;
}

interface CarrinhoItem {
  img: string;
  title: string;
  price: string;
}

interface CarrinhoContextData {
  carrinhoItem: CarrinhoItem[];
  addItemCarrinho: (newItem: CarrinhoItem) => void;
  removeItemDoCarrinho: (itemToRemove: CarrinhoItem) => void;
  totalItems: number;
}

export const CarrinhoContext = createContext<CarrinhoContextData>({} as CarrinhoContextData);

export function CarrinhoProvider({ children }: CarrinhoProviderProps) { // Correção do nome e tipo aqui
  const localStorageKey = 'cartItems';
  const savedCartItems = localStorage.getItem(localStorageKey);
  const initialCartItems: CarrinhoItem[] = savedCartItems ? JSON.parse(savedCartItems) : [];

  const [carrinhoItem, setCartItems] = useState<CarrinhoItem[]>(initialCartItems);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(carrinhoItem));
  }, [carrinhoItem]);

  function addItemCarrinho(newItem: CarrinhoItem) { // Correção do nome aqui
    setCartItems(prevCartItems => [...prevCartItems, newItem]);
  }

  function removeItemDoCarrinho(itemToRemove: CarrinhoItem) { // Correção do nome aqui
    setCartItems(prevCartItems =>
      prevCartItems.filter(item => item.title !== itemToRemove.title)
    );
  }

  function calculateTotalItems() {
    return carrinhoItem.length;
  }

  const totalItems = calculateTotalItems();

  return (
    <CarrinhoContext.Provider value={{ carrinhoItem, addItemCarrinho, removeItemDoCarrinho, totalItems }}> 
      {children}
    </CarrinhoContext.Provider>
  );
}
