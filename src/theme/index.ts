/* 
 * Base Components Enum types 
 * - <Buttons/>
 * - <Inputs/>
 * - <Cards/>
 * - <Modals/>
 * - <Tables/>
 * - <Tabs/>
 * - <Toasts/>
 * - <Tooltips/>
 * - <Typography/>
 * - <Layouts/>
 * - <Forms/>
 * - <Icons/>
 * - <Images/>
 * - <Lists/>
 * - <Loaders/>
*/

// Buttons
const ButtonColor = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  light: "bg-light",
  accent: "bg-accent",
  warning: "bg-warning",
  error: "bg-error",
};

// Constants for Button Text Transform
const ButtonTextTransform = {
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
  normalCase: "normal-case",
};

// Constants for Button Sizes
const ButtonSize = {
  sm: "px-2 py-2 text-sm",
  md: "px-5 py-2 text-base",
  lg: "px-7 py-2 text-lg",
  xl: "px-20 py-2 text-xl",
};

const ButtonWide = {
  full: "w-full",
  auto: "w-auto"
}

export { ButtonColor, ButtonTextTransform, ButtonSize, ButtonWide };

// Inputs
