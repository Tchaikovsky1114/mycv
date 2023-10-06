import { UseInterceptors } from "@nestjs/common";
import { SerializeInterceptor } from "src/interceptors/serialize.interceptor";


export interface ClassConstructor {
  new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}