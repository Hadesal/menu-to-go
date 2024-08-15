export interface QrCodeStyleUpdateDTO {
  dotsOptions: DotsOptions;
  cornersSquareOptions: CornerSquareOptions;
  cornersDotOptions: CornerDotsOptions;
  imageSrc: string;
  generalUrlPath?: string;
}

export interface DotsOptions {
  color: string;
  type: string;
}

export interface CornerSquareOptions {
  color: string;
  type: string;
}

export interface CornerDotsOptions {
  color: string;
  type: string;
}
