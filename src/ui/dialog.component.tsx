import type { ReactNode } from "react";


interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  className?: string;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  title,
  children,
  className = '',
  closeOnOutsideClick = false,
  showCloseButton = true,
}) => {
  // Import Radix UI Dialog
  const DialogPrimitive = require('@radix-ui/react-dialog');
 
  const handleOpenChange = (newOpen: boolean) => {
    // Only allow closing via outside click if closeOnOutsideClick is true
    if (!newOpen && !closeOnOutsideClick) {
      return;
    }
    onOpenChange(newOpen);
  };
 
  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        {/* Overlay - matches BackgroundContainer overlay */}
        <DialogPrimitive.Overlay 
          className="fixed inset-0 bg-blue-900/40 backdrop-blur-md z-40"
          style={{ backgroundColor: 'rgba(30, 41, 82, 0.5)' }}
        />
 
        {/* Dialog Content - matches MenuContainer styling */}
        <DialogPrimitive.Content
          className={`
            fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            border-4 border-yellow-500 bg-blue-900/40 backdrop-blur-md
            rounded-lg p-8 shadow-2xl z-50
            max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto
            ${className}
          `}
        >
          {/* Title */}
          <DialogPrimitive.Title className="text-center text-2xl font-bold text-yellow-500 mb-6">
            {title}
          </DialogPrimitive.Title>
 
          {/* Content */}
          <div className="text-yellow-500 mb-6">
            {children}
          </div>
 
          {/* Close Button - Optional */}
          {showCloseButton && (
            <DialogPrimitive.Close className="absolute top-4 right-4 text-yellow-500 hover:text-yellow-300 transition-colors p-1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
 
