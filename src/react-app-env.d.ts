declare module "*.mp3"
declare module "*.svg" {
  const content: any
  // const content: React.FC<React.SVGProps<SVGElement>>; // blad TS
  export default content;
 }