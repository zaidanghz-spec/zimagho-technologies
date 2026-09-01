import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * Flat config. `eslint-config-next` v16 ships flat arrays directly, so this
 * spreads them rather than routing through the eslintrc compatibility layer.
 */
const config = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
];

export default config;
