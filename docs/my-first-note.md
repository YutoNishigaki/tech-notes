---
id: first-note
title: はじめての技術メモ
sidebar_label: はじめての技術メモ
sidebar_position: 9
---

# はじめての技術メモ

これは Docusaurus で作成した技術メモのサンプルです！

## コードのサンプル

### Select コンポーネント

```typescript title="Menu.tsx"
import { useCallback, useEffect, useState } from "react";
import { MenuProvider, useMenu } from "./MenuContext";
import clsx from "clsx";

const MenuTarget = ({ children }: { children: React.ReactNode }) => {
  const { toggleMenu, targetRef } = useMenu();

  return (
    <button
      type="button"
      ref={targetRef}
      onClick={toggleMenu}
      className="cursor-pointer text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    >
      {children}
    </button>
  );
};

const MenuDropdown = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, targetRef, dropdownRef } = useMenu();
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  const updateDropdownPosition = useCallback(() => {
    if (!targetRef.current || !dropdownRef.current) return;

    const buttonRect = targetRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    let newPosition: "top" | "bottom" = "bottom";
    let newMaxHeight: number | null = null;

    if (spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height) {
      newPosition = "top";
      newMaxHeight = Math.min(spaceAbove - 8, dropdownRect.height);
    } else if (
      spaceAbove < dropdownRect.height &&
      spaceBelow > dropdownRect.height
    ) {
      newPosition = "bottom";
      newMaxHeight = Math.min(spaceBelow - 8, dropdownRect.height);
    } else if (
      spaceBelow < dropdownRect.height &&
      spaceAbove < dropdownRect.height
    ) {
      if (spaceBelow > spaceAbove) {
        newPosition = "bottom";
        newMaxHeight = spaceBelow * 0.8;
      } else {
        newPosition = "top";
        newMaxHeight = spaceAbove * 0.8;
      }
    }

    setPosition(newPosition);
    setMaxHeight(newMaxHeight);
  }, [dropdownRef, targetRef]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        updateDropdownPosition();
      }, 10);
    }
  }, [isOpen, updateDropdownPosition]);

  useEffect(() => {
    if (isOpen) {
      const handleResizeOrScroll = () => {
        updateDropdownPosition();
      };

      window.addEventListener("resize", handleResizeOrScroll);
      window.addEventListener("scroll", handleResizeOrScroll, true);

      return () => {
        window.removeEventListener("resize", handleResizeOrScroll);
        window.removeEventListener("scroll", handleResizeOrScroll, true);
      };
    }
  }, [isOpen, updateDropdownPosition]);

  return (
    isOpen && (
      <div
        ref={dropdownRef}
        className={clsx(
          "absolute transform bg-white rounded-lg shadow-md z-50",
          {
            "bottom-full mb-[8px]": position === "top",
            "top-full mt-[8px]": position === "bottom",
          }
        )}
        style={{
          maxHeight: maxHeight ? `${maxHeight}px` : "auto",
          overflowY: maxHeight ? "auto" : "visible",
        }}
      >
        {children}
      </div>
    )
  );
};

interface MenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  focusRef?: React.RefObject<HTMLElement>;
}

const MenuItem = ({ children, onClick, focusRef }: MenuItemProps) => {
  const { closeMenu, targetRef } = useMenu();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    closeMenu();

    // クリック後のフォーカス処理
    setTimeout(() => {
      if (focusRef?.current) {
        focusRef.current.focus();
      } else if (targetRef.current) {
        targetRef.current.focus();
      }
    }, 100);
  };

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:border-gray-700"
    >
      {children}
    </button>
  );
};

export const Menu = ({ children }: { children: React.ReactNode }) => {
  return (
    <MenuProvider>
      <div className="relative flex mt-[200px] w-[500px]">{children}</div>
    </MenuProvider>
  );
};

Menu.Target = MenuTarget;
Menu.Dropdown = MenuDropdown;
Menu.Item = MenuItem;
```

### コンテキストの設定

```typescript title="MenuContext.tsx"
import { createContext, useContext, useState, ReactNode, useRef } from "react";

interface MenuContextType {
  isOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  targetRef: React.RefObject<HTMLButtonElement>;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const MenuContext = createContext<MenuContextType | null>(null);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a Menu");
  }
  return context;
};

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const targetRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <MenuContext.Provider
      value={{ isOpen, toggleMenu, closeMenu, targetRef, dropdownRef }}
    >
      {children}
    </MenuContext.Provider>
  );
};
```

### 使い方

```typescript title="App.tsx"
import { Menu } from "./examples/menu";
import { Layout } from "./examples/Layout";
import { useRef } from "react";

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Layout>
      <Menu>
        <Menu.Target>Open Menu</Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => console.log("Clicked item 1")}
            focusRef={inputRef}
          >
            Item 1
          </Menu.Item>
          <Menu.Item>Item 2</Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <input ref={inputRef} placeholder="Click Item 1 to focus here" />
    </Layout>
  );
};

export default App;
```
