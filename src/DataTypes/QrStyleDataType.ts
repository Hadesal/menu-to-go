export interface QrCodeStyleDataType {
  dotsOptions: DotsOptionsDataType;
  cornersSquareOptions: CornerSquareOptionsDataType;
  cornersDotOptions: CornerDotsOptionsDataType;
  imageSrc: string;
  generalUrlPath?: string;
}

export interface DotsOptionsDataType {
  color: string;
  type: string;
}

export interface CornerSquareOptionsDataType {
  color: string;
  type: string;
}

export interface CornerDotsOptionsDataType {
  color: string;
  type: string;
}
