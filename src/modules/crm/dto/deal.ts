export interface CreateDealRequest {
  name: string;
  created_by: number;
  custom_fields_values: {
    field_id: number;
    values: { value: any }[];
  }[];
}
