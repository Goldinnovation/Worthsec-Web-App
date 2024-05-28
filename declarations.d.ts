// declarations.d.ts

declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
  }
  
  declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
  }
  
  declare module '*.png' {
    const value: string;
    export default value;
  }
  
  declare module '*.jpg' {
    const value: string;
    export default value;
  }
  
  declare module '*.jpeg' {
    const value: string;
    export default value;
  }
  
  declare module '*.gif' {
    const value: string;
    export default value;
  }
  
  declare module '*.svg' {
    const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default value;
  }
  
  declare module '*.mp4' {
    const src: string;
    export default src;
  }
  