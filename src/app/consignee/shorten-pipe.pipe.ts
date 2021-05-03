import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shortenPipe",
})
export class ShortenPipePipe implements PipeTransform {
  transform(value: string, limit: number) {
    return value.length > limit ? value.substr(0, limit) + "..." : value;
  }
}
