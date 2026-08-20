export type PredictionRequest = {
  location: string;
  carpet_area_sqft: number;
  floor_num: number;
  bathroom: number;
  balcony: number;
  furnishing: "Furnished" | "Semi-Furnished" | "Unfurnished";
  transaction: "New Property" | "Resale" | "Other" | "Rent/Lease";
  ownership: "Freehold" | "Co-operative Society" | "Power Of Attorney" | "Leasehold";
  facing:
    | "East" | "West" | "North" | "South"
    | "North - East" | "North - West" | "South - East" | "South -West";
};

export type PredictionResponse = {
  predicted_price: number;
};
