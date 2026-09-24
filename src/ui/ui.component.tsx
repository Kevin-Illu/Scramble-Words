import React, { type ReactElement, type ReactNode } from 'react';

type TextSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg';
type BlurAmount = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  className?: string;
  [key: string]: unknown;
}

export interface StageButtonProps {
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface StageButtonsContainerProps {
  stages?: string[];
  activeStage?: number;
  onStageClick?: (stage: string, index: number) => void;
  className?: string;
}

export interface OptionItem {
  id: string | number;
  label: string;
  icon?: ReactElement;
  variant?: ButtonVariant;
  onClick?: () => void;
}

export interface OptionCardProps {
  icon?: ReactElement;
  label: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
}

export interface OptionsGridProps {
  options: OptionItem[];
  className?: string;
}

export interface MenuContainerProps {
  title: string;
  titleSize: TextSize,
  options?: OptionItem[];
  quote?: string;
  children?: ReactNode;
  className?: string;
}

export interface BackgroundContainerProps {
  children: ReactNode;
  backgroundImage: string;
  overlayOpacity?: number;
  blurAmount?: BlurAmount;
  className?: string;
}

export const SIZES: Record<TextSize, string> = {
  sm: 'px-3 py-1 text-xl',
  md: 'px-6 py-2 text-2xl',
  lg: 'px-8 py-3 text-6xl',
};

// ====== BUTTON COMPONENTS ======

/**
 * Base Button Component - Reusable border button
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-bold transition-all duration-200 border-2 rounded cursor-pointer';

  const variants: Record<ButtonVariant, string> = {
    primary: 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black',
    secondary: 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} bg-transparent ${SIZES[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Stage Button Component - For semester stages (I, II, III, IV, V)
 */
export const StageButton: React.FC<StageButtonProps> = ({
  children,
  isActive = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-10 h-10 flex items-center justify-center
        border-2 rounded font-bold transition-all duration-200
        cursor-pointer
        ${isActive
          ? 'border-yellow-500 bg-yellow-500 text-black'
          : 'border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

/**
 * Stage Buttons Container - Groups multiple stage buttons
 */
export const StageButtonsContainer: React.FC<StageButtonsContainerProps> = ({
  stages = ['I', 'II', 'III', 'IV', 'V'],
  activeStage = 0,
  onStageClick,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="text-yellow-500 font-bold tracking-widest text-sm">SEMESTER STAGES:</span>
      <div className="flex gap-2">
        {stages.map((stage, index) => (
          <StageButton
            key={index}
            isActive={index === activeStage}
            onClick={() => onStageClick?.(stage, index)}
          >
            {stage}
          </StageButton>
        ))}
      </div>
    </div>
  );
};

/**
 * Option Card Component - Individual selectable option
 */
export const OptionCard: React.FC<OptionCardProps> = ({
  icon = null,
  variant = "primary",
  label,
  onClick,
  className = '',
}) => {
  if (!label) return (
    <Button variant={variant} onClick={onClick} className={className}>
      {icon}
    </Button>
  )

  if (!icon) return (
    <Button variant={variant} onClick={onClick} className={className}>
      {label}
    </Button>
  )

  return (
    <Button onClick={onClick} className={className} variant={variant}>
      <div className='flex justify-center items-center gap-4'>
        {icon}
        {label}
      </div>
    </Button>
  );
};


/**
 * Options Grid Component - Container for multiple option cards
 * Handles both single and multiple options with responsive layout
 */
export const OptionsGrid: React.FC<OptionsGridProps> = ({
  options = [],
  className = '',
}) => {
  const isSingleOption = options.length === 1;

  return (
    <div
      className={`
        ${isSingleOption
          ? 'flex items-center justify-center'
          : 'grid grid-cols-2 gap-4'
        } 
        ${className}
      `}
    >
      {options.map((option) => (
        <div
          key={option.id}
          className={isSingleOption ? 'max-w-xs' : ''}
        >
          <OptionCard
            icon={option.icon}
            label={option.label}
            variant={option?.variant}
            onClick={option.onClick}
          />
        </div>
      ))}
    </div>
  );
};

/**
 * Main Menu Container - Square box with golden border
 * Contains title button, options grid, and quote
 */
export const MenuContainer: React.FC<MenuContainerProps> = ({
  title,
  titleSize,
  options = [],
  quote,
  children,
  className = '',
}) => {
  return (
    <div className={`border-4 border-yellow-500 p-8 rounded-lg bg-blue-900/40 backdrop-blur-md ${className}`}>
      {title && (
        <div className="mb-6 flex justify-center items-center">
          <div className={`w-full text-center text-yellow-500 px-6 py-3 rounded text-6xl font-bold flex items-center justify-between ${SIZES[titleSize]}`}>
            <span className='w-full'>{title}</span>
          </div>
        </div>
      )}

      {options.length > 0 && (
        <div className="mb-6">
          <OptionsGrid options={options} />
        </div>
      )}

      {children}

      {quote && (
        <div className="flex justify-center items-center text-center w-full text-gray-500 text-xl italic mt-6">
          <div className='max-w-[400px]'>
            "{quote}"
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Background Container - Full screen with background image and overlay
 */
export const BackgroundContainer: React.FC<BackgroundContainerProps> = ({
  children,
  backgroundImage,
  overlayOpacity = 0.5,
  blurAmount = 'md',
  className = '',
}) => {
  const blurMap: Record<BlurAmount, string> = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  };

  return (
    <div
      className={`relative w-full min-h-screen bg-cover bg-center ${className}`}
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      {/* Overlay with blur and opacity */}
      <div
        className={`absolute inset-0 bg-blue-900/40 ${blurMap[blurAmount]} z-10`}
        style={{ backgroundColor: `rgba(30, 41, 82, ${overlayOpacity})` }}
      ></div>

      {/* Content */}
      <div className="relative z-20 w-full min-h-screen flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
};
