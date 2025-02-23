import HomeIcon from "@mui/icons-material/Home";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { ProductData } from "@dataTypes/ProductDataTypes";
import { RestaurantData } from "@dataTypes/RestaurantObject";
import { CategoryData } from "@dataTypes/CategoryDataTypes";

// Time constants
export const INACTIVITY_PERIOD = 60 * 10000; // 10 minutes in milliseconds
export const PROMPT_BEFORE_IDLE = 30 * 1000; // 30 seconds in milliseconds
export const CHECK_INTERVAL = 1000; // 1 second in milliseconds

// Drawer width
export const drawerWidth = 240;

// Supported languages
export const langs = {
  en: { nativeName: "English" },
  de: { nativeName: "Deutsch" },
  es: { nativeName: "Español" },
  ar: { nativeName: "العربية" },
  fr: { nativeName: "Français" },
  tr: { nativeName: "Türkçe" },
};

// Button data for the side navigation
export const buttonData = (getString: (key: string) => string) => [
  { id: "dashboard", icon: HomeIcon, label: getString("dashboard") },
  {
    id: "restaurant",
    icon: RestaurantIcon,
    label: getString("restaurant"),
  },
  {
    id: "templates",
    icon: ViewQuiltIcon,
    label: getString("templates"),
  },
  {
    id: "generateQrCode",
    icon: QrCodeIcon,
    label: getString("generateQrCode"),
  },
  {
    id: "contactUs",
    icon: SupportAgentIcon,
    label: getString("contactUs"),
  },
  {
    id: "logout",
    icon: LogoutOutlinedIcon,
    label: getString("logout"),
  },
];

// Profile menu options
export const profileOptions = (getString: (key: string) => string) => [
  { id: "myprofile", optionName: getString("myProfile") },
  { id: "notifications", optionName: getString("notification") },
  { id: "subscription", optionName: getString("Subscription") },
];

export const ROUTES = {
  ROOT: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  MENU: "/menu/:id",
};

export const Colors = {
  primary: "#a4755d",
  secondary: "#d9b18f",
  background: "#ffffff",
  text: "#333333",
  success: "#28a745",
  danger: "#dc3545",
};

export const restaurantDefaultData: Omit<RestaurantData, "userUiPreferences"> =
  {
    name: "",
    categories: [],
    tables: [],
    currency:""
  };
export const productDefaultData: ProductData = {
  name: "",
  price: 0,
  details: {
    detailsDescription: "",
    extras: [],
    ingredients: [],
    variants: {
      name: "",
      variantList: [],
    },
    allergies: [],
    labels: [],
    dietaryOptions: { label: "", value: "" },
  },
  isAvailable: true,
  isSoldOut: false,
  image: undefined,
};

export const categoryDefaultData: CategoryData = {
  name: "",
  image: "",
  categoryType: "",
};
