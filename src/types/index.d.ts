declare module "*.css?inline" {
  const content: string;
  export default content;
}
declare module "*.html?template" {
  const content: HTMLTemplateElement;
  export default content;
}
