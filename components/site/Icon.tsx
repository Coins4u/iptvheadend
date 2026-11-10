import type { ComponentType, SVGProps } from "react";
import {
  FaArrowRight,
  FaBars,
  FaBitcoin,
  FaBolt,
  FaBookOpen,
  FaCheck,
  FaCheckCircle,
  FaChevronDown,
  FaClipboardCheck,
  FaClock,
  FaCogs,
  FaCreditCard,
  FaEnvelope,
  FaFilm,
  FaGlobe,
  FaHeadset,
  FaPlayCircle,
  FaQuestionCircle,
  FaShieldAlt,
  FaSignal,
  FaTrophy,
  FaTv,
  FaUniversity,
  FaWhatsapp,
} from "react-icons/fa";

const ICONS = {
  "arrow-right": FaArrowRight,
  bars: FaBars,
  bitcoin: FaBitcoin,
  bolt: FaBolt,
  "book-open": FaBookOpen,
  check: FaCheck,
  "check-circle": FaCheckCircle,
  "chevron-down": FaChevronDown,
  "clipboard-check": FaClipboardCheck,
  clock: FaClock,
  cogs: FaCogs,
  "credit-card": FaCreditCard,
  envelope: FaEnvelope,
  film: FaFilm,
  globe: FaGlobe,
  headset: FaHeadset,
  "play-circle": FaPlayCircle,
  "question-circle": FaQuestionCircle,
  "shield-alt": FaShieldAlt,
  signal: FaSignal,
  trophy: FaTrophy,
  tv: FaTv,
  bank: FaUniversity,
  whatsapp: FaWhatsapp,
} satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>;

export type SiteIconName = keyof typeof ICONS;

export default function Icon({ name, className = "icon" }: { name: SiteIconName; className?: string }) {
  const Svg = ICONS[name];
  return <Svg className={className} aria-hidden="true" focusable="false" />;
}
