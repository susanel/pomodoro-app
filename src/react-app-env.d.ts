declare module '*.mp3'
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
 }