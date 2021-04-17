import { handleError, handleResponse, xsrf } from "./apiUtils";
import { TestDto } from "@skill-test/data/dto/test/TestDto";

const baseUrl = process.env.REACT_APP_API_URL + "/api/tests/";

export function getTests(): Promise<TestDto[]> {
  return fetch(baseUrl, {
    method: "GET",
    headers: xsrf({
      "content-type": "application/json",
    }),
  })
    .then((response) => handleResponse(response))
    .catch(handleError);
}

// export function getTrend(classCode: ClassCode, securityCode: string, interval: Interval, numberOfCandles: number): Promise<Trend> {
//     return fetch(`${baseUrl}trend?classCode=${classCode}&securityCode=${securityCode}&interval=${interval}&numberOfCandles=${numberOfCandles}`)
//         .then(handleResponse)
//         .catch(handleError);
// }
