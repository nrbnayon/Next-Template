// src/types/lordicon.d.ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lord-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string;
          trigger?:
            | "hover"
            | "click"
            | "loop"
            | "loop-on-hover"
            | "morph"
            | "morph-two-way";
          colors?: string;
          stroke?: number;
          delay?: number;
          state?: string;
        },
        HTMLElement
      >;
    }
  }

  interface Window {
    lordicon?: {
      loadIcon: (element: HTMLElement) => void;
      defineElement: () => void;
    };
  }
}

export {};
