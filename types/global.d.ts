/** Typdeklaration för .css-imports (globals.css och *.module.css). */
declare module "*.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
