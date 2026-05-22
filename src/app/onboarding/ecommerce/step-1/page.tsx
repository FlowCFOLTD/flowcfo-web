import { Metadata } from "next";
import EcommerceStep1 from "./step-1";

export const metadata: Metadata = {
  title: "E-commerce Setup | FlowCFO",
  description: "Connect your storefront intelligence to FlowCFO. Link your primary sales channels for automated liquidity forecasting.",
};

export default function EcommerceStep1Page() {
  return <EcommerceStep1 />;
}
