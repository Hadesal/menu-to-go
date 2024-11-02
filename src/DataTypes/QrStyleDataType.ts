export interface QrCodeStyleDataType {
  dotsOptions: DotsOptionsDataType;
  cornersSquareOptions: CornerSquareOptionsDataType;
  cornersDotOptions: CornerDotsOptionsDataType;
  imageSrc: string;
  generalUrlPath?: string;
}

export interface DotsOptionsDataType {
  color: string;
  type:
    | "dots"
    | "rounded"
    | "classy"
    | "classy-rounded"
    | "square"
    | "extra-rounded";
}

export interface CornerSquareOptionsDataType {
  color: string;
  type: "dot" | "square" | "extra-rounded";
}

export interface CornerDotsOptionsDataType {
  color: string;
  type: "dot" | "square";
}
