import { Field } from "./field.model";

export interface Template {
    id: Number,
    name: String,
    message: String,
    os: String,
    additional_fields: Field[],
    // launch_url: String,
    // parent_id: Number,
    // enabled: boolean,
    // created_at: String,
    // updated_at: String,    
    big_picture: String
}