import moment from "moment";

export function calculateStartDate(rangeOption: string): string | undefined {
  const now = moment();
  switch (rangeOption.toLowerCase()) {
    case "7 days":
    case "7_days":
      return now.subtract(7, "days").toISOString();
    case "2 weeks":
    case "2_weeks":
      return now.subtract(14, "days").toISOString();
    case "1 month":
    case "1_month":
      return now.subtract(1, "month").toISOString();
    case "3 months":
    case "3_months":
      return now.subtract(3, "months").toISOString();
    default:
      return undefined;
  }
}
