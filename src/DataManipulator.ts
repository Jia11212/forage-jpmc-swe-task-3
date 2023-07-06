import { ServerRespond } from "./DataStreamer";

export interface Row {
  price_abc: number;
  price_def: number;
  ratio: number;
  timestamp: Date;
  lower_bound: number;
  upper_bound: number;
  trigger_alert: number | undefined;
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    return serverResponds.map((el: any) => {
      const price_abc =
        (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
      const price_def =
        (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
      const ratio = price_abc / price_def;
      const lower_bound = 1 - 0.1;
      const upper_bound = 1 + 0.1;

      return {
        price_abc: price_abc,
        price_def: price_def,
        ratio: price_abc / price_def,
        timestamp:
          serverResponds[0].timestamp > serverResponds[1].timestamp
            ? serverResponds[0].timestamp
            : serverResponds[1].timestamp,
        lower_bound: lower_bound,
        upper_bound: upper_bound,
        trigger_alert:
          ratio > upper_bound || ratio < lower_bound ? ratio : undefined,
      };
    });
  }
}
